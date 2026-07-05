'use client';

import React, { useState } from 'react';
import { Upload, FileText, Activity, ShieldCheck, UserCheck } from 'lucide-react';
import clsx from 'clsx';

export default function Dashboard() {
  const [satelliteView, setSatelliteView] = useState<'sar' | 'optical'>('sar');

  return (
    <div className="w-full h-screen bg-[#0F172A] text-[#F8FAFC] font-sans overflow-hidden flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="h-16 border-b border-white/10 bg-[#1E293B] flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#10B981] rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45"></div>
          </div>
          <span className="text-xl font-bold tracking-tight text-[#10B981]">
            Prakriti<span className="text-white">Fi</span>
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-xs text-[#94A3B8] font-medium">CONNECTED WALLET</span>
            <span className="text-sm font-mono text-[#10B981]">0x7a...E921</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#064E3B] border border-[#10B981]/30 flex items-center justify-center text-sm font-bold">
            RS
          </div>
        </div>
      </nav>

      <main className="flex-1 flex overflow-hidden p-6 gap-6">
        {/* Sidebar / Identity Section */}
        <aside className="w-72 flex flex-col gap-6 shrink-0">
          {/* Prakriti Score Circular Gauge */}
          <div className="bg-[#1E293B] rounded-2xl border border-white/10 p-6 flex flex-col items-center shadow-lg">
            <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest mb-4">Prakriti Score</h3>
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-[#0F172A]" />
                <circle 
                  cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" 
                  strokeDasharray="440" strokeDashoffset="110" className="text-[#10B981] transition-all duration-1000" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold">75</span>
                <span className="text-[10px] font-bold text-[#10B981] uppercase">Excellent</span>
              </div>
            </div>
            <div className="mt-6 w-full space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-[#94A3B8]">Satellite Health</span>
                <span className="font-bold">88%</span>
              </div>
              <div className="w-full bg-[#0F172A] h-1.5 rounded-full">
                <div className="bg-[#10B981] h-1.5 rounded-full w-[88%] transition-all duration-1000"></div>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#94A3B8]">Photo Verification</span>
                <span className="font-bold">62%</span>
              </div>
              <div className="w-full bg-[#0F172A] h-1.5 rounded-full">
                <div className="bg-[#F59E0B] h-1.5 rounded-full w-[62%] transition-all duration-1000"></div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col gap-3">
            <button className="h-12 bg-[#10B981] hover:bg-[#059669] text-[#0F172A] font-bold rounded-xl flex items-center justify-center gap-2 transition-colors">
              <Upload className="w-4 h-4" />
              <span>UPLOAD CROP PHOTO</span>
            </button>
            <button className="h-12 bg-[#1E293B] hover:bg-[#334155] border border-white/10 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors">
              <FileText className="w-4 h-4" />
              <span>APPLY FOR LOAN</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-6 overflow-hidden">
          {/* Top Dashboard Cards */}
          <div className="grid grid-cols-3 gap-6 shrink-0">
            <div className="bg-[#1E293B] border border-white/10 p-5 rounded-2xl flex flex-col justify-between">
              <p className="text-xs font-bold text-[#94A3B8] uppercase mb-1 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Active Policy
              </p>
              <h4 className="text-lg font-bold mt-1">₹15,000 Coverage</h4>
              <div className="mt-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                <span className="text-xs font-medium text-[#10B981]">MONSOON 2024 ACTIVE</span>
              </div>
            </div>
            <div className="bg-[#1E293B] border border-white/10 p-5 rounded-2xl flex flex-col justify-between">
              <p className="text-xs font-bold text-[#94A3B8] uppercase mb-1">Available Credit</p>
              <h4 className="text-lg font-bold mt-1">₹7,500</h4>
              <p className="text-xs text-[#94A3B8] mt-3">Based on Prakriti Score</p>
            </div>
            <div className="bg-[#1E293B] border border-white/10 p-5 rounded-2xl flex flex-col justify-between">
              <p className="text-xs font-bold text-[#94A3B8] uppercase mb-1 flex items-center gap-2">
                <UserCheck className="w-4 h-4" /> Circle Reputation
              </p>
              <h4 className="text-lg font-bold mt-1">840 RP</h4>
              <div className="mt-3 flex items-center -space-x-2">
                <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-[#1E293B] text-[8px] flex items-center justify-center">A</div>
                <div className="w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#1E293B] text-[8px] flex items-center justify-center">B</div>
                <div className="w-6 h-6 rounded-full bg-orange-500 border-2 border-[#1E293B] text-[8px] flex items-center justify-center">C</div>
                <span className="text-[10px] text-[#94A3B8] ml-4">+12 Members</span>
              </div>
            </div>
          </div>

          {/* Satellite Monitoring Section */}
          <div className="flex-1 min-h-0 bg-[#1E293B] border border-white/10 rounded-2xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4 shrink-0">
              <div>
                <h3 className="text-lg font-bold">Satellite Health Monitoring</h3>
                <p className="text-xs text-[#94A3B8]">📍 Vidarbha (20.93° N, 78.60° E)</p>
              </div>
              <div className="flex bg-[#0F172A] rounded-lg p-1">
                <button 
                  onClick={() => setSatelliteView('sar')}
                  className={clsx("px-4 py-1.5 text-xs font-bold rounded-md transition-all", satelliteView === 'sar' ? "bg-[#1E293B] shadow-sm text-white" : "text-[#94A3B8] hover:text-white")}
                >
                  SAR (All-Weather)
                </button>
                <button 
                  onClick={() => setSatelliteView('optical')}
                  className={clsx("px-4 py-1.5 text-xs font-bold rounded-md transition-all", satelliteView === 'optical' ? "bg-[#1E293B] shadow-sm text-white" : "text-[#94A3B8] hover:text-white")}
                >
                  OPTICAL
                </button>
              </div>
            </div>
            
            <div className="flex-1 flex gap-4 min-h-0">
              {/* SAR / Optical Image View */}
              <div className="relative flex-1 rounded-xl overflow-hidden bg-[#0F172A] border border-white/5 flex flex-col items-center justify-center">
                 {satelliteView === 'sar' ? (
                   <>
                     <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900 via-transparent to-transparent"></div>
                     <div className="absolute inset-0 flex flex-col">
                       <div className="grid grid-cols-12 grid-rows-12 h-full opacity-20">
                         <div className="col-span-full row-span-full border border-white/20 grid grid-cols-12 grid-rows-12">
                           {Array.from({ length: 144 }).map((_, i) => (
                             <div key={i} className="border-r border-b border-white/10"></div>
                           ))}
                         </div>
                       </div>
                     </div>
                     <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-[10px] font-mono border border-white/10">
                       SCANNING REGION: MV_4901_X
                     </div>
                     <div className="absolute bottom-4 right-4 text-[#10B981] text-[10px] font-bold">
                       MONSOON CLOUD PENETRATION: 99.8%
                     </div>
                     <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-emerald-500/20 blur-3xl"></div>
                     <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-red-500/10 blur-2xl"></div>
                     <p className="absolute bottom-4 left-4 text-xs font-bold text-white/50 bg-black/50 px-2 py-1 rounded">Monsoon — SAR sees clearly</p>
                   </>
                 ) : (
                   <>
                     <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black"></div>
                     <div className="absolute inset-0 flex items-center justify-center opacity-30">
                       <div className="w-full h-full bg-white/5 blur-xl"></div>
                     </div>
                     <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-[10px] font-mono border border-white/10 text-red-400">
                       SENSOR BLOCKED BY CLOUD COVER
                     </div>
                     <p className="absolute bottom-4 left-4 text-xs font-bold text-white/50 bg-black/50 px-2 py-1 rounded">Monsoon — Optical blinded</p>
                   </>
                 )}
              </div>
              
              {/* Right Side: Recent Activity */}
              <div className="w-80 flex flex-col shrink-0 overflow-y-auto pr-2">
                <h4 className="text-xs font-bold text-[#94A3B8] uppercase mb-4 sticky top-0 bg-[#1E293B] py-1 z-10 flex items-center gap-2">
                  <Activity className="w-3 h-3" /> Live Activity Oracle
                </h4>
                <div className="space-y-4">
                  <div className="flex gap-4 p-3 rounded-xl bg-[#0F172A] border border-white/5 hover:border-white/10 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[#064E3B] flex items-center justify-center shrink-0">
                       <div className="w-3 h-3 bg-[#10B981] rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold">Photo Verified: Healthy</p>
                      <p className="text-[10px] text-[#94A3B8] font-mono uppercase mt-0.5">TX: 0x82...f91a</p>
                      <p className="text-[10px] text-[#10B981] mt-1 font-bold">+5 Prakriti Score</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-3 rounded-xl bg-[#0F172A] border border-white/5 hover:border-white/10 transition-colors opacity-80">
                    <div className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center shrink-0">
                       <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold">Insurance Triggered</p>
                      <p className="text-[10px] text-[#94A3B8] font-mono uppercase mt-0.5">TX: 0x22...e810</p>
                      <p className="text-[10px] text-red-400 mt-1 font-bold">₹1,500 Payout Sent</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-3 rounded-xl bg-[#0F172A] border border-white/5 hover:border-white/10 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center shrink-0">
                       <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold">Circle Verification</p>
                      <p className="text-[10px] text-[#94A3B8] mt-0.5">Member 'P. Kumar' verified</p>
                      <p className="text-[10px] text-blue-400 mt-1 font-bold">+12 Reputation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Status Footer Bar */}
      <footer className="h-10 bg-[#0F172A] border-t border-white/5 px-6 flex items-center justify-between text-[10px] text-[#94A3B8] shrink-0">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span> NestJS API Online</span>
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span> Polygon Mumbai Testnet</span>
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span> TensorFlow.js MobileNet V2</span>
        </div>
        <div className="font-mono">
          TIMESTAMP: {new Date().toISOString().replace('T', ' ').substring(0, 19)} | VIDARBHA_NODE_A
        </div>
      </footer>
    </div>
  );
}
