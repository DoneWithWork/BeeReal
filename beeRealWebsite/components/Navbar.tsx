import React from 'react';
import Badge from './Badge';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex flex-row justify-between items-center px-4 py-5 bg-blue-100 shadow-sm">
      <Link href={'/'} className="flex flex-row items-center gap-4">
        <Image
          src={'/128beeReal.png'}
          width={50}
          height={50}
          alt="main image"
        />
        <p className="font-semibold text-2xl">BeeReal</p>
      </Link>

      <Badge />
    </nav>
  );
}
