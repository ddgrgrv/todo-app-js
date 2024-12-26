import React from 'react';
import { marked } from 'marked'; // Подключаем библиотеку для рендеринга Markdown

function ItemList({ items, onDelete, onEdit }) {
  return (
    <div className="item-list">
      <h2>Список задач</h2>
      <ul>
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item._id}>
              <h3>{item.name}</h3>
              <div
                className="description"
                dangerouslySetInnerHTML={{
                  __html: marked(item.description), // Рендерим Markdown в HTML
                }}
              />
              <div className="btn-inner">
                <button onClick={() => onDelete(item._id)}>Удалить</button>
                <button onClick={() => onEdit(item)}>Редактировать</button>
              </div>
            </li>
          ))
        ) : (
          <p>Задачи не найдены.</p>
        )}
      </ul>
    </div>
  );
}

export default ItemList;
