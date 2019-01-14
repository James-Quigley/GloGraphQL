import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as graphqlHTTP from 'express-graphql';

import schema from './schema';

const app = express();

app.use('/*', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(8080);
