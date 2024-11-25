import React, { useState, useEffect } from 'react';

function ItemForm({ onAddItem, onEditItem, itemToEdit }) {
  const [taskName, setTaskName] = useState('');

  // Если передан itemToEdit, то заполняем форму данными задачи
  useEffect(() => {
    if (itemToEdit) {
      setTaskName(itemToEdit.name);
    }
  }, [itemToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = { name: taskName };

    if (itemToEdit) {
      onEditItem(itemToEdit._id, newItem); // Редактируем задачу
    } else {
      onAddItem(newItem); // Добавляем новую задачу
    }

    setTaskName(''); // Очищаем форму
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
      <button type="submit">{itemToEdit ? 'Редактировать задачу' : 'Добавить задачу'}</button>
    </form>
  );
}

export default ItemForm;
