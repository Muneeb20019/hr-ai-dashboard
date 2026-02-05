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

export default function FinalRecruitAIHub() {
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
    try {
        const { data } = await supabase.from('candidates').select('*').order('created_at', { ascending: false });
        if (data) setAllCandidates(data);
    } catch (error) {
        console.error("DB Error:", error);
    }
  }

  const filteredCandidates = allCandidates.filter(c => {
    if (!selectedDate) return true;
    return new Date(c.created_at).toDateString() === selectedDate.toDateString();
  });

  if (!mounted) return null;

  const hasData = allCandidates.length > 0;

  return (
    <main className="p-10 bg-[#020617] min-h-screen text-slate-100 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <div className="max-w-[1600px] mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-10 border-b border-slate-800 pb-12">
            <div className="space-y-6">
                <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800 shadow-2xl inline-flex items-center gap-4">
                    <DatePicker className="max-w-[200px] bg-slate-900 text-white border-none rounded-xl text-lg font-bold" value={selectedDate} onValueChange={setSelectedDate} />
                    <div className="h-8 w-[1px] bg-slate-800 mx-2"></div>
                    <Text className="text-xs text-slate-500 px-4 font-mono uppercase tracking-[0.2em] font-black border border-slate-800 rounded-lg py-1 uppercase tracking-tighter">Secure Link</Text>
                </div>
                <div>
                    {/* --- HIGH VISIBILITY TAGLINE: Extra Bold & Large --- */}
                    <Text className="text-indigo-400 font-black tracking-tight text-3xl mb-4 uppercase italic leading-none drop-shadow-[0_2px_10px_rgba(99,102,241,0.4)]">
                        "AI-Driven Talent Insights for Smarter Decisions"
                    </Text>
                    <Title className="text-8xl font-black text-white tracking-tighter uppercase italic leading-none">
                        RECRUIT.AI <span className="text-indigo-600 font-thin not-italic lowercase">hub</span>
                    </Title>
                </div>
            </div>
            <Badge color="indigo" className="animate-pulse border-indigo-500/30 px-10 py-4 font-black tracking-[0.3em] text-sm rounded-full bg-indigo-500/10 shadow-[0_0_50px_rgba(99,102,241,0.3)]">
                AI AGENT LIVE
            </Badge>
        </div>

        {/* METRICS GRID */}
        <Grid numItemsLg={2} className="gap-12 mb-16">
            <Card className="bg-slate-900/40 border-slate-800/60 ring-0 backdrop-blur-xl p-12 rounded-[3rem]">
                <Text className="text-slate-500 font-black uppercase text-sm tracking-[0.4em] mb-4">Global Pipeline Volume</Text>
                <Metric className="text-white font-black text-9xl leading-none tracking-tighter">{allCandidates.length}</Metric>
                <AreaChart className="h-32 mt-10 -mx-12 -mb-12" data={hasData ? allCandidates.map((c, i) => ({ i, s: c.score })) : [{i: 0, s: 0}, {i: 1, s: 0}]} index="i" categories={["s"]} colors={["indigo"]} showXAxis={false} showYAxis={false} showLegend={false} showGridLines={false} />
            </Card>
            <Card className="bg-slate-900/40 border-slate-800/60 ring-0 flex flex-col justify-center items-center py-16 text-center rounded-[3rem] border-l-8 border-l-indigo-500 shadow-2xl">
                <Text className="text-indigo-400 font-black uppercase text-sm tracking-[0.4em] mb-6 italic">Current Intake Pulse</Text>
                <Metric className="text-white font-black text-[12rem] leading-none drop-shadow-[0_0_60px_rgba(99,102,241,0.5)]">
                    {filteredCandidates.length}
                </Metric>
            </Card>
        </Grid>

        {/* DATA TABLE */}
        <Card className="bg-slate-900/20 border-slate-800/40 ring-0 rounded-[4rem] overflow-hidden shadow-3xl">
          <div className="p-12 border-b border-slate-800/60 bg-slate-900/40 flex justify-between items-center">
            <Title className="text-white font-black tracking-tighter uppercase text-4xl italic leading-none tracking-tight">Intelligence Stream — {selectedDate?.toLocaleDateString()}</Title>
            <Badge color="slate" variant="light" className="font-mono text-xs px-6 py-2 rounded-full font-bold border border-slate-700 uppercase tracking-widest">{filteredCandidates.length} ENTRIES</Badge>
          </div>
          <Table>
            <TableHead className="bg-slate-900/80">
              <TableRow>
                <TableHeaderCell className="text-slate-500 font-black text-xs uppercase p-10 tracking-widest">Candidate Identity</TableHeaderCell>
                <TableHeaderCell className="text-slate-500 font-black text-xs uppercase p-10 text-center tracking-widest">AI Fit Index</TableHeaderCell>
                <TableHeaderCell className="text-slate-500 font-black text-xs uppercase p-10 text-right tracking-widest">Action</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCandidates.map((item) => (
                <TableRow key={item.id} className="hover:bg-indigo-500/5 transition-all group border-b border-slate-800/30">
                  <TableCell className="p-10">
                    <Text className="text-white font-black text-4xl uppercase leading-none mb-3 tracking-tighter group-hover:text-indigo-400 transition-colors uppercase italic">{item.name}</Text>
                    <Text className="text-slate-600 text-[10px] font-mono uppercase italic tracking-widest leading-none">{new Date(item.created_at).toLocaleTimeString()}</Text>
                  </TableCell>
                  <TableCell className="p-10">
                    <div className="w-60 mx-auto">
                        <Text className="text-indigo-400 font-black text-sm mb-3 uppercase italic text-center tracking-widest leading-none">{item.score}/10 MATCH RANK</Text>
                        <ProgressBar value={(item.score || 0) * 10} color={(item.score || 0) >= 8 ? "emerald" : "indigo"} className="h-3 rounded-full shadow-inner" />
                    </div>
                  </TableCell>
                  <TableCell className="p-10 text-right">
                    <Button size="xl" variant="secondary" className="bg-indigo-600/10 text-indigo-400 border-indigo-500/40 hover:bg-indigo-600 hover:text-white transition-all font-black px-12 py-6 rounded-3xl uppercase text-sm tracking-widest shadow-2xl" onClick={() => { setSelectedCandidate(item); setIsOpen(true); }}>
                        PROFILE <ArrowRight className="ml-4 w-6 h-6" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* MODAL / POPUP */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} static={true}>
        <DialogPanel className="bg-[#020617] border border-slate-800 p-0 rounded-[4rem] max-w-5xl shadow-[0_0_200px_rgba(79,70,229,0.3)] overflow-hidden">
          <div className="bg-slate-900/60 p-12 border-b border-slate-800 flex justify-between items-center">
            <div>
                <Badge color="emerald" className="px-6 py-1.5 font-black text-xs rounded-full uppercase tracking-widest mb-3">AI VERIFIED</Badge>
                <Title className="text-white text-6xl font-black uppercase tracking-tighter leading-none italic">{selectedCandidate?.name}</Title>
            </div>
            <Button variant="light" onClick={() => setIsOpen(false)} className="bg-slate-800/80 p-6 rounded-full hover:bg-rose-500/30 hover:text-rose-400 transition-all shadow-lg"><X className="w-10 h-10" /></Button>
          </div>

          <div className="p-12 space-y-12">
            <div className="grid grid-cols-4 gap-6">
                {[
                    { label: "MATCH SCORE", val: (selectedCandidate?.score || 0) * 10 + "%", col: "text-white" },
                    { label: "AI STATUS", val: "READY", col: "text-emerald-500" },
                    { label: "NEURAL RANK", val: "#1", col: "text-indigo-400" },
                    { label: "INTEGRITY", val: "PASS", col: "text-white" }
                ].map((m, i) => (
                    <div key={i} className="bg-slate-900/50 border border-slate-800 p-6 rounded-[2.5rem] text-center shadow-2xl">
                        <Text className="text-slate-600 font-black uppercase text-[10px] tracking-[0.3em] mb-2 leading-none">{m.label}</Text>
                        <Text className={`${m.col} font-black text-4xl tracking-tighter leading-none`}>{m.val}</Text>
                    </div>
                ))}
            </div>

            <Grid numItemsMd={2} className="gap-12">
                <div className="space-y-10">
                    <div className="p-10 bg-slate-900/40 rounded-[3rem] border border-slate-800 shadow-inner">
                        <Title className="text-white text-xs uppercase tracking-[0.4em] font-black mb-10 border-b border-slate-800 pb-4 flex items-center italic tracking-widest"><Phone className="w-6 h-6 mr-4 text-indigo-500" /> Secure Communications</Title>
                        <div className="space-y-10">
                            <div><Text className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-2">Neural Email Address</Text><Text className="text-indigo-400 text-3xl font-black truncate tracking-tighter leading-none underline decoration-indigo-500/20 underline-offset-8">{selectedCandidate?.email}</Text></div>
                            <div><Text className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-2">Direct Contact Line</Text><Text className="text-emerald-400 text-3xl font-black tracking-[0.2em] leading-none tracking-tighter">{selectedCandidate?.phone || "NOT_PROVIDED"}</Text></div>
                        </div>
                    </div>
                </div>

                <div className="p-12 bg-indigo-600/5 border border-indigo-500/10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-start max-h-[400px]">
                    <Title className="text-indigo-400 text-xs uppercase font-black mb-8 italic underline underline-offset-[16px] decoration-indigo-500/30 tracking-[0.5em]">AI Analysis</Title>
                    <div className="overflow-y-auto pr-6 custom-scrollbar scrollbar-hide">
                        <Text className="text-slate-200 leading-relaxed text-2xl font-bold italic tracking-tight leading-tight">
                            "{selectedCandidate?.justification}"
                        </Text>
                    </div>
                </div>
            </Grid>

            <div className="flex gap-10 mt-16 pb-8">
                <Button className="w-full py-10 rounded-[2.5rem] bg-indigo-600 hover:bg-indigo-500 font-black text-2xl border-none shadow-[0_20px_80px_rgba(79,70,229,0.5)] hover:-translate-y-2 transition-all uppercase tracking-[0.2em] italic active:scale-95">INITIATE INTERVIEW</Button>
                <Button variant="secondary" className="w-1/4 py-10 rounded-[2.5rem] border-slate-800 text-slate-500 font-black hover:bg-rose-500/10 hover:text-rose-400 transition-all uppercase tracking-widest">ARCHIVE</Button>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </main>
  );
}