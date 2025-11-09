import React, { useState } from 'react';
import { Link } from 'react-router-dom';  

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    displayName: '',
    email: '',
    // password: 
    // profession: ''
  });

   function onDelete() {
        console.log("clicked");
        const formData = getValues();
        if (!formData.ppeCode || !formData.ppeDesc) {
            return Alert.fire('Check again!', 'All fields are required to delete this element item.', 'warning')
        }

        const payload = { ...formData, userCode: auth.userCode, moduleCode: auth.moduleCode, formCode: '10102' };

        console.log(payload);
        Alert.fire({
            title: "Are you sure you want to delete?",
            text: "This record will be deleted permanently.",
            icon: "question",
            showDenyButton: true,
            focusDeny: true,
            denyButtonText: 'Not really',
            confirmButtonText: 'Yes!'
        }).then (async result => {
            if (result.isConfirmed) {
               const {success, error} = await deletePPEGroupSetup(payload);

               if(success){
                Alert.fire("Success", "Record Deleted Successfully", "success")
                router.push('/ppegrouplist');
               }else{
                Alert.fire("Opps...", "Something went Wrong Contact the System Administrator", "error")
               }
            }
        })
    }

    // Put
  // const handleUpdate = async (id) => {
  //   try {
  //     const res = await fetch(`http://localhost:3000/api/user/${id}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-type' : 'application/json'
  //       },
  //       body: JSON.stringify({
  //         username: users.username,
  //         description: users.description,
  //         email: users.email
  //       })
  //     });

  //     if(!res.ok){
  //       throw new error(`Fail to update user data ${res.status} ${res.statusText}`)
  //     }
  //     const result = await res.json();
  //     console.log('Updated succesfully!', result);
  //     alert('Updated successfully');
      
  //   } catch (error) {
  //     console.log('Fail to update user data', error);
  //     alert('Fail to update user data.');
  //   }
  // }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior

    try {
      console.log("Submitting:", formData);
      const response = await fetch('http://localhost:3000/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('successfull');
        
        alert('User registered successfully!');
        setFormData({ username: '', description: '', email: '' });
      } else {
        alert('Failed to register user.');
        console.log('Failed to register user.', response);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className='w-full bg-linear-to-r from-slate-50 to-slate-300 text-slate-700 mx-auto my-16 shadow-lg p-4'>
      <h2 className='text-3xl'>Enter your Details</h2>

      <form onSubmit={handleSubmit} className='max-w-[800px] text-start'>
        {['username', 'displayName', 'email'].map((field) => (
          <div key={field} className='w-full flex flex-col text-[26px] py-2'>
            <label>
              {field.charAt(0).toUpperCase() + field.slice(1)}:
              <input
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className='border border-slate-700 rounded-md ml-4'
                required
              />
            </label>
          </div>
        ))}

        <div className='mt-10 item-center text-center'>
          <button type='submit' className='bg-blue-500 text-white rounded-md p-2 text-2xl'>Submit</button>
          {/* <Link to='/view'> */}
            <button type='button' className='bg-gray-900 mx-2 text-white rounded-md p-2 text-2xl'>View</button>
          {/* </Link> */}
        </div>
      </form>

      <div >
        <table>
          <thead>Displayed Information</thead>

          <tbody>

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Register;









// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// const Register = () => {
//   const dispatch = useDispatch();
//   const data = useSelector((state) => state.data);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     profession: ''  
//   });

//   return (
//     <div className='w-full bg-linear-to-r from-slate-50 to-slate-100 text-slate-700 mx-auto my-16 shadow-lg p-4'>
//       <h2 className='text-3xl'>Enter your Details</h2>
      
//       <form action="post" method="post" className='max-w-[800px] text-start'>
//         <div className='w-full flex flex-col text-[26px] py-2'>
//           <label htmlFor="">
//             Username: 
//             <input 
//               type="text" 
//               name="name" 
//               placeholder='Username' 
//               className='border border-slate-700 rounded-md ml-4' 
//               required 
//             />
//           </label>
//         </div>

//         <div className='w-full flex flex-col text-[26px] pb-2'>
//           <label htmlFor="">
//             Email: 
//             <input 
//               type="email" 
//               name="email" 
//               placeholder='Email' 
//               className='border border-slate-700 rounded-md ml-16 ' 
//               required 
//             />
//           </label>
//         </div>

//         <div className='w-full flex flex-col text-[26px] pb-2'>
//           <label htmlFor="">
//             Password: 
//             <input 
//               type="number" 
//               name="password" 
//               placeholder='Password' 
//               className='border border-slate-700 rounded-md ml-4' 
//               required 
//             />
//           </label>
//         </div>

//         <div className='w-full flex flex-col text-[26px] pb-2'>
//           <label htmlFor="">
//             Profession: 
//             <input 
//               type="text" 
//               name="profession" 
//               placeholder='Profession' 
//               className='border border-slate-700 rounded-md ml-4' 
//               required 
//             />
//           </label>
//         </div>

//         <div className='mt-10 item-center text-center'>
//           <button type='submit' className='bg-blue-500 text-white rounded-md p-2 text-2xl'>Submit</button>
//           <button type='button' className='bg-gray-900 mx-2 text-white rounded-md p-2 text-2xl'>View</button>
//         </div>

//       </form>
//     </div>
//   )
// }

// export default Register


// // import React from 'react';
// // import { Link } from 'react-router-dom';


// // const Register = () => {

// //   const handleSubmit = (e) => {

// //   }

// //   return (
// //     <div>
// //       {/* <div className='w-full max-w-[600px] mx-auto my-16 p-4'>
// //        <h3 className=''>WELCOME to my Page. Kindly Provide Your Information for </h3>
// //         <form action="POST" onSubmit={handleSubmit} className='w-full'>
// //             <div className="grid grid-cols-2 gap-4 w-full py-2">
// //               <input type="text" id="name" name="Name" className='border border-black' required />
// //               <input type="text" id='age' name='Age' required />
// //               <input type="email" id='email' name='Email' required />
// //               <input type="text" id='gender' name='Gender' required />
// //               <input type="text" id='contact' name='Contact' required />

// //               <div className='flex flex-col'>
// //                 <button type='submit' className='text-blue-500'>Submit</button>
// //                 <Link to="/table">
// //                   <button type='button' className='border border-black'>View</button>
// //                 </Link>
// //               </div>
// //             </div>
// //         </form>
// //     </div> */}
// //     </div>
// //   )
// // }

// // export default Register