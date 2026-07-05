export default function ScorePage() {
  return (
    <div className="w-full h-screen bg-[#0F172A] text-white p-6 overflow-y-auto">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        <h1 className="text-2xl font-bold">Prakriti Score Breakdown</h1>
        
        <div className="bg-[#1E293B] border border-white/10 rounded-2xl p-8 flex flex-col items-center">
          <div className="relative w-48 h-48 mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="96" cy="96" r="84" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-[#0F172A]" />
              <circle 
                cx="96" cy="96" r="84" stroke="currentColor" strokeWidth="16" fill="transparent" 
                strokeDasharray="527" strokeDashoffset="131" className="text-[#10B981] transition-all duration-1000" 
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold">75</span>
            </div>
          </div>
          <div className="flex gap-2 mb-8">
             <span className="px-3 py-1 rounded bg-[#064E3B] text-[#10B981] text-xs font-bold uppercase">Excellent</span>
             <span className="px-3 py-1 rounded bg-[#0F172A] text-[#94A3B8] text-xs font-mono border border-white/10">LIMIT: ₹7,500</span>
          </div>
          
          <div className="w-full space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2"><span className="text-[#94A3B8]">Satellite Health Data</span><span className="font-bold">88%</span></div>
              <div className="w-full bg-[#0F172A] h-2 rounded-full"><div className="bg-[#10B981] h-2 rounded-full w-[88%]"></div></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2"><span className="text-[#94A3B8]">Ground Photo Verification</span><span className="font-bold">62%</span></div>
              <div className="w-full bg-[#0F172A] h-2 rounded-full"><div className="bg-[#F59E0B] h-2 rounded-full w-[62%]"></div></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2"><span className="text-[#94A3B8]">Circle Reputation</span><span className="font-bold">94%</span></div>
              <div className="w-full bg-[#0F172A] h-2 rounded-full"><div className="bg-blue-500 h-2 rounded-full w-[94%]"></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
