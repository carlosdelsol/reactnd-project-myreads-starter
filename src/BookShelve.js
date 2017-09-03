import React from 'react';
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

const shelves = [{id:"currentlyReading", title:'Currently Reading'},
                 {id:"wantToRead", title:'Want to Read'},
                 {id:"read", title:'Read'}]

function BookShelve(props) {
    return (
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                {shelves.map(shelf => (
                  <BookShelf key={shelf.id}
                             title={shelf.title} 
                             books={props.bookShelves.filter((b) => b.shelf === shelf.id)} 
                             getShelf={props.getShelf}
                             onUpdateBook={props.onUpdateBook} />
                ))}
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
        </div>
    )
}

export default BookShelve
