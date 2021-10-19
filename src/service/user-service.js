import axios from "axios";
import React, {useState} from 'react';
import {url_main} from "../constant/url";

export function getLogin(login, pass, {setUser}) {
    login= "admin";
    pass = "admin"
    axios.get("http://localhost:8080" + '/login', {
        headers: {
            'Authorization': getAuthUserPassword(login, pass),
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            setUser(login, pass);
            getPermission(login)
        })
        .catch(function (error) {
            if (error.status === 404) {
                alert("Konto o podanych danych nie istnieje!")
            } else if (error.status === 403) {
                alert("Nie masz dostępu.")
            } else if (error.status === 401) {
                alert("Nieautoryzowany dostęp.")
            } else {
                alert("Wystąpił błąd w czasie logowania.")
            }
            console.log(error);
        });
}

export function getPermission(login) {
    axios.get(url_main + '/dashboard/rola/' + login, {
        headers: {
            'Authorization': getAuthUserSession(),
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            setUserPermission(response.data)
        })
        .catch(function (error) {
            alert("Wystapił błąd w czasie sprawdzania uprawnień.")
            console.log(error);
        });
}

export default function useAuthUser() {
    const getUser = () => {
        const user = JSON.parse(sessionStorage.getItem('userAuth'));
        return !!user;
    };
    const [user, setUser] = useState(getUser());

    const getAuth = (login, haslo) => {
        return 'Basic ' + btoa(login + ':' + haslo);
    }

    const setUserAuth = (login, pass) => {
        sessionStorage.setItem('userAuth', JSON.stringify(getAuth(login, pass)));
        setUser(getAuth(login, pass))
    }

    return {
        setUser: setUserAuth,
        user
    }
}

export function getAuthUserPassword(login, haslo) {
    return 'Basic ' + btoa(login + ':' + haslo);
}

export function getAuthUserSession() {
    return JSON.parse(sessionStorage.getItem('userAuth'));
}

export function getUserPermission() {
    return JSON.parse(sessionStorage.getItem('permission')) === 'ADMIN';
}

export function setUserPermission(rola) {
    sessionStorage.setItem('permission', JSON.stringify(rola));
    window.location.reload(false);
}
