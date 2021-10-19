import React from 'react';
import './App.css';
import Dashboard from "./components/dashboard";
import Login from "./components/login";
import useAuthUser from "./service/user-service";


function App() {
    const {user, setUser} = useAuthUser();

    function logoutUser() {
        sessionStorage.clear();
        window.location.reload(false);
    }

    if (!user) {
        return <Login setUser={setUser}/>
    }
    return (
        <div className="App">
            <header className="App-header">
                Biblioteka
                <button className={'logout-btn btn'} onClick={logoutUser}>
                    Wyloguj
                </button>
            </header>
            <Dashboard/>
        </div>
    );
}

export default App;
