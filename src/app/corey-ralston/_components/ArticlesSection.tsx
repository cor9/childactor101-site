import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function ArticlesSection() {
  const articles = [
    {
      title: "Getting Started in Child Acting Without Getting Scammed",
      description: "A comprehensive guide for parents on how to navigate the beginning stages of the industry safely.",
      url: "/101-blog/getting-started",
      category: "Getting Started"
    },
    {
      title: "Understanding the Agent vs. Manager Dynamic",
      description: "Do you need both? Who does what? Breaking down the roles of representation.",
      url: "/101-blog/agent-vs-manager",
      category: "Representation"
    },
    {
      title: "Self-Tape Preparation for Young Actors",
      description: "How to set up, slate, and perform a competitive self-tape from your living room.",
      url: "/101-blog/self-tape-prep",
      category: "Auditions"
    },
    {
      title: "Managing Parent Expectations in Hollywood",
      description: "Why the timeline to success is longer than you think, and how to maintain sanity.",
      url: "/101-blog/parent-expectations",
      category: "Parenting"
    },
    {
      title: "What Makes a Great Headshot?",
      description: "Stop spending thousands on the wrong photos. Here is what casting actually wants to see.",
      url: "/101-blog/headshots",
      category: "Marketing Materials"
    },
    {
      title: "Why \"Pretending\" Is Ruining Your Auditions",
      description: "Corey's approach to finding authentic behavior rather than playing a caricature.",
      url: "/101-blog/authentic-acting",
      category: "Acting Technique"
    }
  ];

  return (
    <section className="py-24 bg-surface-50 border-y border-surface-200">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-950 mb-4">Featured Articles by Corey</h2>
            <p className="text-lg text-text-secondary">
              Practical guides, unfiltered advice, and technical breakdowns for families navigating the TV and film industry.
            </p>
          </div>
          <Link href="/101-blog" className="hidden md:inline-flex items-center text-primary-600 font-bold hover:text-primary-800 transition-colors">
            View All Articles <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <Link key={i} href={article.url} className="group flex flex-col bg-white rounded-2xl border border-surface-200 overflow-hidden hover:shadow-xl hover:border-primary-200 transition-all duration-300">
              <div className="p-6 flex flex-col h-full">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 mb-3">{article.category}</span>
                <h3 className="text-xl font-bold text-primary-950 mb-3 group-hover:text-primary-600 transition-colors">{article.title}</h3>
                <p className="text-text-secondary mb-6 flex-grow">{article.description}</p>
                <div className="flex items-center text-primary-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                  Read Article <ArrowRight className="ml-1 w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-10 text-center md:hidden">
          <Link href="/101-blog" className="inline-flex items-center text-primary-600 font-bold hover:text-primary-800 transition-colors">
            View All Articles <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
