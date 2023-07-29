// the book
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

var deepWork = new Book("Deep Work", "Cal New Port", 362, true);

let books = [];

// the number of books 
var count = document.querySelector(".count");
count.textContent = books.length;

// displaying the books

let booksContainer = document.querySelector(".books");

function createAndDOM(book) {
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
        state.textContent = "Read";
    }
    bookElement.appendChild(state);
    remove = document.createElement('button');
    remove.textContent = "Remove";
    remove.classList.add("remove");
    bookElement.appendChild(remove);

    booksContainer.appendChild(bookElement);
}

books.forEach((book) => {
    createAndDOM(book);
});


function updateBooks() {
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

        // read and not read
        let status = book.querySelector(".status");
        status.onclick = () => {
            let bookTitle = book.querySelector(".title").textContent;
            books.forEach((x) => {
                if (x.title === bookTitle) {
                    x.read = !x.read;
                    status.textContent = x.read
                        ? "Unread"
                        : "Read";
                    book.querySelector(".status").classList.toggle("read");
                }
            });
        }
    });

}

// adding a new book
let newBook = document.querySelector('.newBook');
let newBookForm = document.querySelector('.formDiv');

newBook.onclick = () => newBookForm.removeAttribute("style")

let form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    // create the book
    var newTitle = form.querySelector("#title").value;
    var newAuthor = form.querySelector("#author").value;
    var newPages = form.querySelector("#pages").value;
    if (!validateBook(newTitle, newAuthor)) {
        newBookForm.querySelector(".error").removeAttribute("style");
    } else {
        var createBook = new Book(newTitle, newAuthor, newPages, false)
        books.push(createBook);
        // update the display
        newBookForm.setAttribute("style", "display: none;");
        form.querySelector("#title").value = '';
        form.querySelector("#author").value = '';
        form.querySelector("#pages").value = '';
        newBookForm.querySelector(".error").setAttribute("style", "display: none;");
        // add it to the DOM
        createAndDOM(createBook);
        // update count
        count.textContent = books.length;
        // update event listeners
        updateBooks();
    }
})

function validateBook(title, author) {
    for (const book of books) {
        if ((book.title === title) && (book.author === author)) {
            return false;
        }
    }
    return true;
}