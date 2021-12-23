import React from 'react';
import './App.scss';
import Users from "./components/users/users";
import {BrowserRouter, Route, Routes, NavLink, HashRouter} from 'react-router-dom'
import User from "./components/user/user";

function App() {
    return (<div>

            <HashRouter>
                <NavLink to='/'>
                    <h1 className='tittle'>GitHub Searcher</h1>
                </NavLink>
                <Routes>
                    <Route path='/' element={<Users/>}/>
                    <Route path='user/:id' element={<User/>}/>
                    <Route
                        path="*"
                        element={
                            <main style={{padding: "1rem"}}>
                                <p>error page</p>
                            </main>
                        }
                    />
                </Routes>
            </HashRouter>

        </div>
    );
}

export default App;
