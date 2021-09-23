// Books List
const elBooksList = document.querySelector('.books-list');
// Temlete Books List
const elBooksListTemplate = document.querySelector('#Books-list-templete').content;

function showBooks (books) {
  elBooksList.innerHTML = '';

  const elBooksFrargment = document.createDocumentFragment();

  for (let book of books) {
    const elNewBookItem = elBooksListTemplate.cloneNode(true);
    elNewBookItem.querySelector('.book-img').src = book.imageLink;
    elNewBookItem.querySelector('.book-title').textContent = book.title;
    elNewBookItem.querySelector('.book-author').textContent = book.author;
    elNewBookItem.querySelector('.book-lenguage').textContent = book.language;
    elNewBookItem.querySelector('.book-year').textContent = +book.year;
    elNewBookItem.querySelector('.book-pages').textContent = +book.pages;
    elNewBookItem.querySelector('.book-link').href = book.link;

    elBooksFrargment.appendChild(elNewBookItem);
  }
  elBooksList.appendChild(elBooksFrargment);
}



showBooks(books.slice(0, 20));