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

//add error handling for 404 errors
app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

//global error handling
app.use((err, req, res, next) => {
   if( err.status === 404 ) {
       err.message = 'Oops, something went wrong! 404 error.';
       console.log(err.message);
       res.status(err.status);
       return res.render("page-not-found", { err });
   } else {
    err.message = 'Oops, something went wrong! Server error.';
    console.log(err.message);
    return res.status(err.status || 500).render("error", { err });
   }
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('the application is running on localhost:3000!')
});