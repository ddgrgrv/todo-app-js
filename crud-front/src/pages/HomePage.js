import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchItems, deleteItem, createItem, updateItem } from '../api/api';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';
import { useAuth } from '../context/auth-context'; // Контекст авторизации

function HomePage() {
  const [items, setItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);
  const { user } = useAuth(); // Получаем информацию о пользователе
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Перенаправляем на логин, если пользователь не авторизован
    } else {
      fetchItems().then(setItems);
    }
  }, [user, navigate]);

  const handleAddItem = async (newItem) => {
    const addedItem = await createItem(newItem);
    setItems((prevItems) => [...prevItems, addedItem]);
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    setItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const handleEditItem = async (id, updatedItem) => {
    const updated = await updateItem(id, updatedItem);
    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id === updated._id ? { ...item, name: updated.name } : item
      )
    );
    setItemToEdit(null);
  };

  return (
    <div className="home-page">
      <h1>Мои задачи</h1>
      <ItemForm
        onAddItem={handleAddItem}
        onEditItem={handleEditItem}
        itemToEdit={itemToEdit}
      />
      <ItemList
        items={items}
        onDelete={handleDelete}
        onEdit={setItemToEdit}
      />
    </div>
  );
}

export default HomePage;
