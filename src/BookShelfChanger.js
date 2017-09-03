import React from 'react';

function BookShelfChanger(props) {
  return (
    <div className="book-shelf-changer">
      <select defaultValue={props.getShelf(props.book.id)} 
              onChange={event => props.onUpdateBook(props.book, event.target.value)}>
        <option value="" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  )
}

export default BookShelfChanger
