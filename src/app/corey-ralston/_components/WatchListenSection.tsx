import { PlayCircle } from 'lucide-react';

export function WatchListenSection() {
  const videos = [
    {
      id: "dQw4w9WgXcQ", // Replace with real YouTube video ID
      title: "How to Become a Child Actor",
      category: "Getting Started"
    },
    {
      id: "dQw4w9WgXcQ", // Replace with real YouTube video ID
      title: "What Parents Need to Know",
      category: "Parent Education"
    },
    {
      id: "dQw4w9WgXcQ", // Replace with real YouTube video ID
      title: "Self-Tape Mistakes to Avoid",
      category: "Audition Prep"
    }
  ];

  return (
    <section id="watch" className="py-24 bg-surface-950 text-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Watch & Listen</h2>
          <p className="text-surface-400 max-w-2xl mx-auto text-lg">
            Tune in to the Child Actor 101 Podcast and watch our top educational videos designed to give you clarity and confidence in the industry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <div key={index} className="group relative rounded-2xl overflow-hidden bg-surface-900 border border-surface-800 shadow-lg">
              <div className="aspect-video bg-surface-800 relative">
                {/* Embed Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-surface-500 bg-surface-800">
                  <PlayCircle className="w-16 h-16 group-hover:scale-110 group-hover:text-primary-500 transition-all duration-300" />
                </div>
                {/* When ready, replace the above with: 
                <iframe 
                  className="w-full h-full absolute inset-0"
                  src={`https://www.youtube.com/embed/${video.id}`} 
                  title={video.title} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
                */}
              </div>
              <div className="p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 mb-2 block">{video.category}</span>
                <h3 className="text-xl font-bold text-surface-50">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
