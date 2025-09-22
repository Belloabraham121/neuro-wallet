'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const refreshToken = searchParams.get('refresh');
    const error = searchParams.get('message');

    if (error) {
      toast.error('Authentication failed. Please try again.');
      router.push('/auth/signin');
      return;
    }

    if (token && refreshToken) {
      // Store tokens in localStorage
      localStorage.setItem('accessToken', token);
      localStorage.setItem('refreshToken', refreshToken);
      
      // Get user info from token (you might want to decode JWT or make an API call)
      toast.success('Successfully signed in with Google!');
      router.push('/dashboard');
    } else {
      toast.error('Authentication failed. Missing tokens.');
      router.push('/auth/signin');
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-background grid-pattern flex items-center justify-center p-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Completing authentication...</p>
      </div>
    </div>
  );
}