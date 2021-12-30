"use strict";

var socket = io();
/**
 * Save a new note
 * @param {string} title note title
 * @param {string} description note description
 */

var saveNotes = function saveNotes(title, description) {
  socket.emit("client:newNote", {
    title: title,
    description: description
  });
};

socket.on("server:renderNotes", añadirNota);
socket.on("server:loadNotes", render_notes);
socket.on("server:noteToUpdate", function (data) {
  var title = document.querySelector("#title");
  var description = document.querySelector("#description");
  title.value = data.title;
  description.value = data.description;
  noteIDS = data._id;
});

var deletenote = function deletenote(id) {
  socket.emit("client:deletenote", id);
};

var toUpdate = function toUpdate(id) {
  socket.emit("client:toUpdate", id);
};

var toUpdateDone = function toUpdateDone(id) {
  socket.emit("client:toUpdateDone", id);
};

var updateNotes = function updateNotes(id, title, description) {
  socket.emit("client:updatenote", {
    id: id,
    title: title,
    description: description
  });
};