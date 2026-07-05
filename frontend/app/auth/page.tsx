export default function AuthPage() {
  return (
    <div className="w-full h-screen bg-[#0F172A] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#1E293B] border border-white/10 rounded-2xl p-8 flex flex-col items-center">
        <div className="w-12 h-12 bg-[#10B981] rounded-xl flex items-center justify-center mb-6">
          <div className="w-6 h-6 border-2 border-white rounded-sm rotate-45"></div>
        </div>
        <h1 className="text-2xl font-bold mb-2">Login to PrakritiFi</h1>
        <p className="text-sm text-[#94A3B8] text-center mb-8">Enter your phone number to receive a one-time passcode via SMS.</p>
        
        <input 
          type="tel" 
          placeholder="+91 98765 43210" 
          className="w-full h-12 bg-[#0F172A] border border-white/10 rounded-xl px-4 font-mono text-center mb-4 focus:outline-none focus:border-[#10B981]"
        />
        
        <a href="/dashboard" className="w-full h-12 bg-[#10B981] hover:bg-[#059669] text-[#0F172A] font-bold rounded-xl flex items-center justify-center transition-colors">
          SEND OTP
        </a>
      </div>
    </div>
  );
}
