import { Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ProfileProvider, useProfile } from '@/context/ProfileContext';
import { ToastContainer } from 'react-toastify';
const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    throw new Error('NEXT_PUBLIC_GOOGLE_CLIENT_ID is not defined');
  }
  
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <ProfileProvider>
            <GoogleOAuthProvider clientId={clientId}>
            <SidebarProvider>{children}</SidebarProvider>
            <ToastContainer style={{ top: '6rem' }} />
            </GoogleOAuthProvider>
          </ProfileProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
