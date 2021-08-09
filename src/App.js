import "./App.css";
import TaskList from "./components/TaskList";
import { Provider } from "react-redux";
import store from "./reducer/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <TaskList />
      </div>
    </Provider>
  );
}

export default App;
