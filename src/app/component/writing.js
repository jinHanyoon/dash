'use client'
import Image from "next/image";
import { useEffect, useState } from 'react';
import supabase from "../api/page";
import LoginForm from "./loginForm";



export default function Writing({}) {
    const [page01, setData] = useState([]);
    const [titleValue, setTitleValue] = useState('');
    const [bodyValue, setBodyValue] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
  

    const handleSubmit = async () => {
        try {
          const { data: error } =await supabase.from('page01').insert([{ title:titleValue, body:bodyValue },]);
          setData([...page01]);
        // 새로운 데이터가 추가된 후에 페이지 데이터에 반영
          // 입력 필드 초기화
          setTitleValue('');
          setBodyValue('');
          setShowForm(false)
        } 
        catch (error){
          console.log('데이터 추가 중 오류 발생',error)
        } 
      };

    const toggleForm = () => {
        setShowForm(true);
    };
  
    const CloseForm = () => {
      setShowForm(false);
  };
  const handleLoginClick = () => {
    setShowLoginForm(true);
};

const closeLoginForm = () => {
    setShowLoginForm(false);
};


const handleLogin = async (username, password) => {
  const { error: signInError } = await supabase.auth.signInWithPassword({ email: username, password });
  if (signInError) {
      setMessage(signInError.message);
      return { error: signInError.message };
  }
  setTimeout(() => {
      setShowLoginForm(false);
  }, 1000);
  return { success: true };
};

    return (
    <>
  <div onClick={toggleForm} className= ' fixed z-40 right-10 bottom-10 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>글쓰기</div> 
  <div  onClick={handleLoginClick} className= ' fixed z-40 right-40 bottom-10 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>로그인</div> 

  {showLoginForm && (
                <LoginForm onClose={closeLoginForm} onLogin={handleLogin} />
            )}

{showForm  && (
        <div className='bg-neutral-500/50 w-full h-screen fixed z-50 top-0' >
          <div className='w-9/12 h-full m-auto relative flex flex-col items-end'  >
      <div className='absolute top-14 right-2 w-8 h-1/10 bg-rose-400 hover:bg-rose-500 rounded-full text-center font-bold text-white leading-loose' onClick={CloseForm}>X</div>

          <input
            className="block  p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-12 "
            placeholder="제목"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
          />
          <textarea
            className="block p-2.5 h-96 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1"
            placeholder="내용"
            value={bodyValue}
            onChange={(e) => setBodyValue(e.target.value)}
          />
          <div onClick={handleSubmit} className='text-white text-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-20 mt-3'>저장</div>
          </div>
        </div>
      )}

    </>


  );
}
