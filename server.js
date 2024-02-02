/**
 * mini Express backend server
 */
const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP; // glue layer between express and graphql
const schema = require('./schema/schema');

const app = express();

// app.use is the way Express to add middlewares
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Listening on port 4000');
});
