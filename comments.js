// Create web server 
// Load the express library
const express = require('express');
const app = express();

// Load the body-parser library
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Load the mongoose library
const mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true });

// Create a model for comments
const Comment = mongoose.model('Comment', {
    username: String,
    body: String,
    date: Date
});

// Create a new comment
app.post('/comments', async (req, res) => {
    const comment = new Comment({
        username: req.body.username,
        body: req.body.body,
        date: new Date()
    });
    await comment.save();
    res.send(comment);
});

// Get a list of comments
app.get('/comments', async (req, res) => {
    const comments = await Comment.find();
    res.send(comments);
});

// Get a single comment
app.get('/comments/:id', async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    res.send(comment);
});

// Update a comment
app.put('/comments/:id', async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    comment.username = req.body.username;
    comment.body = req.body.body;
    await comment.save();
    res.send(comment);
});

// Delete a comment
app.delete('/comments/:id', async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    await comment.remove();
    res.send({ message: 'Comment deleted successfully' });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost