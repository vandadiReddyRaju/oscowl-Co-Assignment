import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after logout

function Home() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const navigate = useNavigate(); // For navigating after logout

  // Load tasks from local storage on component mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks); // Set the tasks to the state
  }, []);

  // Update local storage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks)); // Save tasks to local storage
    }
  }, [tasks]);

  // Handle input change
  const handleInputChange = (e) => setTaskInput(e.target.value);

  // Add new task
  const addTask = () => {
    if (taskInput.trim()) {
      const newTask = { id: Date.now(), text: taskInput, completed: false };
      setTasks([...tasks, newTask]); // Add new task to the list
      setTaskInput(''); // Clear input field
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id)); // Filter out the task to delete
  };

  // Logout functionality (navigate to login page)
  const logout = () => {
    localStorage.removeItem('authToken'); // Remove auth token
    navigate('/login'); // Navigate to login page
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <span style={styles.title}>Todos</span>
        <button style={styles.logoutButton} onClick={logout}>
          Logout
        </button>
      </nav>

      {/* Task Input Section */}
      <section style={styles.taskInputSection}>
        <input
          type="text"
          value={taskInput}
          onChange={handleInputChange}
          placeholder="Enter a new task"
          style={styles.input}
        />
        <button onClick={addTask} style={styles.addButton}>Add Task</button>
      </section>

      {/* Task List */}
      <ul style={styles.taskList}>
        {tasks.map(task => (
          <li key={task.id} style={styles.taskItem}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
              style={styles.checkbox}
            />
            <span
              style={{
                ...styles.taskText,
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? '#999' : '#333'
              }}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)} style={styles.deleteButton}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Inline styles for enhanced visual appearance
const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', padding: '0 10px' },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '98%',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: '0px', // Full width
    position: 'fixed', // Keep navbar on top
    top: 0,
    left: 0,
    zIndex: 10,
  },
  title: { fontSize: '1.5em', fontWeight: 'bold' },
  logoutButton: {
    backgroundColor: 'blue',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '0.9em'
  },
  taskInputSection: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '600px',
    marginTop: '80px', // Adjust for fixed navbar
    gap: '8px'
  },
  input: { flex: 1, padding: '10px', fontSize: '1em', borderRadius: '5px', border: '1px solid #ddd' },
  addButton: {
    backgroundColor: "blue",
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '1em'
  },
  taskList: {
    listStyle: 'none',
    padding: '0',
    marginTop: '20px',
    width: '100%',
    maxWidth: '600px',
  },
  taskItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    marginBottom: '5px'
  },
  checkbox: {
    marginRight: '10px',
    transform: 'scale(1.2)',
    cursor: 'pointer'
  },
  taskText: { flex: 1, cursor: 'pointer', fontSize: '1em' },
  deleteButton: {
    backgroundColor: 'blue',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '0.9em'
  }
};

export default Home;
