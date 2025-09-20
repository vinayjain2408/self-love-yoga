import React from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Ms Sneha',
    role: 'Sr. Manager - HR',
    image: '/images/yoga1.jpg', // replace with actual image path
    text: 'I want to thanks Yoga Vaas to provide me certified yoga teacher at home so comfortable environment usually I am so busy in my work and I never thought that such a professional yoga teacher at home easily available with a good customer support. But with the help of Yoga Vaas it comes true.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Mr. Aashish Sharma',
    role: 'Entrepreneur & Activist',
    image: '/images/yoga2.jpg', // replace with actual image path
    text: 'After years of back problems and poor posture yoga has provided me relief and after several months I could notice a significant improvement. I had tried many doctors and physiotherapist but nothing provided me the results as I received from yoga so far. Hence I am really excited to continue and will keep learning, strengthening and improving my body and self awareness. A super big thanks to teacher Lalit Rana.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ms Anamika',
    role: 'Housewife',
    image: '/images/yoga3.jpg', // replace with actual image path
    text: 'Thank you Yoga Vaas! I needed Yoga classes for general fitness and weight loss at my preferred time and they provided me female yoga teacher at home. I don’t need to leave my place; the teacher is very knowledgeable & I’m very satisfied with his services.',
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-12 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          What My Clients Say about us
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((client) => (
            <div
              key={client.id}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 p-6 flex flex-col justify-between"
            >
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                {client.text}
              </p>
              <div className="flex items-center mt-4">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={client.image}
                  alt={client.name}
                />
                <div className="ml-3 text-left">
                  <h5 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {client.name}
                  </h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {client.role}
                  </p>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                {Array(client.rating)
                  .fill()
                  .map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.284 3.966a1 1 0 00.95.69h4.174c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.284 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.283-3.966a1 1 0 00-.364-1.118L2.05 9.393c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.95-.69l1.284-3.966z" />
                    </svg>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
