import React, { useState, useEffect } from 'react';
import { marked } from 'marked'; // Подключаем библиотеку для рендеринга Markdown

function ItemForm({ onAddItem, onEditItem, itemToEdit }) {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState(''); // Добавляем состояние для описания

  // Если передан itemToEdit, заполняем форму данными задачи
  useEffect(() => {
    if (itemToEdit) {
      setTaskName(itemToEdit.name);
      setDescription(itemToEdit.description); // Заполняем описание
    }
  }, [itemToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      name: taskName,
      description, // Добавляем описание в данные задачи
    };

    if (itemToEdit) {
      onEditItem(itemToEdit._id, newItem); // Редактируем задачу
    } else {
      onAddItem(newItem); // Добавляем новую задачу
    }

    setTaskName(''); // Очищаем форму
    setDescription(''); // Очищаем описание
  };

  return (
    <form onSubmit={handleSubmit} className="item-form">
      <div>
        <label htmlFor="name">Название задачи</label>
        <input
          type="text"
          id="name"
          required
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Описание задачи</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Введите описание задачи в формате Markdown"
        />
      </div>
      <button type="submit">{itemToEdit ? 'Редактировать задачу' : 'Добавить задачу'}</button>
    </form>
  );
}

export default ItemForm;
