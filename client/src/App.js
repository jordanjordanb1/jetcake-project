import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.scss';
import { Provider } from 'react-redux'
import { store, persistor } from './redux/ConfigureStore'
import { PersistGate } from 'redux-persist/integration/react'
import Main from './components/MainPage/Main';
import AuthGuard from './components/AuthGuard/AuthGuard';

const Setup = React.lazy(
    () => import('./components/Setup/Setup')
)

const Dashboard = React.lazy(
    () => import('./components/Dashboard/Dashboard')
)

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/">
                            <Main />
                        </Route>

                        <AuthGuard path="/dashboard">
                            <Suspense fallback={<div>Loading...</div>}>
                                <Dashboard />
                            </Suspense>
                        </AuthGuard>


                        <AuthGuard to="/setup">
                            <Suspense fallback={<div>Loading...</div>}>
                                <Setup />
                            </Suspense>
                        </AuthGuard>
                    </Switch>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
}
