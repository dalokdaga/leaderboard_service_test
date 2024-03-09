const request = require('supertest');
const mongoose = require('mongoose');
const { startServer, app } = require('../app');
const Leaderboard = require('../models/leaderboardModel');
const createKeySecret = require('./utlis_test/addKeySecret')

require('dotenv').config();

let server;

beforeAll(async () => {
  server = startServer();
  await mongoose.disconnect();
  await mongoose.connect(process.env.MONGODB_URI_TEST);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  server.close();
});

describe('Test de Endpoints', () => {
  let userId;
  let leaderboardId;

  let keySecret = '81d67ad7b1b99c159eb5fbd4550681b2a2326466eab9db57da45ca168ebd5432'

  beforeEach(async () => {
    await createKeySecret(keySecret, 'Clave API de prueba', 'sha256');
  });

  test('Add a user to a leader board', async () => {
    // Crear un tablero de líderes para asociar al usuario
    console.log("################################ add user to Leaderboard ############################")

    const leaderboard = await Leaderboard.create({
      name: 'Tablero de Prueba',
      game: 'Juego de Prueba'
    });
    leaderboardId = leaderboard._id;

    const response = await request(app)
      .post('/users')
      .set('x-api-key', keySecret)
      .send({
        username: 'Usuario de Prueba',
        email: 'test@example.com',
        score: 100,
        leaderboardId: leaderboardId
      });
    
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    userId = response.body._id;

    console.log(response.body);
  });

  test("Update a user's score", async () => {
    console.log("################################ update score of user ############################")

    const response = await request(app)
      .put(`/users/${userId}`)
      .set('x-api-key', keySecret)
      .send({
        score: 200
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('_id', userId);
    expect(response.body).toHaveProperty('score', 200);
  });

  test("Get a user's rank and score", async () => {
    const response = await request(app)
      .get(`/users/${leaderboardId}/users/${userId}/rank`)
      .set('x-api-key', keySecret);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('userId', userId);
    expect(response.body).toHaveProperty('score');
    expect(response.body).toHaveProperty('rank');

    console.log(response.body);
  });

  test('Get users around a user', async () => {
    console.log("################################ list users with a medium ############################")
  
    const usersToAdd = [
      { username: 'Usuario1', email: 'user1@example.com', score: 150 },
      { username: 'Usuario2', email: 'user2@example.com', score: 180 },
      { username: 'Usuario3', email: 'user3@example.com', score: 90 },
      { username: 'Usuario4', email: 'user4@example.com', score: 110 },
      { username: 'Usuario5', email: 'user5@example.com', score: 130 },
      { username: 'Usuario6', email: 'user6@example.com', score: 140 },
      { username: 'Usuario7', email: 'user7@example.com', score: 160 },
      { username: 'Usuario8', email: 'user8@example.com', score: 170 },
      { username: 'Usuario9', email: 'user9@example.com', score: 120 },
      { username: 'Usuario10', email: 'user10@example.com', score: 210 }
    ];
  
    const addedUsers = [];
    for (const user of usersToAdd) {
      const response = await request(app)
        .post('/users')
        .set('x-api-key', keySecret)
        .send({
          ...user,
          leaderboardId: leaderboardId
        });
  
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('_id');
      addedUsers.push(response.body);
    }
      
    const response = await request(app)
      .get(`/users/around-user/${leaderboardId}/${userId}/4`)
      .set('x-api-key', keySecret)
      ;
  
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);    
    expect(response.body.length).toBeGreaterThan(0);
    console.log(response.body);
  });
});
