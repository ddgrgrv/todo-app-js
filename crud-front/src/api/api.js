import { auth, getUserToken } from "../../firebase";

const API_URL = 'https://todo-app-js-4hjn.onrender.com/api/items';
// const API_URL = 'http://localhost:3000/api/items'; // Локальный URL

// Получение токена текущего пользователя
async function getAuthHeaders() {
  try {
    const token = await getUserToken(auth);
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  } catch (error) {
    console.error("Ошибка получения токена:", error);
    throw new Error("Необходимо авторизоваться.");
  }
}

// Получение списка элементов для текущего пользователя
export async function fetchItems() {
  const headers = await getAuthHeaders();
  const response = await fetch(API_URL, { headers });
  if (!response.ok) {
    throw new Error("Ошибка получения списка элементов");
  }
  return response.json();
}

// Создание нового элемента для текущего пользователя
export async function createItem(data) {
  const headers = await getAuthHeaders();
  const response = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Ошибка создания элемента");
  }
  return response.json();
}

// Обновление элемента
export async function updateItem(id, data) {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Ошибка обновления элемента");
  }
  return response.json();
}

// Удаление элемента
export async function deleteItem(id) {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers,
  });
  if (!response.ok) {
    throw new Error("Ошибка удаления элемента");
  }
}
