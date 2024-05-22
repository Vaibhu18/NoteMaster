import express from "express";
import {
  createTodo,
  getTodosByUserId,
  getTodoByTodoId,
  updateTodoByTodoId,
  deleteTodoByTodoId,
} from "../Controller/todoController.js";
export const todoRouter = express.Router();

todoRouter.post("/api/createTodo/:userId", createTodo);
todoRouter.get("/api/todos/:userId", getTodosByUserId); // multiple todos
todoRouter.get("/api/todo/:todoId", getTodoByTodoId); // single todo
todoRouter.put("/api/update/todo/:todoId", updateTodoByTodoId);
todoRouter.delete("/api/delete/todo/:todoId", deleteTodoByTodoId);
