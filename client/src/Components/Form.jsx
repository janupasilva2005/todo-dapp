import { useState } from "react";
import { useContext } from "react";
import { TodoContext } from "../Context/TodoContext";

const Form = () => {
  const [title, setTitle] = useState("");
  const { addTodoToBlockchain } = useContext(TodoContext);

  const handleSubmit = () => {
    if (!title) return alert("Please enter the title");

    addTodoToBlockchain(title);
    setTitle("");
  };

  return (
    <div className="form-container">
      <div className="form-item">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title here"
        />
      </div>
      <div className="form-item">
        <button onClick={handleSubmit}>Add</button>
      </div>
    </div>
  );
};

export { Form };
