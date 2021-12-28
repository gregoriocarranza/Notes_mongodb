"use strict";

var noteForm = document.querySelector("#noteForm");
var title = document.querySelector("#title");
var description = document.querySelector("#description");
noteForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (noteIDS) {
    updateNotes(noteIDS, title.value, description.value);
    noteIDS = "";
  } else {
    saveNotes(title.value, description.value);
  }

  title.value = "";
  description.value = "";
  title.focus();
});