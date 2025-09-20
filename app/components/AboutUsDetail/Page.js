import React from 'react';

export default function AboutUsDetail() {
  return (
    <section className="w-full py-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 px-6">
        {/* Left Side - Image + Logo */}
        <div className="md:w-1/2 flex flex-col items-center">
          <img
            src="/images/yogaabout.jpg" // replace with your image
            alt="Yoga Vaas"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Right Side - Content */}
        <div className="md:w-1/2 bg-white/80 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            About Us
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <strong>YogaVaas</strong>, yoga+vaas (at comfort of your own home)
            is a dream by yog sadhak Lalit Rana to give you all the flexibility
            to choose from various tailor-made options that suit your needs and
            fit your schedule. We at YogaVaas strive to give you the best yoga
            teacher at home.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            At <strong>YogaVaas</strong> we bring yoga to the comfort of your
            home. We are a trusted name in the field of yoga with more than
            three thousand happy customers, six plus years of experience and
            highly trained yoga teachers. We are one of a kind yoga institute
            that believes in giving our best.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Around six thousand years back yoga originated in the holy lands of
            India. Since then it has helped people live a healthy lifestyle. The
            ever-changing working hours, stress, competitive atmosphere, and
            unhealthy eating habits are taking their toll on our health. Yoga
            helps eliminate the negative impacts and brings balance and
            positivity in life. That’s why we provide certified yoga teachers at
            home.
          </p>
          <a
            href="#contact"
            className="inline-block bg-pink-600 text-white px-5 py-2 rounded-lg font-medium shadow-md hover:bg-pink-700 transition"
          >
            Be With Us
          </a>
        </div>
      </div>
    </section>
  );
}
