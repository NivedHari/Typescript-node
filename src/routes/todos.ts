import express from "express";
import { Router } from "express";

import { Todo } from "../models/todo";

type requestBody = { text: string };
type requestParams = { todoId: string };

let todos: Todo[] = [];

const router = Router();

router.use(express.json());

router.get("/", (req, res, next) => {
  res.status(200).json({ todos: todos });
});

router.post("/todo", (req, res, next) => {
  const body = req.body as requestBody;
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: body.text,
  };

  todos.push(newTodo);
  res.status(201).json({ message: "Added Todo", todo: newTodo, todos: todos });
});

router.put("/todo/:todoId", (req, res, next) => {
  const params = req.params as requestParams;
  const tid = params.todoId;
  const body = req.body as requestBody;
  const todoIndex = todos.findIndex((todoItem) => todoItem.id === tid);
  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
    return res.status(200).json({ message: "updated Todo", todos: todos });
  }
  return res.status(404).json({ message: "Could Not Find the Item" });
});

router.delete("/todo/:todoId", (req, res, next) => {
  const params = req.params as requestParams;
  todos = todos.filter((todoItem) => todoItem.id !== params.todoId);
  res.status(200).json({ message: "Deleted Todo", todos: todos });
});

export default router;
