var elForm = document.querySelector('.film-form');
var elList = document.querySelector('.film-list');
var films = movies.slice(0, 50);
var elCount = document.querySelector('.movies-count');
var elRating = document.querySelector('.film-rating');
var elSortByRating = document.querySelector('.sort-rating');
var elSortByName = document.querySelector('.sort-name');
var searchInput = document.querySelector('.film-name');
var elGenreSelect = document.querySelector('.film-select-genre');
var elModal = document.querySelector('.modal');
var elBookMark = document.querySelector('.bookmark-list');
var elFilmCardTemplate = document.querySelector('.film-card-temp').content;
var elBookmarkTemplate = document.querySelector('.bookmark-temp').content;

var normolizedFilmsList = films.map((item, index) => {
    return {
        id: String(index + 1).padStart(4, 0),
        title: item.Title.toString(),
        img_link: `http://i3.ytimg.com/vi/${item.ytid}/mqdefault.jpg`,
        year: item.movie_year,
        rating: item.imdb_rating,
        video_link: `https://www.youtube.com/watch?v=${item.ytid}`,
        genre: item.Categories.split('|')
    }
})

var sortedByRatingName = (normolizedFilmsList) => {
    elSortByRating.addEventListener('change', evt => {
        
        var ratingSelectValue = elSortByRating.value;
        
        if (ratingSelectValue == 'low_to_high') {
            normolizedFilmsList = normolizedFilmsList.sort((a, b) => a.rating - b.rating);
            
        } else if (ratingSelectValue == 'high_to_low') {
            normolizedFilmsList = normolizedFilmsList.sort((a, b) => b.rating - a.rating);        
        }
    })
    
    elSortByName.addEventListener('change', () => {
        var nameSelectValue = elSortByName.value
        
        if (nameSelectValue == 'a_z') {
            normolizedFilmsList = normolizedFilmsList.sort((a, b) => String(a.title).toLowerCase() > String(b.title).toLowerCase() ? 1 : -1)
        } else if (nameSelectValue == 'z_a'){
            normolizedFilmsList = normolizedFilmsList.sort((b, a) => String(a.title).toLowerCase() > String(b.title).toLowerCase() ? 1 : -1)
        }
    })
}

// Render genres

var renderGenres = (moviesList, nodeArray) => {
    var genresList = [];    
    moviesList.forEach(item => {
        item.genre.forEach(genre => {
            var isGenreOK = !genresList.includes(genre);
            if(isGenreOK){
                genresList.push(genre)
            }
            
        })
    })
    
    genresList.sort()
    
    var elGenreOptionFragment = document.createDocumentFragment();
    genresList.forEach(item => {
        var newOption = document.createElement('option');
        
        newOption.textContent = item;
        newOption.value = item;
        elGenreOptionFragment.appendChild(newOption)
    })
    nodeArray.appendChild(elGenreOptionFragment)
}
renderGenres(normolizedFilmsList, elGenreSelect)

function resultListFilms (title, rating, genre){
    return normolizedFilmsList.filter(movie => {
        var isGenreTrue = genre === 'All' || movie.genre.includes(genre)
        
        return movie.title.match(title) && movie.rating >= rating && isGenreTrue;
    })
}

// Render movie

function renderMovie(array, node){
    if(array.length > 0){
        elCount.textContent = array.length
    } else {
        elCount.textContent = 'not found'
    }
    
    var newItemFragment = document.createDocumentFragment();
    
    for(var film of array){
        var cardItemClone = elFilmCardTemplate.cloneNode(true)
        
        cardItemClone.querySelector('.film-card-heading').textContent = film.title;
        cardItemClone.querySelector('.film-card-img').src = film.img_link;
        cardItemClone.querySelector('.film-card-year').textContent = film.year;
        cardItemClone.querySelector('.film-card-rating').textContent = film.rating;
        cardItemClone.querySelector('.film-card-link').href = film.video_link;
        cardItemClone.querySelector('.film-card-bookmark').dataset.id = film.id
        
        newItemFragment.appendChild(cardItemClone)
        // console.log(cardItemClone)
    }
    elList.appendChild(newItemFragment)
}

renderMovie(normolizedFilmsList, elList)

// Bookmark

function renderBookMark(bookmarkList){
    var bookmarkFragment = document.createDocumentFragment();
    
    bookmarkList.forEach(item => {
        var bookmarkClone = elBookmarkTemplate.cloneNode(true)
        bookmarkClone.querySelector('.bookmark-heading').textContent = item.title;
        bookmarkClone.querySelector('.bookmark-btn').dataset.id = item.id
        bookmarkFragment.appendChild(bookmarkClone)
    })
    
    elBookMark.appendChild(bookmarkFragment)
}

var bookmarkArrayList = []

elList.addEventListener('click', evt => {
    var bookmarkId = evt.target.dataset.id;
    
    
    if(bookmarkId){
        var findID = normolizedFilmsList.find(item => {
            if(item.id == bookmarkId){
                return item;
            }
        })
        
        var isBookmarkOK = bookmarkArrayList.includes(findID)
        
        if(!isBookmarkOK){
            bookmarkArrayList.push(findID)
        }
    }
    
    elBookMark.innerHTML = null;
    
    renderBookMark(bookmarkArrayList)
})

elBookMark.addEventListener('click', evt => {
    var btnID = evt.target.dataset.id
    
    if(btnID){
        var findIndex = bookmarkArrayList.findIndex(item => {
            if(item.id == btnID){
                return item
            }
        })
        
        bookmarkArrayList.splice(findIndex, 1)
        elBookMark.innerHTML = null;
        
        renderBookMark(bookmarkArrayList);
    }
})

// Form menu

elForm.addEventListener('submit', function(evt){
    evt.preventDefault()
    
    var searchValue = searchInput.value.trim().split(' ').join('|');
    var ratingValue = Number(elRating.value);
    var genreValue = elGenreSelect.value;
    var searching = new RegExp (searchValue, 'gi');
    
    var endResultFilmsList = resultListFilms(searching, ratingValue, genreValue)
    
    elList.innerHTML = null;
    
    renderMovie(endResultFilmsList, elList)
})