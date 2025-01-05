import Link from 'next/link';
import React from 'react';
import { buttonVariants } from './ui/button';
import { SiGithub } from '@icons-pack/react-simple-icons';

export default function Github() {
  return (
    <Link
      href={'https://github.com/DoneWithWork/BeeReal'}
      className={buttonVariants({ size: 'lg' })}
    >
      <SiGithub className="h-20" />
      <span className="text-sm sm:text-lg">Github</span>
    </Link>
  );
}
