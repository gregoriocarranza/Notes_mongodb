"use strict";

var _express = _interopRequireDefault(require("express"));

var _socket = require("socket.io");

var _http = _interopRequireDefault(require("http"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _TaskModel = _interopRequireDefault(require("./models/TaskModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import { v4 as uuid } from 'uuid';
var app = (0, _express["default"])();

var server = _http["default"].createServer(app);

var io = new _socket.Server(server);
app.use(_express["default"]["static"](__dirname + "/public"));
var MongoUrl = "mongodb://user:user123@database-0-shard-00-00.vgtwg.mongodb.net:27017,database-0-shard-00-01.vgtwg.mongodb.net:27017,database-0-shard-00-02.vgtwg.mongodb.net:27017/Notes_flia?ssl=true&replicaSet=atlas-uit0wk-shard-0&authSource=admin&retryWrites=true&w=majority";
var PORT = process.env.PORT || 3000;
app.get("/", function (req, res) {
  console.log("Hola");
  res.send("Hola user");
});
io.on("connection", function (socket) {
  console.log("Nueva Coneccion: ", socket.id);

  _TaskModel["default"].find({}, "title description completed date").then(function (docs) {
    socket.emit("server:loadNotes", docs);
  })["catch"](function (err) {
    console.log("Error al consultar elementos", err.message);
  });

  var loadNotes = function loadNotes() {
    _TaskModel["default"].find({}, "title description completed date").then(function (docs) {
      io.emit("server:loadNotes", docs);
    })["catch"](function (err) {
      console.log("Error al consultar elementos", err.message);
    });
  };

  socket.on("client:newNote", function (newNote) {
    var toDo = new _TaskModel["default"]({
      title: newNote.title,
      description: newNote.description,
      completed: false,
      date: new Date()
    });
    toDo.save().then(function (doc) {
      console.log("Dato insertado correctamente", doc);
      console.log(doc._id);
      io.emit("server:renderNotes", doc);
    })["catch"](function (err) {
      console.log("Error al insertar en database", err.message);
    });
  });
  socket.on("client:deletenote", function (id) {
    console.log("Borrando nota con el id: ".concat(id));

    _TaskModel["default"].findByIdAndDelete({
      _id: id
    }).then(function (doc) {
      loadNotes();
    })["catch"](function (err) {
      console.log("Error al eliminar elementos", err.message);
    });
  });
  socket.on("client:toUpdate", function (id) {
    _TaskModel["default"].findOne({
      _id: id
    }, function (err, existe) {
      socket.emit("server:noteToUpdate", existe);
    });
  });
  socket.on("client:toUpdateDone", function (id) {
    console.log("Actualizando nota con el id: ".concat(id));

    _TaskModel["default"].findByIdAndUpdate({
      _id: id
    }, {
      $set: {
        completed: true
      }
    }).then(function (doc) {
      loadNotes();
    })["catch"](function (err) {
      console.log("Error al actualizar elementos", err.message);
    });
  });
  socket.on("client:updatenote", function (updtnote) {
    console.log("Actualizando nota con el id: ".concat(updtnote.id));

    _TaskModel["default"].findByIdAndUpdate({
      _id: updtnote.id
    }, {
      $set: {
        title: updtnote.title,
        description: updtnote.description
      }
    }).then(function (doc) {
      loadNotes();
    })["catch"](function (err) {
      console.log("Error al actualizar elementos", err.message);
    });
  });
  socket.on("disconnect", function () {
    console.log(socket.id, "se desconecto");
  });
});

_mongoose["default"].connect(MongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var connection = _mongoose["default"].connection;
connection.once("open", function () {
  console.log("Conexion a la base de datos exitosa");
});
connection.on("Error", function (err) {
  console.log("Conexion sin exito, Error:", err.message);
});
server.listen(PORT, function () {
  console.log("Server Listen in Port ".concat(PORT));
}); // // Firebase
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