const request = require('supertest');
const { startServer, app } = require('../app');
const mongoose = require('mongoose');
const Leaderboard = require('../models/leaderboardModel');
const User = require('../models/userModel');
const createKeySecret = require('./utlis_test/addKeySecret')
require('dotenv').config();

let server; 

beforeAll(async () => {
  server = startServer();
  await mongoose.disconnect()
  await mongoose.connect(process.env.MONGODB_URI_TEST);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  server.close();
});

describe('Leaderboard Controller', () => {
  let keySecret = '81d67ad7b1b99c159eb5fbd4550681b2a2326466eab9db57da45ca168ebd5432'

  beforeEach(async () => {
    await createKeySecret(keySecret, 'Clave API de prueba', 'sha256');
  });

  it('should create a new leaderboard', async () => {
    console.log("################################ Leaderboard created ############################")
    const response = await request(app)
      .post('/leaderboards')
      .set('x-api-key', keySecret)
      .send({ name: 'Test Leaderboard', game: 'Test Game' });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');

    const leaderboard = await Leaderboard.findById(response.body._id);
    expect(leaderboard).toBeDefined();
    expect(leaderboard.name).toBe('Test Leaderboard');
    expect(leaderboard.game).toBe('Test Game');
    console.log(response.body)
  });

  it('should delete a leaderboard', async () => {
    console.log("################################ Leaderboard deleted ############################")

    const newLeaderboard = new Leaderboard({ name: 'Test Leaderboard for delete', game: 'Test Game' });
    await newLeaderboard.save();

    const response = await request(app).delete(`/leaderboards/${newLeaderboard._id}`).set('x-api-key', keySecret);

    expect(response.statusCode).toBe(200);

    const deletedLeaderboard = await Leaderboard.findById(newLeaderboard._id);
    expect(deletedLeaderboard.deleted_at).toBeDefined();
    console.log("leaderboard deleted", response.body)
  });

  it('should list leaderboards with pagination', async () => {
    console.log("################################ Leaderboard leaders ############################")
    
    const leaderboard = new Leaderboard({ name: 'Leaderboard 1', game: 'Game 1' });
    await leaderboard.save();
      
    const users = [
      { name: 'User 3', score: 80, leaderboard_id: leaderboard._id },
      { name: 'User 2', score: 90, leaderboard_id: leaderboard._id },
      { name: 'User 1', score: 100, leaderboard_id: leaderboard._id },
      { name: 'User 4', score: 70, leaderboard_id: leaderboard._id }
    ];
  
    await User.insertMany(users);
  
    const response = await request(app).get(`/leaderboards/${leaderboard._id}/users?page=1&limit=5`)
      .set('x-api-key', keySecret);
  
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('users');
    expect(response.body).toHaveProperty('pagination');
    console.log(response.body)
    const { users: rankedUsers, pagination } = response.body;
    expect(rankedUsers).toHaveLength(4); // Como hay 4 usuarios, todos se devolverán en una sola página
    expect(pagination.totalItems).toBe(4);
    expect(pagination.totalPages).toBe(1); // Solo una página ya que se devuelven todos los usuarios en una sola página
    expect(pagination.currentPage).toBe(1);
    expect(pagination.itemsPerPage).toBe(5); // Se especificó un límite de 5 usuarios por página
  
    // Verifica que los usuarios estén ordenados por puntuación de manera descendente
    expect(rankedUsers[0].score).toBeGreaterThanOrEqual(rankedUsers[1].score);
  });
  
  
});
