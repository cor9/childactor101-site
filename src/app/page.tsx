import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-surface-50 flex items-center justify-center p-8">
      <div className="bg-white p-12 rounded-3xl shadow-lg border border-surface-200 max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-primary-950 mb-6">Child Actor 101</h1>
        <p className="text-xl text-text-secondary mb-10">
          The central hub for the Child Actor 101 ecosystem is currently under development.
        </p>
        <div className="p-6 bg-primary-50 rounded-2xl border border-primary-100">
          <p className="text-primary-900 font-medium mb-4">
            The new Corey Ralston Authority Page is live:
          </p>
          <Link 
            href="/corey-ralston" 
            className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-sm"
          >
            View Corey's Page <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
