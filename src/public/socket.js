const socket = io()


/**
 * Save a new note
 * @param {string} title note title
 * @param {string} description note description
 */
const saveNotes = (title, description) => {
    socket.emit(`client:newNote`, {
        title,
        description
    })
}

socket.on(`server:renderNotes`, añadirNota)

socket.on(`server:loadNotes`, render_notes)

socket.on(`server:noteToUpdate`, (data) => {
    const title = document.querySelector("#title")
    const description = document.querySelector("#description")

    title.value = data.title
    description.value = data.description

    noteIDS = data._id
})

const deletenote = (id) => {
    socket.emit("client:deletenote", id)
}
const toUpdate = (id) => {
    socket.emit("client:toUpdate", id)
}
const toUpdateDone = (id) => {
    socket.emit("client:toUpdateDone", id)
}
const updateNotes = (id, title, description) => {
    socket.emit("client:updatenote", { id, title, description })
}