import client from "./client.js";
import express from "express";
import axios from "axios";

const port = 9000;

const app = express();

// setting static directory
app.use(express.static('public'))

app.get('/', async (req, res) => {
    // checking value in cache
    let cacheValue = await client.get('todos')
    if (cacheValue) return res.json(JSON.parse(cacheValue));

    cacheValue = await axios.get('https://jsonplaceholder.typicode.com/todos/');
    res.json(cacheValue.data);
    console.log("value send to client")

    // caching the response data for future use
    await client.set('todos', JSON.stringify(cacheValue.data));

    // expire the cache in 2 minutes
    await client.expire('todos', 120);
    console.log("value cached")

})

app.get('/home', (req, res) => {
    res.sendFile('templates/index.html', {root: "."});

})

// working with template engine
app.set("view engine", "ejs");

app.get('/about', (req, res) => {
    const name = "nikhil";
    res.render("about", {name});

})

app.listen(port, () => {
    console.log("app listening at port : ", port);
})