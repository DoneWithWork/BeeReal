import React from 'react';
import { Card } from './ui/card';
import Github from './Github';

export default function Contribute() {
  return (
    <Card className="bg-blue-300 max-w-[90%] mx-auto my-20 px-8 py-4 shadow-lg space-y-3">
      <p className="font-bold text-2xl">Join Our Community</p>
      <p className="max-w-[80ch] text-sm sm:text-lg text-gray-700 font-semibold">
        Want to contribute and help out BeeReal? We love contributions of any
        kind - from code, documentation, bugs to even new features
      </p>
      <Github />
    </Card>
  );
}
