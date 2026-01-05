/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  // 1. Fetch Tasks (Existing logic)
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get('/tasks');
        setTasks(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // 2. Create Task Logic
  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/tasks', { title, description });
      
      // Update state so the new task appears immediately!
      setTasks([...tasks, response.data]); 
      
      // Clear the form
      setTitle('');
      setDescription('');
    } catch {
      alert("Failed to create task");
    }
  };

  // 3. Delete Task Logic
  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this task?")) return; // Added this line
  try {
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter(task => task.id !== id));
  } catch (err) {
    alert("Failed to delete task");
  }
};

// 4. Logout Logic
const handleLogout = () => {
  localStorage.removeItem('token');
  navigate('/login'); // Use this instead of window.location.href
};

// 5. Navigation Hook
const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Task Dashboard</h1>
          <button onClick={handleLogout} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
            Logout
          </button>
        </div>

        {/* CREATE TASK FORM */}
        <form onSubmit={handleCreateTask} className="bg-white p-6 rounded-lg shadow-sm mb-8 space-y-4">
          <input 
            type="text" placeholder="Task Title" value={title}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setTitle(e.target.value)} required
          />
          <textarea 
            placeholder="Description (optional)" value={description}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + Add Task
          </button>
        </form>

        {/* TASK LIST */}
        <div className="space-y-3">
          {loading ? (
            /* Loading State: Shows a spinning circle while fetching data */
            <div className="flex flex-col items-center justify-center p-10">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
              <p className="text-gray-500 mt-4 text-sm">Fetching your tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            /* Empty State: Shows when the user has 0 tasks */
            <div className="text-center p-10 bg-white rounded-lg border-2 border-dashed border-gray-200">
              <p className="text-gray-500">No tasks yet. Start by adding one above!</p>
            </div>
          ) : (
            /* Data State: Maps through and displays your tasks */
            tasks.map((task) => (
              <div
                key={task.id}
                className="flex justify-between items-start bg-white p-4 rounded shadow-sm border-l-4 border-blue-400 hover:shadow-md transition-shadow"
              >
                <div>
                  <h3 className="font-bold text-gray-800">{task.title}</h3>
                  <p className="text-gray-600 text-sm">{task.description}</p>
                </div>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-50 text-red-600 px-3 py-1 rounded text-sm hover:bg-red-600 hover:text-white transition-colors"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;