import React, {useState} from 'react';
import {getLogin} from "../service/user-service";

export default function Login({setUser}) {
    const [login, setUserName] = useState();
    const [pass, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        await getLogin(
            login,
            pass,
            {setUser}
        );
    }

    return (
        <div>
            <header className="App-header">Logowanie</header>
            <form onSubmit={handleSubmit}>
                <div className="loginput forms-input">
                    <input className={'input-class'} type="text" name="login"
                           onChange={e => setUserName(e.target.value)}/>
                    <br/>
                    <input className={'input-class'} type="password" name="pass"
                           onChange={e => setPassword(e.target.value)}/>
                    <br/>
                    <button className={'btn'} type="submit">Submit</button>
                </div>
            </form>
        </div>
    );


}


