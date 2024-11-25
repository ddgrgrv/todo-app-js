import React from 'react';

function ItemList({ items, onDelete, onEdit }) {
  return (
    <div className="item-list">
      <h2>Список задач</h2>
      <ul>
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item._id}>
              {item.name}
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
