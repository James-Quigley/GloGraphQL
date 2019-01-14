import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as graphqlHTTP from 'express-graphql';

import schema from './schema';

const app = express();

app.use('/*', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV !== 'production'
}));

app.listen(8080);
