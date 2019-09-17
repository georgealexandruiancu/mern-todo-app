const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 4000;
const fileUpload = require("express-fileupload");

/**
 * ? access for express router
 */
const todoRoutes = express.Router();

/**
 * ? Todo model
 */
let Todo = require("./todo.model");

app.use(cors());
app.use(fileUpload());

/**
 *  ? Node.js body parsing middleware.
 */
app.use(bodyParser.json());

/** 
 * ! - connection for mongodb, running on localhost
 */
mongoose.connect("mongodb://127.0.0.1:27017/todos", {useNewUrlParser: true})
const connection = mongoose.connection;
connection.once('open', function(){
    console.log("Mongo db are successfully connected");
})

/**
 * ? ---------------------------
 * ? - get all todos in db
 * ? ---------------------------
 */
todoRoutes.route("/").get((req, res) => {
    Todo.find((err, todos) => {
        if(err){
            console.log(err);
        }else{
            res.json(todos);
        }
    })
})
/**
 * ? ---------------------------
 * ? - get todo by a specific id
 * ? ---------------------------
 */
todoRoutes.route("/:id").get((req, res) => {
    let id = req.params.id;
    Todo.findById(id, (err, todo) => {
        if(err){
            console.log("Todo with id: " + id + " cannot be found");
            res.send(404);
        }else{
            res.json(todo);
        }
    })
})
/**
 * ? ---------------------------
 * ? - Upload sys for files
 * ? ---------------------------
 */
todoRoutes.route("/upload").post((req, res) => {
    if(req.files === null){
        return res.status(400).json({msg: 'No file uploaded'});
    }

    const file = req.files.file;
    file.mv(`../public/uploads/${file.name}`, err => {
        if(err){
            console.error(err);
            return res.status(500).send(err);
        }
        res.json({fileName: file.name, filePath: `/uploads/${file.name}`});
    })
})
/**
 * ? ---------------------------
 * ? - Add a new todo
 * ? ---------------------------
 */
todoRoutes.route("/add").post((req, res) => {

    console.log(res.file);
    let todo = new Todo(req.body);

    todo.save().then(() => {
        res.status(200).json({'todo' : 'todo added successfully'});
    }).catch((err) => {
        res.status(400).send('failed to push a new todo');
    })
})
/**
 * ? ---------------------------
 * ? - Update an existent todo
 * ? ---------------------------
 */
todoRoutes.route("/update/:id").post((req, res) => {
    let id = req.params.id;
    Todo.findById(req.params.id, (err, todo) => {
        if(!todo){
            res.status(404).send("Data is not found");
        }else{
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;
            todo.todo_date = req.body.todo_date;
            todo.todo_hour = req.body.todo_hour;


            todo.save().then((todo) => {
                res.json('Todo updated');
            }).catch((err) =>{
                res.status(400).send("Update is impossible");
            })
        }
    })
})
/**
 * ? ---------------------------
 * ? - Delete an existent todo
 * ? ---------------------------
 */
todoRoutes.route("/delete/:id").delete((req, res) => {
    let id = req.params.id;
    Todo.findByIdAndRemove(id, (err, todo) => {
        if(todo){
            res.status(200).send("Data was deleted");
        }else{
            res.status(400).send("Delete is impossible");
        }

        if(err){
            res.send(err);
        }
    })
})

todoRoutes.route("/find-priority/:key").get((req, res) => {
    let key = req.params.key;

    Todo.find({ todo_priority: new RegExp(key, 'i')}, (err, todos) => {
        if(todos.length != 0){
            res.json(todos);
        }else{
            res.status(404).send("Nothing to find");
        }
        if(err){
            res.send(err);
        }
    })
})


app.use('/todos', todoRoutes);

app.listen(PORT, function () {
    console.log("Server are running on port: " + PORT);
})