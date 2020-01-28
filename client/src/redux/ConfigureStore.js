import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'
import { isProd } from "../config";

import thunk from "redux-thunk";
import logger from "redux-logger";

import { user } from "./reducers/user";

const persistConfig = {
    key: 'root',
    storage
}

const pReducer = persistReducer(persistConfig, combineReducers({ user }))

export const ConfigureStore = () => {
    let middleware = [];

    if (isProd()) {
        middleware = [...middleware, thunk];
    } else {
        middleware = [...middleware, thunk, logger];
    }

    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        pReducer,
        composeEnhancers(applyMiddleware(...middleware))
    );

    return store;
};

const store = ConfigureStore(),
    persistor = persistStore(store)

export { persistor, store }
