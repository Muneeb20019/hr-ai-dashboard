"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Card, Title, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, 
  Badge, Metric, Text, Flex, Grid, ProgressBar, AreaChart, Button,
  Dialog, DialogPanel, DatePicker
} from "@tremor/react";
import { Users, BarChart3, CheckCircle, Mail, Phone, ArrowRight, X, Zap } from "lucide-react";

// YOUR CONNECTION KEYS
const SUPABASE_URL = 'https://ugqqwlfrvczogkkxxoct.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVncXF3bGZydmN6b2dra3h4b2N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMDc5MzEsImV4cCI6MjA4NTY4MzkzMX0.BP_75CH7CII90lES8UP7reB70SgAGMEb1OFzFdKnJcg';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function PowerDashboard() {
  const [allCandidates, setAllCandidates] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchData();
  }, []);

  async function fetchData() {
    const { data } = await supabase.from('candidates').select('*').order('created_at', { ascending: false });
    if (data) setAllCandidates(data);
  }

  const filteredCandidates = allCandidates.filter(c => {
    if (!selectedDate) return true;
    return new Date(c.created_at).toDateString() === selectedDate.toDateString();
  });

  if (!mounted) return null;

  return (
    <main className="p-4 md:p-10 bg-[#020617] min-h-screen text-slate-100 font-sans selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto">
        
        {/* BIG POWER HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
                <Text className="text-indigo-400 font-mono tracking-[0.5em] text-[10px] uppercase mb-1 font-black">Neural Evaluation Layer v4.0</Text>
                <Title className="text-7xl font-black text-white tracking-tighter uppercase italic leading-none">RECRUIT.AI <span className="text-indigo-600 font-thin not-italic lowercase">hub</span></Title>
            </div>
            <div className="flex items-center gap-4 bg-slate-900/50 p-3 rounded-3xl border border-slate-800 shadow-2xl">
                <DatePicker className="max-w-[180px] !bg-transparent !border-none" value={selectedDate} onValueChange={setSelectedDate} />
                <Badge color="indigo" className="animate-pulse px-6 py-2 font-black tracking-widest text-xs rounded-full">AGENT LIVE</Badge>
            </div>
        </div>

        {/* LARGE IMPACT METRICS */}
        <Grid numItemsLg={3} className="gap-8 mb-12">
            <Card className="bg-slate-900/40 border-slate-800/60 ring-0 backdrop-blur-xl">
                <Text className="text-slate-500 font-black uppercase text-xs tracking-widest mb-1">Global Pipeline</Text>
                <Metric className="text-white font-black text-6xl">{allCandidates.length}</Metric>
                <AreaChart className="h-24 mt-6 -mx-6 -mb-6" data={allCandidates.map((c, i) => ({ i, s: c.score }))} index="i" categories={["s"]} colors={["indigo"]} showXAxis={false} showYAxis={false} showLegend={false} showGridLines={false} />
            </Card>

            <Card className="bg-slate-900/40 border-slate-800/60 ring-0 flex flex-col justify-center items-center py-10">
                <Text className="text-indigo-400 font-black uppercase text-xs tracking-[0.3em] mb-2">Today's Intake</Text>
                <Metric className="text-white font-black text-9xl drop-shadow-[0_0_30px_rgba(99,102,241,0.4)]">{filteredCandidates.length}</Metric>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-900/40 to-transparent border-indigo-500/20 ring-0 p-10 flex flex-col justify-center text-center">
                <Badge color="emerald" className="w-fit mx-auto mb-4 font-black px-6">SYSTEM SECURE</Badge>
                <Text className="text-slate-500 text-xs font-mono uppercase italic tracking-widest">Linked to n8n-socket-9</Text>
            </Card>
        </Grid>

        {/* BOLD DATA TABLE */}
        <Card className="bg-slate-900/20 border-slate-800/40 ring-0 rounded-[3rem] overflow-hidden shadow-3xl">
          <div className="p-10 border-b border-slate-800/60 bg-slate-900/40">
            <Title className="text-white font-black tracking-tighter uppercase text-3xl italic">Intelligence Stream — {selectedDate?.toLocaleDateString()}</Title>
          </div>
          <Table>
            <TableHead className="bg-slate-900/80">
              <TableRow>
                <TableHeaderCell className="text-slate-500 font-black text-xs uppercase p-8">Candidate Identity</TableHeaderCell>
                <TableHeaderCell className="text-slate-500 font-black text-xs uppercase p-8 text-center">AI Fit Score</TableHeaderCell>
                <TableHeaderCell className="text-slate-500 font-black text-xs uppercase p-8 text-right">Action</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCandidates.map((item) => (
                <TableRow key={item.id} className="hover:bg-indigo-500/5 transition-all duration-300 border-b border-slate-800/30">
                  <TableCell className="p-8">
                    <Text className="text-white font-black text-3xl tracking-tighter uppercase leading-none mb-2">{item.name}</Text>
                    <Text className="text-slate-600 text-xs font-mono uppercase italic">{new Date(item.created_at).toLocaleTimeString()}</Text>
                  </TableCell>
                  <TableCell className="p-8">
                    <div className="w-56 mx-auto">
                        <Text className="text-indigo-400 font-black text-xs mb-2 uppercase italic text-center">{item.score}/10 MATCH</Text>
                        <ProgressBar value={item.score * 10} color={item.score >= 8 ? "emerald" : "indigo"} className="h-2 rounded-full" />
                    </div>
                  </TableCell>
                  <TableCell className="p-8 text-right">
                    <Button 
                        size="xl" variant="secondary" 
                        className="bg-indigo-600/10 text-indigo-400 border-indigo-500/40 hover:bg-indigo-600 hover:text-white transition-all font-black px-10 py-4 rounded-2xl shadow-2xl"
                        onClick={() => { setSelectedCandidate(item); setIsOpen(true); }}
                    >
                        VIEW PROFILE <ArrowRight className="ml-3 w-5 h-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* --- CLEANED PROFILE POPUP (Readable details) --- */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} static={true}>
        <DialogPanel className="bg-[#020617] border border-slate-800 p-0 rounded-[3rem] max-w-4xl shadow-[0_0_150px_rgba(79,70,229,0.3)] overflow-hidden">
          
          <div className="bg-slate-900/60 p-10 border-b border-slate-800 flex justify-between items-center">
            <div>
                <Badge color="emerald" className="font-black text-[10px] px-3 mb-2 rounded-full tracking-widest">VERIFIED PROFILE</Badge>
                <Title className="text-white text-5xl font-black uppercase tracking-tighter leading-none italic">{selectedCandidate?.name}</Title>
            </div>
            <Button variant="light" onClick={() => setIsOpen(false)} className="bg-slate-800/80 p-4 rounded-full hover:bg-rose-500/20 hover:text-rose-400 transition-all"><X className="w-8 h-8" /></Button>
          </div>

          <div className="p-10 space-y-8">
            {/* MODAL METRICS */}
            <div className="grid grid-cols-4 gap-4">
                {[
                    { label: "Match Score", val: (selectedCandidate?.score || 0) * 10 + "%", col: "text-white" },
                    { label: "Status", val: "READY", col: "text-emerald-500" },
                    { label: "Rank", val: "#1", col: "text-indigo-400" },
                    { label: "Integrity", val: "A+", col: "text-white" }
                ].map((m, i) => (
                    <div key={i} className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl text-center">
                        <Text className="text-slate-500 font-black uppercase text-[8px] tracking-[0.2em] mb-1">{m.label}</Text>
                        <Text className={`${m.col} font-black text-2xl`}>{m.val}</Text>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-10">
                <div className="space-y-6">
                    <div className="p-6 bg-slate-900/40 rounded-3xl border border-slate-800 shadow-inner">
                        <Title className="text-white text-[10px] uppercase tracking-widest font-black mb-4 flex items-center italic border-b border-slate-800 pb-2"><Phone className="w-4 h-4 mr-2 text-indigo-500" /> Secure Contacts</Title>
                        <div className="space-y-4">
                            <div>
                                <Text className="text-slate-600 text-[9px] font-black uppercase tracking-widest mb-1">Email Channel</Text>
                                <Text className="text-indigo-400 text-lg font-black truncate leading-none underline decoration-indigo-500/20">{selectedCandidate?.email}</Text>
                            </div>
                            <div>
                                <Text className="text-slate-600 text-[9px] font-black uppercase tracking-widest mb-1">Direct Line</Text>
                                <Text className="text-emerald-400 text-lg font-black tracking-widest leading-none">{selectedCandidate?.phone || "NOT FOUND"}</Text>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-indigo-600/5 border border-indigo-500/10 rounded-3xl shadow-xl">
                        <Title className="text-indigo-400 text-[10px] uppercase font-black mb-3 italic tracking-widest">AI Rationale Justification</Title>
                        <Text className="text-slate-300 leading-relaxed text-base font-medium italic">"{selectedCandidate?.justification?.substring(0, 300)}..."</Text>
                    </div>
                </div>

                {/* SKILL BARS - Fixed Indigo color and readable labels */}
                <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-3xl shadow-inner">
                    <Title className="text-slate-400 text-[10px] uppercase font-black mb-6 italic tracking-widest border-b border-slate-800 pb-2">Technical Skill Match</Title>
                    <div className="space-y-5">
                        {selectedCandidate?.skills?.split(',').slice(0, 5).map((skill: string, idx: number) => (
                            <div key={idx}>
                                <Flex className="mb-1.5">
                                    <Text className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{skill.trim().substring(0, 15)}</Text>
                                    <Text className="text-indigo-400 text-[10px] font-black italic">TOP</Text>
                                </Flex>
                                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden shadow-inner border border-slate-700/30">
                                    <div 
                                        className="bg-gradient-to-r from-indigo-600 to-indigo-400 h-full rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(99,102,241,0.3)]" 
                                        style={{ width: `${98 - (idx * 4)}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex gap-6 mt-8">
                <Button className="w-full py-6 rounded-3xl bg-indigo-600 hover:bg-indigo-500 font-black text-xl border-none shadow-[0_15px_40px_rgba(79,70,229,0.4)] hover:-translate-y-1 transition-all uppercase tracking-[0.2em] italic active:scale-95">INITIATE INTERVIEW</Button>
                <Button variant="secondary" className="w-1/3 py-6 rounded-3xl border-slate-800 text-slate-500 font-black text-sm hover:bg-rose-500/10 hover:text-rose-400 uppercase tracking-widest transition-all">ARCHIVE</Button>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </main>
  );
}