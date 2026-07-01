export interface FAQItem {
  answer: string;
  question: string;
}

export interface FAQProps {
  items: FAQItem[];
}

export function FAQ({ items }: FAQProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <details
          key={item.question}
          className="rounded-[26px] border border-chalkboard/10 bg-white px-6 py-5 shadow-[var(--shadow-paper)]"
        >
          <summary className="cursor-pointer list-none font-display text-2xl text-chalkboard marker:hidden">
            {item.question}
          </summary>
          <p className="mt-4 text-sm leading-7 text-ink-soft">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
