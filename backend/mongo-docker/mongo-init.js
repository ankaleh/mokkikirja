/* eslint-disable no-undef */
db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'my_app_database',
    },
  ],
})
db.createCollection('posts')
db.createCollection('reservations')
db.createCollection('tasks')
db.createCollection('users')