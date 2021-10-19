import React, {useEffect, useState} from 'react';
import axios from "axios";
import {getAuthUserSession} from "../service/user-service";
import "../css/books.css"
import {url_dashboard} from "../constant/url";

export default function Book() {
    const [list, setList] = useState([]);

    useEffect(() => {
        let mounted = true;
        axios.get(url_dashboard, {
            headers: {
                'Authorization': ' ' + getAuthUserSession(),
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                response.data.forEach(e => {
                    if (mounted) {
                        setList(prevMovies => ([...prevMovies, ...e]))
                    }
                })
            })
            .catch(function (error) {
                if (error.status === 404) {
                    alert("Wszystkie książki zostały wypożyczone.")
                } else {
                    alert("Wstąpił error w czasie pobierania książek.")
                }
                console.log(error);
            });
        return () => mounted = false;
    }, [console.log(list)])

    return (
        <div>
            <h1>Lista książek:</h1>
            <ul>
                {list.map((item) => <li key={Math.random().toString(36).substr(2, 9)}>
                    <div className={'wrapp'}>
                        <div className=".list-element">
                            Tytuł: {item.title}
                        </div>
                        <div className=".list-element">
                            Autor: {item.author}
                        </div>
                        <div className=".list-element">
                            Rok: {item.year}
                        </div>
                    </div>
                </li>)}
            </ul>
        </div>
    )
}
