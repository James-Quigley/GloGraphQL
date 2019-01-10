import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as graphqlHTTP from 'express-graphql';

import schema from './schema';

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV !== 'production'
}));

app.listen(8080);
