const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
let stored = {};
let nextAvaliableID = 1;

let ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(express.static('public'));

function displayPosts(req, res) {
  const postsArray = Object.values(stored).slice().reverse(); //this line is chatgpt

  res.render('posts', {
    currentPage: 'posts',
    posts: postsArray
  });
}

function displayEvents(req, res){
  res.render('events', { currentPage: 'events' });
}

function displayPlayers(req, res){
  res.render('players', { currentPage: 'players' });
}

function displayUpdates(req, res){
  res.render('updates', { currentPage: 'updates' });
}

function posting(req, res){
  if(req.body.username === " " || req.body.username === ""){
    req.body.username = "Unidentified Lawn Bowls User"
  }
  if(req.body.description === " " || req.body.description === ""){
    req.body.description = "No description provided."
  }
  console.log("e")
  let formData = req.body;

  formData["id"] = nextAvaliableID;
  stored[nextAvaliableID] = formData;
  nextAvaliableID++;
  res.redirect('/posts');

  console.log(stored);
}

app.get('/posts', displayPosts);
app.get('/events', displayEvents);
app.get('/players', displayPlayers);
app.get('/updates', displayUpdates);

app.get('/', (req, res) => {
  res.redirect('/posts');
});

app.post('/', posting);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});