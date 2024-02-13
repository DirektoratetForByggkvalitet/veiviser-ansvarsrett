import {
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { state } from "losen";
import schema from "./api/ansvarsrett";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }
}

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({ [state.NAME]: state.reducer(schema) });

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

let persistor = persistStore(store);

export { store, persistor };
