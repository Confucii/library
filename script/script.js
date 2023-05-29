/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  limit,
  orderBy,
  query,
  deleteDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBVfoOgAoF0KN40GXXVU6BfjKV1zgbcm38",
  authDomain: "librayr-3da52.firebaseapp.com",
  projectId: "librayr-3da52",
  storageBucket: "librayr-3da52.appspot.com",
  messagingSenderId: "378448502173",
  appId: "1:378448502173:web:c6626f5d3a9947596b2374",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const booksCol = collection(db, "books");

const newBook = document.querySelector(".new-book");
const formSelector = document.querySelector(".form-book");
const inputSelector = document.querySelectorAll(
  'input[type="text"], input[type="tel"]'
);
const selectSelector = document.querySelector("select");

class Book {
  constructor(title, author, volume, status) {
    this.title = title;
    this.author = author;
    this.volume = volume;
    this.status = status;
  }
}

async function addBookToLibrary(book) {
  await addDoc(booksCol, {
    title: book.title,
    author: book.author,
    volume: book.volume,
    status: book.status,
    timestamp: serverTimestamp(),
  });
}

function displayBook(bookCard, book) {
  const bookTitle = document.createElement("p");
  const titleContent = document.createTextNode(`Title: ${book.title}`);
  bookTitle.appendChild(titleContent);

  const bookAuthor = document.createElement("p");
  const authorContent = document.createTextNode(`Author: ${book.author}`);
  bookAuthor.appendChild(authorContent);

  const bookVolume = document.createElement("p");
  const volumeContent = document.createTextNode(`Volume: ${book.volume}`);
  bookVolume.appendChild(volumeContent);

  const bookStatus = document.createElement("p");
  const statusContent = document.createTextNode(`Status: ${book.status}`);
  bookStatus.appendChild(statusContent);

  bookCard.appendChild(bookTitle);
  bookCard.appendChild(bookAuthor);
  bookCard.appendChild(bookVolume);
  bookCard.appendChild(bookStatus);
}

async function displayBooks() {
  const booksQuery = query(booksCol, orderBy("timestamp", "desc"), limit(7));
  const booksDocs = await getDocs(booksQuery);
  const books = booksDocs.docs.map((document) => [
    document.id,
    document.data(),
  ]);
  const bookCardHolder = document.querySelector(".card-holder");

  while (bookCardHolder.firstChild) {
    bookCardHolder.removeChild(bookCardHolder.firstChild);
  }

  books.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("card-book");

    displayBook(bookCard, book[1]);

    const statusBtn = document.createElement("input");
    statusBtn.value = "Change status";
    statusBtn.type = "button";
    statusBtn.classList.add("change-btn");
    statusBtn.addEventListener("click", async () => {
      if (book[1].status === "read") {
        await updateDoc(doc(db, "books", book[0]), {
          status: "not read",
        });
      } else {
        await updateDoc(doc(db, "books", book[0]), {
          status: "read",
        });
      }
      displayBooks();
    });

    const deleteBtn = document.createElement("input");
    deleteBtn.value = "Delete";
    deleteBtn.type = "button";
    deleteBtn.classList.add("del-btn");
    deleteBtn.addEventListener("click", async () => {
      await deleteDoc(doc(db, "books", book[0]));
      displayBooks();
    });

    bookCard.appendChild(statusBtn);
    bookCard.appendChild(deleteBtn);
    bookCardHolder.appendChild(bookCard);
  });
}

function clearForm() {
  inputSelector.forEach((input) => {
    const inputElem = input;
    inputElem.value = "";
  });
  selectSelector.selectedIndex = 0;
}

newBook.addEventListener("click", () => {
  formSelector.classList.toggle("invisible");
  if (!formSelector.classList.contains("invisible")) {
    newBook.value = "Cancel";
  } else {
    newBook.value = "New Book";
    clearForm();
  }
});

formSelector.addEventListener("submit", (e) => {
  const values = [];
  e.preventDefault();
  inputSelector.forEach((input) => {
    values.push(input.value);
  });
  values.push(selectSelector.options[selectSelector.selectedIndex].textContent);
  values[2] += " pages";
  addBookToLibrary(new Book(values[0], values[1], values[2], values[3]));
  clearForm();
  displayBooks();
});

displayBooks();
