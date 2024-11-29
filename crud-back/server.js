const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const itemsRoutes = require('./routes/items');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'https://ddgrgrv.github.io', // Указываем разрешённый домен
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешённые методы
  allowedHeaders: ['Content-Type', 'Authorization'], // Разрешённые заголовки
}));
app.use(bodyParser.json());

// Строка подключения к MongoDB
const dbURI = process.env.MONGODB_URI; // Берем строку подключения из переменной окружения

// Подключение к MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Завершаем приложение, если не удалось подключиться к базе данных
  });

const db = mongoose.connection;
db.on('error', (err) => console.error('MongoDB connection error:', err));
db.once('open', () => {
  console.log('MongoDB connection established');
});

// Маршруты
app.use('/api/items', itemsRoutes);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
