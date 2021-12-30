"use strict";

var notesList = document.querySelector("#notes");
var noteIDS = "";

var noteUI = function noteUI(nota) {
  var div = document.createElement("div");
  div.innerHTML += "\n    <div class=\"card card-body rounded-0 mb-2 animate__animated animate__backInUp ".concat(nota.completed, "\">\n        <div class=\"d-flex justify-content-between\">\n            <h1 class=\"h3 card-title\">").concat(nota.title, "</h1>\n            <div>\n            <button class=\"btn btn-danger delete\" data-id=\"").concat(nota._id, "\">Eliminar</button>\n            <button class=\"btn btn-secondary update\" data-id=\"").concat(nota._id, "\">Actualizar Tarea</button>\n            </div>\n        </div>\n        <div class=\"d-flex justify-content-between\">\n            <p>").concat(nota.description, "</p>\n            <button class=\"btn btn-secondary done\" data-id=\"").concat(nota._id, "\">Hecho</button>\n        </div>\n        \n    </div>\n    ");
  var btnDelete = div.querySelector(".delete");
  var btnUpdate = div.querySelector(".update");
  var btnDone = div.querySelector(".done");
  btnDelete.addEventListener("click", function () {
    deletenote(btnDelete.dataset.id);
  });
  btnUpdate.addEventListener("click", function () {
    toUpdate(btnUpdate.dataset.id);
  });
  btnDone.addEventListener("click", function () {
    toUpdateDone(btnDone.dataset.id);
  });
  return div;
};

var render_notes = function render_notes(notes) {
  console.log(notes);
  notesList.innerHTML = "";
  notes.map(function (u) {
    notesList.append(noteUI(u));
  });
};

var añadirNota = function añadirNota(note) {
  notesList.append(noteUI(note));
};