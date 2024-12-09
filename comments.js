// create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// data
let comments = [
  { id: 1, author: 'user1', body: 'comment1' },
  { id: 2, author: 'user2', body: 'comment2' },
  { id: 3, author: 'user3', body: 'comment3' }
];

// get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// get a comment by id
app.get('/comments/:id', (req, res) => {
  const comment = comments.find(comment => comment.id === parseInt(req.params.id));
  if (!comment) {
    res.status(404).send('The comment with the given ID was not found');
  }
  res.json(comment);
});

// create a new comment
app.post('/comments', (req, res) => {
  const comment = {
    id: comments.length + 1,