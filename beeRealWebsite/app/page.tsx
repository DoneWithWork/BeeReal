'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { Card } from '@/components/ui/card';
import Github from '@/components/Github';
import Footer from '@/components/Footer';
import Contribute from '@/components/Contribute';
import Badge from '@/components/Badge';
import FAQ from '@/components/FAQ';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Reasons from '@/components/Reasons';
export default function Home() {
  const [message, setMessage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/hello');
      const { message } = await res.json();
      setMessage(message);
    };
    fetchData();
  }, []);

  return (
    <div className="">
      <nav className="flex flex-row justify-between items-center px-4 py-5">
        <p>BeeReal</p>
        <Badge />
      </nav>
      <div className="max-w-[1300px] mx-auto flex flex-col items-center text-center mt-20 h-screen">
        <h2 className="heading-title">
          Unlock Instant{' '}
          <span className="w-full text-green-600 underline leading-snug">
            Savings
          </span>{' '}
          <br /> Accross The Web
        </h2>
        <p className="text-gray-600 font-semibold text-sm sm:text-lg mt-5 max-w-[60ch] mx-auto">
          Say goodbye to searching and overspending—BeeReal finds coupon codes
          on thousands of your favorite sites.
        </p>
        <div className="mt-10 flex flex-row items-center gap-10">
          <Link
            href={'https://github.com/DoneWithWork/BeeReal'}
            className={buttonVariants({ size: 'lg' })}
          >
            <SiGithub className="h-20" />
            <span className="text-lg">Github</span>
          </Link>
          <Link
            href={'https://github.com/DoneWithWork/BeeReal'}
            className={buttonVariants({ size: 'lg' })}
          >
            <SiGithub className="h-20" />
            <span className="text-lg">Github</span>
          </Link>
        </div>
      </div>
      <MaxWidthWrapper>
        <Reasons />
      </MaxWidthWrapper>

      <MaxWidthWrapper>
        <FAQ />
      </MaxWidthWrapper>
      <section>
        <Contribute />
      </section>
      <Footer />
    </div>
  );
}
