const mongoose = require('mongoose');

// Определение схемы
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
});

// Экспорт модели
module.exports = mongoose.model('Item', itemSchema);
