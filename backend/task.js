const typeDef = `
    type Task {
        id: ID!
        description: String!
        addedBy: String!
        doneBy: String!
        done: Boolean!
    }
`

module.exports = { typeDef }