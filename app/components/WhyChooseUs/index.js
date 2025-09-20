import React from 'react';

export default function WhyChooseUs() {
  const features = [
    {
      title: 'Time Flexibility',
      description:
        'Select your time as per your comfort. Practice yoga at home anytime with full convenience.',
    },
    {
      title: 'Integrity & Trust',
      description:
        'We have been providing yoga classes for the last 10 years, trusted by thousands for at-home sessions.',
    },
    {
      title: 'Certified & Experienced Trainers',
      description:
        'Our trainers are highly experienced and certified professionals, ensuring you get safe and effective guidance.',
    },
    {
      title: 'Privacy & Comfort',
      description:
        'Wear comfortable clothes, pause the class when you want, and avoid the hassle of crowded studios.',
    },
    {
      title: 'Personalized Progress',
      description:
        'Your personal trainer will track your progress and tailor sessions according to your needs and goals.',
    },
    {
      title: 'Budget Friendly',
      description:
        'Our home yoga plans are affordable and flexible, so you can choose what suits your budget and requirements.',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Section Heading */}
        <p className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
          What Makes Us Different
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-12">
          Why Choose Our At Home Yoga?
        </h2>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-10 text-left">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
