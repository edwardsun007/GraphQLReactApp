 
 const graphql = require('graphql');
 const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema
 } = graphql; // this is just destructing methods from graphql lib
 const _ = require('lodash');

 // userType is object that instructs graphql what kind of user object should be
 const UserType = new GraphQLObjectType({
    name: 'User', // this is the name for this type, here since it is UserType name obviously would be User
    fields: { // this block defines what properties the userType should have
        id: {type: GraphQLString},
        firstName:{type: GraphQLString},
        age: {type: GraphQLInt},
    }
 });

 // hard code data for now
 const users = [
    { id: '23', firstName: 'Bill', age: 20},
    { id: '47', firstName: 'Samantha', age: 21}
 ]

 const RootQuery = new GraphQLObjectType({
    // translate: you can give root query asking about users, 
    // if you give me the id which is of GraphQLString that you are looking for,
    // i (graphQL) will return a UserType object back to you
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: {type: GraphQLString }},
            // resolve function is the key piece:
            // the resolve function will actually go into the Data Store / Database, 
            // and it finds the data
            resolve(parentValue, args){ // parentValue is something that is not going to be used
              return _.find(users, {id: args.id}) // lodash search all users and return the user with id which is the passed id
            }
        }
    }
 });

/**
 * create a new graphQLschema by calling new, and then export it as common js MODULE so that other piece of the app can access it
 */ 
module.exports = new GraphQLSchema({
    query: RootQuery
});