//myTest.js

const path = require('path');
const request = require('supertest');
const app = require(path.join(__dirname, '../server')); // Import your Express.js app
const assert = require('assert');


describe('Restaurant Review API Tests', () => {
    let currentUser; // Variable to store the current user's email
  
    it('should add a new user on signup', (done) => {
      const userData = {
        name: 'testuser',
        password: 'testpassword'
      };
  
      request(app)
        .post('/signup')
        .send(userData)
        .expect(200) // Assuming you respond with status 200 on success
        .end((err, res) => {
          if (err) return done(err);
          currentUser = userData.name; // Set the current user
          done();
        });
    });

//comment back in once database is setup
/*
    it('should login an existing user', (done) => {
      const loginData = {
        email: 'testuser'
      };
  
      request(app)
        .post('/login')
        .send(loginData)
        .expect(200) // Assuming you respond with status 200 on success
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'User logged in successfully'); // Add your expected response
          done();
        });
    });
*/
  
    // Add more tests as needed for other routes or functionality
  
  });