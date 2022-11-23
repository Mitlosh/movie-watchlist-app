import Movie from "./Movie.js"
const apikey = 'a8748325'
const form = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const watchlistArray = []
let savedFilms = JSON.parse(localStorage.getItem('films')) || []

form.addEventListener('submit', function(e){
    e.preventDefault()
    getSearchList()
})


function getSearchList() {
    fetch (`https://www.omdbapi.com/?apikey=${apikey}&s=${searchInput.value}&`)
        .then(res => res.json())
        .then(data => renderMovieListHtml(data) )
}


function renderMovieListHtml(data) {
    let imdbIDArray = data.Search.map(item => item.imdbID)
    
    let searchResultsHtml = ``    
    for (let id of imdbIDArray) {
        fetch(`https://www.omdbapi.com/?apikey=${apikey}&i=${id}&`)
            .then(res => res.json())
            .then(data =>{                
                const { Poster, Title, imdbRating, Runtime, Genre, imdbID, Plot } = data 
                // film = new Movie(data)                       <----- add class
                // searchResultsHtml += film.getMovieHtml()
                searchResultsHtml += `
                    <div class="movie-el">
                        <img src="${Poster}" alt="poster"/>
                        <div class="about-movie">
                            <div class="title-rating">
                                <h2>${Title}</h2>
                                <p>⭐${imdbRating}</p>
                            </div>
                            <div class="additional-info">
                                <p>${Runtime}</p>
                                <p>${Genre}</p>
                                <button class="add-watchlist-btn" id="${id}">${imdbID}</button>
                            </div>
                            <p class="plot">${Plot}</p>
                        </div>
                    </div>
                    `          
                document.getElementById('main-page').innerHTML = searchResultsHtml

                let btnsArray = Array.from(document.getElementsByClassName("add-watchlist-btn"))
                btnsArray.forEach(btn => {
                    btn.addEventListener("click", () => {
                        addToWatchlist(btn.id)
                    })
                })
            })
            
    }
}

function addToWatchlist(ttId) {
    watchlistArray.push(ttId)
    localStorage.setItem("movies", JSON.stringify(watchlistArray))
    console.log(localStorage)     
}
// localStorage.clear()
