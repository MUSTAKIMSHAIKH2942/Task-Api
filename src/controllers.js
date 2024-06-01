let tasks = [];
let currentId = 1;

const getTasks = (req, res) => {
  res.status(200).json(tasks);
};

const getTaskById = (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.status(200).json(task);
};

const createTask = (req, res) => {
  const { title, description, priority, due_date } = req.body;
  if (!title || !description || !due_date || !priority) {
    return res.status(400).json({ error: 'Title, description, priority, and due_date are required' });
  }
  const newTask = { id: currentId++, title, description, priority, due_date };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

const updateTask = (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  const { title, description, priority, due_date } = req.body;
  if (!title || !description || !due_date || !priority) {
    return res.status(400).json({ error: 'Title, description, priority, and due_date are required' });
  }
  task.title = title;
  task.description = description;
  task.priority = priority;
  task.due_date = due_date;
  res.status(200).json(task);
};

const deleteTask = (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  tasks.splice(taskIndex, 1);
  res.status(204).send();
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
