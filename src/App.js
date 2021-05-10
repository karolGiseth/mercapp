import { Provider } from "react-redux";
import generateStore from "./redux/store";
import { Routes } from "./routes/Routes";

function App() {
  const store = generateStore();
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
