const countrys = [];

// SEARCH FORM
const elFormSearch = document.querySelector('.form-search');
const elSearchInput = elFormSearch.querySelector('.book-search');
const elSelect = elFormSearch.querySelector('select');
const elSortSelect = elFormSearch.querySelector('.js-sort-select');
const elFormStartYear = elFormSearch.querySelector('.js-start-year');
const elFormEndYear = elFormSearch.querySelector('.js-start-end');
const elFormLanguage = elFormSearch.querySelector('.js-language-input');

// Books List
const elBooksList = document.querySelector('.books-list');
// Temlete Books List
const elBooksListTemplate = document.querySelector('#Books-list-templete').content;

function getCountrys (){
  const cont = [];
  books.forEach(book => {
    cont.push(book.country);
    cont.forEach(count => {
      if (!countrys.includes(count)){
        countrys.push(count);
      }
    });
  });
  countrys.sort();
}

function showCountry() {
  const elCounutryFragment = document.createDocumentFragment();
  countrys.forEach(countr => {
    const elCountrOption = document.createElement('option');
    elCountrOption.textContent = countr;
    elCountrOption.value = countr;
    elCounutryFragment.appendChild(elCountrOption);
  });
  elSelect.appendChild(elCounutryFragment);
  console.log(elSelect);
}

function showBooks (books, titleRegex = '') {
  elBooksList.innerHTML = '';

  const elBooksFrargment = document.createDocumentFragment();

  for (let book of books) {
    const elNewBookItem = elBooksListTemplate.cloneNode(true);
    elNewBookItem.querySelector('.book-img').src = book.imageLink;
    if (titleRegex.source !== '(?:)' && titleRegex) {
      elNewBookItem.querySelector('.book-title').innerHTML = book.title.replace(titleRegex, `<mark class="p-0" style="background-color: #7fff00;">${titleRegex.source}</mark>`);
    }else {
      elNewBookItem.querySelector('.book-title').textContent = book.title
    }
    elNewBookItem.querySelector('.book-author').textContent = book.author;
    elNewBookItem.querySelector('.book-country').textContent = book.country;
    elNewBookItem.querySelector('.book-lenguage').textContent = book.language;
    elNewBookItem.querySelector('.book-year').textContent = +book.year;
    elNewBookItem.querySelector('.book-pages').textContent = +book.pages;
    elNewBookItem.querySelector('.book-link').href = book.link;

    elBooksFrargment.appendChild(elNewBookItem);
  }
  elBooksList.appendChild(elBooksFrargment);
}

function findBook(titleRegex, languageRegex) {
  return books.filter(book => {
    const criteir = book.title.match(titleRegex) && (elSelect.value === 'All' || book.country.includes(elSelect.value)) && (elFormStartYear.value.trim() === '' || book.year >= Number(elFormStartYear.value)) && (elFormEndYear.value.trim() === '' || book.year <= Number(elFormEndYear.value)) && book.language.match(languageRegex);
    return criteir;
  });
}

function sortBooks(books, sortType) {
  if (sortType === 'az') {
    books.sort((a, b) => {
      if (a.title > b.title) return 1;
      if (a.title < b.title) return -1;
      return 0;
    });
  } else if (sortType === 'za') {
    books.sort((a,b) => {
      if (a.title < b.title) return 1;
      if (a.title > b.title) return -1;
      return 0
    });
  } else if (sortType === 'year_new') {
    books.sort((a, b) => a.year - b.year);
  }else if (sortType === 'year_old') {
    books.sort((a, b) => b.year - a.year);
}
}

function onFormSearchBook (evt) {
  evt.preventDefault();

  const titleRegex = new RegExp (elSearchInput.value.trim(), 'gi');
  const languageRegex = new RegExp (elFormLanguage.value.trim(), 'gi');
  const foundBooks = findBook(titleRegex, languageRegex);
  if(foundBooks.length > 0) {
    sortBooks(foundBooks, elSortSelect.value);
    showBooks(foundBooks, titleRegex, languageRegex);
  }else {
    elBooksList.innerHTML = '<div class="col-12">No book found</div>';
  }
}

if (elFormSearch) {
  elFormSearch.addEventListener('submit', onFormSearchBook)
}


getCountrys();
showCountry();
showBooks(books.slice(0, 50));

