'use client';

import { useState } from 'react';
import { useNode } from '@craftjs/core';
import { cn } from '@/lib/utils/cn';
import { ChevronDown } from 'lucide-react';
import type { FAQProps, FAQItem } from '@/types/builder';

export const FAQ = ({
  items = [
    { question: 'How long do I have access to the course?', answer: 'You have lifetime access to all course materials.' },
    {
      question: 'What if I need help during the course?',
      answer: 'We offer 24/7 support through our community forums and direct instructor access.',
    },
    {
      question: 'Is there a refund policy?',
      answer: 'Yes, we offer a 30-day money-back guarantee if you\'re not satisfied.',
    },
  ],
  accentColor = '#0ea5e9',
}: Partial<FAQProps>) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div ref={(ref) => {
      if (ref) connect(drag(ref));
    }} className="w-full max-w-3xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left"
            >
              <span className="font-semibold text-lg">{item.question}</span>
              <ChevronDown
                className={cn('w-5 h-5 transition-transform', openIndex === index && 'rotate-180')}
                style={{ color: accentColor }}
              />
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-gray-50 border-t">
                <p className="text-gray-700">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

import { FAQSettings } from './FAQSettings';

FAQ.craft = {
  displayName: 'FAQ',
  props: {
    items: [
      { question: 'What is this course about?', answer: 'This course covers everything you need to know.' },
      { question: 'Do I get a certificate?', answer: 'Yes, upon completion you will receive a certificate.' },
    ],
    accentColor: '#3b82f6',
  },
  related: {
    settings: FAQSettings,
  },
};
