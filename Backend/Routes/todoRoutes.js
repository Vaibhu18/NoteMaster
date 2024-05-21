import express from "express";
import {
  createTodo,
  getTodosByUserId,
  getTodoByTodoId,
} from "../Controller/todoController.js";
export const todoRouter = express.Router();

todoRouter.post("/createTodo/:userId", createTodo);
todoRouter.get("/todos/:userId", getTodosByUserId); // multiple todos
todoRouter.get("/todo/:todoId", getTodoByTodoId); // single todo
