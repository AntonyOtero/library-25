class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = crypto.randomUUID();
    }

    get info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }

    toggleRead() {
        this.read = !this.read;
    }

    addToLibrary(library) {
        library.push(this);
    }
}

const libraryMemory = (() => {
    const memory = [
        new Book("The Hobbit", "J.R.R. Tolkien", 295, true),
        new Book("The Lord of the Rings", "J.R.R. Tolkien", 1178, false),
        new Book("The Catcher in the Rye", "J.D. Salinger", 277, true),
        new Book("To Kill a Mockingbird", "Harper Lee", 281, false),
        new Book("1984", "George Orwell", 328, true),
        new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, false),
        new Book("Brave New World", "Aldous Huxley", 268, true),
        new Book("Fahrenheit 451", "Ray Bradbury", 158, false),
        new Book("The Grapes of Wrath", "John Steinbeck", 464, false),
        new Book("The Picture of Dorian Gray", "Oscar Wilde", 254, true),
        new Book("The Catch-22", "Joseph Heller", 453, false),
    ];

    function deleteBook(id) {
        const bookIndex = libraryMemory.memory.findIndex(book => book.id === id);
        if (bookIndex !== -1) {
            libraryMemory.memory.splice(bookIndex, 1);
            libraryUI.displayBooks();
        }
    }

    return {
        memory,
        deleteBook,
    }
})();

const libraryUI = (() => {
    const books = document.querySelector(".books");
    const openNewBookModal = document.querySelector("#open-modal-button");
    const newBookModal = document.querySelector("#new-book-modal");
    const closeNewBookModal = document.querySelector("#close-modal-button");
    const addBookButton = document.querySelector("#add-book-button");

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
        const newBook = new Book(newBookTitle, newBookAuthor, newBookPages, newBookRead);
        newBook.addToLibrary(libraryMemory.memory);
        libraryUI.displayBooks();
        newBookModal.close();
    });

    function displayBooks() {
        books.innerHTML = "";
        libraryMemory.memory.forEach(book => {
            const bookItem = document.createElement("li");
            bookItem.classList.add("book-item");
            bookItem.innerHTML = `
                <div class="book-card">
                    <h2 class="book-title">${book.title}</h2>
                    <div class="book-info">
                        <p class="book-author">Author: ${book.author}</p>
                        <p class="book-pages">Pages: ${book.pages}</p>
                        <button class="btn btn-read" data-id="${book.id}">${book.read ? "Finished" : "Not Read"}</button>
                    </div>
                    <button class="btn btn-delete" data-id="${book.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>trash-can-outline</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>
                    </button>
                </div>
            `;
            books.appendChild(bookItem);
        });

        const deleteButtons = document.querySelectorAll(".btn-delete");
        deleteButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const bookId = e.target.dataset.id;
                libraryMemory.deleteBook(bookId);
            });
        });

        const readButtons = document.querySelectorAll(".btn-read");
        readButtons.forEach(button => {
            button.addEventListener("click", e => {
                const bookId = e.target.dataset.id;
                const book = libraryMemory.memory.find(book => book.id === bookId);
                book.toggleRead();
                e.target.textContent = book.read ? "Finished" : "Not Read";
                // e.target.classList.toggle("btn-read");
            });
        });
        console.log(libraryMemory.memory);
    }

    return {
        displayBooks,
    }
})();

libraryUI.displayBooks();