import { useState, useRef } from 'react';
import './index.css';

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const descriptionRef = useRef(null);

  const addTask = () => {
    if (title.trim()) {
      setTasks([...tasks, { title, description, completed: false }]);
      setTitle('');
      setDescription('');
    }
  };

  const deleteTask = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  const toggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setEditTitle(tasks[index].title);
    setEditDescription(tasks[index].description);
  };

  const saveEdit = (index) => {
    const updated = [...tasks];
    updated[index].title = editTitle;
    updated[index].description = editDescription;
    setTasks(updated);
    setEditIndex(null);
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      descriptionRef.current?.focus();
    }
  };

  const handleDescriptionKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addTask();
    }
  };

  const handleEditKeyDown = (e, index) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveEdit(index);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="todo-container">
        <h2 className="header">📝 My ToDo List</h2>

        <input
          type="text"
          placeholder="Title (e.g. Buy groceries)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleTitleKeyDown}
        />

        <textarea
          ref={descriptionRef}
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={handleDescriptionKeyDown}
          rows="2"
        />

        <button onClick={addTask}>Add Task</button>

        <ul>
          {tasks.map((task, i) => (
            <li key={i}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(i)}
              />

              <div className={`task-details ${task.completed ? 'completed' : ''}`}>
                {editIndex === i ? (
                  <>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onKeyDown={(e) => handleEditKeyDown(e, i)}
                      className="edit-input"
                    />
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      onKeyDown={(e) => handleEditKeyDown(e, i)}
                      className="edit-textarea"
                      rows="2"
                    />
                    <button onClick={() => saveEdit(i)} className="save-btn">
                      💾 Save
                    </button>
                  </>
                ) : (
                  <>
                    <strong>{task.title}</strong>
                    {task.description && <p>{task.description}</p>}
                  </>
                )}
              </div>

              {editIndex !== i && (
                <div className="action-buttons">
                  <button onClick={() => startEditing(i)}>✏️</button>
                  <button onClick={() => deleteTask(i)}>❌</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
