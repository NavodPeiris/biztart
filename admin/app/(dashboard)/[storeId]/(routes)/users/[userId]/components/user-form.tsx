
'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

export const Register = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [level, setLevel] = useState('content');
  const router = useRouter();
  const params = useParams();

  // Form Submit
  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const data = {
      email,
      password,
      level,
    }

  const result = await axios.post(`/api/${params.storeId}/users`, data);

  router.push(`/${params.storeId}/users`);

  };

  return (
    <div className='border p-5 rounded' style={{ width: '500px' }}>
      <h1 className='text-2xl mb-4'>Register</h1>
      
        <form onSubmit={handleSubmit} className='space-y-4 md:space-y-6'>
          
          <div>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900'
            >
              Email Address
            </label>
            <input
              type='email'
              name='email'
              id='email'
              onChange={(e) => setEmail(e.target.value)}
              className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5'
              placeholder='name@company.com'
              required={true}
            />
          </div>
          <div>
            <label
              htmlFor='password'
              className='block mb-2 text-sm font-medium text-gray-900'
            >
              Password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              onChange={(e) => setPassword(e.target.value)}
              className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5'
              required={true}
            />
          </div>
          <div>
            <label
              htmlFor='level'
              className='block mb-2 text-sm font-medium text-gray-900'
            >
              Level
            </label>
            <select
              name='level'
              id='level'
              onChange={(e) => {
                  console.log(e.target.value); 
                  setLevel(e.target.value);
                }
              }
              className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5'
              required={true}
            >
              <option value='content'>Content</option>
              <option value='product'>Product</option>
            </select>
          </div>
          <button
            type='submit'
            className='w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
          >
            Create an account
          </button>
        </form>
      
    </div>
  );
};

