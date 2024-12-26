const express = require('express');
const { marked } = require('marked');  // Для рендеринга Markdown
const router = express.Router();
const Item = require('../models/item');
const authenticateToken = require('../middleware/authMiddleware'); // Middleware для проверки токена

// Получение всех элементов текущего пользователя
router.get('/', authenticateToken, async (req, res) => {
  try {
    const items = await Item.find({ userId: req.user.uid }); // Фильтруем по UID пользователя
    // Преобразуем описание из Markdown в HTML
    const itemsWithRenderedDescription = items.map(item => ({
      ...item.toObject(),
      description: marked(item.description), // Рендерим Markdown в HTML
    }));
    res.json(itemsWithRenderedDescription);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Создание нового элемента
router.post('/', authenticateToken, async (req, res) => {
  const newItem = new Item({
    ...req.body,
    userId: req.user.uid, // Привязываем задачу к UID текущего пользователя
  });
  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Обновление элемента
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const updatedItem = await Item.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.uid }, // Убедимся, что задача принадлежит текущему пользователю
      req.body,
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ error: 'Элемент не найден или доступ запрещён' });
    }
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Удаление элемента
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const deletedItem = await Item.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.uid, // Убедимся, что задача принадлежит текущему пользователю
    });
    if (!deletedItem) {
      return res.status(404).json({ error: 'Элемент не найден или доступ запрещён' });
    }
    res.json({ message: 'Элемент успешно удалён' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
