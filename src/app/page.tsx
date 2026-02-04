"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Card, Title, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, 
  Badge, Metric, Text, Flex, Grid, ProgressBar, AreaChart, Button,
  Dialog, DialogPanel, DatePicker
} from "@tremor/react";
import { Users, CheckCircle, Mail, Phone, ArrowRight, X, Zap } from "lucide-react";

const SUPABASE_URL = 'https://ugqqwlfrvczogkkxxoct.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVncXF3bGZydmN6b2dra3h4b2N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMDc5MzEsImV4cCI6MjA4NTY4MzkzMX0.BP_75CH7CII90lES8UP7reB70SgAGMEb1OFzFdKnJcg';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function CleanPowerDashboard() {
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
    <main className="p-6 md:p-12 bg-[#020617] min-h-screen text-slate-100 font-sans selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
            <div>
                <Text className="text-indigo-400 font-mono tracking-[0.6em] text-[10px] uppercase mb-2 font-black">Neural Evaluation Layer v4.1</Text>
                <Title className="text-8xl font-black text-white tracking-tighter uppercase italic leading-none">RECRUIT.AI</Title>
            </div>
            <div className="flex items-center gap-4 bg-slate-900/40 p-4 rounded-[2rem] border border-slate-800 shadow-2xl">
                <DatePicker className="max-w-[200px] !bg-transparent !border-none text-xl font-bold" value={selectedDate} onValueChange={setSelectedDate} />
                <Badge color="indigo" size="xl" className="animate-pulse px-8 py-3 font-black tracking-widest text-sm rounded-full bg-indigo-500/10">LIVE</Badge>
            </div>
        </div>

        {/* UPDATED: 2 COLUMN METRIC GRID */}
        <Grid numItemsLg={2} className="gap-10 mb-16">
            <Card className="bg-slate-900/40 border-slate-800/60 ring-0 backdrop-blur-xl p-10 rounded-[3rem]">
                <Text className="text-slate-500 font-black uppercase text-sm tracking-[0.3em] mb-2">Global Pipeline Volume</Text>
                <Metric className="text-white font-black text-8xl">{allCandidates.length}</Metric>
                {/* Fixed Graph: Only shows if there are at least 2 candidates to prevent messy labels */}
                {allCandidates.length > 1 ? (
                    <AreaChart 
                        className="h-32 mt-10 -mx-10 -mb-10" 
                        data={allCandidates.map((c, i) => ({ i, Score: c.score }))} 
                        index="i" 
                        categories={["Score"]} 
                        colors={["indigo"]} 
                        showXAxis={false} showYAxis={false} showLegend={false} showGridLines={false} 
                    />
                ) : (
                    <div className="h-32 mt-10 border-t border-dashed border-slate-800 flex items-center justify-center">
                        <Text className="text-slate-700 font-mono italic text-xs tracking-widest uppercase">Building neural trend data...</Text>
                    </div>
                )}
            </Card>

            <Card className="bg-gradient-to-br from-indigo-900/30 to-slate-900 border-indigo-500/20 ring-0 flex flex-col justify-center items-center py-10 rounded-[3rem] shadow-[0_0_50px_rgba(79,70,229,0.1)]">
                <Text className="text-indigo-400 font-black uppercase text-sm tracking-[0.3em] mb-4">Today's Intake Feed</Text>
                <Metric className="text-white font-black text-[12rem] leading-none drop-shadow-[0_0_40px_rgba(99,102,241,0.5)]">
                    {filteredCandidates.length}
                </Metric>
                <Text className="mt-8 text-xs text-indigo-300/50 font-mono uppercase tracking-[0.5em]">Real-time Sync Active</Text>
            </Card>
        </Grid>

        {/* BOLD DATA TABLE */}
        <Card className="bg-slate-900/20 border-slate-800/40 ring-0 rounded-[3.5rem] overflow-hidden shadow-3xl">
          <div className="p-12 border-b border-slate-800/60 bg-slate-900/40 flex justify-between items-center">
            <Title className="text-white font-black tracking-tighter uppercase text-4xl italic">Intelligence Stream — {selectedDate?.toLocaleDateString()}</Title>
            <Badge color="slate" className="font-mono px-6 py-2 rounded-full border-slate-700">{filteredCandidates.length} RECORDS FOUND</Badge>
          </div>
          <Table>
            <TableHead className="bg-slate-900/80">
              <TableRow>
                <TableHeaderCell className="text-slate-500 font-black text-xs uppercase p-10">Candidate Identity</TableHeaderCell>
                <TableHeaderCell className="text-slate-500 font-black text-xs uppercase p-10 text-center">AI Fit Index</TableHeaderCell>
                <TableHeaderCell className="text-slate-500 font-black text-xs uppercase p-10 text-right">Action</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCandidates.map((item) => (
                <TableRow key={item.id} className="hover:bg-indigo-500/5 transition-all duration-300 border-b border-slate-800/30">
                  <TableCell className="p-10">
                    <Text className="text-white font-black text-4xl tracking-tighter uppercase leading-none mb-3 group-hover:text-indigo-400 transition-colors">{item.name}</Text>
                    <Text className="text-slate-600 text-xs font-mono uppercase tracking-widest italic">{new Date(item.created_at).toLocaleTimeString()}</Text>
                  </TableCell>
                  <TableCell className="p-10 text-center">
                    <div className="max-w-[200px] mx-auto">
                        <Text className="text-indigo-400 font-black text-sm mb-3 uppercase italic">{item.score}/10 RANK</Text>
                        <ProgressBar value={item.score * 10} color={item.score >= 8 ? "emerald" : "indigo"} className="h-3 rounded-full" />
                    </div>
                  </TableCell>
                  <TableCell className="p-10 text-right">
                    <Button 
                        size="xl" variant="secondary" 
                        className="bg-indigo-600/10 text-indigo-400 border-indigo-500/40 hover:bg-indigo-600 hover:text-white transition-all font-black px-12 py-5 rounded-3xl shadow-2xl text-lg uppercase tracking-widest"
                        onClick={() => { setSelectedCandidate(item); setIsOpen(true); }}
                    >
                        PROFILE <ArrowRight className="ml-4 w-6 h-6" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* --- PROFILE MODAL --- */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} static={true}>
        <DialogPanel className="bg-[#020617] border border-slate-800 p-0 rounded-[4rem] max-w-5xl shadow-[0_0_150px_rgba(79,70,229,0.3)] overflow-hidden">
          <div className="bg-slate-900/60 p-12 border-b border-slate-800 flex justify-between items-center">
            <div>
                <Badge color="emerald" className="font-black text-xs px-4 mb-3 rounded-full tracking-widest">VERIFIED NEURAL ID</Badge>
                <Title className="text-white text-6xl font-black uppercase tracking-tighter leading-none italic">{selectedCandidate?.name}</Title>
            </div>
            <Button variant="light" onClick={() => setIsOpen(false)} className="bg-slate-800/80 p-5 rounded-full hover:bg-rose-500/30 hover:text-rose-400 transition-all"><X className="w-10 h-10" /></Button>
          </div>

          <div className="p-12 space-y-12">
            <div className="grid grid-cols-4 gap-6">
                {[
                    { label: "MATCH SCORE", val: (selectedCandidate?.score || 0) * 10 + "%", col: "text-white" },
                    { label: "AI STATUS", val: "READY", col: "text-emerald-500" },
                    { label: "TALENT RANK", val: "#1", col: "text-indigo-400" },
                    { label: "INTEGRITY", val: "PASS", col: "text-white" }
                ].map((m, i) => (
                    <div key={i} className="bg-slate-900/50 border border-slate-800 p-6 rounded-[2rem] text-center shadow-inner">
                        <Text className="text-slate-600 font-black uppercase text-[10px] tracking-[0.3em] mb-2">{m.label}</Text>
                        <Text className={`${m.col} font-black text-4xl tracking-tighter`}>{m.val}</Text>
                    </div>
                ))}
            </div>

            <Grid numItemsMd={2} className="gap-12">
                <div className="space-y-8">
                    <div className="p-10 bg-slate-900/40 rounded-[3rem] border border-slate-800 shadow-inner">
                        <Title className="text-white text-xs uppercase tracking-[0.4em] font-black mb-8 flex items-center italic border-b border-slate-800 pb-4">
                           <Zap className="w-5 h-5 mr-3 text-indigo-500" /> COMMUNICATION CHANNELS
                        </Title>
                        <div className="space-y-8">
                            <div>
                                <Text className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-2">Neural Email Address</Text>
                                <Text className="text-indigo-400 text-2xl font-black truncate leading-none underline decoration-indigo-500/20 underline-offset-8">{selectedCandidate?.email}</Text>
                            </div>
                            <div>
                                <Text className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-2">Direct Secure Line</Text>
                                <Text className="text-emerald-400 text-2xl font-black tracking-widest leading-none">{selectedCandidate?.phone || "NOT_FOUND"}</Text>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-12 bg-indigo-600/5 border border-indigo-500/10 rounded-[3rem] shadow-2xl flex flex-col justify-center">
                    <Title className="text-indigo-400 text-xs uppercase font-black mb-6 italic tracking-[0.3em] underline underline-offset-[12px] decoration-indigo-500/30">AI Rationale Justification</Title>
                    <Text className="text-slate-200 leading-relaxed text-2xl font-bold italic tracking-tight">
                        "{selectedCandidate?.justification?.substring(0, 350)}..."
                    </Text>
                </div>
            </Grid>

            <div className="flex gap-8 mt-12 pb-6">
                <Button className="w-full py-10 rounded-[2.5rem] bg-indigo-600 hover:bg-indigo-500 font-black text-3xl border-none shadow-[0_20px_60px_rgba(79,70,229,0.4)] hover:-translate-y-2 transition-all uppercase tracking-[0.3em] italic">INITIATE INTERVIEW PHASE</Button>
                <Button variant="secondary" className="w-1/4 py-10 rounded-[2.5rem] border-slate-800 text-slate-500 font-black text-sm hover:bg-rose-500/10 hover:text-rose-400 uppercase tracking-widest transition-all">ARCHIVE</Button>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </main>
  );
}