"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Card, Title, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, 
  Badge, Metric, Text, Flex, Grid, ProgressBar, AreaChart, Button,
  Dialog, DialogPanel, DatePicker
} from "@tremor/react";
import { Users, BarChart3, CheckCircle, Mail, Phone, ArrowRight, X, Zap, CalendarDays } from "lucide-react";

const SUPABASE_URL = 'https://ugqqwlfrvczogkkxxoct.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVncXF3bGZydmN6b2dra3h4b2N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMDc5MzEsImV4cCI6MjA4NTY4MzkzMX0.BP_75CH7CII90lES8UP7reB70SgAGMEb1OFzFdKnJcg';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function FinalHub() {
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

  return (
    <main className="p-4 md:p-10 bg-[#020617] min-h-screen text-slate-100 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION - Calendar moved to right, Tagline Bolded */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8 border-b border-slate-800 pb-10">
            <div>
                <Text className="text-indigo-400 font-black tracking-wide text-2xl mb-2 italic drop-shadow-md">
                    "AI-Driven Talent Insights for Smarter Decisions"
                </Text>
                <Title className="text-6xl font-black text-white tracking-tighter uppercase italic leading-none">
                    RECRUIT.AI <span className="text-indigo-600 font-thin not-italic lowercase">hub</span>
                </Title>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="bg-slate-900 p-2 rounded-2xl border border-slate-800 shadow-2xl flex items-center gap-2">
                    <CalendarDays className="text-indigo-500 ml-2 w-5 h-5" />
                    <DatePicker 
                      className="max-w-[160px] bg-slate-900 text-white border-none rounded-xl" 
                      value={selectedDate} 
                      onValueChange={setSelectedDate} 
                    />
                </div>
                <Badge color="indigo" className="animate-pulse border-indigo-500/30 px-6 py-2 font-black tracking-widest text-xs rounded-full bg-indigo-500/10">AGENT LIVE</Badge>
            </div>
        </div>

        {/* METRICS GRID */}
        <Grid numItemsLg={2} className="gap-8 mb-12">
            <Card className="bg-slate-900/40 border-slate-800/60 ring-0 backdrop-blur-xl p-8 rounded-[2.5rem]">
                <Text className="text-slate-500 font-black uppercase text-[10px] tracking-widest mb-1 leading-none">Total Talent Pool</Text>
                <Metric className="text-white font-black text-6xl tracking-tighter mt-2">{allCandidates.length}</Metric>
                <AreaChart className="h-24 mt-4 -mx-8 -mb-8" data={allCandidates.length > 0 ? allCandidates.map((c, i) => ({ i, s: c.score })) : [{i:0,s:0}, {i:1,s:0}]} index="i" categories={["s"]} colors={["indigo"]} showXAxis={false} showYAxis={false} showLegend={false} showGridLines={false} />
            </Card>
            <Card className="bg-slate-900/40 border-slate-800/60 ring-0 flex flex-col justify-center items-center py-8 text-center rounded-[2.5rem] border-l-4 border-l-indigo-500 shadow-xl">
                <Text className="text-indigo-400 font-black uppercase text-xs tracking-[0.3em] mb-2 leading-none">Today's Applications</Text>
                <Metric className="text-white font-black text-8xl drop-shadow-[0_0_40px_rgba(99,102,241,0.3)] mt-2">{filteredCandidates.length}</Metric>
            </Card>
        </Grid>

        {/* TABLE */}
        <Card className="bg-slate-900/20 border-slate-800/40 ring-0 rounded-[2.5rem] overflow-hidden shadow-3xl">
          <div className="p-8 border-b border-slate-800/60 bg-slate-900/40">
            <Title className="text-white font-black tracking-tighter uppercase text-2xl italic leading-none">Intelligence Stream — {selectedDate?.toLocaleDateString()}</Title>
          </div>
          <Table>
            <TableHead className="bg-slate-900/80">
              <TableRow>
                <TableHeaderCell className="text-slate-500 font-black text-[10px] uppercase p-6">Candidate Identity</TableHeaderCell>
                <TableHeaderCell className="text-slate-500 font-black text-[10px] uppercase p-6 text-center">AI Fit Score</TableHeaderCell>
                <TableHeaderCell className="text-slate-500 font-black text-[10px] uppercase p-6 text-right">Action</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCandidates.map((item) => (
                <TableRow key={item.id} className="hover:bg-indigo-500/5 transition-all group border-b border-slate-800/30">
                  <TableCell className="p-6">
                    <Text className="text-white font-black text-2xl uppercase leading-none mb-1 tracking-tight">{item.name}</Text>
                    <Text className="text-slate-600 text-[10px] font-mono italic uppercase tracking-widest">{new Date(item.created_at).toLocaleTimeString()}</Text>
                  </TableCell>
                  <TableCell className="p-6">
                    <div className="w-40 mx-auto">
                        <Text className="text-indigo-400 font-black text-[10px] mb-1 italic text-center uppercase tracking-tighter">{item.score}/10 MATCH</Text>
                        <ProgressBar value={(item.score || 0) * 10} color={(item.score || 0) >= 8 ? "emerald" : "indigo"} className="h-1 rounded-full" />
                    </div>
                  </TableCell>
                  <TableCell className="p-6 text-right">
                    <Button size="xs" variant="secondary" className="bg-indigo-600/10 text-indigo-400 border-indigo-500/40 hover:bg-indigo-600 hover:text-white transition-all font-black px-8 py-3.5 rounded-2xl uppercase text-[10px] tracking-widest" onClick={() => { setSelectedCandidate(item); setIsOpen(true); }}>
                        PROFILE <ArrowRight className="ml-2 w-3 h-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredCandidates.length === 0 && <div className="text-center py-48 bg-slate-950/40"><Text className="text-slate-700 font-mono italic text-sm tracking-[0.4em] animate-pulse uppercase">Waiting for n8n data stream...</Text></div>}
        </Card>
      </div>

      {/* MODAL */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} static={true}>
        <DialogPanel className="bg-[#020617] border border-slate-800 p-0 rounded-[3.5rem] max-w-5xl shadow-[0_0_150px_rgba(79,70,229,0.35)] overflow-hidden">
          <div className="bg-slate-900/60 p-10 border-b border-slate-800 flex justify-between items-center">
            <div>
                <Flex className="gap-3 mb-3"><Badge color="emerald" className="px-4 font-black text-[10px] rounded-full">PRE-SCREENED</Badge></Flex>
                <Title className="text-white text-5xl font-black uppercase tracking-tighter leading-none italic">{selectedCandidate?.name}</Title>
            </div>
            <Button variant="light" onClick={() => setIsOpen(false)} className="bg-slate-800/80 p-4 rounded-full hover:bg-rose-500/30 hover:text-rose-400 transition-all shadow-lg"><X className="w-10 h-10" /></Button>
          </div>
          <div className="p-12 space-y-10">
            <div className="grid grid-cols-4 gap-6">
                {[{ l: "MATCH %", v: (selectedCandidate?.score || 0) * 10 + "%", c: "text-white" }, { l: "STATUS", v: "READY", c: "text-emerald-500" }, { l: "PHASE", v: "FINAL", c: "text-white" }, { l: "RANK", v: "#1", c: "text-indigo-400" }].map((m, i) => (
                    <div key={i} className="bg-slate-900/50 border border-slate-800 p-6 rounded-[2rem] text-center shadow-inner">
                        <Text className="text-slate-600 font-black uppercase text-[10px] tracking-[0.3em] mb-2 leading-none">{m.l}</Text>
                        <Text className={`${m.c} font-black text-4xl tracking-tighter leading-none`}>{m.v}</Text>
                    </div>
                ))}
            </div>
            <Grid numItemsMd={2} className="gap-12">
                <div className="space-y-8">
                    <div className="p-8 bg-slate-900/40 rounded-[2.5rem] border border-slate-800 shadow-inner">
                        <Title className="text-white text-[10px] uppercase tracking-[0.3em] font-black mb-6 border-b border-slate-800 pb-3 flex items-center italic tracking-widest"><Phone className="w-4 h-4 mr-2 text-indigo-500" /> Secure Communications</Title>
                        <div className="space-y-6">
                            <div><Text className="text-slate-600 text-[9px] font-black uppercase tracking-widest mb-1 leading-none">Email Address</Text><Text className="text-indigo-400 text-xl font-black truncate leading-none underline decoration-indigo-500/20 underline-offset-8">{selectedCandidate?.email}</Text></div>
                            <div><Text className="text-slate-600 text-[9px] font-black uppercase tracking-widest mb-1 leading-none">Direct Phone</Text><Text className="text-emerald-400 text-xl font-black tracking-widest leading-none tracking-tighter">{selectedCandidate?.phone || "NOT_PROVIDED"}</Text></div>
                        </div>
                    </div>
                </div>
                <div className="p-10 bg-indigo-600/5 border border-indigo-500/10 rounded-[2.5rem] relative overflow-hidden group shadow-2xl flex flex-col justify-start max-h-[350px]">
                    <Title className="text-indigo-400 text-[10px] uppercase font-black mb-6 italic underline underline-offset-8 decoration-indigo-500/30 tracking-[0.4em]">AI Analysis</Title>
                    <div className="overflow-y-auto pr-4 scrollbar-hide">
                        <Text className="text-slate-200 leading-relaxed text-xl font-bold italic tracking-tight leading-tight">"{selectedCandidate?.justification}"</Text>
                    </div>
                </div>
            </Grid>
            <div className="flex gap-8 mt-16 pb-4">
                <Button className="w-full py-8 rounded-[2rem] bg-indigo-600 hover:bg-indigo-500 font-black text-xl border-none shadow-[0_20px_50px_rgba(79,70,229,0.4)] hover:-translate-y-2 transition-all uppercase tracking-[0.2em] italic active:scale-95">INITIATE INTERVIEW</Button>
                <Button variant="secondary" className="w-1/3 py-8 rounded-[2rem] border-slate-800 text-slate-500 font-black hover:bg-rose-500/10 hover:text-rose-400 uppercase tracking-widest transition-all">ARCHIVE</Button>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </main>
  );
}