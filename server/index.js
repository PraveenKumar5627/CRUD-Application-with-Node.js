const express = require('express');
const cors = require('cors');
const fs = require("fs")
const app = express()
app.use(cors());
const port = 8000;
let users = require("./Sample.json");
const { error } = require('console');
const { type } = require('os');
// const { error } = require('console');

app.get("/users", (req, res) => {
    return res.json(users)
})
app.delete("/users/:id", (req, res) => {
    console.log("id rceived",req.params.id)
    var index = users.filter(user=>user.id==4)
    console.log("index",index)
    if(index===-1){
        return res.status(404).json({
            error:"user is not fouund"
        })
    }
    users.splice(req.params.id,1)
    fs.writeFile("./Sample.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error:"failed to delter user" })
        }
        console.log("delete request rceied")
        return res.json(users)
    })
})
app.listen(port, (err) => {
    console.log(`app is running in port ${port}`)
})