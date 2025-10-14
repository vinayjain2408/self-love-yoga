import React from 'react';

export default function Stats() {
  return (
    <section className="bg-white py-10 text-center">
      <p className="text-[16px] text-[#08844F] mb-8 font-medium">
        Accelerating the global adoption of crypto since{' '}
        <span className="text-[#08844F] font-semibold">2022</span>
      </p>

      <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20">
        <div>
          <h2 className="text-4xl font-medium text-[#08844F]">1k+</h2>
          <p className="text-[#08844F]">Clients</p>
        </div>
        <div>
          <h2 className="text-4xl font-medium text-[#08844F]">4+</h2>
          <p className="text-[#08844F]">Countries supported</p>
        </div>
        <div>
          <h2 className="text-4xl font-medium text-[#08844F]">10cr+</h2>
          <p className="text-[#08844F]">Quarterly trading volume</p>
        </div>
      </div>
    </section>
  );
}
