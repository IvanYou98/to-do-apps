import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import UserRouter from "./routes/user.js"
import TodoRouter from "./routes/todo.js"

const app = express();
app.use(bodyParser.json());
app.use('/user', UserRouter)
app.use('/todos', TodoRouter)

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todoapp', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Failed to connect to MongoDB:', error));




app.listen(3000, () => {
    console.log('Server started on port 3000');
});
