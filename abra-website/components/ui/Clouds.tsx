'use client';

export default function Clouds() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Cloud 1 - Large fluffy cloud */}
      <div className="absolute top-20 -left-20 opacity-20" style={{ animation: 'drift 25s linear infinite' }}>
        <div className="relative w-96 h-32">
          <div className="absolute bg-white rounded-full blur-2xl" style={{ width: '80px', height: '80px', top: '0', left: '0' }} />
          <div className="absolute bg-white rounded-full blur-2xl" style={{ width: '100px', height: '100px', top: '5px', left: '50px' }} />
          <div className="absolute bg-white rounded-full blur-2xl" style={{ width: '90px', height: '90px', top: '10px', left: '120px' }} />
          <div className="absolute bg-white rounded-full blur-2xl" style={{ width: '80px', height: '80px', top: '5px', left: '200px' }} />
          <div className="absolute bg-white rounded-full blur-2xl" style={{ width: '70px', height: '70px', top: '15px', left: '260px' }} />
        </div>
      </div>

      {/* Cloud 2 - Medium cloud */}
      <div className="absolute top-40 right-10 opacity-15" style={{ animation: 'drift 30s linear infinite 5s' }}>
        <div className="relative w-72 h-28">
          <div className="absolute bg-white rounded-full blur-2xl" style={{ width: '70px', height: '70px', top: '0', left: '0' }} />
          <div className="absolute bg-white rounded-full blur-2xl" style={{ width: '85px', height: '85px', top: '8px', left: '50px' }} />
          <div className="absolute bg-white rounded-full blur-2xl" style={{ width: '75px', height: '75px', top: '5px', left: '120px' }} />
          <div className="absolute bg-white rounded-full blur-2xl" style={{ width: '65px', height: '65px', top: '12px', left: '190px' }} />
        </div>
      </div>

      {/* Cloud 3 - Small cloud */}
      <div className="absolute top-60 left-1/4 opacity-12" style={{ animation: 'drift 35s linear infinite 10s' }}>
        <div className="relative w-56 h-24">
          <div className="absolute bg-white rounded-full blur-2xl" style={{ width: '60px', height: '60px', top: '0', left: '0' }} />
          <div className="absolute bg-white rounded-full blur-2xl" style={{ width: '70px', height: '70px', top: '5px', left: '40px' }} />
          <div className="absolute bg-white rounded-full blur-2xl" style={{ width: '55px', height: '55px', top: '8px', left: '100px' }} />
        </div>
      </div>

      {/* Cloud 4 - Behind cloud */}
      <div className="absolute top-32 right-1/3 opacity-10" style={{ animation: 'drift 40s linear infinite 15s' }}>
        <div className="relative w-80 h-30">
          <div className="absolute bg-white rounded-full blur-3xl" style={{ width: '90px', height: '90px', top: '5px', left: '20px' }} />
          <div className="absolute bg-white rounded-full blur-3xl" style={{ width: '100px', height: '100px', top: '8px', left: '80px' }} />
          <div className="absolute bg-white rounded-full blur-3xl" style={{ width: '85px', height: '85px', top: '5px', left: '160px' }} />
          <div className="absolute bg-white rounded-full blur-3xl" style={{ width: '75px', height: '75px', top: '12px', left: '230px' }} />
        </div>
      </div>

      {/* Cloud 5 - Far away cloud */}
      <div className="absolute bottom-32 left-10 opacity-8" style={{ animation: 'drift 45s linear infinite 20s' }}>
        <div className="relative w-64 h-20">
          <div className="absolute bg-white rounded-full blur-3xl" style={{ width: '50px', height: '50px', top: '0', left: '0' }} />
          <div className="absolute bg-white rounded-full blur-3xl" style={{ width: '60px', height: '60px', top: '5px', left: '40px' }} />
          <div className="absolute bg-white rounded-full blur-3xl" style={{ width: '55px', height: '55px', top: '3px', left: '90px' }} />
          <div className="absolute bg-white rounded-full blur-3xl" style={{ width: '45px', height: '45px', top: '8px', left: '140px' }} />
        </div>
      </div>

    </div>
  );
}

