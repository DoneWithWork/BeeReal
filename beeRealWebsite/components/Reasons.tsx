import React from 'react';

const reasons = [
  {
    title: 'Shop Smarter',
    description: 'Save money while you shop for no added cost',
  },
  {
    title: 'Your data is your data',
    description: 'We do not sell your data to third-party companies',
  },
  {
    title: 'Open Source',
    description:
      'Fork It, Build it locally, do whatever you like with it. It is open source',
  },
];
export default function Reasons() {
  return (
    <div className="mx-3 my-40">
      <p className="heading-title text-5xl text-center">Why Choose BeeReal</p>
      <p className="text-center mt-5 text-lg text-gray-700">
        Join Smart Shoppers who save valuable time and hard earned cash with
        BeeReal
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-8 w-full mt-10">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className="bg-gray-50 p-6 shadow-lg rounded-lg space-y-3"
          >
            <p className="font-bold text-2xl">{reason.title}</p>
            <p className="text-gray-700 font-semibold">{reason.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
