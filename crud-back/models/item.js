const mongoose = require('mongoose');

// Определение схемы
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: String, required: true }, // UID пользователя, связанный с задачей
});

// Экспорт модели
module.exports = mongoose.model('Item', itemSchema);
