const path = require('path');
const express = require('express');
const app = express();

// From package.json (name)
const projectName = 'puzzle';

// Serve static files
app.use(express.static('./dist/' + projectName));

// Send all requests to index.html
app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: 'dist/' + projectName });
});

// default Heroku port
app.listen(process.env.PORT || 5000); 