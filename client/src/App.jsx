import { NavBar } from "./Components/Navbar";
import { Form } from "./Components/Form";
import { Todos } from "./Components/Todos";

const App = () => {
  return (
    <div>
      <NavBar />
      <Form />
      <Todos />
    </div>
  );
};

export default App;
