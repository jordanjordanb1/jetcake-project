import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.scss';
import { Provider } from 'react-redux'
import { store, persistor } from './redux/ConfigureStore'
import { PersistGate } from 'redux-persist/integration/react'
import Main from './components/MainPage/Main';
import AuthGuard from './components/AuthGuard/AuthGuard';

const Login = React.lazy(
    () => import('./components/Login/Login')
)

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/">
                            <Main />
                        </Route>

                        <AuthGuard to="/login">
                            <Suspense fallback={<div>Loading...</div>}>
                                <Login />
                            </Suspense>
                        </AuthGuard>
                    </Switch>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
}

export default App;
