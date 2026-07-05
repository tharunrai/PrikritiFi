'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, MapPin, ShieldAlert, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { analyzeImage } from '@/lib/tensorflow';
import { api } from '@/lib/api';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{ status: 'Healthy' | 'Stressed'; confidence: number } | null>(null);
  const [scoreUpdate, setScoreUpdate] = useState<string | null>(null);
  
  const [triggeringInsurance, setTriggeringInsurance] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    setResult(null);
    setTxHash(null);
    setScoreUpdate(null);

    // Simulate 2 second loading spinner for realism
    setAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      // Analyze with MobileNet (client-side)
      const imgElement = document.createElement('img');
      imgElement.src = url;
      await new Promise(resolve => { imgElement.onload = resolve; });
      
      const analysis = await analyzeImage(imgElement);
      setResult(analysis);

      // Call Backend to save result & update score
      // await api.post('/photos/submit', { result: analysis.status, confidence: analysis.confidence });
      
      if (analysis.status === 'Stressed') {
        setScoreUpdate('-8 Points');
      } else {
        setScoreUpdate('+5 Points');
      }

    } catch (error) {
      console.error("Error analyzing image:", error);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleTriggerInsurance = async () => {
    setTriggeringInsurance(true);
    try {
      // Backend calls the blockchain
      // const res = await api.post('/insurance/trigger');
      
      // Simulate network & blockchain delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock TX hash for demo
      setTxHash('0x' + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join(''));
    } catch (error) {
      console.error("Error triggering insurance", error);
    } finally {
      setTriggeringInsurance(false);
    }
  };

  return (
    <div className="w-full h-screen bg-[#0F172A] text-[#F8FAFC] font-sans flex flex-col overflow-hidden">
      {/* Top Nav */}
      <nav className="h-16 border-b border-white/10 bg-[#1E293B] flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#10B981] rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45"></div>
          </div>
          <span className="text-xl font-bold tracking-tight text-[#10B981]">
            Prakriti<span className="text-white">Fi</span>
          </span>
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
        <div className="w-full max-w-2xl flex flex-col gap-6">
          <h1 className="text-2xl font-bold">Crop Health Verification</h1>
          
          <div className="bg-[#1E293B] border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center">
            <div className="w-full flex items-center justify-center gap-2 mb-6 text-sm text-[#94A3B8] bg-[#0F172A] py-2 rounded-lg border border-white/5">
              <MapPin className="w-4 h-4 text-[#10B981]" />
              <span>📍 Vidarbha, Maharashtra (20.9374° N, 78.6068° E)</span>
            </div>

            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileChange}
            />

            {!previewUrl ? (
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-48 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <Upload className="w-8 h-8 text-[#10B981]" />
                <div>
                  <p className="font-bold">Tap to Upload Crop Photo</p>
                  <p className="text-xs text-[#94A3B8] mt-1">JPEG, PNG up to 10MB</p>
                </div>
              </button>
            ) : (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="Crop preview" className="w-full h-full object-cover" />
                
                {analyzing && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                    <Loader2 className="w-8 h-8 text-[#10B981] animate-spin" />
                    <p className="text-sm font-bold animate-pulse">MobileNet AI Analyzing on Device...</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {result && !analyzing && (
            <div className={`border rounded-2xl p-6 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 ${result.status === 'Healthy' ? 'bg-[#1E293B] border-[#10B981]/30' : 'bg-red-950/20 border-red-500/30'}`}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-1">AI Verification Result</h3>
                  <div className="flex items-center gap-3">
                    <span className={`text-3xl font-bold ${result.status === 'Healthy' ? 'text-[#10B981]' : 'text-red-500'}`}>
                      {result.status}
                    </span>
                    <span className="px-2 py-1 rounded bg-[#0F172A] border border-white/10 text-xs font-mono">
                      {(result.confidence * 100).toFixed(1)}% CONFIDENCE
                    </span>
                  </div>
                </div>
                <div className={`flex items-center justify-center w-12 h-12 rounded-full ${result.status === 'Healthy' ? 'bg-[#064E3B] text-[#10B981]' : 'bg-red-900/50 text-red-500'}`}>
                  {result.status === 'Healthy' ? <CheckCircle2 className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
                </div>
              </div>

              {scoreUpdate && (
                <div className="mt-6 flex items-center justify-between p-4 rounded-xl bg-[#0F172A] border border-white/5">
                  <span className="text-sm text-[#94A3B8]">Prakriti Score Update</span>
                  <span className={`font-bold ${scoreUpdate.startsWith('+') ? 'text-[#10B981]' : 'text-red-500'}`}>
                    {scoreUpdate}
                  </span>
                </div>
              )}

              {result.status === 'Stressed' && !txHash && (
                <div className="mt-6">
                  <button 
                    onClick={handleTriggerInsurance}
                    disabled={triggeringInsurance}
                    className="w-full h-12 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    {triggeringInsurance ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Verifying with Oracle Network...
                      </>
                    ) : (
                      <>
                        TRIGGER INSURANCE PAYOUT <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              )}

              {txHash && (
                <div className="mt-6 p-4 rounded-xl bg-[#064E3B]/30 border border-[#10B981]/30 flex flex-col gap-2 animate-in fade-in zoom-in-95">
                  <div className="flex items-center gap-2 text-[#10B981] font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>₹1,500 released to your wallet</span>
                  </div>
                  <div className="text-xs text-[#94A3B8] font-mono break-all mt-2 bg-[#0F172A] p-2 rounded border border-white/5">
                    TX Hash: {txHash}
                  </div>
                  <a href="#" className="text-xs text-[#10B981] hover:underline mt-1">View on Polygonscan Mumbai ↗</a>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
