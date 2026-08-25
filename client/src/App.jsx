
import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"
function App() {
  const [users, setUsers] = useState([])
  const [filterUsers, setFilterUser] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userData, setUserData] = useState({ name: "", age: "", city: "" })
  function handleAddRecords() {
    setIsModalOpen(true)
    console.log("modal")
    setUserData({name:"",age:"",city:""})
  }

  function closeModal() {
    setIsModalOpen(false)
    getAllUsers()
  }
  function handleData(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }
 
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
      const res = await axios.delete(`http://localhost:8000/users/${id}`)
      setUsers(res.data)
      setFilterUser(res.data)
    }
    else {
      console.log("some erre")
    }


  }
  async function handleOver(e) {
    e.preventDefault()
    if (userData.id) {
      await axios.patch(`http://localhost:8000/users/${userData.id}`, userData).then((res) => {
        console.log(res)
      })
    } else{
      await axios.post(`http://localhost:8000/users/`, userData).then((res) => {
      console.log(res)
    })
  }

  closeModal()
  }
   function updateRecord(user) {
    setUserData(user)
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="container">
        <h3>CRUD application with react.js
          Frontendand node.js Backend
        </h3>
        <div className="input-search">
          <input type="text" placeholder='Search Here..Dude' onChange={handleSearch} />
          <button className='btn green' onClick={handleAddRecords}>Add Record</button></div>
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
                <td> <button className='btn green' onClick={() => updateRecord(user)}>Edit</button></td>
                <td ><button className='btn red' onClick={() => handleDelete(user.id)}>Delete</button></td>
              </tr>)}
          </tbody>
        </table>
        {isModalOpen && (<div className='modal'>
          <div className="modal-content">
            <span className='close' onClick={closeModal}>&times;</span>
           <h2>{userData.id?"Update Record":"Add Record"}</h2>
            <div className="input-group">
              <label htmlFor="name">Full Name:</label>
              <input type="text" placeholder='Enter a Name:' name='name' onChange={(e) => handleData(e)} value={userData.name} /></div>
            <div className="input-group">
              <label htmlFor="age">Age:</label>
              <input type="number" placeholder='Enter a Age:' name='age' onChange={(e) => handleData(e)}  value={userData.age}/></div>
            <div className="input-group">
              <label htmlFor="city">City:</label>
              <input type="text" placeholder='Enter a City:' name='city'  value={userData.city}
                onChange={(e) => handleData(e)} /></div>
            <button className='btn green' onClick={handleOver}>{userData.id?"Update Record":"Add Record"}</button>
          </div>
        </div>
        )}
      </div>
    </>
  )
}
export default App
