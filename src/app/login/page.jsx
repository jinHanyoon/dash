'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../api/supabb';
import LoginForm from './loginForm';
export default function LoginPage({hidden_show}) {
    return(
      <>
<LoginForm hidden_show={hidden_show}/>
 </>
    )
}
