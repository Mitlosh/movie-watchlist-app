import Movie from "./Movie.js"
const apikey = 'a8748325'
const baseUrl = `https://www.omdbapi.com/?apikey=${apikey}&`
const form = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const savedMovies = JSON.parse(localStorage.getItem('movies')) || []


let page = document.body.id
switch (page) {
    case 'search':
        getSearchPage()
        break

    case 'watchlist':
        getWatchlistPage()
        break
}


function getSearchPage() {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        fetch (`${baseUrl}s=${searchInput.value}&`)
            .then(res => res.json())
            .then(data => renderMovieListHtml(data) )
    })
}

function renderMovieListHtml(data) {
    const imdbIDArray = data.Search.map(item => item.imdbID)
    const searchResultsHtml = ``

    imdbIDArray.forEach(id => {
        fetch(`${baseUrl}i=${id}&`)
            .then(res => res.json())
            .then(imdbData => {                
                const film = new Movie(imdbData)
                searchResultsHtml += film.getHtml()

                showResult(searchResultsHtml)
            })   
    })
}

function showResult(result) {
    document.getElementById('main-page').innerHTML = result

    const resultArray = Array.from(document.getElementsByClassName(".add-watchlist-btn"))
    resultArray.forEach(btn => {
        btn.addEventListener("click", () => addToWatchlist(btn.id))
    })
}

function addToWatchlist(ttId) {
    savedMovies.push(ttId)
    localStorage.setItem("movies", JSON.stringify(savedMovies))
}

// ______________________________________________________________________
// Watchlist Page

function getWatchlistPage() {
    const watchlist = document.getElementById('main-watchlist')
    let watchlistHtml = ``
    
    if(savedMovies === 0 || savedMovies === null) {
        watchlist.innerHTML = `
            <div>
                <h2>Your watchlist is looking a little empty...</h2>
                <p>Let’s add some movies!</p>
            </div>
        `
    } else {
        savedMovies.map(movie => {
            fetch(`${baseUrl}i=${movie}&`)
                .then(res => res.json())
                .then(imdbData => {
                    const film = new Movie(imdbData)                      
                    watchlistHtml += film.getHtml()
                    
                    watchlist.innerHTML = watchlistHtml
                })
        })
    }
}