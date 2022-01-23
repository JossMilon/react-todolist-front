//Import CSS
import "./App.css";

import axios from "axios";

//Import components
import Task from "./components/task";

//Import states
import {useEffect, useState} from "react";

//FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
library.add(faTrashAlt);

function App() {
  const [taskValue, setTaskValue] = useState("");
  const [taskArray, setTaskArray] = useState([]);
  const [taskCompletedArray, setTaskCompletedArray] = useState([false]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchTask = async () => {
      const response = await axios.get("https://react-todolist-jm.herokuapp.com/");
      setTaskArray(response.data);
      setIsLoading(false);
    };
    fetchTask();
  }, []);
  const handleChange = (e) => {
    setTaskValue(e.target.value);
  };
  const handleClick = () => {
    if (taskValue !== "") {
      const newTaskArray = [...taskArray, taskValue];
      setTaskArray(newTaskArray);
      setTaskValue("");
      axios.post("https://react-todolist-jm.herokuapp.com/add-task", {
        task: taskValue
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };
  return (
    isLoading? <span>Wait for tasks to load</span>:
    <div className="container">
      <div className="tasksAdded">
        {taskArray.map((task, index) => {
          return (
            <Task key={index} index={index} task={task} taskArray={taskArray} setTaskArray={setTaskArray} taskCompletedArray={taskCompletedArray} setTaskCompletedArray={setTaskCompletedArray}/>
          )
        })}
      </div>
      <div className="taskInput">
        <input onChange={handleChange} type="text" placeholder="Add new task" value={taskValue}/>
        <input onClick={handleClick} type="button" value="Add task"/>
      </div>
    </div>
  );
}

export default App;
