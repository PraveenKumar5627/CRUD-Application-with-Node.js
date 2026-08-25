const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
app.use(express.json())
const port = 8000;

app.use(cors());

let users = require("./Sample.json");

// GET all users
app.get("/users", (req, res) => {
    return res.json(users);
});

// DELETE user
app.delete("/users/:id", (req, res) => {

    console.log("Raw ID received:", req.params.id);

    const id = Number(req.params.id);

    console.log("Converted ID:", id);

    const index = users.findIndex(
        user => Number(user.id) === id
    );

    console.log("Index:", index);

    if (index === -1) {
        return res.status(404).json({
            error: "User not found"
        });
    }

    users.splice(index, 1);

    fs.writeFile(
        "./Sample.json",
        JSON.stringify(users, null, 2),
        (err) => {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    error: "Failed to delete user"
                });
            }
            return res.json(users);
        }
    );
});
app.post("/users", (req, res) => {
    let { name, age, city } = req.body
    if (!name || !age || !city) {
        return res.status(404).send("all field required")
    }
    let id = Date.now()
    users.push({ id, name, age, city })
    fs.writeFile(
        "./Sample.json",
        JSON.stringify(users, null, 2),
        (err) => {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    error: "Failed to delete user"
                });
            }
            return res.json({ message: "data received completely" })
        }
    );

})
app.patch("/users/:id", (req, res) => {
    let id = Number(req.params.id)
    let { name, age, city } = req.body
    if (!name || !age || !city) {
        return res.status(404).send("all field required")
    }
    let index = users.findIndex((user) => user.id == id)
    users.splice(index, 1, { ...req.body })
    fs.writeFile(
        "./Sample.json",
        JSON.stringify(users, null, 2),
        (err) => {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    error: "Failed to delete user"
                });
            }
            return res.json({ message: "data received completely" })
        }
    );

})
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});