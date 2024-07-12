'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import supabase from '../../api/supabb';
import LoginForm from "../loginForm";
import Writing from '../writing';

import Image from "next/image";
import Link from "next/link";
export default function SideBar() {

    const [showLoginForm, setShowLoginForm] = useState(false);
    const [ShowWriting, setShowWriting] = useState(false);
    const [ShowLogin, setShowLogin] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [userName, setUserName] = useState('');

  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setShowWriting(true);  // 세션이 있을 때 상태 설정
        setShowLogin(true);
        const user = session.user;
        setUserName(user.user_metadata?.name || user.user_metadata?.nickname || 'uno');
      } else {
        setShowWriting(false);  // 세션이 없을 때 상태 설정
        setShowLogin(false);
        setUserName('');  
    }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setShowWriting(true);  // 세션이 변경될 때 상태 설정
        setShowLogin(false);
        const user = session.user;
        setUserName(user.user_metadata?.name || user.user_metadata?.nickname || 'uno');
      } else {
        setShowWriting(false);
        setShowLogin(true);
        setUserName(''); 
      }
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);





  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const closeLoginForm = () => {
    setShowLoginForm(false);
  };

  const handleLogin = async (username, password) => {
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: username, password });
    if (signInError) {
      return { error: signInError.message };
    }
    setTimeout(() => {
      setShowLoginForm(false);
      setShowWriting(true);  // 로그인 성공 시 상태 설정
      setShowLogin(false);
      setUserName(''); 
    }, 100);
    return { success: true };
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    setShowWriting(false);
    setShowLogin(true);
  };

  const toggleForm = () => {
    setShowForm(true);
};

const closeForm = () => {
  setShowForm(false);
};

  return (
  <>

{showLoginForm && (
    <>
                <LoginForm onClose={closeLoginForm} onLogin={handleLogin} />
  </>
 )}
     {showForm && (
        <Writing closeForm={closeForm} />
      )}

  {ShowWriting && (
    <>
  <div onClick={toggleForm} className= ' fixed z-40 right-10 bottom-10 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>글쓰기</div> 
    <div onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded absolute left-2/3 z-40 top-4 min-w-14">
      로그아웃
    </div>
  <div className= ' fixed z-40 right-40 bottom-10 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>{userName}</div> 

  </>
)}

  {ShowLogin && (
  
  <div  onClick={handleLoginClick} className= ' fixed z-40 right-40 bottom-10 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>로그인</div> 
)}
 </>

)}