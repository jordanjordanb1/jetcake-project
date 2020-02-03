import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.scss';
import { Provider } from 'react-redux'
import { store, persistor } from './redux/ConfigureStore'
import { PersistGate } from 'redux-persist/integration/react'
import Main from './components/MainPage/Main';
import AuthGuard from './components/AuthGuard/AuthGuard';

const Dashboard = React.lazy(
    () => import('./components/Dashboard/Dashboard')
)

const Settings = React.lazy(
    () => import('./components/Settings/Settings')
)

const Setup = React.lazy(
    () => import('./components/Setup/Setup')
)

export default function App() {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <BrowserRouter>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Switch>
                                <Route exact path="/">
                                    <Main />
                                </Route>

                                <AuthGuard path={'/dashboard'}>
                                    <Dashboard />
                                </AuthGuard>

                                <AuthGuard path={"/setup"}>
                                    <Setup />
                                </AuthGuard>

                                <AuthGuard path={"/settings"}>
                                    <Settings />
                                </AuthGuard>
                            </Switch>
                        </Suspense>
                    </BrowserRouter>
                </PersistGate>
            </Provider >
        </React.StrictMode>
    );
}
