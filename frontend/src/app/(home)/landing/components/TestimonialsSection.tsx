// app/landing/components/TestimonialsSection.js
export default function TestimonialsSection() {
    const testimonials = [
      { name: 'John Doe', feedback: 'This platform has transformed how I manage my business!' },
      { name: 'Jane Smith', feedback: 'Incredible features and super easy to use. Highly recommended!' },
    ];
  
    return (
      <section className="py-16 bg-blue-50">
        <h2 className="text-center text-3xl font-bold mb-8">What Our Users Are Saying</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center px-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white shadow-md p-6 rounded-lg text-center">
              <p className="italic text-gray-600">"{testimonial.feedback}"</p>
              <h4 className="mt-4 font-semibold">{testimonial.name}</h4>
            </div>
          ))}
        </div>
      </section>
    );
  }
  