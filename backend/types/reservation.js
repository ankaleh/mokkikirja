const { UserInputError, AuthenticationError, gql } = require('apollo-server')
const Reservation = require('../models/reservationModel')
const User = require('../models/userModel')

const typeDefs = gql`
    type Reservation {
        id: ID!,
        reservedBy: User!,
        startDate: String!,
        endDate: String!,
    }
    extend type Query {
        allReservations: [Reservation!]!
    }
    extend type Mutation {
        addReservation(
            startDate: String!,
            endDate: String!
        ): Reservation,
        removeReservation(
            id:ID!
        ): Reservation
    }
`
const resolvers = {
  Mutation: {
    addReservation: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('Not authenticated backend.postissa!')
      }
      const reservation = new Reservation({ ...args, reservedBy: currentUser } )
      
      if (reservation.startDate instanceof Date && reservation.endDate instanceof Date) {
        console.log('uusi varaus luotu')
      } else {
        console.log(reservation.validateSync().errors['startDate'])
        console.log(reservation.validateSync().errors['endDate'])
      }
      try {
        await reservation.save()
        currentUser.reservations = currentUser.reservations.concat(reservation)
        await currentUser.save()
        console.log('uusi varaus tallennettu', reservation.startDate, reservation.endDate)
      } catch (error) {
        console.log('catchissa: tallentaminen ei onnistunut', error)
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return reservation
    },
    removeReservation: async (root, args, { currentUser }) => { 
        if (!currentUser) {
            throw new AuthenticationError('Not authenticated!')
        }
        try {
          const reservations = currentUser.reservations.filter((r)=> r.id !== args.id)
          console.log(reservations)
          currentUser.reservations = reservations //ei poista käyttäjältä
          await currentUser.save()
          return Reservation.findByIdAndRemove(args.id)
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }
    }
   
  },
  Query: {
    allReservations: (root, args, { currentUser }) => { 
      if (!currentUser) {
        throw new AuthenticationError('Not authenticated backend.postissa!')
      }
      return Reservation.find({})
    }
  },
  Reservation: {
    reservedBy: async (root, args, { currentUser }) => {
      const user = await User.findById(root.reservedBy)
      return user
    }
  }
}

module.exports = { typeDefs, resolvers }