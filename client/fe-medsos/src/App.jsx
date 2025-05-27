import Router from "./pages/Router";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import { persistStore } from "redux-persist";
import { store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const persistor = persistStore(store)

const App = () => {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </PersistGate>
    </Provider>)
}

export default App