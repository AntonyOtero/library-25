const myLibrary = [
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        pages: 295,
        read: true,
        id: crypto.randomUUID(),
        info: function() {
            return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
        }
    }
];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ${read}`;
  };
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

const books = document.querySelector(".books");

function displayBooks() {
    books.innerHTML = "";
    myLibrary.forEach( book => {
        const bookItem = document.createElement("li");
        bookItem.classList.add("book-item");
        bookItem.innerHTML = `
            <div class="book-card">
                <h2>${book.title}</h2>
                <p>Author: ${book.author}</p>
                <p>Pages: ${book.pages}</p>
                <p>Read: ${book.read ? "Yes" : "No"}</p>
            </div>
        `;
            // <button class="btn-delete" data-id="${book.id}">Delete</button>
        books.appendChild(bookItem);
    });
}

displayBooks();