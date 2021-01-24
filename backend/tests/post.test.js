const mongoose = require('mongoose')
const User = require('../models/userModel')
const Post = require('../models/postModel')

const mockUser = { name: 'Mikko Mökkeilijä', username: 'mikmök', password: 'salasana' }
const mockPost = { text: 'Ihana päivä mökillä!', date: '21-01-2021', guests: ['Maija', 'Mikko'] }

describe('test Post Model', () => {
  let user
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL,
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
      .then(() => {
        console.log('Yhdistetty testitietokantaan.', process.env.MONGO_URL)
      })
      .catch((error) => {
        console.log('Virhe yhdistettäessä testitietokantaan: ', error.message)
      })

    await User.deleteMany({})
    await Post.deleteMany({})
    user = new User(mockUser)
    await user.save()
  })

  afterAll(async () => {
    await User.deleteMany({})
    await Post.deleteMany({})
    await mongoose.connection.close()
  })

  it('create and save post successfully', async () => {
    const validPost = new Post({ ...mockPost, writtenBy: user })
    const savedPost = await validPost.save()
    expect(savedPost._id).toBeDefined()
    expect(savedPost.text).toBe(mockPost.text)
    expect(savedPost.date).toBe(mockPost.date)
    expect(savedPost.writtenBy).toBe(user)
    expect(savedPost.guests).toEqual(expect.arrayContaining(mockPost.guests))
  })

  it('create post without required field fails', async () => {
    const postWithoutRequiredField = new Post(
      { date: '21-01-2021', guests: ['Maija', 'Mikko'], writtenBy: user })
    let validationError
    try {
      await postWithoutRequiredField.save()
    } catch (error) {
      validationError = error
    }
    expect(validationError).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(validationError.errors.text).toBeDefined()
  })
})



