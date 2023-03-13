const myLibrary = [];

function Book(title, author, volume, status) {
  this.title = title;
  this.author = author;
  this.volume = volume;
  this.status = status;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks() {
  const bookCardHolder = document.querySelector(".card-holder");
  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("card-book");
    Object.entries(book).forEach(([bookProperty, bookAttribute]) => {
      const bookPropertyCapitilized =
        bookProperty.charAt(0).toUpperCase() + bookProperty.slice(1);
      const bookPropertyText = document.createElement("p");
      const propertyContent = document.createTextNode(
        `${bookPropertyCapitilized}: ${bookAttribute}`
      );
      bookPropertyText.appendChild(propertyContent);
      bookCard.appendChild(bookPropertyText);
    });
    bookCardHolder.appendChild(bookCard);
  });
}

const hobbit = new Book("Hobbit", "J.R.R. Tolkien", "295 pages", "not read");
const catcherInTheRye = new Book(
  "The Catcher in the Rye",
  "J.D. Salinger",
  "277 pages",
  "not read"
);
const toKillAMockingbird = new Book(
  "To Kill a Mockingbird",
  "Harper Lee",
  "281 pages",
  "not read"
);
const nineteenEightyFour = new Book(
  "1984",
  "George Orwell",
  "328 pages",
  "not read"
);
const prideAndPrejudice = new Book(
  "Pride and Prejudice",
  "Jane Austen",
  "279 pages",
  "not read"
);
const theGreatGatsby = new Book(
  "The Great Gatsby",
  "F. Scott Fitzgerald",
  "180 pages",
  "not read"
);

addBookToLibrary(hobbit);
addBookToLibrary(catcherInTheRye);
addBookToLibrary(toKillAMockingbird);
addBookToLibrary(nineteenEightyFour);
addBookToLibrary(prideAndPrejudice);
addBookToLibrary(theGreatGatsby);

displayBooks();
