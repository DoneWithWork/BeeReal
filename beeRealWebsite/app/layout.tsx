import type { Metadata } from 'next';
import './globals.css';
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
      <body className="w-full bg-blue-50">{children}</body>
    </html>
  );
}
