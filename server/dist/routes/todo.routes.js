"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("../db"));
var Router = require('express').Router;
var router = Router();
router.get('/', function (req, res) {
    var todos = db_1.default.todos;
    res.json({ todos: todos });
});
router.post('/add', function (req, res) {
    var title = req.body.title;
    if (!title)
        return;
    var todo = {
        id: Math.floor(Math.random() * 500).toString(),
        title: title,
        completed: false,
        dateCreate: new Date(),
    };
    db_1.default.todos.unshift(todo);
    res.json({ success: true, todo: todo, todos: __spreadArray([], db_1.default.todos) });
});
router.post('/remove', function (req, res) {
    var failHandler = function () {
        res.json({ success: false, message: 'Not found' });
    };
    var id = req.body.id;
    if (!id)
        return failHandler();
    var todo = db_1.default.todos.find(function (todo) { return todo.id === id; });
    if (!todo)
        return failHandler();
    var idx = db_1.default.todos.indexOf(todo);
    if (idx < 0)
        return failHandler();
    db_1.default.todos.splice(idx, 1);
    res.json({ success: true, todos: __spreadArray([], db_1.default.todos) });
});
router.post('/complete', function (req, res) {
    var failHandler = function () {
        res.json({ success: false, message: 'Not found' });
    };
    var id = req.body.id;
    if (!id)
        return failHandler();
    var todo = db_1.default.todos.find(function (todo) { return todo.id === id; });
    if (!todo)
        return failHandler();
    todo.completed = !todo.completed;
    res.json({ success: true });
});
exports.default = router;
