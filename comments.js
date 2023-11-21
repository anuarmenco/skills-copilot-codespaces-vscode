// Create web server
// Listen for incoming requests
// Respond to requests
// Parse request body
// Read data from file
// Write data to file
// Return response

// Require express module
const express = require("express");
// Create express application
const app = express();
// Require body-parser module
const bodyParser = require("body-parser");
// Require fs module
const fs = require("fs");
// Require path module
const path = require("path");
// Require uuid module
const { v4: uuidv4 } = require('uuid');

// Set port
const PORT = process.env.PORT || 3000;

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// GET /comments
app.get("/comments", (req, res) => {
    // Read data from comments.json
    fs.readFile("comments.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        } else {
            // Parse JSON string to JSON object
            const comments = JSON.parse(data);
            // Send JSON object as response
            res.json(comments);
        }
    });
});

// POST /comments
app.post("/comments", (req, res) => {
    // Read data from comments.json
    fs.readFile("comments.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        } else {
            // Parse JSON string to JSON object
            const comments = JSON.parse(data);
            // Create comment object
            const comment = {
                id: uuidv4(),
                name: req.body.name,
                comment: req.body.comment,
            };
            // Add comment object to comments array
            comments.push(comment);
            // Write comments array to comments.json
            fs.writeFile("comments.json", JSON.stringify(comments), (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Internal Server Error");
                } else {
                    // Send JSON object as response
                    res.json(comment);
                }
            });
        }
    });
});

// DELETE /comments/:id
app.delete("/comments/:id", (req, res) => {
