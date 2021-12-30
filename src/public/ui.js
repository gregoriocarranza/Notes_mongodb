const notesList = document.querySelector("#notes")

let noteIDS = ""


const noteUI = (nota) => {
    const div = document.createElement("div")
    div.innerHTML += `
    <div class="card card-body rounded-0 mb-2 animate__animated animate__backInUp ${nota.completed}">
        <div class="d-flex justify-content-between">
            <h1 class="h3 card-title">${nota.title}</h1>
            <div>
            <button class="btn btn-danger delete" data-id="${nota._id}">Eliminar</button>
            <button class="btn btn-secondary update" data-id="${nota._id}">Actualizar Tarea</button>
            </div>
        </div>
        <div class="d-flex justify-content-between">
            <p>${nota.description}</p>
            <button class="btn btn-secondary done" data-id="${nota._id}">Hecho</button>
        </div>
        
    </div>
    `
    const btnDelete = div.querySelector(".delete")
    const btnUpdate = div.querySelector(".update")
    const btnDone = div.querySelector(".done")


    btnDelete.addEventListener("click", () => {

        deletenote(btnDelete.dataset.id)
    })
    btnUpdate.addEventListener("click", () => {
        toUpdate(btnUpdate.dataset.id)
    })
    btnDone.addEventListener("click", () => {
        toUpdateDone(btnDone.dataset.id)
    })
    return div
}
const render_notes = (notes) => {

    notesList.innerHTML = ""
    notes.map((u) => {
        notesList.append(noteUI(u))
    })
}

const añadirNota = (note) => {

    notesList.append(noteUI(note))

}