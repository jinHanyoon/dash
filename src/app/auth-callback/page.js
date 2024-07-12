'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../api/supabb'; // 실제 경로로 수정하세요

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSessionFromUrl({
        storeSession: true,
      });

      if (error) {
        console.error('Error handling auth callback:', error);
      } else {
        router.push('/');

      }
    };

    handleAuthCallback();
  }, [router]);

  return <div>Authenticating...</div>;
}