import { useState, useEffect } from 'react';
import Table from './Table';

const Infor = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        email: ''
    });
    const [users, setUsers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((pre) => ({
                ...pre,
                [name]: value
            })
        );
    };

      // Read
  const getAllData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/users", {
        method: "GET",
        headers: {
          "Content-type": "application/json"
        }
      });

      if(!res.ok){
        throw new Error(`Failed to fetch data: ${res.status}`)
      }

      const data = await res.json();
      console.log("result -> ", data);

        if(Array.isArray(data)) {
            setUsers(data);
        } else return [];

        } catch (e) {
        console.log("error at fetching -> ", e);
        return [];
        }
    }

    useEffect(() => {
        getAllData();
    }, []);

    // Post
    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = isEditing ? 'PUT' : 'POST';
        const url = isEditing ? `http://localhost:3000/api/users/${editId}` : 'http://localhost:3000/api/users';

        try {
            console.log("Editing user:", users);
            console.log("Form data before submit:", formData);
            console.log('Submitting:', formData);
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if(!formData.email.includes('@')){
                alert('Please enter a valid email address');
            }

            if(response.ok){
                console.log('successful');
                alert(isEditing ? 'User updated successfully!' : 'Data submitted successfully!');
                setFormData({ name: '', description: '', email: '' });
                setIsEditing(false);
                setEditId(null);
                getAllData();
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong.');
        }
    };

  return (
    <div className='w-full h-full'>
        <div className='lg:max-w-2xl md:max-w-120 max-w-5xl text-[18px] md:text-[20px] md:px-10'>
            <form onSubmit={handleSubmit} className='w-full text-center p-4 shadow-2xl'>
                {['name', 'description', 'email'].map((field) => (
                    <div key={field} className='w-full py-2 flex font-bold'>
                        <label>
                            {field.charAt(0).toUpperCase() + field.slice(1)}:
                            <input 
                                type={field === 'password' ? 'password' : 'text'} 
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)} 
                                className='border border-slate-100 shadow pl-2 py-2 ml-3'
                                required
                            />
                        </label>
                    </div>
                ))}
                <div className='mt-10 items-center text-center'>
                    <button type='submit' className='bg-blue-500 text-white font-bold px-4 py-2 rounded-md mt-4 hover:bg-blue-950'>Submit</button>
                    {isEditing && (
                        <button
                            onClick={() => {
                                setFormData({name: '', description: '', email: '' });
                                setIsEditing(false);
                                setEditId(null);
                            }}
                            className='border bg-gray-600 text-white py-2 px-4 rounded-md'
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>

        <Table
            users={users}
            setUsers={setUsers}
            setFormData={setFormData}
            setIsEditing={setIsEditing}
            setEditId={setEditId}
            getAllData={getAllData}
        />
    </div>
  )
}

export default Infor
