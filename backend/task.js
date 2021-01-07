const { UserInputError } = require('apollo-server')
const Task = require('./models/taskModel')

const typeDef = `
    type Task {
        id: ID!
        description: String!
        addedBy: User!
        doneBy: User
        done: Boolean!
    }
`
const mutation = `
    addTask(
        description: String!
    ): Task
    markAsDone(
        description: String!
    ): Task
`

const resolvers = {
    Mutation: {
        addTask: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError('Not authenticated!')
            }
            const task = new Task({...args, done: false, addedBy: currentUser })
            try {
                await task.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
            return task
        },
        markAsDone: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError('Not authenticated!')
            }
            const task = await Task.findOne({ description: args.description })//tähän vaihdettava id hakuavaimeksi
            task.done = true
            task.doneBy = currentUser
            
            try {
                await task.save()
                currentUser.tasks = currentUser.tasks.concat(task)
                await currentUser.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
            return task
        },
    },
    Task: {
        addedBy: async (root, args) => {
            const user = await User.findById(root.addedBy)
            return user
        },
        doneBy: async (root, args) => {
            const user = await User.findById(root.doneBy)
            return user
        }
    }

}

module.exports = { typeDef, mutation, resolvers }