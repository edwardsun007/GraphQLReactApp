 
 const graphql = require('graphql');
 const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString
 } = graphql; // this is just destructing methods from graphql lib

 // userType is object that instructs graphql what kind of user object should be
 const UserType = new GraphQLObjectType({
    name: 'User', // this is the name for this type, here since it is UserType name obviously would be User
    fields: { // this block defines what properties the userType should have
        id: {type: GraphQLString},
        firstName:{type: GraphQLString},
        age: {type: GraphQLInt},
    }
 });

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
                // TODO
            }
        }
    }
 })