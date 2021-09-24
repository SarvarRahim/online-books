const country = [];

// SEARCH FORM
const elFormSearch = document.querySelector('.form-search');
const elSearchInput = elFormSearch.querySelector('.book-search');
const elSelect = elFormSearch.querySelector('select');
const elSortSelect = elFormSearch.querySelector('.js-sort-select');

// Books List
const elBooksList = document.querySelector('.books-list');
// Temlete Books List
const elBooksListTemplate = document.querySelector('#Books-list-templete').content;

// FUNCTIONS


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
    // elNewBookItem.querySelector('.book-title').textContent = book.title
    elNewBookItem.querySelector('.book-author').textContent = book.author;
    elNewBookItem.querySelector('.book-lenguage').textContent = book.language;
    elNewBookItem.querySelector('.book-year').textContent = +book.year;
    elNewBookItem.querySelector('.book-pages').textContent = +book.pages;
    elNewBookItem.querySelector('.book-link').href = book.link;

    elBooksFrargment.appendChild(elNewBookItem);
  }
  elBooksList.appendChild(elBooksFrargment);
}

function findBook(titleRegex) {
  return books.filter(book => {
    const criteir = book.title.match(titleRegex);
    return criteir;
  });
}

// function sortBooks(books, sortType) {
//   if (sortType === 'az') {
//     books.sort((a, b) => {
//       if (a.title > b.title) return 1;
//       if (a.title < b.title) return 0;
//     });
//   } else if (sortType === 'za') {
//     books.sort((a,b) => {
//       if (a.title < b.title) return 1;
//       if (a.title > b.title) return 0;
//     });
//   }
// }

function bookFind (evt) {
  evt.preventDefault();

  const titleRegex = new RegExp (elSearchInput.value.trim(), 'gi');
  const foundBooks = findBook(titleRegex);
  if(foundBooks.length > 0) {
    // sortBooks(foundBooks, elSortSelect.value);
    showBooks(foundBooks, titleRegex);
  }else {
    elBooksList.innerHTML = '<div class="col-12">No book found</div>';
  }
}

if (elFormSearch) {
  elFormSearch.addEventListener('submit', bookFind)
}

showBooks(books.slice(0, 50));

