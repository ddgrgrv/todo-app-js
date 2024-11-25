const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const itemRoutes = require('../routes/items'); // путь к вашему роутеру

const app = express();
app.use(express.json());
app.use('/api/items', itemRoutes);

beforeAll(async () => {
  // Подключение к тестовой базе MongoDB
  const mongoURI = 'mongodb://localhost:27017/test-crud-app';
  await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  // Отключение базы данных после тестов
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('CRUD API tests', () => {
  let testItemId;

  it('should create a new item', async () => {
    const response = await request(app)
      .post('/api/items')
      .send({ name: 'Test Item', description: 'Test Description' });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Test Item');
    testItemId = response.body._id;
  });

  it('should retrieve all items', async () => {
    const response = await request(app).get('/api/items');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should update an existing item', async () => {
    const response = await request(app)
      .put(`/api/items/${testItemId}`)
      .send({ name: 'Updated Item', description: 'Updated Description' });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Item');
  });

  it('should delete an item', async () => {
    const response = await request(app).delete(`/api/items/${testItemId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Item deleted successfully');
  });
});
