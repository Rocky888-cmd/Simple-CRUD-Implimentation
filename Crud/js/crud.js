// js/crud.js
import { db } from "./firebaseConfig.js";
import {
  ref,
  push,
  onValue,
  set,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// References
const input = document.getElementById("textInput");
const btnAdd = document.getElementById("btnAdd");
const cardList = document.getElementById("cardList");

// Database parent node
const dataRef = ref(db, "simpleCRUD");

// CREATE
btnAdd.addEventListener("click", () => {
  let text = input.value.trim();
  if (text === "") return alert("Input is empty!");

  push(dataRef, { text: text })
    .then(() => input.value = "")
    .catch(err => console.log(err));
});

// READ (Adapter-like rendering)
onValue(dataRef, snapshot => {
  cardList.innerHTML = ""; // clear

  snapshot.forEach(child => {
    let id = child.key;
    let item = child.val();

    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="text">${item.text}</div>
      <div class="card-actions">
        <button onclick="editItem('${id}', '${item.text}')">Edit</button>
        <button onclick="deleteItem('${id}')">Delete</button>
      </div>
    `;

    cardList.appendChild(card);
  });
});

// UPDATE
window.editItem = function(id, oldText) {
  let newText = prompt("Edit text:", oldText);
  if (newText === null || newText.trim() === "") return;

  update(ref(db, "simpleCRUD/" + id), { text: newText });
};

// DELETE
window.deleteItem = function(id) {
  if (confirm("Delete this item?")) {
    remove(ref(db, "simpleCRUD/" + id));
  }
};
