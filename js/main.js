var elForm = document.querySelector('.film-form');
var elList = document.querySelector('.film-list');
var films = movies.slice(0, 50);
var elModal = document.querySelector('.main-modal');
var elInput = document.querySelector('.film-input');
var elCount = document.querySelector('.movies-count');
var elRating = document.querySelector('.film-rating');
var elSortByRating = document.querySelector('.sort-rating');
var elSortByName = document.querySelector('.sort-name');

function renderMovie(array, node){
    elCount.textContent = array.length
    for(var film of array){
        // New elements
        var newItem = document.createElement('div');
        var newCard = document.createElement('div');
        var newImgCard = document.createElement('div');
        var newImg = document.createElement('img');
        var newCardBody = document.createElement('div');
        var newHeadingArea = document.createElement('div');
        var newHeading = document.createElement('h3');
        var newYearArea = document.createElement('div');
        var newYearImg = document.createElement('img')
        var newYear = document.createElement('time');
        var newRatingArea = document.createElement('div');
        var newRatingImg = document.createElement('img');
        var newRating = document.createElement('strong');
        var newBtnArea = document.createElement('div');
        var newLink = document.createElement('a');
        var newBtn = document.createElement('button');
        var newMark = document.createElement('button');
        var newModalHeading = document.createElement('h3');
        
        // Attribute
        newItem.setAttribute('class', 'col-md-6');
        newCard.setAttribute('class', 'card mb-3');
        newImg.setAttribute('class', 'col-md-6');
        newImg.setAttribute('src', `http://i3.ytimg.com/vi/${film.imdb_id}/maxresdefault.jpg`);
        newImg.setAttribute('class', 'w-100 rounded-top');
        newCardBody.setAttribute('class', 'card-body');
        newHeading.setAttribute('class', 'card-title h5');
        newYearArea.setAttribute('class', 'mb-3');
        newYearImg.setAttribute('src', './images/icon-calendar.png');
        newYearImg.setAttribute('width', 25);
        newYearImg.setAttribute('heigth', 25);
        newRatingArea.setAttribute('class', 'mb-3 d-flex align-items-center');
        newRatingImg.setAttribute('src', './images/icon-star.png');
        newRatingImg.setAttribute('width', 25);
        newRatingImg.setAttribute('heigth', 25);
        newRating.setAttribute('class', 'text-dark')
        newLink.setAttribute('href', `https://www.youtube.com/watch?v=${film.ytid}`);
        newBtnArea.setAttribute('class', 'd-flex justify-content-evenly');
        newBtn.setAttribute('type', 'button');
        newBtn.setAttribute('data-bs-toggle', 'modal');
        newBtn.setAttribute('data-bs-target', '#staticBackdrop');
        newLink.setAttribute('class', 'btn btn-outline-primary');
        newBtn.setAttribute('class', 'btn btn-outline-primary');
        newMark.setAttribute('type', 'button');
        newMark.setAttribute('class', 'btn btn-outline-success');
        
        // Text content
        newHeading.textContent = film.Title;
        newYear.textContent = film.movie_year;
        newRating.textContent = film.imdb_rating;
        newLink.textContent = 'Watch trailer';
        newBtn.textContent = 'More info';
        newMark.textContent = 'Bookmark';
        
        // Append
        newImgCard.appendChild(newImg);
        newItem.appendChild(newCardBody);
        newHeadingArea.appendChild(newHeading);
        newItem.appendChild(newHeadingArea);
        newYearArea.appendChild(newYearImg);
        newYearArea.appendChild(newYear);
        newRatingArea.appendChild(newRatingImg);
        newRatingArea.appendChild(newRating);
        newBtnArea.appendChild(newLink);
        newBtnArea.appendChild(newBtn);
        newBtnArea.appendChild(newMark);
        newCardBody.appendChild(newHeadingArea);
        newCardBody.appendChild(newYearArea);
        newCardBody.appendChild(newRatingArea);
        newCardBody.appendChild(newBtnArea);
        newCard.appendChild(newImgCard);
        newCard.appendChild(newCardBody);
        newItem.appendChild(newCard);
        node.appendChild(newItem);
        elModal.appendChild(newModalHeading);
    }
}



renderMovie(films, elList)

elForm.addEventListener('submit', function(evt){
    evt.preventDefault()
    
    var nowTime = new Date();
    var nowYear = nowTime.getFullYear();
    var inputValue = Number(elInput.value);
    var ratingValue = Number(elRating.value);
    var ratingSelectValue = elSortByRating.value;
    var nameSelectValue = elSortByName.value;
    var filteredMovieList = films;
    
    // Filter
    if (inputValue) {
        filteredMovieList = filteredMovieList.filter(function(item){
            if(item.movie_year >= nowYear - inputValue){
                return true
            }
        })
    }

    if (ratingValue) {
        filteredMovieList = filteredMovieList.filter(function(item){
            if(item.imdb_rating >= ratingValue){
                return true
            }
        })
    }
    
    if (ratingSelectValue == 'low_to_high') {
        filteredMovieList = filteredMovieList.sort((a, b) => a.imdb_rating - b.imdb_rating);
    } else if (ratingSelectValue == 'high_to_low') {
        filteredMovieList = filteredMovieList.sort((a, b) => b.imdb_rating - a.imdb_rating);        
    }

    if (nameSelectValue == 'a_z') {
        filteredMovieList = filteredMovieList.sort((a, b) => String(a.Title).toLowerCase() > String(b.Title).toLowerCase() ? 1 : -1)
    } else if (nameSelectValue == 'z_a'){
        filteredMovieList = filteredMovieList.sort((b, a) => String(a.Title).toLowerCase() > String(b.Title).toLowerCase() ? 1 : -1)
    }
    
    // RenderGenre
    // function renderGenre(films){
    //     result = []
    //     films.forEach(film => {
    //         film.Categories.split('|').forEach(genre => {
    //             if(!(result.includes(genre))){
    //                 result.push(genre)
    //             }
    //         })
    //     })
    //     return result
    // }
    
    
    elSortByRating.addEventListener('click', function(){
        
    })
    
    elList.innerHTML = null;
    
    renderMovie(filteredMovieList, elList)
})


