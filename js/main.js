var elList = document.querySelector('.film-list');
var films = movies.slice(0, 20);
var elModal = document.querySelector('.main-modal');

for(var film of films){
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
    elList.appendChild(newItem);
    elModal.appendChild(newModalHeading);

    // console.log(film.Title)
}