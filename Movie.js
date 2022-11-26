class Movie{
    constructor(data){
        Object.assign(this, data)
    }
    getHtml(btnText){
        const { Poster, Title, imdbRating, Runtime, Genre, imdbID, Plot } = this
        
        return `
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
                    <button class="add-watchlist-btn" id="${imdbID}">${btnText}</button>
                </div>
                <p class="plot">${Plot}</p>
            </div>
        </div>
        `            
    }
}

export default Movie