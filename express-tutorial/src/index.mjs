import express from "express";
const app = express();

app.use(express.json());

app.set("etag", false);
const PORT = process.env.PORT || 3000;

const mockUsers = [
    {id: 1, username: "kenny", displayName: "Kenny", email: "kenny@gmail.com"},
    {id: 2, username: "esther", displayName: "Esther", email: "esther@gmail.com"},
    {id: 3, username: "john", displayName: "John", email: "john@gmail.com"},
];

app.get("/", (req, res) => {
    res.set("Cache-Control", "no-store");
    res.json({msg: "Hello world!"});
});

app.get("/api/users", (req, res) => {
    res.json(mockUsers);
});

app.get("/api/users/:id", (req, res) => {
    console.log(req.params);
    const parsedId = parseInt(req.params.id);
    if(isNaN(parsedId)){
        return res.sendStatus(400);
    }
    const user = mockUsers.find((user) => user.id === parsedId);
    if(!user) return res.sendStatus(404);
    return res.send(user);
});

app.post("/api/users", (req, res) => {
    console.log(req.body);
    // request for the body to be in JSON format
    const {username, displayName, email} = req.body;
    if(!username || !displayName || !email){
        return res.json({msg: "username, displayName and email are required"});
    } else{
        const newUser = {
            id: mockUsers.length + 1,
            displayName,
            username,
            email
        };
        mockUsers.push(newUser);
        return res.sendStatus(201).json(mockUsers)
    }
});

app.delete("/api/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const deleteUserById = mockUsers.find((user) => user.id === userId);
    if(userId === deleteUserById){
        return res.status(400).json({msg: "id not found"});
    } else {
        deleteUserById.pop();
        return res.sendStatus(201).json({msg: "user deleted successfully."});
    };
});

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});