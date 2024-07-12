'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../api/supabb';
import LoginForm from '../component/loginForm';
export default function LoginPage() {
    const router = useRouter();
    const [message, setMessage] = useState('');


    // const handleLogin = async (email, password) => {
    //   const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
  
    //   if (signInError) {
    //     return;
    //     { error: signInError.message };
    //   setMessage('로그인 성공!');

    //   }


    //   setTimeout(() => {
    //     router.push('/');
    //   }, 0);
    //   };
      

    const handleLogin = async (email, password) => {
      let signInError;
      if (!email || !password) {
        signInError = { message: '이메일과 비밀번호를 입력해주세요.' };
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        signInError = error;
      }
      if (signInError) {
        if (signInError.message === 'Invalid login credentials') {
          return { error: password + "<br />" + "이거 맞아?" };
        }
        if (signInError.message === 'User not found') {
          return { error: '이메일' };
        }
        return { error: signInError.message };
      }
        router.push('/');
    };
  




    return(
      <>
<LoginForm onLogin ={handleLogin}/>

 </>
    )
}
