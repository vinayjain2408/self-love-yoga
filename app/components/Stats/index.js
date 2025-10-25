import React, { useState, useEffect } from 'react';

export default function Stats() {
  const [clients, setClients] = useState(0);
  const [countries, setCountries] = useState(0);
  const [volume, setVolume] = useState(0);

  const maxClients = 1000; // 1k+
  const maxCountries = 4; // 4+
  const maxVolume = 100000000; // 10cr = 10,00,00,000

  useEffect(() => {
    const interval = setInterval(() => {
      setClients((prev) =>
        prev < maxClients ? prev + Math.ceil(maxClients / 100) : maxClients,
      );
      setCountries((prev) => (prev < maxCountries ? prev + 1 : maxCountries));
      setVolume((prev) =>
        prev < maxVolume ? prev + Math.ceil(maxVolume / 200) : maxVolume,
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#4965D2] py-10 text-center">
      <p className="text-[16px] text-[#FFFFFF] mb-8 font-medium">
        Accelerating the global adoption of crypto since{' '}
        <span className="text-[#FFFFFF] font-semibold">2022</span>
      </p>

      <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20">
        <div>
          <h2 className="text-4xl font-medium text-[#FFFFFF]">
            {clients.toLocaleString()}+
          </h2>
          <p className="text-[#FFFFFF]">Clients</p>
        </div>
        <div>
          <h2 className="text-4xl font-medium text-[#FFFFFF]">{countries}+</h2>
          <p className="text-[#FFFFFF]">Countries supported</p>
        </div>
        <div>
          <h2 className="text-4xl font-medium text-[#FFFFFF]">
            {volume.toLocaleString()}+
          </h2>
          <p className="text-[#FFFFFF]">Quarterly trading volume</p>
        </div>
      </div>
    </section>
  );
}
