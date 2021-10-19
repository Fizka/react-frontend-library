import React, {Component} from "react";
import {getUserPermission} from "../service/user-service";
import Book from "./book";
import AddBook from "./new-book";
import RemoveBook from "./remove-book";
import "../css/books.css"

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showTabBook: 1,
            permissionAdmin: false
        };
    }

    getTabBook(val) {
        this.setState({showTabBook: val})
        this.checkRefresh(val)
    }

    checkRefresh(checker) {
        if (checker === 1) {
            window.location.reload(false);
        }
    }

    render() {
        return (<div className={'page-wrapp'}>
                <button onClick={this.getTabBook.bind(this, 1)} className={'btn'}> Lista</button>
                <button onClick={this.getTabBook.bind(this, 2)}
                        className={getUserPermission() ? 'show btn' : 'show-none'}> Dodaj
                </button>
                <button onClick={this.getTabBook.bind(this, 3)}
                        className={getUserPermission() ? 'show btn' : 'show-none'}> Usuń
                </button>

                <div className={this.state.showTabBook === 1 ? 'show' : 'show-none'}>
                    <Book/>
                </div>
                <div className={this.state.showTabBook === 2 ? 'show' : 'show-none'}>
                    <AddBook/>
                </div>
                <div className={this.state.showTabBook === 3 ? 'show' : 'show-none'}>
                    <RemoveBook/>
                </div>
            </div>
        );
    }

}

export default Dashboard;
