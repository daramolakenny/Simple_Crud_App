import { useState, useEffect } from "react";

const Table = ({users, setFormData, setIsEditing, setEditId, getAllData}) => {

  // Delete
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/user/${id}`, {
         method: 'DELETE'
      });
      if(!res.ok){
        throw new Error(`Fail to delete user ${res.status}`);
      }

      const result = await res.json();
      console.log('Deleted', result);
      alert('User deleted successfully!');
      getAllData();  
    } catch (error) {
      console.log('error deleting data', error);
    }
  };

  const handleUpdate = (user) => {
    console.log("Editing user:", user);
    setFormData({
      username: user.username,
      description: user.description,
      email: user.email
    });
    setIsEditing(true);
    setEditId(user.id);
  };

  return (
    <div className='pt-6 font-bold text-2xl'>
      {/* <Search /> */}
      <form >
        <table className='border py-4'>
          <thead className="border">
            <tr className="py-6 text-3xl">
              <th>S/N</th>
              <th>Name</th>
              <th>Description</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr 
                key={user.id}
                className="p-2 justify-evenly"
              >
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.description}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleUpdate(user)}
                    className="rounded-2xl bg-green-400 p-2"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleDelete(user.id)}
                    className="rounded-2xl bg-red-600 p-2"
                  >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </form>
    </div>
  )
}

export default Table