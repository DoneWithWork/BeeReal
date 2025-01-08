import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SiHomepage } from '@icons-pack/react-simple-icons';
import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[300px]">
      <p className="text-4xl font-semibold text-black">404 Not Found</p>
      <Link href={'/'} className={cn(buttonVariants({ size: 'lg' }), 'mt-5')}>
        <SiHomepage className="h-20" />
        <span className="text-lg">Home</span>
      </Link>
    </div>
  );
}
