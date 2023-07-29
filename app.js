// the book
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

var deepWork = new Book("Deep Work", "Cal New Port", 362, true);

let books = [deepWork];

// the number of books 
var count = document.querySelector(".count");
count.textContent = books.length;

// adding a new book
let newBook = document.querySelector('.newBook');
let newBookForm = document.querySelector('.formDiv');

newBook.onclick = () => newBookForm.removeAttribute("style")

// displaying the books

let booksContainer = document.querySelector(".books");

books.forEach((book) => {
    bookElement = document.createElement('div');
    bookElement.classList.add("book");
    title = document.createElement('h1');
    title.classList.add("title");
    title.textContent = book.title;
    bookElement.appendChild(title);
    author = document.createElement('h3');
    author.classList.add("author");
    author.textContent = book.author;
    bookElement.appendChild(author);
    pages = document.createElement('p');
    pages.classList.add("pages");
    bookElement.appendChild(pages);
    pages.textContent = book.pages;
    state = document.createElement('button');
    state.classList.add("status");
    if (book.read) {
        state.classList.add("read");
        state.textContent = "Unread";
    }
    else {
        state.classList.add("unread");
        state.textContent = "Read";
    }
    bookElement.appendChild(state);
    remove = document.createElement('button');
    remove.textContent = "Remove";
    remove.classList.add("remove");
    bookElement.appendChild(remove);

    booksContainer.appendChild(bookElement);
});

// removing books
var liveBooks = document.querySelectorAll(".book");

liveBooks.forEach((book) => {
    let removeButton = book.querySelector(".remove");
    removeButton.onclick = () => {
        let bookTitle = book.querySelector(".title").textContent;
        books.forEach((x) => {
            if (x.title === bookTitle) {
                var index = books.indexOf(x);
                books.splice(index, 1);
                // remove from DOM
                booksContainer.removeChild(book);
                // update the number of books 
                count.textContent = books.length;
            }
        });
    }
});

// read and not read
var readBooks = document.querySelectorAll(".book");

readBooks.forEach((book) => {
    let status = book.querySelector(".status");
    status.onclick = () => {
        let bookTitle = book.querySelector(".title").textContent;
        books.forEach((x) => {
            if (x.title === bookTitle) {
                x.read = !x.read;
                x.read
                    ? book.querySelector(".status").textContent = "Unread"
                    : book.querySelector(".status").textContent = "Read";
                book.querySelector(".status").classList.toggle("read");
            }
        });
    }
});