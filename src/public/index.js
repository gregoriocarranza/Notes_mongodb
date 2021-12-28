

const noteForm = document.querySelector("#noteForm")
const title = document.querySelector("#title")
const description = document.querySelector("#description")



noteForm.addEventListener("submit", (e) => {
    e.preventDefault()

    if (noteIDS) {
        updateNotes(noteIDS, title.value, description.value)
        noteIDS = ""
    } else {
        saveNotes(title.value, description.value)
    }
    title.value = ""
    description.value = ""
    title.focus()
})