const express = require('express');
const path = require('path');

const app = express();

// Server routes... IMPORTANT before run the app
// Code ABOVE the webpack configuration code
app.get('/hello', (req, res) => {
  res.send({ hi: 'ther' });
});

// Webpack Configuration: Check the environment to run the app:
// If in dev-env => use webpack => node server.js
// If in production-env => use express => set NODE_ENV=production&&node server.js
if (process.env.NODE_ENV !== 'production') {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.js');
  app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
  app.use(express.static('dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'))
  });
}

app.listen(process.env.PORT || 3050, () => console.log('Listening'));
