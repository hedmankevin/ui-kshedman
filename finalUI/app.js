import { db, auth } from "./firebase-config.js";
import {
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/9.19.0/firebase-firestore.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.19.0/firebase-auth.js";

// Form Elements
const addItemForm = document.getElementById("add-item-form");
let submitBtn = document.getElementById("submit-btn");
const formTitle = document.getElementById("form-title");
const refreshBtn = document.getElementById("refresh-btn");
const searchContainer = document.querySelector(".search-container");
const searchNameDescriptionInput = document.getElementById("search-name-description");
const searchWeightInput = document.getElementById("search-weight");
const searchBtn = document.getElementById("search-btn");

// Authentication Elements
const signUpForm = document.getElementById("sign-up-form");
const loginForm = document.getElementById("login-form");
const logoutBtn = document.getElementById("logout-btn");
const signupBtn = document.getElementById("signup-btn");
const loginBtn = document.getElementById("login-btn");

// Inventory Display
const inventoryList = document.getElementById("inventory-list");

// State
let user = null;
let inventoryItems = [];
let editItemId = null;
let cancelBtn = null;

// ----------------------
// Authentication
// ----------------------

signupBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    user = userCredential.user;
    showInventoryOnLogin();
  } catch (error) {
    alert(error.message);
  }
});

loginBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    user = userCredential.user;
    showInventoryOnLogin();
  } catch (error) {
    alert(error.message);
  }
});

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  user = null;
  showLoginPage();
});

onAuthStateChanged(auth, (currentUser) => {
  if (currentUser) {
    user = currentUser;
    showInventoryOnLogin();
  } else {
    user = null;
    showLoginPage();
  }
});

// ----------------------
// UI Control
// ----------------------

function showInventoryOnLogin() {
  loginForm.classList.add("hidden");
  signUpForm.classList.add("hidden");
  logoutBtn.classList.remove("hidden");
  addItemForm.classList.remove("hidden");
  searchContainer.classList.remove("hidden");
  inventoryList.classList.remove("hidden");

  fetchInventory();
}

function showLoginPage() {
  loginForm.classList.remove("hidden");
  signUpForm.classList.add("hidden");
  logoutBtn.classList.add("hidden");
  addItemForm.classList.add("hidden");
  searchContainer.classList.add("hidden");
  inventoryList.classList.add("hidden");

  inventoryItems = [];
  inventoryList.innerHTML = "";
}

// ----------------------
// Inventory
// ----------------------

addItemForm.addEventListener("submit", handleAdd);

async function handleAdd(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const price = parseFloat(document.getElementById("price").value);
  const quantity = parseInt(document.getElementById("quantity").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const imageUrl = document.getElementById("imageUrl").value;

  try {
    const docRef = await addDoc(collection(db, "items"), {
      name,
      description,
      price,
      quantity,
      weight,
      imageUrl
    });

    inventoryItems.push({
      id: docRef.id,
      name,
      description,
      price,
      quantity,
      weight,
      imageUrl
    });

    await renderInventory();
    addItemForm.reset();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function fetchInventory() {
  inventoryItems = [];
  inventoryList.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "items"));
  querySnapshot.forEach(docSnap => {
    const item = docSnap.data();
    inventoryItems.push({ ...item, id: docSnap.id });
  });

  await renderInventory();
}

async function renderInventory(items = inventoryItems) {
  inventoryList.innerHTML = "";

  items.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "inventory-card";
    itemDiv.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <p>Price: $${item.price}</p>
      <p>Quantity: ${item.quantity}</p>
      <p>Weight: ${item.weight} grams</p>
      <img src="${item.imageUrl}" alt="${item.name}">
      <div class="button-group">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    const editButton = itemDiv.querySelector(".edit-btn");
    const deleteButton = itemDiv.querySelector(".delete-btn");

    editButton.addEventListener("click", () => {
      enterEditMode(item.id, item);
    });

    deleteButton.addEventListener("click", async () => {
      await deleteDoc(doc(db, "items", item.id));
      inventoryItems = inventoryItems.filter(i => i.id !== item.id);
      await renderInventory();
    });

    inventoryList.appendChild(itemDiv);
  });
}

// ----------------------
// Edit Mode
// ----------------------

function enterEditMode(itemId, item) {
  formTitle.textContent = "Edit Item";
  submitBtn.textContent = "Update Item";

  document.getElementById("name").value = item.name;
  document.getElementById("description").value = item.description;
  document.getElementById("price").value = item.price;
  document.getElementById("quantity").value = item.quantity;
  document.getElementById("weight").value = item.weight;
  document.getElementById("imageUrl").value = item.imageUrl;

  editItemId = itemId;

  const newSubmitBtn = submitBtn.cloneNode(true);
  submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);
  submitBtn = newSubmitBtn;
  submitBtn.addEventListener("click", handleUpdate);

  if (!cancelBtn) {
    cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.type = "button";
    cancelBtn.style.marginLeft = "10px";
    addItemForm.appendChild(cancelBtn);
  }

  cancelBtn.style.display = "inline-block";
  cancelBtn.addEventListener("click", cancelEdit);
}

async function handleUpdate(event) {
  event.preventDefault();

  const updatedItem = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    price: parseFloat(document.getElementById("price").value),
    quantity: parseInt(document.getElementById("quantity").value),
    weight: parseFloat(document.getElementById("weight").value),
    imageUrl: document.getElementById("imageUrl").value
  };

  try {
    await updateDoc(doc(db, "items", editItemId), updatedItem);

    const index = inventoryItems.findIndex(item => item.id === editItemId);
    inventoryItems[index] = { ...updatedItem, id: editItemId };

    await renderInventory();
    cancelEdit();
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

function cancelEdit() {
  addItemForm.reset();
  formTitle.textContent = "Add New Item";
  submitBtn.textContent = "Add Item";
  editItemId = null;

  if (cancelBtn) cancelBtn.style.display = "none";

  const newSubmitBtn = submitBtn.cloneNode(true);
  submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);
  submitBtn = newSubmitBtn;
  submitBtn.addEventListener("click", handleAdd);
}

// ----------------------
// Search
// ----------------------

searchBtn.addEventListener("click", () => {
  const searchNameDescription = searchNameDescriptionInput.value.toLowerCase();
  const searchWeight = parseFloat(searchWeightInput.value);

  const filteredItems = inventoryItems.filter(item => {
    const nameMatch = item.name.toLowerCase().includes(searchNameDescription);
    const descriptionMatch = item.description.toLowerCase().includes(searchNameDescription);
    const weightMatch = isNaN(searchWeight) || (item.weight >= (searchWeight - 1) && item.weight <= (searchWeight + 1));

    return (nameMatch || descriptionMatch) && weightMatch;
  });

  renderInventory(filteredItems);
});

// ----------------------
// Refresh
// ----------------------

refreshBtn.addEventListener("click", async () => {
  await fetchInventory();
});