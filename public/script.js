const searchInput = document.getElementById("search_input");
const searchList = document.getElementById("search_list");
const resultGrid = document.getElementById("result_grid");

// load movies from API
async function loadMovies(searchTerm) {
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=effd17c3`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    // console.log(data);
    if (data.Response == "True") displayMovieList(data.Search);
}

function searchMovies() {
    let searchTerm = searchInput.value.trim();
    if (searchTerm.length > 0) {
        searchList.classList.remove("hide_search_list");
        loadMovies(searchTerm);
    } else {
        searchList.classList.add("hide_search_list");
    }
}

function displayMovieList(movies) {
    searchList.innerHTML = "";
    for (let idx = 0; idx < movies.length; idx++) {
        let movieListItem = document.createElement("div");
        movieListItem.dataset.id = movies[idx].imdbID;
        movieListItem.classList.add("search_list_item");
        if (movies[idx].Poster != "N/A") moviePoster = movies[idx].Poster;
        else moviePoster = "imag.png";

        movieListItem.innerHTML = `
        <div class = "search_item_img">
            <img src = "${moviePoster}">
        </div>
        <div class = "search_item_info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}

function loadMovieDetails() {
    const searchListMovies = searchList.querySelectorAll(".search_list_item");
    searchListMovies.forEach((movie) => {
        movie.addEventListener("click", async () => {
            searchList.classList.add("hide_search_list");
            searchInput.value = "";
            const result = await fetch(
                `https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=effd17c3`
            );
            const movieDetails = await result.json();
            displayMovieDetails(movieDetails);
        });
    });
}

function displayMovieDetails(details) {
    resultGrid.innerHTML = `
    <div class = "movie_poster">
        <img src = "${details.Poster != "N/A" ? details.Poster : "imag.png"
        }" alt = "movie poster">
    </div>
    <div class = "movie_info">
        <h3 class = "title">${details.Title}</h3>
        <ul class = "misc_info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards
        }</p>
    </div>
    `;
}

window.addEventListener("click", (event) => {
    if (event.target.className != "search_input") {
        searchList.classList.add("hide_search_list");
    }
});
