"use strict";
exports.__esModule = true;
var express = require("express");
var graphqlHTTP = require("express-graphql");
var graphql_1 = require("graphql");
var app = express();
app.use('/graphql', graphqlHTTP({
    schema: new graphql_1.GraphQLSchema({
        query: new graphql_1.GraphQLObjectType({
            name: 'hello',
            fields: {
                hello: {
                    type: graphql_1.GraphQLString,
                    resolve: function () {
                        return 'world';
                    }
                }
            }
        })
    }),
    graphiql: process.env.NODE_ENV !== 'production'
}));
app.listen(8080);
