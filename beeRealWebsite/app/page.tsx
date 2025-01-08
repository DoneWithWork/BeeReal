'use client';
import { buttonVariants } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { SiGithub, SiGooglechrome } from '@icons-pack/react-simple-icons';

import Footer from '@/components/Footer';
import Contribute from '@/components/Contribute';
import FAQ from '@/components/FAQ';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Reasons from '@/components/Reasons';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <div className="">
      <div className="max-w-[1300px] mx-auto flex flex-col items-center text-center mt-10 md:mt-20">
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
        <div className="aspect-w-16 aspect-h-9 rounded-xl mt-10 md:mt-20 mx-2">
          <Image
            src={'/landing.png'}
            alt="landing image"
            width={900}
            height={800}
            className="object-cover rounded-xl"
          />
        </div>

        <div className="mt-10 flex flex-row items-center gap-10">
          <Link
            href={'https://github.com/DoneWithWork/BeeReal'}
            className={buttonVariants({ size: 'lg' })}
          >
            <SiGithub className="h-20" />
            <span className="text-lg">Github</span>
          </Link>
          <Link
            href={
              'https://chromewebstore.google.com/detail/syrup-open-beta/kaafcgngoeipfldbnkpbajlplemhcnbl'
            }
            className={cn(
              buttonVariants({ size: 'lg' }),
              'bg-orange-500 hover:bg-orange-600'
            )}
          >
            <SiGooglechrome className="h-20" />
            <span className="text-lg">Chrome</span>
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
