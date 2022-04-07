const graphql = require("graphql");
const _ = require("lodash");
const axios = require("axios");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLNonNull
} = graphql;


// create a Type for the User
const UserType = new GraphQLObjectType({
    name: 'user',
    fields: {
        "id": { type: GraphQLString },
        "firstName": { type: GraphQLString },
        "age": { type: GraphQLInt },
        "company": { type: GraphQLString }
    }
});


// Create a RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve(parentValue, args) {
                // make API call to get the user data
                return axios
                        .get(`http://localhost:3000/users?id=${args.id}`)
                        .then(resp => {
                            return resp.data[0]
                        })
                        .catch(err => err);
            }
        }
    }
})


// Create a mutation
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                age: {
                    type: new GraphQLNonNull(GraphQLInt)
                },
                company: {
                    type: GraphQLString
                }
            },
            resolve(parentValue, args) {
                
                const { 
                    firstName,
                    age,
                    company
                } = args;

                // make API call to get the user data
                return axios
                        .post(`http://localhost:3000/users`, { firstName, age, company })
                        .then(resp => {
                            return resp.data;
                        })
                        .catch(err => err);
            }
        }
    }
})


// export the schema (query and the mutation)
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
});