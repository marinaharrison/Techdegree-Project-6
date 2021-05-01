//Require express and the data.json file
const express = require('express');
const app = express();
const { projects } = require('./data.json');

//Set up the view engine to pug
app.set('view engine', 'pug');

//Set up a static route to serve the files located in the public folder
app.use('/static', express.static('public'));

//Set and index route
app.get('/', (req, res) => {
    const {id} = req.params;
    const project = projects[id];
    res.render('index.pug', { projects, project});
});


//Add an "about" route
app.get('/about', (req, res) => {
    res.render('about')
});

//Add dynamic project routes based on the id of the project
app.get('/project/:id', (req, res) => {
    const { id } = req.params;
    const project = projects[id];
    res.render('project', {project})
});

//add error handling
app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error'); 
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('the application is running on localhost:3000!')
});