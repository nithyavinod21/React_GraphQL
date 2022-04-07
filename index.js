const express = require("express");
const path = require('path');
const PORT = process.env.PORT || 3001;
const expressGraphQL = require('express-graphql').graphqlHTTP;
const app = express();

const schema = require('./schema/schema');

/* app.use("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
   */


// declare a graphQL endpoint
app.use('/graphql', expressGraphQL({
    
    schema,
    graphiql: true
})); 



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

