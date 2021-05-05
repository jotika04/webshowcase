import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function Test(){
    const url = 'https://ghibliapi.herokuapp.com/films'
  
        const [data, setData] = useState([])
      
        useEffect(() => {
          axios.get(url).then(json => setData(json.data))
        }, [])
      
        const renderTable = () => {
          return data.map(user => {
            return (
              <tr>
                <td>{user.id}</td>
                <td>{user.title}</td>
                <td>{user.original_title}</td>
                <td>{user.director}</td> 
              </tr>
            )
          })
        }
      
        return (
          <div>
            <h1 id="title">AXIOS TESTING</h1>
            <table id="users"> 
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Original Title</th>
                  <th>Director</th>
                </tr>
              </thead>
              <tbody>{renderTable()}</tbody>
            </table>
          </div>
        )
}