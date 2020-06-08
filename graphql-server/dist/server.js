"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var graphql_depth_limit_1 = __importDefault(require("graphql-depth-limit"));
var schema_1 = __importDefault(require("./schema"));
var server = new apollo_server_1.ApolloServer({
    schema: schema_1.default,
    validationRules: [graphql_depth_limit_1.default(7)],
    playground: true,
    formatError: function (err) {
        return err;
    }
});
server.listen({ port: 3000 }).then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80 Server ready at " + url);
});
