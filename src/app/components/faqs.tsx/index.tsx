import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [faqs] = useState<FAQItem[]>([
    { question: "What are the museum's opening hours?", answer: "We are open from 9 AM to 5 PM, Tuesday through Sunday." },
    { question: "Is parking available?", answer: "Yes, we have a parking lot available for visitors." },
    { question: "Do you offer guided tours?", answer: "Yes, guided tours are available at an additional cost." },
  ]);

  return (
    <div className="my-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{faq.question}</h3>
            <p className="mt-2 text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
