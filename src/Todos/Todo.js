"use client"
import React, { useState, useEffect } from 'react';
 
function Todo() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
 
  useEffect(() => {
    fetchTodos();
  }, []);
 
  const fetchTodos = async () => {
    try {
      const response = await fetch('https://backendhub-mq9d.onrender.com/api/todos/get-all');
      if (response.ok) {
        const data = await response.json();
        setTodos(data);
      } else {
        console.error('Error fetching todos:', response.status);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };
 
  const containerStyle = {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
  };
 
  const inputContainerStyle = {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
  };
 
  const buttonStyle = {
    padding: '8px',
    cursor: 'pointer',
    borderRadius: '4px',
  };
 
  const addButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
  };
 
  const updateButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#2196f3',
    color: 'white',
    border: 'none',
  };
 
  const todosListStyle = {
    listStyleType: 'none',
    padding: '0',
  };
 
  const todoItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #ddd',
    marginBottom: '5px',
    padding: '8px',
  };
 
  const editButtonStyle = {
    padding: '6px',
    cursor: 'pointer',
    marginLeft: '5px',
    backgroundColor: '#2196f3',
  };
 
  const deleteButtonStyle = {
    padding: '6px',
    cursor: 'pointer',
    marginLeft: '5px',
    backgroundColor: '#f44336',
    color: 'white',
  };
 
  const handleAddTodo = async () => {
    try {
      const response = await fetch('https://backendhub-mq9d.onrender.com/api/todos/createTodo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: todo }),
      });
 
      if (response.ok) {
       
        fetchTodos();
      } else {
        console.error('Error adding todo:', response.status);
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setTodo('');
    }
  };
 
  const handleUpdateTodo = async () => {
    if (!selectedTodo) return;
 
    try {
      const response = await fetch(`https://backendhub-mq9d.onrender.com/api/todos/updateTodo/${selectedTodo._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: todo }),
      });
 
      if (response.ok) {
       
        fetchTodos();
        setSelectedTodo(null);
      } else {
        console.error('Error updating todo:', response.status);
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    } finally {
      setTodo('');
    }
  };
 
  const handleDeleteTodo = async (todoId) => {
    try {
      const response = await fetch(`https://backendhub-mq9d.onrender.com/api/todos/delete/${todoId}`, {
        method: 'DELETE',
      });
 
      if (response.ok) {
       
        fetchTodos();
      } else {
        console.error('Error deleting todo:', response.status);
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };
 
  const handleEditTodo = (todo) => {
    setTodo(todo.title);
    setSelectedTodo(todo);
  };
 
  return (
    <div style={containerStyle}>
      <h1>Todo app</h1>
      <div style={inputContainerStyle}>
        <input
          type="text"
          placeholder="Add/Update Todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        {!selectedTodo ? (
          <button style={addButtonStyle} onClick={handleAddTodo}>
            Add Todo
          </button>
        ) : (
          <button style={updateButtonStyle} onClick={handleUpdateTodo}>
            Update Todo
          </button>
        )}
      </div>
 
      <ul style={todosListStyle}>
        {todos.map((t) => (
          <li key={t._id} style={todoItemStyle}>
            <span>{t.title}</span>
            <div>
              <button style={editButtonStyle} onClick={() => handleEditTodo(t)}>
                Edit
              </button>
              <button style={deleteButtonStyle} onClick={() => handleDeleteTodo(t._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
 
export default Todo;
 