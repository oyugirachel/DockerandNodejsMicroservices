
const { expect } = require('chai')
const request = require('supertest')

const app = require('../app')


describe('HackerBay Stateless Microservice', () => {

  // Create dummy login data
  const loginDetails = { username: 'someone', password: 'awesome' }
  
  // Create token variable to save user token
  let token
  
  // Set various variables to be used in the application
  const imageUrl = 'https://s3.amazonaws.com/oxfamamericaunwrapped.com/wp-content/uploads/2013/07/OAU10-53_pair_of_goats_2014-updated-image-400x400.jpg'
  const invalidImageUrl = 'https://s3.amazonaws.com/oxfamamericaunwrapped.com/wp-content/uploads/2013/07/OAU10-53_pair_of_goats'
  const jsonObject = '{ "user": { "firstName": "Albert", "lastName": "Einstein" } }'
  const jsonPatchObject = '[{"op": "replace", "path": "/user/firstName", "value": "Leonado"}, {"op": "replace", "path": "/user/lastName", "value": "Da Vinci"}]'

  // Mock user authentication
  describe('Mock Authentication', () => {
    it('it should not log user in if username and password do not meet requirements', (done) => {
      request.agent(app)
        .post('/api/users/login')
        .send({ username: 'someone', password: '' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400)
        })
      done()
    })

    it('it should accept a username/password and return a signed JWT', (done) => {
      request.agent(app)
        .post('/api/users/login')
        .send(loginDetails)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200)
          expect(res.body.authorized).to.equal(true)
          token = res.body.token
          done()
        })
    })
  })

  describe('Thumbnail creation', () => {
     
    it('it should accept a public image url and return a resized image', (done) => {
      request.agent(app)
        .post('/api/create-thumbnail')
        .set('token', token)
        .send({ imageUrl: 'https://s3.amazonaws.com/oxfamamericaunwrapped.com/wp-content/uploads/2013/07/OAU10-53_pair_of_goats_2014-updated-image-400x400.jpg' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400)
          expect(res.body.converted).to.equal(false)
          expect(res.statusCode).to.equal(200)
          expect(res.body.converted).to.equal(true)
        })
      done()
    })

    
    it('it should not process image if token is invalid', (done) => {
      request.agent(app)
        .post('/api/create-thumbnail')
        .set('token', 'randomewwrongtoken')
        .send({ imageUrl })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401)
          expect(res.body.authorized).to.equal(false)
        })
      done()
    })

    it('it should not process image if token is not available', (done) => {
      request.agent(app)
        .post('/api/create-thumbnail')
        .set('token', '')
        .send({ imageUrl })
        .end((err, res) => {
          expect(res.statusCode).to.equal(403)
          expect(res.body.authorized).to.equal(false)
        })
      done()  
    })

    it('it should not process image if url is invalid', (done) => {
      request.agent(app)
        .post('/api/create-thumbnail')
        .set('token', token)
        .send({ imageUrl: invalidImageUrl })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400)
        })
      done()
    })
  })

  describe('Patch object', () => {
    it('it should patch object A with object B', (done) => {
      request.agent(app)
        .patch('/api/patch-object')
        .set('token', token)
        .send({ jsonObject, jsonPatchObject })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200)
          done()
        })
    })

    it('it should not patch if token is invalid', (done) => {
      request.agent(app)
        .patch('/api/patch-object')
        .set('token', 'randomewwrongtoken')
        .send({ jsonObject, jsonPatchObject })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401)
          expect(res.body.authorized).to.equal(false)
        })
      done()
    })

    it('it should not patch if token is not available', (done) => {
      request.agent(app)
        .patch('/api/patch-object')
        .set('token', '')
        .send({ jsonObject, jsonPatchObject })
        .end((err, res) => {
          expect(res.statusCode).to.equal(403)
          expect(res.body.authorized).to.equal(false)
        })
      done()
    })
  })
})
