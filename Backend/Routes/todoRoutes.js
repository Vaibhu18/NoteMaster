import express from "express";
import {
  createTodo,
  getTodosByUserId,
  getTodoByTodoId,
  updateTodoByTodoId,
  deleteTodoByTodoId,
} from "../Controller/todoController.js";
export const todoRouter = express.Router();

todoRouter.post("/api/createNote/:userId", createTodo);
todoRouter.get("/api/notes/:userId", getTodosByUserId); // multiple todos
todoRouter.get("/api/note/:noteId", getTodoByTodoId); // single todo
todoRouter.put("/api/update/note/:noteId", updateTodoByTodoId);
todoRouter.delete("/api/delete/note/:noteId", deleteTodoByTodoId);
