import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';


function BookList() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/books')
            .then(response => response.json())
            .then(data => {
                setBooks(data);
            });
    }, []);

    return (
        <>
            <div className="booklist-container">
                <div className="booklist">

                </div>
            </div>
        </>
    )
}

export default BookList;