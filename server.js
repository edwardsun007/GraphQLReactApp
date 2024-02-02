/**
 * mini Express backend server
 */
const express = require('express');

const app = express();

app.listen(4000, () => {
  console.log('Listening');
});
