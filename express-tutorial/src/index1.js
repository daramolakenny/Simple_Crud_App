import express from "express";
import {} from "express-validator";
import cors from "cors";
import { connectDb } from "./db/database.js";


const app = express();

app.use(cors());
app.use(express.json());
connectDb()

const loginMiddleware = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
};
 const resolvedMiddleware = (req, res, next) => {
    const { params: {id}} = req;
     const parseId = parseInt(id);
    if(isNaN(parseId)){ 
        return res.sendStatus(404)    
    }; 
    const findUserIndex = mockUsers.findIndex((user) => user.id === parseId);
    if(findUserIndex === -1) return res.sendStatus(404);
    req.findUserIndex = findUserIndex;
    next();
 }

const PORT = process.env.PORT || 3000;

const mockUsers = [];

// Get
app.get("/", (req, res) => {
    res.send(mockUsers);
}); 

app.get("/api/user", (req, res) => {
    console.log(req.query);
    const {query : {filter, value}} = req;
    if(!filter && !value) return res.send(mockUsers);
    if(filter && value){
        return res.send(
            mockUsers.filter((users) => users[filter].includes(value))
        );
    }
});

// create or add new data in the database
// app.post("/api/user", (req, res) => {
//     const {username, displayName, email} = req.body;
//     if(!username || !displayName || !email){
//         return res.json({message: "Username, display Name and Email are required!"})
//     } else{
//         const newUser = {
//             id: mockUsers.length + 1,
//             displayName,
//             username,
//             email,
//         }
//         mockUsers.push(newUser);
//         return res.sendStatus(201).json(mockUsers);
//     };
// });
let updateIndex = 0;
app.post("/api/user", loginMiddleware, (req, res) => {
    console.log("Received data:", req.body);
  const { username, description, email } = req.body;

  if (!username || !description || !email) {
    return res.status(400).json({ error: "All fields are required" });
  }

  updateIndex += 1;
  const newUser = {
    id: updateIndex,
    username,
    description,
    email,
  };

  mockUsers.push(newUser);
  return res.status(201).json({ message: "User registered", user: newUser });
});



// update the database
app.put("/api/user/:id", (req, res) => {
    console.log(req.body);
    const{body, params: { id }} = req;
    const parseId = parseInt(id);
    if(isNaN(parseId)){ 
        return res.sendStatus(404)    
    }; 
    const findUserIndex = mockUsers.findIndex((user) => user.id === parseId);
    if(findUserIndex === -1){
        return res.sendStatus(404);
    };
    mockUsers[findUserIndex] = { id: parseId, ...body};
    return res.sendStatus(204);
});

// update a single data in the database
app.patch("/api/user/:id", resolvedMiddleware, (req, res) => {
    const {body, findUserIndex} = req;
    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body};
    return res.sendStatus(204);
})

app.delete("/api/user/:id", (req, res) => {
    console.log(req.body);
    const {params: {id}} = req;
    const parseId = parseInt(id);
    if(isNaN(parseId)){
        return res.sendStatus(404);
    }
    const findUserIndex = mockUsers.findIndex((user) => user.id === parseId);
    if(findUserIndex === -1){
        return res.sendStatus(404);
    }
    mockUsers.splice(findUserIndex, 1);
    res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});