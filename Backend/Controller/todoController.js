import { todoModel } from "../Models/todoModel.js";
import { userModel } from "../Models/userModel.js";

export const createTodo = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { title, description } = req.body;

    if (userId.length !== 24) {
      return res.status(400).json({ error: "Invalid userId in params" });
    }

    if (!title || !description)
      return res.status(400).json({ error: "Incomplete input fields" });

    const userExist = await userModel.findById(userId);
    if (!userExist)
      return res.status(404).json({ error: "User does not exist" });

    const createdTodo = new todoModel(req.body);
    createdTodo.writer = userExist._id.toString();
    userExist.todos.push(createdTodo._id.toString());

    await userExist.save();
    await createdTodo.save();

    return res
      .status(200)
      .json({ message: "Todo created successfully", todo: createdTodo });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

// get list of todos
export const getTodosByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (userId.length !== 24)
      return res.status(400).json({ error: "Invalid userId in params" });

    const userExist = await userModel.findById(userId);
    if (!userExist)
      return res.status(404).json({ error: "User does not exist" });

    const todosExist = await todoModel.find({ writer: userId });
    if (todosExist.length === 0)
      return res.status(404).json({ error: "No todos found" });

    return res.status(200).json(todosExist);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

// get single todo
export const getTodoByTodoId = async (req, res) => {
  const todoId = req.params.todoId;

  if (todoId.length !== 24)
    return res.status(400).json({ error: "Invalid todoId in params" });

  try {
    const todoExist = await todoModel.findById(todoId);
    if (!todoExist) return res.status(404).json({ error: "Todo not exist" });
    return res.status(200).json({ todo: todoExist, message: "todo is found" });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const updateTodoByTodoId = async (req, res) => {
  const todoId = req.params.todoId;

  if (todoId.length !== 24)
    return res.status(400).json({ error: "Invalid todoId in params" });

  if (Object.keys(req.body).length === 0)
    return res.status(400).json({ error: "Fields are empty" });

  try {
    const todoExist = await todoModel.findByIdAndUpdate(todoId, req.body, {
      new: true,
    });
    if (!todoExist) return res.status(400).json({ error: "Todo not updated" });
    return res
      .status(200)
      .json({ message: "Todo updated successfully", todo: todoExist });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const deleteTodoByTodoId = async (req, res) => {
  const todoId = req.params.todoId;
  if (todoId.length !== 24)
    return res.status(400).json({ error: "Invalid todoId in params" });

  try {
    const todoExist = await todoModel.findById(todoId);
    if (!todoExist) return res.status(404).json({ error: "Todo not exist" });

    const userId = todoExist.writer.toString();
    const userExist = await userModel.findById(userId);
    userExist.todos = userExist.todos.filter(
      (id) => id.toString() != todoExist._id
    );
    const deletedTodo = await todoModel.findByIdAndDelete(todoId);
    await userExist.save();
    return res
      .status(200)
      .json({ message: "Todo deleted successfully", todo: deletedTodo });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};
