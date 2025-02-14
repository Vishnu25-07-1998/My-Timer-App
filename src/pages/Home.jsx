import { useState, useEffect } from "react";
import AddTask from "../modals/AddTask";


const Home = () => {
  const [taskDetails, setTaskDetails] = useState(() => {
    const savedTasks = localStorage.getItem("taskDetails");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState({ taskName: "", duration: "", category: "" });
  const [openModal, setOpenModal] = useState(false);



  useEffect(() => {
    localStorage.setItem("taskDetails", JSON.stringify(taskDetails));
  }, [taskDetails]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}min : ${secs < 10 ? "0" : ""}${secs}sec`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTaskDetails((tasks) =>
        tasks.map((task) => {
          if (task.running && task.remaining > 0) {
            return { ...task, remaining: task.remaining - 1, status: "Running" };
          } else if (task.remaining === 0 && task.running) {
            const completedTask = { ...task, completedAt: new Date().toLocaleString() };
            const storedHistory = JSON.parse(localStorage.getItem("history")) || [];
            const updatedHistory = [...storedHistory, completedTask];
            localStorage.setItem("history", JSON.stringify(updatedHistory));
            return { ...task, running: false, status: "Completed" };
          }
          return task;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleTimer = (id) => {
    setTaskDetails((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, running: !task.running, status: task.running ? "Paused" : "Running" } : task
      )
    );
  };

  const resetTimer = (id) => {
    setTaskDetails((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, remaining: task.duration, running: false, status: "Pending" } : task))
    );
  };

  return (
    <div className="wrapper">
      <nav className="navbar">
        <h3>Tick Track</h3>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="#" onClick={() => setOpenModal(true)}>Add Task</a>
          <a href="/history">History</a>
        </div>
      </nav>
      <main className="main-content">
        <div className="task-list">
          {taskDetails.map((item) => (
            <div key={item.id} className="tasks">
              <div className="task-title">
                <p className="task-head">{item.taskName}</p>
                <p className="task-head">{item.category}</p>
              </div>
              <p className="time">Duration: {formatTime(item.duration)}</p>
              <p className="time">Remaining: {formatTime(item.remaining)}</p>
              <p className="time">status: {item.status}</p>
              <progress value={item.remaining} max={item.duration}></progress>
              <div className="buttons">
                <button onClick={() => toggleTimer(item.id)}>
                  {item.status === "Completed" ? "Start" : item.running ? "Pause" : item.remaining === item.duration ? "Start" : "Resume"}
                </button>
                <button onClick={() => resetTimer(item.id)}>Reset</button>
              </div>
            </div>
          ))}
        </div>
      </main>
      {openModal && <AddTask setOpenModal={setOpenModal} newTask={newTask} setNewTask={setNewTask} taskDetails={taskDetails} setTaskDetails={setTaskDetails} />}
    </div>
  );
};

export default Home;