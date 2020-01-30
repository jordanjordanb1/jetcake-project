import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.scss';
import { Provider } from 'react-redux'
import { store, persistor } from './redux/ConfigureStore'
import { PersistGate } from 'redux-persist/integration/react'
import Main from './components/MainPage/Main';
import AuthGuard from './components/AuthGuard/AuthGuard';

const PostLogin = React.lazy(
    () => import('./components/PostLogin/PostLogin')
)

const Dashboard = React.lazy(
    () => import('./components/Dashboard/Dashboard')
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
                                <PostLogin />
                            </Suspense>
                        </AuthGuard>

                        <AuthGuard to="/dashboard">
                            <Suspense fallback={<div>Loading...</div>}>
                                <Dashboard />
                            </Suspense>
                        </AuthGuard>
                    </Switch>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
}

export default App;
