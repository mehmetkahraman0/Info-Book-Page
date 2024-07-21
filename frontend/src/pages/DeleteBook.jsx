import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const DeleteBook = () => {
  const [book, setBook] = useState({});


  const { id } = useParams()
  const navigation = useNavigate()
  const id1 = id.slice(1)
  useEffect(() => {
    axios.get(`http://localhost:5555/books/${id1}`)
      .then(res => {
        setBook(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  },[])
  console.log(book)
  const handleDelete = () => {
    axios.delete(`http://localhost:5555/books/${id1}`)
      .then(() => {
        navigation("/");
      })
      .catch(err => {
        console.log(err);
      })
  }
  return (
    <div>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <p>{book.publishYear}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default DeleteBook
