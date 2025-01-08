import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className=" bg-gray-800 text-white py-8">
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-5  px-10 py-10">
        <div>
          <p className="font-bold text-lg">Support</p>
          <ul className="space-y-4 mt-4 ">
            <li>
              <Link href={'https://github.com/DoneWithWork/BeeReal'}>
                Github
              </Link>
            </li>
            <li>
              <Link href={'/privacy'}>Privacy Policy</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-bold text-lg">Download Extension</p>
          <ul className="space-y-4 mt-4 ">
            <li>
              <Link
                href={
                  'https://chromewebstore.google.com/detail/syrup-open-beta/kaafcgngoeipfldbnkpbajlplemhcnbl'
                }
                target="_blank"
                referrerPolicy="no-referrer"
              >
                Chrome
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <hr className="border-[0.5px] border-gray-500 mx-auto w-[95%] mt-10" />
      <p className="text-center mt-5">@ 2025 - BeeReal. All rights reserved</p>
    </footer>
  );
}
