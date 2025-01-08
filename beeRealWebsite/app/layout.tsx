import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
export const metadata: Metadata = {
  title: 'BeeReal',
  description: 'BeeReal - A better Alternative to Honey',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full bg-blue-50">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
