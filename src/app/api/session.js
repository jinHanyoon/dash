'use client';
import { useEffect, useState } from 'react';
import supabase from './supabb';


const useUserSession = () => {
    const [Username, setUserName] =useState('')
    const [ShowWriting, setShowWriting] = useState(false);
    const [ShowLogin, setShowLogin] = useState(false);


useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setShowLogin(false);
        const user = session.user;
        const { data, error } = await supabase.from('profiles').select('username').eq('id', user.id).single();
        setUserName(data.username);
        console.log(user)

      } else {
            setShowLogin(true);
            setUserName('')

    }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setShowLogin(true);
        const user = session.user;
        const fetchUsername = async () => {
          const { data, error } = await supabase.from('profiles').select('username').eq('id', user.id).single();
          if (data) {
            setUserName(data.username)

          } else {
          }
        };
        fetchUsername();
      } else {
        setShowLogin(false);
        setUserName('')

      }
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();

      }
    };
  }, []);
  return { ShowWriting, ShowLogin,Username };

}

export default useUserSession;
