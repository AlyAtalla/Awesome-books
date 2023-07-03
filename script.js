const Book = {
  create(title, author) {
    return { title, author };
  }
};

const Store = {
  getBooks() {
    let books = [];

    if (localStorage.getItem('books') !== null) {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  },

  addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  },

  removeBook(author) {
    const books = Store.getBooks();
    const filteredBooks = books.filter(book => book.author !== author);
    localStorage.setItem('books', JSON.stringify(filteredBooks));
  }
};

const showBooks = {
  displayBooks() {
    const books = Store.getBooks();
    books.forEach(book => showBooks.addBookToList(book));
  },

  addBookToList(book) {
    const list = document.querySelector('#list');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${book.title} by </td>
        <td>${book.author}</td>
        <td><button class="delete">Remove book</button></td>
      `;

    list.appendChild(row);
  },

  deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  },

  clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
};

document.addEventListener('DOMContentLoaded', showBooks.displayBooks);

const showBookList = document.getElementById('nav-lst');
const showAddBook = document.getElementById('nav-plus');
const showContact = document.getElementById('nav-contact-us');

function displayList() {
  document.getElementById('book-list').style.display = 'flex';
  document.getElementById('add-new').style.display = 'none';
  document.getElementById('contact').style.display = 'none';
}

function displayPlus() {
  document.getElementById('book-list').style.display = 'none';
  document.getElementById('add-new').style.display = 'flex';
  document.getElementById('contact').style.display = 'none';
}

function showContactPage() {
  document.getElementById('book-list').style.display = 'none';
  document.getElementById('add-new').style.display = 'none';
  document.getElementById('contact').style.display = 'flex';
}

window.addEventListener('load', () => {
  displayList();
});

showBookList.addEventListener('click', () => {
  displayList();
});

showAddBook.addEventListener('click', () => {
  displayPlus();
});

showContact.addEventListener('click', () => {
  showContactPage();
});

document.querySelector('#form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  const book = Book.create(title, author);

  showBooks.addBookToList(book);
  Store.addBook(book);
  showBooks.clearFields();
});

document.querySelector('#list').addEventListener('click', (e) => {
  showBooks.deleteBook(e.target);
  const author = e.target.parentElement.previousElementSibling.textContent;
  Store.removeBook(author);
});

const date = new Date();
document.getElementById('date').innerHTML = date;