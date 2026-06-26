import { Download, Copy } from 'lucide-react';

export function MediaKitSection() {
  return (
    <section className="py-24 bg-white border-b border-surface-200">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-950 mb-4">Media Kit</h2>
            <p className="text-lg text-text-secondary max-w-2xl">
              Approved bios and headshots for press, podcasts, and speaking engagements.
            </p>
          </div>
          <a href="#" className="hidden md:inline-flex items-center px-4 py-2 border-2 border-primary-200 text-primary-700 font-bold rounded-lg hover:bg-primary-50 hover:border-primary-300 transition-colors">
            <Download className="mr-2 w-4 h-4" /> Download Full Kit
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Bios */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-surface-50 p-6 rounded-2xl border border-surface-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-primary-900">Short Bio</h3>
              </div>
              <p className="text-text-secondary text-sm">
                Corey Ralston is a youth talent manager, acting coach, and the founder of Child Actor 101, an educational platform dedicated to helping families navigate the television and film industry safely and ethically.
              </p>
            </div>

            <div className="bg-surface-50 p-6 rounded-2xl border border-surface-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-primary-900">Medium Bio</h3>
              </div>
              <p className="text-text-secondary text-sm space-y-3">
                Corey Ralston is a youth talent manager, acting coach, and the founder of Child Actor 101. A former child actor himself, Corey understands the unique pressures placed on young performers and their families. He created Child Actor 101 to provide parents with the unvarnished truth about the entertainment industry, offering practical tools, scam awareness, and high-level training to ensure young actors can succeed while prioritizing their mental health and safety.
              </p>
            </div>
            
            <a href="#" className="inline-flex md:hidden w-full justify-center items-center px-4 py-3 border-2 border-primary-200 text-primary-700 font-bold rounded-lg hover:bg-primary-50 hover:border-primary-300 transition-colors">
              <Download className="mr-2 w-4 h-4" /> Download Full Kit
            </a>
          </div>

          {/* Assets */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-primary-900 mb-4">Approved Headshots</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative group rounded-xl overflow-hidden aspect-square border border-surface-200">
                  <img src="/images/corey-ralston.jpg" alt="Corey Ralston Headshot 1" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-primary-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Download className="w-6 h-6 text-white" />
                  </div>
                </div>
                {/* Placeholder for second headshot */}
                <div className="relative group rounded-xl overflow-hidden aspect-square border border-surface-200 bg-surface-100 flex items-center justify-center">
                  <span className="text-sm text-surface-400 text-center px-2">Image 2</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-primary-900 mb-4">Brand Assets</h3>
              <div className="bg-surface-100 p-4 rounded-xl border border-surface-200 flex items-center justify-center aspect-[2/1] relative group overflow-hidden">
                <img src="/101logo.png" alt="Child Actor 101 Logo" className="max-h-full max-w-full object-contain mix-blend-multiply" />
                <div className="absolute inset-0 bg-primary-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Download className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
