import React, { useEffect, useState } from 'react';
import { fetchItems, deleteItem, createItem, updateItem } from '../api/api';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';

function HomePage() {
  const [items, setItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null); // Для редактирования задачи

  // Загружаем задачи при монтировании компонента
  useEffect(() => {
    fetchItems().then(setItems);
  }, []);

  // Добавление новой задачи
  const handleAddItem = async (newItem) => {
    const addedItem = await createItem(newItem);
    setItems((prevItems) => [...prevItems, addedItem]);
  };

  // Удаление задачи
  const handleDelete = async (id) => {
    await deleteItem(id);
    setItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  // Редактирование задачи
  const handleEditItem = async (id, updatedItem) => {
    const updated = await updateItem(id, updatedItem);
    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id === updated._id ? { ...item, name: updated.name } : item
      )
    );
    setItemToEdit(null); // Закрываем форму редактирования
  };

  return (
    <div className="home-page">
      <h1>Мои задачи</h1>

      {/* Форма для добавления или редактирования задачи */}
      <ItemForm
        onAddItem={handleAddItem}
        onEditItem={handleEditItem}
        itemToEdit={itemToEdit}
      />

      <div className="task-list">
        {/* Список задач */}
        <ItemList
          items={items}
          onDelete={handleDelete}
          onEdit={setItemToEdit} // Передаем задачу для редактирования
        />
      </div>
    </div>
  );
}

export default HomePage;
