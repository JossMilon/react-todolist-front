import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import axios from "axios";

const Task = ({index, task, taskArray, setTaskArray, taskCompletedArray, setTaskCompletedArray}) => {
    const handleCompletion = (index) => {
        const newTaskCompletedArray = [...taskCompletedArray];
        newTaskCompletedArray[index] = newTaskCompletedArray[index]? false: true;
        setTaskCompletedArray(newTaskCompletedArray);
      };
    const handleRemove = (index) => {
        const newTaskArray = [...taskArray];
        newTaskArray.splice(index, 1);
        setTaskArray(newTaskArray);
        axios.post("https://react-todolist-jm.herokuapp.com/delete-task", {
            task: taskArray[index]
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    }
    return (
        <div className='task'>
            <input onChange={() => handleCompletion(index)} type="checkbox" id={index} name={index} checked={taskCompletedArray[index]? true: false}/>   
            <label htmlFor={index} className={taskCompletedArray[index]? "strikeThrough": "Regular"}>{task}</label>  
            <FontAwesomeIcon icon="trash-alt" className='trash' onClick={() => handleRemove(index)}/>
        </div>
    )
}

export default Task;