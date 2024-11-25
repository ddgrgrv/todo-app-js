const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // Подключите ваш сервер (проверьте путь)

// Подключение к тестовой базе MongoDB
beforeAll(async () => {
  const mongoURI = 'mongodb://localhost:27017/crud-app/';
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Очистка базы данных перед каждым тестом
beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

// Закрытие соединения с MongoDB после тестов
afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('CRUD API /api/items', () => {
  let itemId;

  // Тестирование POST (создание элемента)
  it('should create a new item', async () => {
    const response = await request(app)
      .post('/api/items')
      .send({ name: 'Test Item', description: 'Test Description' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe('Test Item');
    itemId = response.body._id;
  });

  // Тестирование GET (получение всех элементов)
  it('should retrieve all items', async () => {
    await request(app).post('/api/items').send({ name: 'Item 1', description: 'Description 1' });
    await request(app).post('/api/items').send({ name: 'Item 2', description: 'Description 2' });

    const response = await request(app).get('/api/items');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  // Тестирование PUT (обновление элемента)
  it('should update an existing item', async () => {
    const response = await request(app)
      .put(`/api/items/${itemId}`)
      .send({ name: 'Updated Item', description: 'Updated Description' });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Item');
  });

  // Тестирование DELETE (удаление элемента)
  it('should delete an item', async () => {
    const response = await request(app).delete(`/api/items/${itemId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Item deleted successfully');
  });

  // Тестирование 404 (не найдено)
  it('should return 404 for a non-existent item', async () => {
    const response = await request(app).get('/api/items/645a0c2e0b5a7d0017bfa3f9');
    expect(response.status).toBe(404);
  });
});
