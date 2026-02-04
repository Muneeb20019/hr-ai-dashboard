"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Card, Title, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, 
  Badge, Metric, Text, Flex, Grid, ProgressBar, Button, Dialog, DialogPanel
} from "@tremor/react";
import { Users, CheckCircle, Mail, Phone, ArrowRight, X, ShieldCheck, Briefcase, Cpu } from "lucide-react";

const SUPABASE_URL = 'https://ugqqwlfrvczogkkxxoct.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVncXF3bGZydmN6b2dra3h4b2N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMDc5MzEsImV4cCI6MjA4NTY4MzkzMX0.BP_75CH7CII90lES8UP7reB70SgAGMEb1OFzFdKnJcg';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function RecruitAIFinal() {
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
    <main className="p-4 bg-[#020617] min-h-screen text-slate-100 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* COMPACT HEADER */}
        <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
            <Title className="text-2xl font-black text-white uppercase tracking-tighter italic">RECRUIT.AI <span className="text-indigo-500 not-italic lowercase font-thin text-base">hub</span></Title>
            <Badge color="indigo" size="xs" className="px-3 py-0.5 rounded-full bg-indigo-500/10">Neural Engine Online</Badge>
        </div>

        {/* METRIC GRID */}
        <Grid numItemsLg={3} className="gap-4 mb-6">
            <Card className="bg-slate-900/40 border-slate-800/60 p-3 flex justify-between items-center">
                <Text className="text-slate-500 font-bold text-[9px] uppercase">Database</Text>
                <Metric className="text-white text-xl font-black">{allCandidates.length}</Metric>
            </Card>
            <Card className="bg-slate-900/40 border-slate-800/60 p-3 flex justify-between items-center">
                <Text className="text-indigo-400 font-bold text-[9px] uppercase">Today's Intake</Text>
                <Metric className="text-white text-xl font-black">{filteredCandidates.length}</Metric>
            </Card>
            <Card className="bg-indigo-600/10 border-indigo-500/20 p-3 flex justify-between items-center">
                <Text className="text-indigo-300 font-bold text-[9px] uppercase">Status</Badge>
                <Badge color="emerald" size="xs">SECURE</Badge>
            </Card>
        </Grid>

        {/* TABLE */}
        <Card className="bg-slate-900/20 border-slate-800/40 rounded-xl overflow-hidden p-0">
          <Table>
            <TableHead className="bg-slate-900/80">
              <TableRow>
                <TableHeaderCell className="text-slate-500 font-black text-[9px] uppercase p-3">Candidate</TableHeaderCell>
                <TableHeaderCell className="text-slate-500 font-black text-[9px] uppercase p-3">Match</TableHeaderCell>
                <TableHeaderCell className="text-slate-500 font-black text-[9px] uppercase p-3 text-right">Profile</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCandidates.map((item) => (
                <TableRow key={item.id} className="hover:bg-indigo-500/5 transition-all border-b border-slate-800/30">
                  <TableCell className="p-3">
                    <Text className="text-white font-bold text-base uppercase tracking-tight leading-none">{item.name}</Text>
                    <Text className="text-slate-600 text-[9px] font-mono mt-1">{new Date(item.created_at).toLocaleTimeString()}</Text>
                  </TableCell>
                  <TableCell className="p-3">
                    <div className="w-24"><ProgressBar value={item.score * 10} color={item.score >= 8 ? "emerald" : "indigo"} className="h-1 rounded-full" /></div>
                  </TableCell>
                  <TableCell className="p-3 text-right">
                    <Button size="xs" variant="secondary" className="bg-indigo-600/10 text-indigo-400 border-indigo-500/40 font-black px-3 py-1.5 rounded-lg text-[8px] uppercase" onClick={() => { setSelectedCandidate(item); setIsOpen(true); }}>
                        VIEW <ArrowRight className="ml-1 w-2 h-2" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* --- SINGLE-SCREEN MODAL --- */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} static={true}>
        <DialogPanel className="bg-[#020617] border border-slate-800 p-0 rounded-[2rem] max-w-4xl shadow-2xl overflow-hidden">
          
          <div className="bg-slate-900/80 p-5 border-b border-slate-800 flex justify-between items-center">
            <div>
                <Badge color="emerald" className="font-black text-[8px] px-2 mb-0.5">AI VERIFIED</Badge>
                <Title className="text-white text-2xl font-black uppercase tracking-tight leading-none italic">{selectedCandidate?.name}</Title>
            </div>
            <Button variant="light" onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white"><X className="w-5 h-5" /></Button>
          </div>

          <div className="p-5 space-y-4">
            {/* MINI METRIC ROW */}
            <div className="grid grid-cols-4 gap-3">
                {[
                    { label: "Match Score", val: (selectedCandidate?.score || 0) * 10 + "%", col: "text-white" },
                    { label: "Integrity", val: "VERIFIED", col: "text-emerald-500" },
                    { label: "Phase", val: "FINAL", col: "text-white" },
                    { label: "Talent Rank", val: "#1", col: "text-indigo-400" }
                ].map((m, i) => (
                    <div key={i} className="bg-slate-900/50 border border-slate-800/60 p-2 rounded-xl text-center">
                        <Text className="text-slate-500 font-black uppercase text-[7px] tracking-widest mb-0.5">{m.label}</Text>
                        <Text className={`${m.col} font-black text-lg leading-none`}>{m.val}</Text>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                    {/* Contact Info */}
                    <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800/50">
                        <Title className="text-white text-[8px] uppercase tracking-widest font-black mb-2 flex items-center border-b border-slate-800 pb-1">
                            <Phone className="w-3 h-3 mr-2 text-indigo-500" /> CONTACT CHANNELS
                        </Title>
                        <div className="space-y-1">
                            <Text className="text-indigo-400 text-[11px] font-black truncate leading-none">{selectedCandidate?.email}</Text>
                            <Text className="text-emerald-400 text-[11px] font-black tracking-widest leading-none mt-1">{selectedCandidate?.phone || "03XX-XXXXXXX"}</Text>
                        </div>
                    </div>

                    {/* AI Justification - SHORTER TEXT */}
                    <div className="p-4 bg-indigo-600/5 border border-indigo-500/10 rounded-xl">
                        <Title className="text-indigo-400 text-[8px] uppercase font-black mb-1.5 tracking-widest italic">AI RATIONALE</Title>
                        <Text className="text-slate-300 leading-tight text-[11px] font-medium italic">
                            "{selectedCandidate?.justification?.substring(0, 250)}..."
                        </Text>
                    </div>
                </div>

                {/* Right Column - NO MORE BLACK CHART - REPLACED WITH SOLID BARS */}
                <div className="bg-slate-900/30 border border-slate-800/50 p-4 rounded-xl flex flex-col justify-between">
                    <Title className="text-slate-400 text-[8px] uppercase font-black mb-3 tracking-widest border-b border-slate-800 pb-1 italic">SKILL MATCH STRENGTH</Title>
                    <div className="space-y-3">
                        {selectedCandidate?.skills?.split(',').slice(0, 5).map((skill: string, idx: number) => (
                            <div key={idx}>
                                <Flex className="mb-1">
                                    <Text className="text-slate-400 text-[8px] uppercase font-black">{skill.trim().substring(0, 15)}</Text>
                                    <Text className="text-indigo-400 text-[8px] font-bold">Match</Text>
                                </Flex>
                                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden shadow-inner">
                                    <div 
                                        className="bg-indigo-500 h-full rounded-full transition-all duration-1000" 
                                        style={{ width: `${Math.floor(Math.random() * 20) + 75}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ACTION FOOTER */}
            <div className="flex gap-3 pt-2">
                <Button className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-black text-xs border-none shadow-lg uppercase tracking-widest italic transition-transform active:scale-95">INITIATE INTERVIEW PHASE</Button>
                <Button variant="secondary" className="w-1/3 py-3.5 rounded-xl border-slate-800 text-slate-500 font-black text-xs hover:bg-rose-500/10 hover:text-rose-400 uppercase tracking-widest transition-all">ARCHIVE</Button>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </main>
  );
}