const fs = require("fs");


// GET USERS
const getUsers = (req, res) => {
    console.log("jjjj")
    fs.readFile("./data/user.json", "utf-8", (err, data) => {

        console.log("data", data);

        if (err) {
            console.log("err", err)
            return res.status(500).json({
                message: "Error reading file"
            });
        }

        const users = JSON.parse(data);

        res.status(200).json(users);
    });
};



// CREATE USER
const createUser = (req, res) => {

    const newUser = req.body;
    if(!req.body.id || !req.body.name || !req.body.age){
         return res.status(500).json({
                message: "Missing mandatory feilds"
            });
    }
    console.log("newUser", newUser)
    fs.readFile("./data/user.json", "utf-8", (err, data) => {
        console.log("err", err)
        if (err) {
            return res.status(500).json({
                message: "Error reading file"
            });
        }

        const users = JSON.parse(data);
        if(users.some((val)=>{
            return val.id === req.body.id
        })){
             return res.status(500).json({
                message: "Duplicate id found"
            });
        }
        users.push(newUser);

        fs.writeFile(
            "./data/user.json",
            JSON.stringify(users, null, 2),
            (err) => {

                if (err) {
                    return res.status(500).json({
                        message: "Error writing file"
                    });
                }

                res.status(201).json({
                    message: "User added successfully",
                    user: newUser
                });
            }
        );
    });
};

// GET USER BY ID
const getUserById = (req, res) => {

    const userId = Number(req.params.id);

    fs.readFile("./data/users.json", "utf-8", (err, data) => {

        if (err) {
            return res.status(500).json({
                message: "Error reading file"
            });
        }

        const users = JSON.parse(data);

        const user = users.find((u) => u.id === userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);
    });
};

module.exports = {
    getUsers,
    createUser,
    getUserById
};