import express from "express"
import { Server as WebSocketServer } from "socket.io"
import http from "http"
// import { v4 as uuid } from 'uuid';
import mongoose from "mongoose"
import TaskModel from "./models/TaskModel"


const app = express()
const server = http.createServer(app)
const io = new WebSocketServer(server)

app.use(express.static(__dirname + "/public"))

const MongoUrl = "mongodb://user:user123@database-0-shard-00-00.vgtwg.mongodb.net:27017,database-0-shard-00-01.vgtwg.mongodb.net:27017,database-0-shard-00-02.vgtwg.mongodb.net:27017/Notes_flia?ssl=true&replicaSet=atlas-uit0wk-shard-0&authSource=admin&retryWrites=true&w=majority"
const PORT = process.env.PORT || 3000
app.get("/", (req, res) => {
    console.log(`Hola`)
    res.send("Hola user")
})

io.on("connection", (socket) => {
    console.log("Nueva Coneccion: ", socket.id)

    TaskModel.find({}, "title description completed date").then(docs => {
        socket.emit(`server:loadNotes`, docs)
    })
        .catch((err) => {
            console.log("Error al consultar elementos", err.message)
        })


    const loadNotes = () => {
        TaskModel.find({}, "title description completed date").then(docs => {
            io.emit(`server:loadNotes`, docs)
        })
            .catch((err) => {
                console.log("Error al consultar elementos", err.message)
            })
    }




    socket.on(`client:newNote`, newNote => {

        const toDo = new TaskModel({ title: newNote.title, description: newNote.description, completed: false, date: new Date() })
        toDo.save().then(doc => {
            console.log("Dato insertado correctamente", doc)
            console.log(doc._id)
            io.emit(`server:renderNotes`, doc)

        }).catch(err => {
            console.log("Error al insertar en database", err.message)
        })



    })

    socket.on(`client:deletenote`, id => {
        console.log(`Borrando nota con el id: ${id}`)

        TaskModel.findByIdAndDelete({ _id: id })
            .then(doc => {
                loadNotes()
            })
            .catch((err) => {
                console.log("Error al eliminar elementos", err.message)

            })


    })

    socket.on(`client:toUpdate`, id => {

        TaskModel.findOne({ _id: id }, (err, existe) => {
            socket.emit(`server:noteToUpdate`, existe)
        })

    })

    socket.on(`client:toUpdateDone`, id => {
        console.log(`Actualizando nota con el id: ${id}`)

        TaskModel.findByIdAndUpdate({ _id: id }, { $set: { completed: true } })
            .then(doc => {
                loadNotes()
            })
            .catch((err) => {
                console.log("Error al actualizar elementos", err.message)

            })



    })

    socket.on(`client:updatenote`, updtnote => {
        console.log(`Actualizando nota con el id: ${updtnote.id}`)

        TaskModel.findByIdAndUpdate({ _id: updtnote.id }, { $set: { title: updtnote.title, description: updtnote.description } })
            .then(doc => {
                loadNotes()
            })
            .catch((err) => {
                console.log("Error al actualizar elementos", err.message)

            })
    })

    socket.on("disconnect", () => {
        console.log(socket.id, "se desconecto")
    })
})


mongoose.connect(MongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
const connection = mongoose.connection
connection.once("open", () => {
    console.log("Conexion a la base de datos exitosa")
})
connection.on("Error", (err) => {
    console.log("Conexion sin exito, Error:", err.message)
})


server.listen(PORT, () => {
    console.log(`Server Listen in Port ${PORT}`)
})




// // Firebase

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//     apiKey: "AIzaSyBzGOdIkWjteWCgIKQ1_Uysu8dg2Amw5xw",
//     authDomain: "notes-6c66b.firebaseapp.com",
//     projectId: "notes-6c66b",
//     storageBucket: "notes-6c66b.appspot.com",
//     messagingSenderId: "221037460405",
//     appId: "1:221037460405:web:6683e3f3e5b6dda995f7fc",
//     measurementId: "G-5EJ4D2WMF5"
// };

// // Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);