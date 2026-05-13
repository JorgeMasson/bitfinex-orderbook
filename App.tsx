import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./src/redux/app";
import { OrderBookScreen } from "./src/screens/OrderBookScreen";

export default function App() {
  return (
    <Provider store={store}>
      <OrderBookScreen />
      <StatusBar style="light" />
    </Provider>
  );
}
