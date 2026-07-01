export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Corey's coaching completely transformed my daughter's audition technique. He helped her stop 'acting' and start finding real behavior. She booked her first series regular role three months after we started working with him.",
      name: "Sarah M.",
      relationship: "Parent of a Series Regular",
    },
    {
      quote: "Child Actor 101 was the lifeline we needed. Before finding this community and Corey's advice, we were spending thousands on the wrong classes and photos. Now, we actually understand how the business works.",
      name: "David T.",
      relationship: "Parent",
    },
    {
      quote: "As a manager, Corey is fiercely protective of his clients. He understands that my child's mental health comes first, and he never pushes us into situations we aren't comfortable with. He is a rare find in Hollywood.",
      name: "Elena R.",
      relationship: "Parent",
    },
    {
      quote: "Corey doesn't sugarcoat anything. He tells you exactly what casting is looking for and exactly where you need to improve. It's the most refreshing and helpful coaching I've ever had.",
      name: "Jackson (Age 15)",
      relationship: "Student",
    },
    {
      quote: "The Resume101 tool and the educational guides on CA101 gave us the confidence to drop a predatory 'agent' and seek legitimate representation. We owe our entire restart to Corey's advocacy.",
      name: "The Williams Family",
      relationship: "Parents",
    },
    {
      quote: "I've sent several young actors to Corey for coaching, and they always come back more grounded, more prepared, and with a deeper understanding of the script. He truly gets how to communicate with kids.",
      name: "Anonymous",
      relationship: "Industry Professional / Agent",
    }
  ];

  return (
    <section className="py-24 bg-primary-900 text-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">What Parents and Students Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-primary-950 p-8 rounded-2xl border border-primary-800 flex flex-col">
              <div className="flex-grow">
                <p className="text-primary-100 italic mb-6 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div>
                <p className="font-bold text-white">{t.name}</p>
                <p className="text-sm text-primary-400">{t.relationship}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
