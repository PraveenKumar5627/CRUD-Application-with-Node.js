
import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"
function App() {
  const [users, setUsers] = useState([])
  const [filterUsers, setFilterUser] = useState([])
  const getAllUsers = async () => {
    await axios.get(`http://localhost:8000/users`).then
      ((res) => {
        setUsers(res.data)
        setFilterUser(res.data)
      });
  }
  useEffect(() => {
    getAllUsers();

  }, [])
  function handleSearch(e) {
    console.log(e.target.value)
    const searchText = e.target.value.toLowerCase()
    const filtered = users.filter((user) => (
      user.name.toLowerCase().includes(searchText) ||
      user.city.toLowerCase().includes(searchText)))
    setFilterUser(filtered)
  }
  const handleDelete = async (id) => {
    const isconfirmed = window.confirm("Are you sure want to delter this user..")
    if (isconfirmed) {
      const res = await axios.delete(`http://localhost:8000/users/:${id}`)
      setUsers(res.data)
      setFilterUser(res.data)
    }
    else{
      console.log("some erre")
    }

  }

  return (
    <>
      <div className="container">
        <h3>CRUD application with react.js
          Frontendand node.js Backend
        </h3>
        <div className="input-search">
          <input type="text" placeholder='Search Here..Dude' onChange={handleSearch} />
          <button className='btn green'>Add Record</button></div>
        <table className='table'>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
              <th >Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filterUsers && filterUsers.map((user, index) =>
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.city}</td>
                <td> <button className='btn green'>Edit</button></td>
                <td ><button className='btn red' onClick={() => handleDelete(user.id)}>Delete</button></td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </>
  )
}
export default App
