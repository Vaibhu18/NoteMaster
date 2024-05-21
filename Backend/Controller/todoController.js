import { todoModel } from "../Models/todoModel.js";
import { userModel } from "../Models/userModel.js";

export const createTodo = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { title, description } = req.body;

    if (userId.length > 24 || userId.length < 24)
      return res.status(400).send("invalid userId in params");

    if (!title || !description)
      return res.status(400).send("incomplete input fields");

    const userExist = await userModel.findById(userId);
    if (!userExist) return res.status(404).send("user not exist");

    const createdTodo = new todoModel(req.body);
    createdTodo.writer = userExist._id.toString();
    userExist.todos.push(createdTodo._id.toString());
    await userExist.save();
    await createdTodo.save();
    return res.status(200).send("todo created successfully");
  } catch (error) {
    return res.status(500).send("internal server error");
  }
};

export const getTodosByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (userId.length > 24 || userId.length < 24)
      return res.status(400).send("invalid userId in params");

    const userExist = await userModel.findById(userId);
    if (!userExist) return res.status(404).send("user not exist");

    const todosExist = await todoModel.find({ writer: userId });
    if (todosExist.length == 0) return res.status(404).send("todos not exits");

    return res.status(200).send(todosExist);
  } catch (error) {
    return res.status(500).send("internal server error");
  }
};

export const getTodoByTodoId = async (req, res) => {
  const todoId = req.params.todoId;
  if (todoId.length > 24 || todoId.length < 24)
    return res.status(400).send("invalid todoId in params");

  const todoExist = await todoModel.findById(todoId);
  if (!todoExist) return res.status(404).send("todo not exist");
  return res.status(200).send(todoExist);
};
