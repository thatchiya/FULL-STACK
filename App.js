import React, { useEffect, useState } from "react"
import axios from "axios"

const API = "http://localhost:5000/tasks"

export default function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")

  useEffect(() => {
    axios.get(API).then((res) => setTasks(res.data))
  }, [])

  const addTask = () => {
    axios.post(API, { title: newTask, completed: false }).then((res) => {
      setTasks([...tasks, res.data])
      setNewTask("")
    })
  }

  const toggleTask = (task) => {
    axios.put(`${API}/${task._id}`, { ...task, completed: !task.completed }).then((res) => {
      setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)))
    })
  }

  const deleteTask = (id) => {
    axios.delete(`${API}/${id}`).then(() => {
      setTasks(tasks.filter((t) => t._id !== id))
    })
  }

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="New task" />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className={task.completed ? "done" : ""}>
            {task.title}
            <button onClick={() => toggleTask(task)}>{task.completed ? "Undo" : "Done"}</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
