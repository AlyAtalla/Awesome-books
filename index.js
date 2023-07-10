import Book from '/my-modules/book.js';
import Store from '/my-modules/store.js';
import ShowBooks from '/my-modules/showBooks.js';
import { DateTime } from '/node_modules/luxon/src/luxon.js';

document.addEventListener('DOMContentLoaded', () => {
  ShowBooks.displayBooks();
});

const showBookList = document.getElementById('nav-lst');
const showAddBook = document.getElementById('nav-plus');
const showContact = document.getElementById('nav-contact-us');

const displayList = () => {
  document.getElementById('book-list').style.display = 'flex';
  document.getElementById('add-new').style.display = 'none';
  document.getElementById('contact-us').style.display = 'none';
};

const displayPlus = () => {
  document.getElementById('book-list').style.display = 'none';
  document.getElementById('add-new').style.display = 'flex';
  document.getElementById('contact-us').style.display = 'none';
};

const showContactPage = () => {
  document.getElementById('book-list').style.display = 'none';
  document.getElementById('add-new').style.display = 'none';
  document.getElementById('contact-us').style.display = 'flex';
};

window.addEventListener('load', displayList);

showBookList.addEventListener('click', displayList);
showAddBook.addEventListener('click', displayPlus);
showContact.addEventListener('click', showContactPage);

document.querySelector('#form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  const book = new Book(title, author);

  ShowBooks.addBookToList(book);
  Store.addBook(book);
  ShowBooks.clearFields();
});

document.querySelector('#list').addEventListener('click', (e) => {
  ShowBooks.deleteBook(e.target);
  const author = e.target.parentElement.previousElementSibling.textContent;
  Store.removeBook(author);
});

const currentDate = DateTime.now().toLocaleString(DateTime.DATETIME_FULL);
document.getElementById('current-date').innerHTML = currentDate;