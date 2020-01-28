import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { isProd } from "../config";

import thunk from "redux-thunk";
import logger from "redux-logger";

import { user } from "./reducers/user";

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
        combineReducers({ user }),
        composeEnhancers(applyMiddleware(...middleware))
    );

    return store;
};

export default ConfigureStore;
