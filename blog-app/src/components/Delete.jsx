import React, { useState } from 'react'

const Delete = () => {

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/user/${id}`, {
                method: 'DELETE'
            });
            if(!res.ok){
                throw new Error(`Failed to delete user ${res.status}`);
            }

            const result = await res.json();
            console.log('Deleted', result);
            alert('User deleted successfully!');
            
        } catch (error) {
            alert('Failed to delete user.');
            console.log('error deleting data', error);
        }
    }
    

  return (
    <div className='w-full'>
        <button 
            onClick={() => handleDelete(user.id)}
            className='rounded-2xl p-4'
        >
            Delete
        </button>
    </div>
  )
}

export default Delete