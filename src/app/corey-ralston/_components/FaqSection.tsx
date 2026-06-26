"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "Who is Corey Ralston?",
    answer: "Corey Ralston is a former child actor turned youth talent manager, acting coach, and the founder of Child Actor 101. He has over 20 years of experience navigating the entertainment industry and uses that experience to help young actors and their families succeed safely and ethically."
  },
  {
    question: "What is Child Actor 101?",
    answer: "Child Actor 101 is an educational ecosystem designed for parents of young actors. It includes a massive community, podcast, training programs, coaching, and tools like Resume101 and Pages101, all built to demystify the industry and protect families from predatory practices."
  },
  {
    question: "Is Corey Ralston a talent manager?",
    answer: "Yes. Corey manages a select, highly curated roster of youth talent for television, film, and commercial opportunities, focusing on strategic career growth and healthy parent-manager relationships."
  },
  {
    question: "Does Corey coach young actors?",
    answer: "Yes, Corey offers private, one-on-one coaching specifically tailored to young actors. His coaching focuses on grounded, authentic behavior, deep script analysis, and professional self-tape technique for major TV and film auditions."
  },
  {
    question: "What ages does Corey work with?",
    answer: "Corey primarily works with young actors ranging from 8 to 18 years old, ensuring that training and material are always age-appropriate and developmentally healthy."
  },
  {
    question: "Are classes online?",
    answer: "Yes! The 101 Training Program and Corey's private coaching sessions are conducted online, allowing families from anywhere in the country to access high-level, professional training."
  },
  {
    question: "What is Corey's coaching style?",
    answer: "Corey's approach is rooted in authentic behavior, not pretending. He believes that \"confidence comes from preparation.\" He teaches actors to make grounded choices, understand character needs, and bring their true selves to imaginary circumstances."
  },
  {
    question: "Does Child Actor 101 offer free resources?",
    answer: "Absolutely. Child Actor 101 offers a wealth of free resources, including the Child Actor 101 Podcast, The Callback Newsletter, comprehensive blog articles, and a massive support community."
  },
  {
    question: "How can parents start learning?",
    answer: "The best place to start is by joining The Callback Newsletter and listening to the Child Actor 101 Podcast. From there, explore the blog and consider joining the 101 Training Program when your child is ready for structured classes."
  },
  {
    question: "How can someone contact Corey?",
    answer: "You can reach out through the contact forms available on the Child Actor 101 website or specific service sites like the coaching or training platforms."
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-surface-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-950 mb-12">Frequently Asked Questions</h2>
        
        {/* Hidden FAQ Schema for SEO if requested, but we already added JSON-LD. We can just render the UI here. */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`border rounded-2xl overflow-hidden transition-colors ${isOpen ? 'bg-white border-primary-200 shadow-sm' : 'bg-white border-surface-200 hover:border-primary-200'}`}
              >
                <button
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-lg text-primary-900">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-primary-500 shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-surface-400 shrink-0 ml-4" />
                  )}
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-text-secondary">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
