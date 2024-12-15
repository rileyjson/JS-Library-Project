const myLibrary = [];
const bookDisplay = document.querySelector(".book-display");

function Book(title, author, numOfPages, readStatus, bookId) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.readStatus = readStatus;
  this.bookId = bookId;
}

function addBookToLibrary(title, author, numOfPages, readStatus, bookId) {
  let book = new Book(title, author, numOfPages, readStatus, bookId);

  myLibrary.push(book);
}

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + span");
const closeButton = document.querySelector("dialog button");
const submitButton = document.querySelector(".book-form .form-submit");

const userTitle = document.querySelector("#name");
const userAuthor = document.querySelector("#author");
const userPages = document.querySelector("#pages");

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  const newDiv = document.createElement("div");
  const buttonDiv = document.createElement("div");
  const submitForm = document.querySelector(".add-book-form");
  newDiv.style.cssText = "display: flex; flex-direction: column; gap:10px;";
  newDiv.className = `card ${myLibrary.length}`; //adds index to each cards class name
  buttonDiv.className = "button-container";
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");
  const p4 = document.createElement("p");
  const readButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  readButton.className = `read-button`;
  deleteButton.className = `delete-button`;
  newDiv.dataset.bookIndex = myLibrary.length;

  buttonDiv.appendChild(deleteButton);
  buttonDiv.appendChild(readButton);

  addBookToLibrary(
    userTitle.value,
    userAuthor.value,
    userPages.value,
    "Not Read",
    myLibrary.length
  );

  for (let i in myLibrary) {
    p1.textContent = `Title: ${myLibrary[i].title}`;
    p2.textContent = `Author: ${myLibrary[i].author}`;
    p3.textContent = `Pages: ${myLibrary[i].numOfPages}`;
    p4.textContent = `Status: ${myLibrary[i].readStatus}`;
    readButton.textContent = "Read";
    deleteButton.textContent = "Delete";

    newDiv.appendChild(p1);
    newDiv.appendChild(p2);
    newDiv.appendChild(p3);
    newDiv.appendChild(p4);
    newDiv.appendChild(buttonDiv);
    console.log(newDiv);

    bookDisplay.appendChild(newDiv);
  }

  deleteButton.addEventListener("click", () => {
    //click listener to delete book
    const bookI = newDiv.dataset.bookIndex; //gets book index of the book you're clicking
    const bookIndexInt = parseInt(bookI);

    const divToRemove = document.querySelector(`[data-book-index="${bookI}"]`); //removes that card from DOM
    if (divToRemove) {
      divToRemove.remove();
      myLibrary.splice(bookIndexInt, 1); //also removes from array
    } else {
      console.log("Error");
    }
  });
  readButton.addEventListener("click", () => {
    const bookI = newDiv.dataset.bookIndex;
    const bookIndexInt = parseInt(bookI);
    const ele = myLibrary[bookIndexInt];

    ele.readStatus = "Read"; //change both array and on page status to read
    p4.textContent = "Status: Read";
  });

  dialog.close();
  submitForm.reset(); //resets values in form
});

//open and closes add book modal
showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});
