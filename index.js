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
            .then(data => renderMovieListHtml(data))
    })
}

function renderMovieListHtml(data) {
    const imdbIDArray = data.Search.map(item => item.imdbID)
    let searchResultsHtml = ``

    imdbIDArray.map(id => {
        fetch(`${baseUrl}i=${id}&`)
            .then(res => res.json())
            .then(imdbData => {   
                const btnText = savedMovies.includes(imdbData.imdbID) ? 'Remove' : 'Watchlist'
                const film = new Movie(imdbData)
                searchResultsHtml += film.getHtml(btnText)
                
                showResult(searchResultsHtml)
            })   
    })
}

function getWatchlistPage() {
    let watchlistHtml = ``

    if (savedMovies.length) {
        savedMovies.map(movie => {
            fetch(`${baseUrl}i=${movie}&`)
                .then(res => res.json())
                .then(imdbData => {
                    const btnText = savedMovies.includes(imdbData.imdbID) ? 'Remove' : 'Watchlist'
                    const film = new Movie(imdbData)                      
                    watchlistHtml += film.getHtml(btnText)
    
                    showResult(watchlistHtml)
                })
        })   
    } else {
        watchlistHtml = `
            <div class="main-page">
                <h2>Your watchlist is looking a little empty...</h2>
                <a href="index.html">Let’s add some movies!</a>
            </div>
        `
        document.getElementById('main-page').innerHTML = watchlistHtml
    }
}


function showResult(result) {
    document.getElementById('main-page').innerHTML = result

    const resultArray = Array.from(document.querySelectorAll(".add-watchlist-btn"))
    resultArray.map(btn => {
        btn.addEventListener("click", () => toggleWatchlist(btn.id))
    })
}

function toggleWatchlist(ttId) {
    if (!savedMovies.includes(ttId)) {
        savedMovies.push(ttId)
        localStorage.setItem("movies", JSON.stringify(savedMovies))
    } else {
        const index = savedMovies.indexOf(ttId)
        if (index > -1) savedMovies.splice(index, 1)
        localStorage.setItem("movies", JSON.stringify(savedMovies))
    }
}