'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../api/supabb';
import LoginForm from '../component/loginForm';
export default function LoginPage() {
    const router = useRouter();
    const [message, setMessage] = useState('');
  
    const handleLogin = async (email, password) => {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
  
      if (signInError) {
        setMessage(signInError.message);
        return;
      }
  
      setMessage('로그인 성공!');
      setTimeout(() => {
        router.push('/');
      }, 0);
    };

    return(
<LoginForm onLogin ={handleLogin}/>
    )
}
