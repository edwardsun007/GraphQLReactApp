 
 const graphql = require('graphql');
 const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList
 } = graphql; // this is just destructing methods from graphql lib
 const axios = require('axios')

 //IT IS IMPORTANT to define company type above the UserType!
 const CompanyType = new GraphQLObjectType({
    name:'Company',
    fields: {
        id: {type: GraphQLString},
        name:{type: GraphQLString},
        description:{type: GraphQLString}
    },
    users: {
        type: new GraphQLList(UserType),
        resolve(parentValue, args){ // look up will pass the companyId remember
            return axios.get(`http://localhost:3000/companies/${parentValue.companyId}/users`)
            .then(res=>res.data);
        }
    }
 });

 /*
 in graphQL, the link between two types are exactly done by including as field
 so user should have a field called company which is of type CompanyType
 */

 // userType is object that instructs graphql what kind of user object should be
 const UserType = new GraphQLObjectType({
    name: 'User', // this is the name for this type, here since it is UserType name obviously would be User
    fields: { // this block defines what properties the userType should have
        id: {type: GraphQLString},
        firstName:{type: GraphQLString},
        age: {type: GraphQLInt},
        company: {
            type: CompanyType,
    // On high level, resolve function is how we teach GraphQL to extract 
            resolve(parentValue, args){ // by console.log find that parentValue is the actual user object stored in backend
                // console.log('user type resolve checking parentValue.companyId:',parentValue.companyId)
                // console.log('user type resolve checking args:',args)
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                .then(res=>res.data);
            }
        }
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
                // now we replaced this step with actual API call to our outside Data Store
              return axios.get(`http://localhost:3000/users/${args.id}`)
              .then(response => response.data); // Axios by default return something like this { data: { firstName:'Bill' }} object nested under data
              // but GraphQL doesn't know it, thats why we need to return response.data
              // This is raw Javascript object, we don't have to define type here.
              // GraphQL handles the type automatically for us
            }
        },
        // Adding a sibling field to user called company, this is going to be entry point for look up companies
        company: {
            type:CompanyType,
            args: { id: {type: GraphQLString } }, // whenever lookup happens, it is expected that id is provided in the query
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/companies/${args.id}`)
                .then(response => response.data);
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