import React from 'react';
import BookShelfChanger from './BookShelfChanger'

function Book(props) {
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.book.imageLinks.thumbnail})` }}></div>
        <BookShelfChanger book={props.book} getShelf={props.getShelf} onUpdateBook={props.onUpdateBook} />
      </div>
      <div className="book-title">{props.book.title}</div>
      <div className="book-authors">{props.book.authors}</div>
    </div>
  )
}

export default Book
