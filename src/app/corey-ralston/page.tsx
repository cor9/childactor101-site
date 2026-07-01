import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, 
  PlayCircle, 
  ExternalLink,
  Video,
  Mic,
  BookOpen,
  GraduationCap,
} from 'lucide-react';

import { ArticlesSection } from './_components/ArticlesSection';
import { WatchListenSection } from './_components/WatchListenSection';
import { TestimonialsSection } from './_components/TestimonialsSection';
import { MediaKitSection } from './_components/MediaKitSection';
import { FaqSection } from './_components/FaqSection';

export const metadata: Metadata = {
  title: 'Corey Ralston | Youth Talent Manager, Acting Coach & Founder of Child Actor 101',
  description: 'Corey Ralston is a youth talent manager, acting coach, former child actor, and founder of Child Actor 101, helping families navigate television and film with practical education, training, and resources.',
  alternates: {
    canonical: 'https://www.childactor101.com/corey-ralston',
  },
  openGraph: {
    title: 'Corey Ralston | Founder of Child Actor 101',
    description: 'Youth talent manager, acting coach, former child actor, and founder of Child Actor 101.',
    images: ['/images/corey-ralston.jpg'],
  },
};

export default function CoreyRalstonPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://www.childactor101.com/corey-ralston#person",
    "name": "Corey Ralston",
    "url": "https://www.childactor101.com/corey-ralston",
    "image": "https://www.childactor101.com/images/corey-ralston.jpg",
    "jobTitle": [
      "Youth Talent Manager",
      "Acting Coach",
      "Founder of Child Actor 101"
    ],
    "description": "Corey Ralston is a youth talent manager, acting coach, former child actor, and founder of Child Actor 101.",
    "worksFor": {
      "@type": "Organization",
      "name": "Child Actor 101",
      "url": "https://www.childactor101.com"
    },
    "founder": {
      "@type": "Organization",
      "name": "Child Actor 101",
      "url": "https://www.childactor101.com"
    },
    "knowsAbout": [
      "Child acting",
      "Youth acting coaching",
      "Television auditions",
      "Film auditions",
      "Self-tape auditions",
      "Talent management",
      "Parent education for young actors"
    ],
    "sameAs": [
      "https://facebook.com/childactor101",
      "https://instagram.com/childactor101",
      "https://youtube.com/childactor101"
    ]
  };

  return (
    <main className="min-h-screen bg-surface-50 text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-primary-50 py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col space-y-8 z-10">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-primary-950 tracking-tight">
                  Corey Ralston
                </h1>
                <p className="text-xl md:text-2xl font-medium text-primary-800">
                  Youth Talent Manager • Acting Coach • Former Child Actor • Founder of Child Actor 101
                </p>
              </div>
              
              <div className="prose prose-lg text-text-secondary">
                <p>
                  As a former child actor who transitioned into talent management and coaching, Corey Ralston understands the entertainment industry from every angle. He founded Child Actor 101 to cut through the noise, providing families with practical education, ethical guidance, and the foundational training young actors need to thrive in television and film.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/" className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors shadow-sm">
                  Explore Child Actor 101
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link href="https://coaching.childactor101.com" className="inline-flex justify-center items-center px-6 py-3 border border-primary-200 text-base font-medium rounded-md text-primary-900 bg-white hover:bg-primary-50 transition-colors shadow-sm">
                  Coaching & Classes
                </Link>
                <Link href="#watch" className="inline-flex justify-center items-center px-6 py-3 text-base font-medium text-primary-700 hover:text-primary-900 transition-colors">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Listen to the Podcast
                </Link>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-md lg:max-w-full z-10">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-white border-4 border-white">
                <Image
                  src="/images/corey-ralston.jpg"
                  alt="Corey Ralston"
                  fill
                  sizes="(min-width: 1024px) 40rem, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
              <div className="absolute -top-6 -right-6 w-48 h-48 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" style={{animationDelay: '2s'}}></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quick Credibility Bar */}
      <section className="bg-primary-950 py-12 relative z-20 -mt-8 mx-4 sm:mx-8 rounded-2xl shadow-xl overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center space-y-2 text-white">
              <span className="text-3xl md:text-4xl font-bold text-accent-400">20+</span>
              <span className="text-sm md:text-base font-medium text-primary-100">Years in Entertainment</span>
            </div>
            <div className="flex flex-col items-center space-y-2 text-white">
              <span className="text-3xl md:text-4xl font-bold text-accent-400">5,000+</span>
              <span className="text-sm md:text-base font-medium text-primary-100">Families Served</span>
            </div>
            <div className="flex flex-col items-center space-y-2 text-white">
              <span className="text-3xl md:text-4xl font-bold text-accent-400">150+</span>
              <span className="text-sm md:text-base font-medium text-primary-100">Resources Published</span>
            </div>
            <div className="flex flex-col items-center space-y-2 text-white">
              <span className="text-3xl md:text-4xl font-bold text-accent-400">30k+</span>
              <span className="text-sm md:text-base font-medium text-primary-100">Community Members</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. About Corey */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-950 mb-8 text-center">About Corey Ralston</h2>
          <div className="prose prose-lg md:prose-xl mx-auto text-text-secondary space-y-6">
            <p>
              Corey&apos;s journey in the entertainment industry began in front of the camera as a child actor. Experiencing the highs, lows, and pressures of the business at a young age gave him a profound understanding of the emotional landscape young performers navigate daily. He learned firsthand that acting isn&apos;t just about memorizing lines—it&apos;s about understanding human behavior while carrying the weight of professional expectations.
            </p>
            <p>
              Transitioning into talent management and coaching allowed Corey to step behind the scenes, where he quickly recognized a glaring gap in the industry: parents were expected to manage their child&apos;s career without any formal education on how the business actually works. They were navigating a complex, highly competitive field armed only with fragmented advice from Facebook groups and well-meaning but inexperienced friends.
            </p>
            <p>
              This realization became the catalyst for Child Actor 101. What started as an effort to demystify the industry has grown into a comprehensive educational platform. Corey built Child Actor 101 to protect families from predatory practices, set realistic expectations, and provide the high-level training young actors need to succeed ethically and sustainably.
            </p>
            <p>
              Today, Corey balances his time managing a select roster of youth talent, coaching actors for major television and film roles, and expanding the Child Actor 101 ecosystem to ensure that no parent ever has to guess their way through their child&apos;s career again.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Professional Background */}
      <section className="py-24 bg-surface-100 border-y border-surface-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-950 mb-16">Experience in the Entertainment Industry</h2>
          
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary-200 before:to-transparent">
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary-500 text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md z-10">
                <Video className="w-5 h-5" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white shadow-sm border border-surface-200 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-xl text-primary-900 mb-2">Former Child Actor</h3>
                <p className="text-text-secondary">Corey began his career navigating sets, auditions, and the unique pressures placed on young performers. This early immersion laid the foundation for his empathetic approach to coaching and management.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary-500 text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md z-10">
                <Mic className="w-5 h-5" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white shadow-sm border border-surface-200 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-xl text-primary-900 mb-2">Youth Talent Manager</h3>
                <p className="text-text-secondary">Representing young talent, Corey handles submissions, pitches, and strategic career planning. He works closely with parents to ensure healthy boundaries and realistic expectations while pursuing major TV and film opportunities.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary-500 text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md z-10">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white shadow-sm border border-surface-200 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-xl text-primary-900 mb-2">Acting Coach</h3>
                <p className="text-text-secondary">Specializing in on-camera technique, Corey helps young actors develop grounded, authentic choices for self-tapes and live auditions. He focuses on character development, script analysis, and building audition confidence.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary-500 text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md z-10">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white shadow-sm border border-surface-200 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-xl text-primary-900 mb-2">Founder of Child Actor 101</h3>
                <p className="text-text-secondary">Corey built the premier digital hub for parents of young actors. The CA101 ecosystem spans a massive community, SaaS tools, and educational resources designed to democratize industry knowledge.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Coaching Philosophy */}
      <section className="py-24 bg-primary-950 text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Corey&apos;s Approach to Young Actors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-primary-900 p-8 rounded-2xl border border-primary-800">
              <h3 className="text-2xl font-bold text-primary-100 mb-4">Acting Is Behavior</h3>
              <p className="text-primary-100/80 leading-relaxed">
                Acting is never about pretending or playing dress-up. It&apos;s about understanding authentic human behavior. Corey teaches young actors how to make grounded choices, identify character needs, understand relationships, and live truthfully under imaginary circumstances.
              </p>
            </div>
            <div className="bg-primary-900 p-8 rounded-2xl border border-primary-800">
              <h3 className="text-2xl font-bold text-primary-100 mb-4">Confidence Comes From Preparation</h3>
              <p className="text-primary-100/80 leading-relaxed">
                Nerves are natural, but unpreparedness is preventable. Corey focuses heavily on professional self-tape technique, rigorous script analysis, and audition etiquette, ensuring young actors walk into every room—virtual or physical—feeling deeply grounded and prepared.
              </p>
            </div>
            <div className="bg-primary-900 p-8 rounded-2xl border border-primary-800">
              <h3 className="text-2xl font-bold text-primary-100 mb-4">Parents Need Education Too</h3>
              <p className="text-primary-100/80 leading-relaxed">
                A child actor cannot succeed if their parents are lost in the dark. Corey believes parents need radical clarity, unvarnished truth, and practical tools—not industry hype, panic-inducing advice, or gatekept secrets. An educated parent is a safe parent.
              </p>
            </div>
            <div className="bg-primary-900 p-8 rounded-2xl border border-primary-800">
              <h3 className="text-2xl font-bold text-primary-100 mb-4">Child Actors Are Children First</h3>
              <p className="text-primary-100/80 leading-relaxed">
                The well-being of the child must always outrank the pursuit of the role. Corey advocates for healthy boundaries, age-appropriate material, safe set environments, and maintaining a humane process that respects the child&apos;s development outside the industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Ecosystem */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-950 mb-6">The Child Actor 101 Ecosystem</h2>
            <p className="text-xl text-text-secondary">
              What started as a single Facebook group has evolved into a comprehensive network of resources, tools, training programs, and parent education designed to support families at every stage of their journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Child Actor 101 Blog", url: "/101-blog", desc: "Articles and guides for families navigating the industry." },
              { title: "The Callback Newsletter", url: "https://childactor-101.eo.page/subscribe", desc: "Parent-focused updates, advice, resources, and industry guidance." },
              { title: "Child Actor 101 Podcast", url: "#watch", desc: "Conversations and lessons about young actors, auditions, and the industry." },
              { title: "101 Training Program", url: "https://101training.childactor101.com", desc: "Structured, high-level online training for young actors." },
              { title: "Coaching with Corey", url: "https://coaching.childactor101.com", desc: "Private coaching, audition prep, and strategy sessions." },
              { title: "Resume101", url: "https://resumes.childactor101.com", desc: "Professional resume-building tool designed specifically for young actors." },
              { title: "Pages101", url: "https://pages.childactor101.com", desc: "Safety-first, privacy-focused actor portfolio pages for young performers." },
              { title: "Child Actor 101 Directory", url: "https://directory.childactor101.com", desc: "Curated directory of trusted vendors and industry professionals." },
              { title: "Prep101", url: "https://prep101.site", desc: "Comprehensive acting prep guides for audition and scene work." },
            ].map((item, i) => (
              <a key={i} href={item.url} className="group block p-6 bg-surface-50 rounded-2xl border border-surface-200 hover:border-primary-300 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-primary-900 group-hover:text-primary-600 transition-colors">{item.title}</h3>
                  <ExternalLink className="w-5 h-5 text-surface-400 group-hover:text-primary-500 transition-colors" />
                </div>
                <p className="text-text-secondary">{item.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Featured Articles */}
      <ArticlesSection />

      {/* 8. Watch & Listen */}
      <WatchListenSection />

      {/* 9. Advocacy & Parent Education */}
      <section className="py-24 bg-surface-100">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-950 mb-8">Advocacy and Parent Education</h2>
          <div className="prose prose-lg mx-auto text-text-secondary text-left space-y-6 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-surface-200">
            <p>
              The entertainment industry is notoriously opaque, and unfortunately, that lack of transparency often breeds predatory behavior targeting hopeful families. Corey is fiercely committed to advocating for parents by pulling back the curtain on how the business truly operates.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-primary-500 mr-3 text-xl">•</span>
                <span><strong>Scam Awareness:</strong> Actively educating families on how to spot pay-to-play schemes, unethical representation, and expensive &ldquo;shortcuts&rdquo; that don&apos;t yield results.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-500 mr-3 text-xl">•</span>
                <span><strong>Ethical Representation:</strong> Empowering parents to understand standard contracts, commission structures, and how to maintain a healthy, communicative relationship with agents and managers.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-500 mr-3 text-xl">•</span>
                <span><strong>Fear-Free Guidance:</strong> Providing actionable, realistic advice that replaces the anxiety and hype often found in online forums with calm, professional clarity.</span>
              </li>
            </ul>
            <p>
              Through free resources, the podcast, and affordable tools like Resume101, Corey aims to level the playing field so every family can make informed, safe decisions for their children.
            </p>
          </div>
        </div>
      </section>

      {/* 10. Testimonials */}
      <TestimonialsSection />

      {/* 11. Press, Interviews, and Appearances */}
      <section className="py-24 bg-surface-50 border-y border-surface-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-950 mb-12">Press & Appearances</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="#" className="p-6 bg-white rounded-2xl border border-surface-200 hover:border-primary-300 hover:shadow-md transition-all group">
              <span className="text-xs font-bold text-surface-400 mb-2 block">PODCAST INTERVIEW</span>
              <h3 className="text-xl font-bold text-primary-900 group-hover:text-primary-600 transition-colors mb-2">Navigating the Child Actor Journey</h3>
              <p className="text-text-secondary text-sm">Guest appearance on The Hollywood Parent Podcast discussing ethics and representation.</p>
            </a>
            <a href="#" className="p-6 bg-white rounded-2xl border border-surface-200 hover:border-primary-300 hover:shadow-md transition-all group">
              <span className="text-xs font-bold text-surface-400 mb-2 block">PANEL DISCUSSION</span>
              <h3 className="text-xl font-bold text-primary-900 group-hover:text-primary-600 transition-colors mb-2">The Future of Youth Talent</h3>
              <p className="text-text-secondary text-sm">Panelist at the annual Young Performers Conference.</p>
            </a>
          </div>
        </div>
      </section>

      {/* 12. Media Kit */}
      <MediaKitSection />

      {/* 13. Personal Note */}
      <section className="py-24 bg-accent-50 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-3xl relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-950 mb-8 text-center">A Note From Corey</h2>
          <div className="bg-white p-10 md:p-14 rounded-[2.5rem] shadow-xl border border-accent-100 relative">
            <div className="absolute top-8 left-8 text-6xl text-accent-200 font-serif leading-none">&ldquo;</div>
            <div className="prose prose-lg text-text-secondary relative z-10">
              <p>
                When I started Child Actor 101, I didn&apos;t set out to build an empire of tools and training programs. I started it because I was tired of watching parents get taken advantage of. I was tired of the fear-mongering, the gatekeeping, and the sheer amount of bad advice circulating in the industry.
              </p>
              <p>
                Families deserve better. They deserve a space where they can ask questions without being judged. They deserve to know what casting directors actually want, how managers actually think, and how to keep their kids grounded and happy while pursuing this crazy dream.
              </p>
              <p>
                Whether you&apos;re booking private coaching, reading the newsletter, or just hanging out in our community, my hope is that Child Actor 101 gives you a sense of relief. You don&apos;t have to figure this out alone. The business is tough, but it doesn&apos;t have to be a mystery. Take a breath, trust the process, and let&apos;s get to work.
              </p>
              <p className="mt-8 font-bold text-primary-900 text-xl">
                — Corey Ralston
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 14. FAQ */}
      <FaqSection />

      {/* 15. Final CTA */}
      <section className="py-24 bg-primary-950 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Start With the Resource That Fits Your Family</h2>
          <p className="text-xl text-primary-200 mb-10 max-w-2xl mx-auto">
            Whether you are just starting out or looking to level up your child&apos;s career, there is a place for you in the Child Actor 101 ecosystem. Explore our resources below.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/101-blog" className="px-6 py-3 bg-white text-primary-950 font-bold rounded-full hover:bg-primary-50 transition-colors">Read the Blog</Link>
            <Link href="https://childactor-101.eo.page/subscribe" className="px-6 py-3 bg-primary-600 text-white font-bold rounded-full hover:bg-primary-500 transition-colors">Join the Newsletter</Link>
            <Link href="https://101training.childactor101.com" className="px-6 py-3 border-2 border-primary-600 text-white font-bold rounded-full hover:bg-primary-900 transition-colors">Explore Classes</Link>
            <Link href="https://coaching.childactor101.com" className="px-6 py-3 border-2 border-primary-600 text-white font-bold rounded-full hover:bg-primary-900 transition-colors">Book Coaching</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
