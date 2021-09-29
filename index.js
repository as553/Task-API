const express = require('express');
const { isSchema } = require('joi');
const app = express();
//const utils = require('./utils/task-schema.js');
const{taskSchema} = require('./utils/task-schema');
app.use(express.json());

const tasks = [
    {
        id : 1,
        name : "Tasks 1",
        completed : false
    },
    {
        id : 2,
        name : "Tasks 2",
        completed : false
    },
    {
        id : 3,
        name : "Tasks 3",
        completed : true
    }
];

//GET
app.get("/api/tasks", (req,res) => {
     res.send(tasks);
});

//GET (BY ID)
app.get("/api/tasks/:id", (req,res) => {
    const taskId = req.params.id;
    const task = tasks.find(task => task.id === parseInt(taskId));
    if(!task){
        return res.status(404).send("The task with the provided ID does not exist");
    }
    res.send(task);
});
//POST

app.post("/api/tasks", (req,res) => {
    const { error,value } = taskSchema.validate(req.body);
    if(error) return res.status(400).send("The name should be atleast 3 chars long");
     
    const task = {
        id: tasks.length + 1,
        name: req.body.name,
        completed: req.body.completed
    };
    tasks.push(task);
    res.send(tasks);
});
//PUT

app.put("/api/tasks/:id", (req,res) => {
    const taskId = req.params.id;
    const task = tasks.find(task => task.id === parseInt(taskId));
    if(!task){
        return res.status(404).send("The task with the provided ID does not exist");
    }
    // const {error} = utils.validateTask(req.body);
    const { error,value } = taskSchema.validate(req.body);
    if(error){
        return res.status(400).send("The name should be atleast 3 chars");
    }
    task.name = req.body.name;
    task.completed = req.body.completed;
    res.send(task);
});

//DELETE
app.delete("/api/tasks/:id", (req,res) => {
    const taskId = req.params.id;
    const task = tasks.find(task => task.id === parseInt(taskId));
    if(!task){
        return res.status(404).send("The task with the provided ID does not exist");
    }
    const index = tasks.indexOf(task);
    tasks.splice(index, 1);
    res.send(task);
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log (`Listening on port ${port}...`));