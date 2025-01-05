import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const question = [
  {
    title: 'Is BeeReal really free?',
    description: 'Yes, BeeReal is free to use. No hidden or sneaky charges.',
  },
  {
    title: "What's the catch?",
    description:
      'No catch!  We do not partner with any third-party company to sell your data. We are solely funded and supported by the community and contributors. In Short, we are a community-driven project.',
  },
  {
    title: 'How does BeeReal work?',
    description:
      'BeeReal is a browser extension that automatically finds and applies coupon codes at checkout with a single click. We scan the web for usable coupon codes and apply them at checkout. Really simple stuff',
  },
  {
    title: 'How does BeeReal make money?',
    description:
      "We don't. BeeReal is a community-driven project and is not for profit. We are solely funded and supported by the community and contributors.",
  },
  {
    title: 'How do I contribute?',
    description:
      'We love contributions of any kind - from code, documentation, bugs to even new features. Check out our Github page for more information',
  },
];
export default function FAQ() {
  return (
    <Accordion type="single" collapsible className="w-full my-4">
      <h3 className="heading-title text-4xl text-center">FAQ</h3>
      {question.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.description}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
