// js/db.js
import { db } from "./firebase.js";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  enableIndexedDbPersistence,
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
import { renderRecipe, removeRecipe } from "./ui.js";

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === "failed-precondition") {
    console.log("Persistence failed: multiple tabs open");
  } else if (err.code === "unimplemented") {
    console.log("Persistence not available in this browser");
  }
});

// reference to collection (⚠️ fix typo: "receipes" → "recipes")
const recipesRef = collection(db, "receipes");

// real-time listener
onSnapshot(recipesRef, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      renderRecipe(change.doc.data(), change.doc.id);
    }
    if (change.type === "removed") {
      removeRecipe(change.doc.id);
    }
  });
});

// add new recipe
const form = document.querySelector("form");
form.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  const recipe = {
    title: form.title.value,
    ingredients: form.ingredients.value,
  };

  try {
    await addDoc(recipesRef, recipe);
    console.log("Recipe added!");
    form.reset();
    M.updateTextFields(); //

    // close the sidenav
    const sidenavInstance = M.Sidenav.getInstance(
      document.getElementById("side-form")
    );
    sidenavInstance.close();
  } catch (err) {
    console.error("Error adding recipe:", err);
  }
});

// remove a recipe
const recipeContainer = document.querySelector(".recipes");
recipeContainer.addEventListener("click", async (evt) => {
  if (evt.target.tagName === "I") {
    const id = evt.target.getAttribute("data-id");
    try {
      await deleteDoc(doc(db, "receipes", id));
      console.log("Recipe deleted!");
    } catch (err) {
      console.error("Error deleting recipe:", err);
    }
  }
});
