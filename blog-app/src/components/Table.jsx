

const Table = ({users, setFormData, setIsEditing, setEditId, getAllData}) => {

  // Delete
  const handleDelete = async (id) => {
    try {
      console.log("Deleting user with ID:", id);
      const res = await fetch(`http://localhost:3000/api/users/${id}`, {
         method: 'DELETE',
         headers: {
          'Content-type': 'application/json'
         }
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
      name: user.name,
      description: user.description,
      email: user.email
    });
    setIsEditing(true);
    setEditId(user._id);
  };

  return (
    <div className='mt-16 font-bold text-2xl shadow-2xl'>
      {/* <Search /> */}
      <form >
        <table className='w-full border-gray-200'>
          <thead className="border border-gray-200">
            <tr className="text-3xl">
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
                <td className="border border-gray-200">{user.id}</td>
                <td className="border border-gray-200">{user.name}</td>
                <td className="border border-gray-200">{user.description}</td>
                <td className="border border-gray-200">{user.email}</td>
                <td className="border border-gray-200">
                  <button
                    type="button"
                    onClick={() => handleUpdate(user)}
                    className="rounded-2xl bg-green-400 text-white text-[14px] p-1.5"
                  >
                    Edit
                  </button>
                </td>
                <td className="border border-gray-300">
                  <button
                    type="button"
                    onClick={() => handleDelete(user._id)}
                    className="rounded-2xl bg-red-600 text-white text-[14px] p-1.5"
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