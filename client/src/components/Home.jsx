import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({name: "", email: ""});
  useEffect(() => {
    const user = async ()=>{
      try {
        const res = await axios.post('http://localhost:5000/api/auth/user',{
          token: sessionStorage.getItem('token')
        },{credentials: 'include'});
        setUserInfo({name: res.data.data.name, email: res.data.data.email})
        console.log(res);
      } catch (error) {
        console.log(error);
        navigate('/signin');
      }

    }
    user();
    
  
   
  }, [navigate])

  const handleLogOut = async ()=>{
    try {
      const res = await axios.get('http://localhost:5000/api/auth/logout');
      navigate('/signin');
    } catch (error) {
      console.log(error);
    }

  }
  
  return (
    <div className={`h-screen flex flex-col gap-5 justify-center items-center`}>
      <div>
        <p className="text-6xl font-mono font-semibold text-orange-600">Hello {userInfo.name}</p>
        <p className="text-xl text-center mt-2 text-gray-400">{userInfo.email}</p>
      </div>
        <button onClick={handleLogOut} className="bg-blue-500 hover:bg-blue-600 text-white px-5 rounded py-3">Log Out</button>  
    </div>
  )
}

export default Home