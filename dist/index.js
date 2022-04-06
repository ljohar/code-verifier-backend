"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
//Configuration the .env file
dotenv_1.default.config();
//Create Express App
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
//Define the first Route of APP
app.get('/', (req, res) => {
    res.send('Welcome to API Restful: Express + Nodemon + Jest + TS + Swagger + Mongoose');
});
//Send a Response 200 
app.get('/goodbye', (req, res) => {
    res.status(200).json({
        "data": {
            "message": "Goodbye, world"
        }
    });
});
//Query parameters
//http://localhost:8000/hello/?name={name}
app.get('/hello', (req, res) => {
    const name = req.query.name;
    if (name == undefined || name === "") {
        res.status(200).json({
            "data": {
                "message": "Hola, anónimo"
            }
        });
    }
    res.status(200).json({
        "data": {
            "message": "Hola, " + name
        }
    });
});
//Execute APP and listen request to PORT
app.listen(port, () => {
    console.log(`EXPRESS SERVER: Running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map