import express from "express";
import {
  createTodo,
  getTodosByUserId,
  getTodoByTodoId,
  updateTodoByTodoId,
  deleteTodoByTodoId,
} from "../Controller/todoController.js";
export const todoRouter = express.Router();

todoRouter.post("/createTodo/:userId", createTodo);
todoRouter.get("/todos/:userId", getTodosByUserId); // multiple todos
todoRouter.get("/todo/:todoId", getTodoByTodoId); // single todo
todoRouter.put("/update/todo/:todoId", updateTodoByTodoId);
todoRouter.delete("/delete/todo/:todoId", deleteTodoByTodoId);
