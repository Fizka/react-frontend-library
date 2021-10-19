import React, {useEffect, useState} from 'react';
import axios from "axios";
import {getAuthUserSession} from "../service/user-service";
import "../css/books.css"
import "../css/books.css"
import {url_dashboard} from "../constant/url";

export default function RemoveBook() {

    const [list, setList] = useState([]);

    useEffect(() => {
        let mounted = true;
        getBookRequest(mounted);
        return () => mounted = false;
    }, [console.log(list)])

    function getBookRequest(mounted) {
        axios.get(url_dashboard, {
            headers: {
                'Authorization': ' ' + getAuthUserSession(),
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                response.data.forEach(e => {
                    console.log(e)
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
    }

    function deleteBook(id) {
        axios.delete(url_dashboard + '/' + id, {
            headers: {
                'Authorization': getAuthUserSession(),
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                alert("Książka została usunieta.")
                window.location.reload(false);
            })
            .catch(function (error) {
                if (error.status === 404) {
                    alert("Książka, którą próbujesz usunąć nie znajduje się w bazie.")
                } else {
                    alert("Wystąpił bład w czasie usuwania książki.")
                }
                console.log(error);
            });
    }

    function removeBookFromList(e) {
        deleteBook(e)
    }

    return (
        <div>
            <h1>Lista książek:</h1>
            <ul>
                {list.map((item, index) => <li key={Math.random().toString(36).substr(2, 9)}>
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
                        <button onClick={removeBookFromList.bind(null, item.idBook)} className={'btn-small'}>
                            Usuń Książke
                        </button>
                    </div>
                </li>)}
            </ul>
        </div>
    )

}
