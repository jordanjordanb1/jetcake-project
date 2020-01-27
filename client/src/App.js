import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.scss';
import { Provider } from 'react-redux'
import { ConfigureStore } from './redux/ConfigureStore'
import Main from './components/MainPage/Main';

const store = ConfigureStore()

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Main />
                    </Route>
                </Switch>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
