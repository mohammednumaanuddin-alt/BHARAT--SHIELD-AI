import React, { useState, useEffect } from 'react';
import { 
  Shield, ShieldAlert, ShieldCheck, Lock, Zap, Terminal, Scale, 
  AlertTriangle, Volume2, VolumeX, Database, User, 
  Key, LogOut, Radar, Target, Activity, Navigation, Crosshair,
  FileText, Bomb, Flame, ZapOff, CheckCircle, Map as MapIcon,
  Search, Radio, Globe, ChevronRight, Server, Cpu, Network,
  ShieldOff, Power, XCircle
} from 'lucide-react';

// --- SYSTEM CONSTANTS & DATA ---
const ADMIN_CREDENTIALS = { user: 'admin', pass: 'bharat123' };

const INITIAL_CYBER_THREATS = [
  {
    id: "CB-TG-001",
    state: "Telangana",
    asset: "T-Fiber Central Gateway",
    attackType: "Advanced Persistent Threat (APT)",
    status: "ATTACK IN PROGRESS",
    risk: "CRITICAL",
    law: "IT Act Section 66F (Cyber Terrorism)",
    punishment: "Life Imprisonment",
    forensics: "IP Origin: 103.44.21.109 (Encrypted Tunnel)",
    isNeutralized: false
  },
  {
    id: "CB-DL-002",
    state: "Delhi",
    asset: "MEA Central Database",
    attackType: "Zero-Day Data Exfiltration",
    status: "ATTACK IN PROGRESS",
    risk: "HIGH",
    law: "IT Act Section 70 (Protected Systems)",
    punishment: "10 Years Rigorous Imprisonment",
    forensics: "Pattern: Spear Phishing / Macro Injection",
    isNeutralized: false
  }
];

export default function App() {
  const [view, setView] = useState('login'); 
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  // Radar State
  const [radarStatus, setRadarStatus] = useState('idle'); // idle, scanning, locked, intercepting, destroyed, report
  const [scanProgress, setScanProgress] = useState(0);
  const [missileTravel, setMissileTravel] = useState(0);
  
  // Cyber State
  const [cyberThreats, setCyberThreats] = useState(INITIAL_CYBER_THREATS);
  const [logs, setLogs] = useState([`[SYSTEM] BHARAT-SHIELD Core Initialized.`]);

  const addLog = (msg) => setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 5)]);

  const speak = (text) => {
    if (isMuted || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (user === ADMIN_CREDENTIALS.user && pass === ADMIN_CREDENTIALS.pass) {
      setView('radar');
      addLog(`ADMIN ACCESS: Cmdr. Mohammed Numaan Uddin`);
      speak("Welcome Commander. Systems online. Waiting for airspace scan command.");
    }
  };

  /* --- RADAR ACTIONS --- */
  const startScan = () => {
    setRadarStatus('scanning');
    setScanProgress(0);
    speak("Initiating multi-spectral scan across the Indian subcontinent.");
    let interval = setInterval(() => {
      setScanProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setRadarStatus('locked');
          speak("Alert! High-speed projectile detected from Sialkot range. Trajectory confirmed towards Ambala Air Command.");
          return 100;
        }
        return p + 2;
      });
    }, 30);
  };

  const executeIntercept = () => {
    setRadarStatus('intercepting');
    addLog("INTERCEPT: PAD-Exo Atmospheric Interceptor Launched.");
    speak("Interceptor launched. Locking on target coordinates.");
    setTimeout(() => {
      setRadarStatus('destroyed');
      speak("Target neutralized. Direct hit confirmed. No casualties on ground.");
      setTimeout(() => setRadarStatus('report'), 2000);
    }, 2500);
  };

  /* --- CYBER ACTIONS --- */
  const neutralizeCyber = (id) => {
    addLog(`COUNTERMEASURE: Blacklisting IP source for ${id}...`);
    speak("Initiating emergency kill-switch. Blacklisting IP and flushing network ports.");
    
    setCyberThreats(prev => prev.map(t => 
      t.id === id ? { ...t, status: "NEUTRALIZED", risk: "SECURE", isNeutralized: true } : t
    ));
    
    setTimeout(() => {
      addLog(`SUCCESS: ${id} access blocked permanently.`);
      speak("Attacker access terminated. Forensic data logged for prosecution.");
    }, 1500);
  };

  useEffect(() => {
    if (radarStatus === 'locked' || radarStatus === 'intercepting') {
      const timer = setInterval(() => setMissileTravel(t => (t < 100 ? t + 0.4 : 100)), 100);
      return () => clearInterval(timer);
    }
  }, [radarStatus]);

  if (view === 'login') {
    return (
      <div className="min-h-screen bg-[#05070a] flex items-center justify-center p-6 font-sans">
        <form onSubmit={handleLogin} className="w-full max-w-md bg-slate-900 border-t-4 border-orange-600 rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95">
           <div className="text-center mb-10">
              <Shield className="w-20 h-20 text-orange-500 mx-auto mb-4" />
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">BHARAT-SHIELD</h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2">National Command Access</p>
           </div>
           <div className="space-y-4">
              <input type="text" placeholder="COMMANDER ID" value={user} onChange={e=>setUser(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl py-4 px-6 text-white outline-none focus:border-orange-500 font-mono" />
              <input type="password" placeholder="ACCESS KEY" value={pass} onChange={e=>setPass(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl py-4 px-6 text-white outline-none focus:border-orange-500 font-mono" />
              <button className="w-full bg-orange-600 hover:bg-orange-500 py-4 rounded-xl text-white font-black uppercase tracking-widest transition-all">Authenticate</button>
           </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020408] text-slate-200 flex flex-col font-sans overflow-hidden">
      
      {/* NAVBAR */}
      <nav className="h-20 bg-slate-950 border-b border-white/5 px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Shield className="text-orange-500 w-8 h-8" />
          <h1 className="text-xl font-black text-white tracking-tighter uppercase italic">BHARAT-SHIELD AI</h1>
        </div>
        <div className="flex bg-black/50 p-1 rounded-2xl border border-white/10">
          <button onClick={()=>setView('radar')} className={`px-8 py-2 rounded-xl text-[10px] font-black uppercase transition-all flex items-center gap-2 ${view==='radar' ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-500'}`}>
            <Radar size={14}/> Radar Tactical
          </button>
          <button onClick={()=>setView('cyber')} className={`px-8 py-2 rounded-xl text-[10px] font-black uppercase transition-all flex items-center gap-2 ${view==='cyber' ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-500'}`}>
            <Database size={14}/> Cyber Command
          </button>
        </div>
        <button onClick={()=>setView('login')} className="text-red-500 flex items-center gap-2 text-xs font-black"><LogOut size={18}/> EXIT</button>
      </nav>

      <main className="flex-grow p-6 overflow-hidden">
        {view === 'radar' ? (
          /* --- RADAR TACTICAL --- */
          <div className="grid grid-cols-12 gap-6 h-full">
            <div className="col-span-12 lg:col-span-9 bg-slate-900/30 border border-white/5 rounded-[3rem] relative flex flex-col overflow-hidden">
               {/* RADAR MAP SIMULATION */}
               <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#22c55e_1px,transparent_1px)] bg-[size:40px_40px]"></div>
               
               <div className="absolute top-8 left-10 z-20">
                  <h2 className="text-2xl font-black text-white uppercase italic flex items-center gap-3">
                    <Radio className="text-orange-500 animate-pulse" /> Status: {radarStatus.toUpperCase()}
                  </h2>
               </div>

               <div className="flex-grow relative flex items-center justify-center bg-black/40">
                  {radarStatus === 'idle' && (
                    <div className="z-10 text-center">
                       <Globe size={100} className="text-slate-800 mx-auto mb-6" />
                       <button onClick={startScan} className="px-12 py-5 bg-orange-600 rounded-2xl text-white font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all">Start Airspace Scan</button>
                    </div>
                  )}

                  {radarStatus === 'scanning' && (
                    <div className="z-10 text-center">
                       <Radio size={80} className="animate-spin text-green-500 opacity-20 mx-auto" />
                       <p className="mt-8 text-2xl font-black text-green-500 animate-pulse">{scanProgress}% COMPLETE</p>
                    </div>
                  )}

                  {(radarStatus === 'locked' || radarStatus === 'intercepting') && (
                    <div className="w-full h-full relative p-20">
                        <div className="absolute top-20 left-20 border-2 border-red-500/20 p-6 rounded-3xl">
                           <p className="text-[10px] text-red-500 font-black mb-1 uppercase tracking-widest">Launcher</p>
                           <p className="text-xl font-black text-white italic">SIALKOT (PK)</p>
                        </div>
                        <div className="absolute bottom-20 right-20 border-2 border-blue-500/20 p-6 rounded-3xl">
                           <p className="text-[10px] text-blue-500 font-black mb-1 uppercase tracking-widest">Target</p>
                           <p className="text-xl font-black text-white italic">AMBALA SAC (IN)</p>
                        </div>

                        {/* Missile Icon */}
                        <div className="absolute transition-all duration-300" style={{ top: `${25 + missileTravel * 0.4}%`, left: `${25 + missileTravel * 0.4}%` }}>
                           <div className="text-5xl">🚀</div>
                        </div>

                        {/* Interceptor Icon */}
                        {radarStatus === 'intercepting' && (
                           <div className="absolute transition-all duration-200" style={{ bottom: `${15 + (100 - missileTravel) * 0.4}%`, right: `${15 + (100 - missileTravel) * 0.4}%` }}>
                              <div className="text-4xl">🚀</div>
                              <p className="text-[8px] font-black text-blue-400 uppercase mt-2">PAD-INTERCEPTOR</p>
                           </div>
                        )}
                    </div>
                  )}

                  {radarStatus === 'destroyed' && (
                    <div className="absolute text-9xl animate-ping" style={{ top: `${25 + missileTravel * 0.4}%`, left: `${25 + missileTravel * 0.4}%` }}>💥</div>
                  )}

                  {radarStatus === 'report' && (
                    <div className="absolute z-50 w-full max-w-xl bg-white text-slate-900 rounded-[2.5rem] p-12 shadow-2xl animate-in zoom-in-95">
                       <h2 className="text-3xl font-black italic uppercase tracking-tighter border-b-2 border-slate-100 pb-6 mb-8">Strike Report: Neutralized</h2>
                       <div className="space-y-4 font-mono text-[11px]">
                          <div className="flex justify-between"><span>INCIDENT:</span><span className="font-bold">Ghauri-Class MRBM</span></div>
                          <div className="flex justify-between"><span>ORIGIN:</span><span className="font-bold text-red-600">Sialkot Base</span></div>
                          <div className="flex justify-between"><span>COUNTER:</span><span className="font-bold text-green-600">PAD Interceptor #1</span></div>
                          <div className="flex justify-between"><span>LEGAL:</span><span className="font-bold text-blue-700 underline">NSA - Article 3 Breach</span></div>
                          <button onClick={()=>setRadarStatus('idle')} className="w-full mt-8 bg-slate-950 text-white py-4 rounded-xl font-black uppercase text-xs">Acknowledge & Close</button>
                       </div>
                    </div>
                  )}
               </div>

               {/* INTERCEPT ACTION BAR */}
               {radarStatus === 'locked' && (
                 <div className="h-32 bg-slate-950 border-t border-white/5 px-10 flex items-center justify-between animate-in slide-in-from-bottom-10">
                    <div>
                       <p className="text-[10px] text-orange-500 font-black mb-1 uppercase tracking-widest">Immediate Threat Action Required</p>
                       <p className="text-lg font-black text-white italic tracking-tighter uppercase">Trajectory Locked: Ambala Air Command</p>
                    </div>
                    <button onClick={executeIntercept} className="bg-red-600 hover:bg-red-500 px-12 py-5 rounded-2xl text-white font-black uppercase tracking-[0.2em] shadow-xl shadow-red-900/40 animate-pulse">Execute Intercept</button>
                 </div>
               )}
            </div>

            {/* SIDEBAR */}
            <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
               <div className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-8 text-center backdrop-blur-xl">
                  <div className={`w-24 h-24 rounded-full border-4 border-slate-800 mx-auto mb-6 flex items-center justify-center ${isSpeaking ? 'border-orange-500 scale-110' : ''} transition-all`}>
                     <img src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=BharatAI" className="w-16 h-16" alt="AI"/>
                  </div>
                  <h3 className="text-xs font-black text-white uppercase italic">Cmdr AI Analyst</h3>
                  <p className="mt-4 text-[10px] text-slate-500 italic text-left h-24 overflow-y-auto leading-relaxed">
                     {isSpeaking ? "Analyzing ballistic velocity and coordinating interception vectors with satellite uplink..." : "Monitoring subspace frequencies. All sectors green."}
                  </p>
               </div>
               <div className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-8 flex-grow">
                  <h3 className="text-[10px] font-black text-slate-700 uppercase tracking-widest mb-4">Tactical Logs</h3>
                  <div className="space-y-3">
                     {logs.map((log, i) => (
                       <div key={i} className="text-[9px] font-mono text-slate-500 border-b border-white/5 pb-2 truncate">{log}</div>
                     ))}
                  </div>
               </div>
               <div className="bg-orange-600 p-6 rounded-[2.5rem] text-center shadow-2xl">
                  <p className="text-[9px] text-white/60 font-black uppercase tracking-widest mb-1">Architect</p>
                  <p className="text-lg font-black text-white italic tracking-tighter uppercase">M. Numaan Uddin</p>
               </div>
            </div>
          </div>
        ) : (
          /* --- CYBER COMMAND --- */
          <div className="grid grid-cols-12 gap-6 h-full animate-in slide-in-from-right-10">
             <div className="col-span-12 lg:col-span-9 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                <div className="flex items-center justify-between">
                   <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter flex items-center gap-4">
                     <Database className="text-orange-500" /> Infrastructure Defense
                   </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {cyberThreats.map((t, i) => (
                     <div key={i} className={`p-8 rounded-[3rem] border-2 transition-all ${t.isNeutralized ? 'bg-green-500/5 border-green-500/30' : 'bg-red-500/5 border-red-500/40'}`}>
                        <div className="flex justify-between items-start mb-6">
                           <div>
                              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Entity Monitoring</p>
                              <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase">{t.state}</h3>
                              <p className="text-sm font-bold text-orange-500 mt-1 uppercase underline decoration-orange-500/30">{t.asset}</p>
                           </div>
                           <span className={`text-[9px] font-black px-4 py-1.5 rounded-xl uppercase tracking-widest ${t.isNeutralized ? 'bg-green-600 text-white' : 'bg-red-600 text-white animate-pulse'}`}>
                             {t.status}
                           </span>
                        </div>

                        <div className="space-y-4">
                           <div className="p-5 bg-black/60 rounded-3xl border border-white/5">
                              <p className="text-[9px] text-slate-500 uppercase font-black mb-1">Attack Logic</p>
                              <p className="text-xs font-bold text-slate-300">{t.attackType}</p>
                              <p className="text-[10px] text-slate-500 mt-2 font-mono">{t.forensics}</p>
                           </div>

                           <div className="p-6 bg-blue-600/5 border border-blue-500/30 rounded-3xl">
                              <p className="text-[10px] font-black text-blue-400 uppercase flex items-center gap-2 mb-2"><Scale size={14}/> Legal Code: {t.law}</p>
                              <p className="text-[10px] font-black text-white italic">{t.punishment}</p>
                           </div>

                           {!t.isNeutralized && (
                             <button 
                                onClick={() => neutralizeCyber(t.id)}
                                className="w-full bg-red-600 hover:bg-red-500 py-4 rounded-2xl text-white font-black uppercase text-[10px] tracking-[0.2em] transition-all flex items-center justify-center gap-3 mt-4"
                             >
                                <XCircle size={18} /> Immediate IP Neutralization
                             </button>
                           )}
                           
                           {t.isNeutralized && (
                             <div className="w-full bg-green-600/20 py-4 rounded-2xl text-green-500 font-black uppercase text-[10px] tracking-[0.2em] border border-green-500/40 flex items-center justify-center gap-3">
                                <CheckCircle size={18} /> Forensics Logged & Access Terminated
                             </div>
                           )}
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
                <div className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center">
                   <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mb-4">
                      <ShieldCheck className="text-green-500" size={32}/>
                   </div>
                   <p className="text-[10px] text-slate-500 font-black uppercase mb-1">Network Health</p>
                   <h2 className="text-4xl font-black text-white italic tracking-tighter">SECURE</h2>
                </div>
                <div className="bg-slate-950 p-8 rounded-[2.5rem] flex-grow space-y-6">
                   <h4 className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Active Protocols</h4>
                    
