import './modal.css';
import CustomSelect from '../widgets/customWidgets/CustomSelect';

const AddTask = ({ newTask, setNewTask, taskDetails, setTaskDetails, setOpenModal }) => {

    const handleChange = (e, field) => {
        const { value } = e.target;
        setNewTask(prev => ({ ...prev, [field]: value }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newTask.taskName || !newTask.duration || !newTask.category) return;
        setTaskDetails([
            ...taskDetails,
            {
                ...newTask,
                id: Date.now(),
                duration: Number(newTask.duration),
                remaining: Number(newTask.duration),
                running: false
            }
        ]);
        setNewTask({ taskName: "", duration: "", category: "" });
    };
    const options = ['study', 'work out', 'break'];


    return (
        <div className="modalOverlay">
            <div className="modal-content">
                <span onClick={() => setOpenModal(false)} className="close">
                    X
                </span>
                <div className="modal-form">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="taskName">Task Name</label>
                            <input type="text" value={newTask['taskName']} onChange={(e) => handleChange(e, 'taskName')} className='input-tag' placeholder='Enter Task Name' />
                        </div>
                        <div className="input-group">
                            <label htmlFor="duration">Duration</label>
                            <input type="number" min="1" max="3600" placeholder="Duration (seconds)" value={newTask['duration']} onChange={(e) => handleChange(e, 'duration')} className='input-tag' />
                        </div>
                        <div className="input-group">
                            <label>Category</label>
                            <CustomSelect placeholder={'select category'} selectedValue={newTask['category']} onChange={(e) => handleChange(e, 'category')} options={options} /> 
                        </div>
                        <button>Add Task</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddTask