import { useState, useEffect } from "react";

const History = () => {

    const [taskHistory, setTaskHistory] = useState(() => {
        const savedHistory = localStorage.getItem("history");
        return savedHistory ? JSON.parse(savedHistory) : [];
    });

    useEffect(() => {
        localStorage.setItem("history", JSON.stringify(taskHistory));
    }, [taskHistory]);


    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}min : ${secs < 10 ? "0" : ""}${secs}sec`;
    };

    return (
        <div className="wrapper">
            <nav className="navbar">
                <h3>Tick Track</h3>
                <div className="nav-links">
                    <a href="/">Home</a>
                    <a href="/history">History</a>
                </div>
            </nav>
            <main className="main-content">
                <div className="task-history">
                    <p className="history-title">History</p>
                    {taskHistory.length === 0 ? (
                        <p>No completed tasks yet.</p>
                    ) : (
                        taskHistory.map((task, index) => (
                            <div key={index} className="tasks">
                                <h3>{task.taskName} - {task.category}</h3>
                                <p>Completed At: {task.completedAt}</p>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default History;