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
    },
    {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        pages: 1178,
        read: false,
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
const openNewBookModal = document.querySelector("#open-modal-button");
const newBookModal = document.querySelector("#new-book-modal");
const closeNewBookModal = document.querySelector("#close-modal-button");
const addBookButton = document.querySelector("#add-book-button");

function displayBooks() {
    books.innerHTML = "";
    myLibrary.forEach( book => {
        const bookItem = document.createElement("li");
        bookItem.classList.add("book-item");
        bookItem.innerHTML = `
            <div class="book-card">
                <h2 class="book-title">${book.title}</h2>
                <p class="book-author">Author: ${book.author}</p>
                <p class="book-pages">Pages: ${book.pages}</p>
                <p class="book-read">Read: ${book.read ? "Yes" : "No"}</p>
                <button class="btn btn-delete" data-id="${book.id}">Delete</button>
            </div>
        `;
        books.appendChild(bookItem);
    });

    const deleteButtons = document.querySelectorAll(".btn-delete");
    deleteButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const bookId = e.target.dataset.id;
            deleteBook(bookId);
        });
    });
    console.log(myLibrary);
}

function deleteBook(id) {
    const bookIndex = myLibrary.findIndex(book => book.id === id);
    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
        displayBooks();
    }
}

displayBooks();

openNewBookModal.addEventListener("click", () => {
    newBookModal.showModal();
    document.querySelector("#new-book-title").value = "";
    document.querySelector("#new-book-author").value = "";
    document.querySelector("#new-book-pages").value = "";
    document.querySelector("#new-book-read").checked = false;
});

closeNewBookModal.addEventListener("click", () => {
    newBookModal.close();
});

addBookButton.addEventListener("click", (e) => {
    e.preventDefault();
    const newBookTitle = document.querySelector("#new-book-title").value;
    const newBookAuthor = document.querySelector("#new-book-author").value;
    const newBookPages = document.querySelector("#new-book-pages").value;
    const newBookRead = document.querySelector("#new-book-read").checked;
    addBookToLibrary(newBookTitle, newBookAuthor, newBookPages, newBookRead);
    displayBooks();
    newBookModal.close();
});

