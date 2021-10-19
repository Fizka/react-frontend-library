import React from 'react';
import axios from "axios";
import {getAuthUserSession} from "../service/user-service";
import "../css/books.css"
import {Book} from "../model/book";
import {url_dashboard} from "../constant/url";

export default function AddBook() {

    const author = React.createRef();
    const title = React.createRef();
    const year = React.createRef();

    function postBook(book) {
        axios.post(url_dashboard, JSON.stringify(book), {
            headers: {
                'Authorization': getAuthUserSession(),
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                alert("Książka została dodana.")
            })
            .catch(function (error) {
                if (error.status === 400) {
                    alert('Ta książka nie może zostać dodana');
                } else {
                    alert('Wystąpił error w czasie dodawania książki.')
                }
                console.log(error)
            });
    }

    function handleSubmitAdd(evt) {
        evt.preventDefault()
        let bookForRequest = new Book(title.current.value, author.current.value, year.current.value)
        postBook(bookForRequest);
    }

    return (<form className="forms-input" onSubmit={handleSubmitAdd.bind(this)}>
        <input className="input-class" type="text" placeholder="Autor" ref={author}/>
        <br/>
        <input className="input-class" type="text" placeholder="Tytuł" ref={title}/>
        <br/>
        <input className="input-class" type="number" placeholder="Rok" ref={year}/>
        <br/>
        <button className="btn" type="submit">
            Zatwierdź
        </button>
    </form>);

}

