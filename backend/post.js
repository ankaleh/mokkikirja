
const typeDef = `
    type Post {
        id: ID!
        writtenBy: String!
        date: String!
        text: String!
        guests: String!
    }
`

const mutation = `
    type Mutation {
        addPost(
            id: ID!
            writtenBy: String!
            date: String!
            text: String!
            guests: String!
        ): Post
    }
`

const resolvers = {
    Mutation: {
        addPost: (root, args) => {
            console.log(args)
            const post = {...args}
            //tallennus
            return post
        }
    }
}

module.exports = { typeDef, mutation, resolvers }