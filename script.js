const bookContainer = document.querySelector('.book-container');
const inpTitle = document.querySelector('#title');
const inpAutor = document.querySelector('#author');
class Book {
    static collection = [];

    constructor(title, author) {
      this.title = title;
      this.author = author;
    }

    static setLocalStorage = () => {
      const data = JSON.stringify(Book.collection);
      localStorage.setItem('books', data);
    }

    deleteBook = (title, author) => {
      Book.collection = Book.collection.filter((book) => book.title !== title
        || book.author !== author);
    }

    showBook(book) {
      const bookDiv = document.createElement('DIV');
      const bookTitle = document.createElement('p');
      const deleteBtn = document.createElement('BUTTON');
      deleteBtn.classList.add('btn-remove');

      const title = `"${book.title}" by ${book.author}`;
      bookTitle.textContent = title;
      deleteBtn.textContent = 'Remove';

      bookDiv.appendChild(bookTitle);
      bookDiv.appendChild(deleteBtn);
      bookContainer.appendChild(bookDiv);
      deleteBtn.addEventListener('click', () => {
        this.deleteBook(book.title, book.author);
        Book.setLocalStorage(Book.collection);
        bookContainer.removeChild(bookDiv);
      });
    }

    iterateBooks() {
      Book.collection.forEach((book) => {
        this.showBook(book);
      });
    }

    saveBooks() {
      const book = new Book(inpTitle.value, inpAutor.value);
      Book.collection.push(book);
      Book.setLocalStorage(Book.collection);
      this.showBook(book);
    }
}

const msg = document.querySelector('#errorMsg');
const exbtn = document.createElement('button');

function checkRepetition(book) {
  for (let i = 0; i < Book.collection.length; i += 1) {
    const currentBook = Book.collection[i];
    if (currentBook.title.toLowerCase() === book.title.toLowerCase()
    && currentBook.author.toLowerCase() === book.author.toLowerCase()) {
      msg.textContent = ' ❗ This Book is Already in the list';
      exbtn.textContent = 'X';
      exbtn.classList.add('close-modal');
      msg.appendChild(exbtn);

      return false;
    }
  }
  return true;
}

exbtn.addEventListener('click', () => {
  msg.classList.add('hidden');
});

function addBookToLibrary() {
  const inputTitleValue = inpTitle.value;
  const inputAuthorValue = inpAutor.value;
  const book = new Book(inputTitleValue, inputAuthorValue);
  if (checkRepetition(book)) {
    book.saveBooks();
  }
}

const book = new Book();
const form = document.querySelector('.form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  addBookToLibrary();
  inpTitle.value = '';
  inpAutor.value = '';
});

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('books') !== null) {
    const myBooks = JSON.parse(localStorage.getItem('books'));
    Book.collection = myBooks;
  }
  book.iterateBooks();
});

// navigation
const [list, addNew, contact] = document.querySelectorAll('.link');
const contactSection = document.querySelector('.contact-section');
const sec = document.querySelector('.sec');
const sec1 = document.querySelector('.sec1');

list.addEventListener('click', () => {
  contactSection.classList.add('hidden');
  sec1.classList.add('hidden');
  sec.classList.remove('hidden');
});

addNew.addEventListener('click', () => {
  contactSection.classList.add('hidden');
  sec1.classList.remove('hidden');
  sec.classList.add('hidden');
});

contact.addEventListener('click', () => {
  contactSection.classList.remove('hidden');
  sec1.classList.add('hidden');
  sec.classList.add('hidden');
});
