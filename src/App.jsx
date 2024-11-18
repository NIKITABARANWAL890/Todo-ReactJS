import { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import './App.css';

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]); // Added completedTodos state
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleAddTodo = () => {
    if (!newTitle.trim() || !newDescription.trim()) {
      alert("Both Title and Description are required!");
      return;
    }

    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    setNewTitle("");
    setNewDescription("");
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = `${dd}-${mm}-${yyyy} at ${h}:${m}:${s}`;

    let completedItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    // Remove the item from allTodos and add it to completedTodos
    let updatedAllTodos = [...allTodos];
    updatedAllTodos.splice(index, 1);
    setTodos(updatedAllTodos);

    let updatedCompletedTodos = [...completedTodos];
    updatedCompletedTodos.push(completedItem);
    setCompletedTodos(updatedCompletedTodos);
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    if (savedTodo) {
      setTodos(savedTodo);
    }
  }, []);

  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the title?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the task description?"
            />
          </div>
          <div className="todo-input-item">
            <button type="button" onClick={handleAddTodo} className="primaryBtn">
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${!isCompleteScreen && 'active'}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen && 'active'}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
          {/* Display Incomplete Todos */}
          {!isCompleteScreen &&
            allTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <MdDelete className="icon" onClick={() => handleDeleteTodo(index)} />
                  <IoMdCheckmark
                    className="check-icon"
                    onClick={() => handleComplete(index)}
                  />
                </div>
              </div>
            ))}

          {/* Display Completed Todos */}
          {isCompleteScreen &&
            completedTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <small>Completed On: {item.completedOn}</small>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
