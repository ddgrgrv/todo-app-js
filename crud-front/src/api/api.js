const API_URL = 'https://todo-app-js-4hjn.onrender.com/api/items';
// const API_URL = 'http://localhost:3000/api/items';


// Получение списка элементов
export async function fetchItems() {
  const response = await fetch(API_URL);
  return response.json();
}

// Создание нового элемента
export async function createItem(data) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

// Обновление элемента
export async function updateItem(id, data) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

// Удаление элемента
export async function deleteItem(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
}
