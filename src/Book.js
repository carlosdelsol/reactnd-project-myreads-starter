import React, { Component } from 'react';
import BookShelfChanger from './BookShelfChanger'

class Book extends Component {
  render() {
    const { cover, title, authors } = this.props
    
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${cover})` }}></div>
          <BookShelfChanger />
        </div>
        <div className="book-title">{ title }</div>
        <div className="book-authors">{ authors }</div>
      </div>
    )
  }
}

export default Book
