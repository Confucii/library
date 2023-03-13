const bookCardHolder = document.querySelector(".card-holder");

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks() {
  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("card-book");
    Object.values(book).forEach((bookAttribute) => {
      const bookProperty = document.createElement("p");
      const propertyContent = document.createTextNode(bookAttribute);
      bookProperty.appendChild(propertyContent);
      bookCard.appendChild(bookProperty);
    });
    bookCardHolder.appendChild(bookCard);
  });
}

const hobbit = new Book("Hobbit", "J.R.R. Tolkien", 295, "not read yet");
const catcherInTheRye = new Book(
  "The Catcher in the Rye",
  "J.D. Salinger",
  277,
  "not read yet"
);
const toKillAMockingbird = new Book(
  "To Kill a Mockingbird",
  "Harper Lee",
  281,
  "not read yet"
);
const nineteenEightyFour = new Book(
  "1984",
  "George Orwell",
  328,
  "not read yet"
);
const prideAndPrejudice = new Book(
  "Pride and Prejudice",
  "Jane Austen",
  279,
  "not read yet"
);
const theGreatGatsby = new Book(
  "The Great Gatsby",
  "F. Scott Fitzgerald",
  180,
  "not read yet"
);

addBookToLibrary(hobbit);
addBookToLibrary(catcherInTheRye);
addBookToLibrary(toKillAMockingbird);
addBookToLibrary(nineteenEightyFour);
addBookToLibrary(prideAndPrejudice);
addBookToLibrary(theGreatGatsby);

displayBooks();
