import { useContext } from "react";
import { TodoContext } from "../Context/TodoContext";

const Todos = () => {
  const { todos } = useContext(TodoContext);

  return (
    <div>
      <div className="todo-container">
        {todos ? (
          todos.map((todo) => {
            return (
              <div className="todo-item" key={todo.id}>
                <p>{todo.title}</p>
              </div>
            );
          })
        ) : (
          <p>Todos are empty</p>
        )}
      </div>
    </div>
  );
};

export { Todos };
