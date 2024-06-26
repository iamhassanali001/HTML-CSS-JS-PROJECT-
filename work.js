document.addEventListener("DOMContentLoaded", () => {
    const bookTableBody = document.getElementById('book-table-body');
    const publishersTableBody = document.getElementById('publishers-table-body');
    const authorsTableBody = document.getElementById('authors-table-body');

    const books = [
        { id: 1, name: 'Harry Potter', author: 'J.K. Rowling', publisher: 'Bloomsbury Publishing', date: '1997-06-26' },
        { id: 2, name: 'Harry Potter and the Chamber of Secrets', author: 'J.K. Rowling', publisher: 'Bloomsbury Publishing', date: '1998-06-02' },
        { id: 3, name: 'Frankenstein', author: 'Mary Shelly', publisher: 'London Publishers', date: '1908-04-05' },
        { id: 4, name: 'Learning Python', author: 'Mark Lutz', publisher: 'O\'Reilly', date: '2013-01-04' }
    ];

    function renderBooks() {
        bookTableBody.innerHTML = '';
        books.forEach(book => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.id}</td>
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td>${book.publisher}</td>
                <td>${book.date}</td>
                <td>
                    <button class="update" onclick="showUpdateForm(${book.id})">Update</button>
                    <button onclick="deleteBook(${book.id})">Delete</button>
                </td>
            `;
            bookTableBody.appendChild(row);
        });
    }

    function renderPublishers() {
        const publisherCounts = {};
        books.forEach(book => {
            if (publisherCounts[book.publisher]) {
                publisherCounts[book.publisher]++;
            } else {
                publisherCounts[book.publisher] = 1;
            }
        });

        publishersTableBody.innerHTML = '';
        for (const publisher in publisherCounts) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${publisher}</td>
                <td>${publisherCounts[publisher]}</td>
                <td><button onclick="deletePublisher('${publisher}')">Delete</button></td>
            `;
            publishersTableBody.appendChild(row);
        }
    }

    function renderAuthors() {
        const authorCounts = {};
        books.forEach(book => {
            if (authorCounts[book.author]) {
                authorCounts[book.author]++;
            } else {
                authorCounts[book.author] = 1;
            }
        });

        authorsTableBody.innerHTML = '';
        for (const author in authorCounts) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${author}</td>
                <td>${authorCounts[author]}</td>
                <td><button onclick="deleteAuthor('${author}')">Delete</button></td>
            `;
            authorsTableBody.appendChild(row);
        }
    }

    window.showSection = function (sectionId) {
        document.querySelectorAll('section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
        if (sectionId === 'publishers-list') {
            renderPublishers();
        } else if (sectionId === 'authors-list') {
            renderAuthors();
        } else if (sectionId === 'book-list') {
            renderBooks();
        }
    }

    window.deleteBook = function (id) {
        const index = books.findIndex(book => book.id === id);
        if (index !== -1) {
            books.splice(index, 1);
            renderBooks();
        }
    }

    window.deletePublisher = function (publisher) {
        for (let i = books.length - 1; i >= 0; i--) {
            if (books[i].publisher === publisher) {
                books.splice(i, 1);
            }
        }
        renderBooks();
        renderPublishers();
    }

    window.deleteAuthor = function (author) {
        for (let i = books.length - 1; i >= 0; i--) {
            if (books[i].author === author) {
                books.splice(i, 1);
            }
        }
        renderBooks();
        renderAuthors();
    }

    window.showUpdateForm = function (id) {
        const book = books.find(book => book.id === id);
        if (book) {
            document.getElementById('update-book-name').value = book.name;
            document.getElementById('update-author-name').value = book.author;
            document.getElementById('update-publisher-name').value = book.publisher;
            document.getElementById('update-publication-date').value = book.date;
            showSection('update-book');

            document.getElementById('update-book-form').onsubmit = function (event) {
                event.preventDefault();
                book.name = document.getElementById('update-book-name').value;
                book.author = document.getElementById('update-author-name').value;
                book.publisher = document.getElementById('update-publisher-name').value;
                book.date = document.getElementById('update-publication-date').value;
                renderBooks();
                showSection('book-list');
            };
        }
    }

    document.getElementById('add-book-form').onsubmit = function (event) {
        event.preventDefault();
        const newBook = {
            id: books.length + 1,
            name: document.getElementById('book-name').value,
            author: document.getElementById('author-name').value,
            publisher: document.getElementById('publisher-name').value,
            date: document.getElementById('publication-date').value
        };
        books.push(newBook);
        renderBooks();
        showSection('book-list');
    };

    renderBooks();
});

// Dark Mode
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-theme-button');
    const body = document.body;

    // Function to toggle dark mode
    function toggleDarkMode() {
        body.classList.toggle('dark-mode');
        const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    }

    // Function to load saved theme from local storage
    function loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
        }
    }

    // Load theme on page load
    loadTheme();

    // Toggle dark mode on button click
    toggleButton.addEventListener('click', toggleDarkMode);
});
