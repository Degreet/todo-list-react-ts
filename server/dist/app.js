"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var todo_routes_1 = __importDefault(require("./routes/todo.routes"));
var app = express_1.default();
var port = 5000;
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.use('/todos', todo_routes_1.default);
app.listen(port, function () {
    console.log('Server started');
});
