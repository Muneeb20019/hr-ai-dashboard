"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Card, Title, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, 
  Badge, Metric, Text, Flex, Grid, ProgressBar, AreaChart, BarChart, Button,
  Dialog, DialogPanel, DatePicker
} from "@tremor/react";
import { Users, BarChart3, CheckCircle, Mail, Phone, ArrowRight, X, Calendar as CalendarIcon, Briefcase, GraduationCap, ShieldCheck } from "lucide-react";

const SUPABASE_URL = 'https://ugqqwlfrvczogkkxxoct.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVncXF3bGZydmN6b2dra3h4b2N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMDc5MzEsImV4cCI6MjA4NTY4MzkzMX0.BP_75CH7CII90lES8UP7reB70SgAGMEb1OFzFdKnJcg';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function RecruitAIV3() {
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

  // Generate random "mock" data for the skill graph in the modal
  const getSkillData = (skills: string[]) => {
    return (skills || ["General"]).map(s => ({
        name: s.substring(0, 10),
        "Match Level": Math.floor(Math.random() * 40) + 60, // Mocking AI match percentages
    }));
  };

  if (!mounted) return null;

  return (
    <main className="p-4 md:p-10 bg-[#020617] min-h-screen text-slate-100 font-sans selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 border-b border-slate-800 pb-10">
            <div>
                <Text className="text-indigo-400 font-mono tracking-[0.4em] text-[10px] uppercase mb-1">Neural Recruitment Intelligence</Text>
                <Title className="text-5xl font-black text-white tracking-tighter uppercase leading-none italic">RECRUIT.AI <span className="text-indigo-600 font-thin not-italic lowercase">hub</span></Title>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 flex items-center gap-2 shadow-2xl">
                    <CalendarIcon className="text-indigo-500 ml-2 w-4 h-4" />
                    <DatePicker className="max-w-[160px] bg-slate-900 text-white border-none" value={selectedDate} onValueChange={setSelectedDate} />
                </div>
                <Badge color="indigo" className="animate-pulse px-6 py-2 font-black tracking-widest text-xs rounded-full">AGENT ONLINE</Badge>
            </div>
        </div>

        {/* TOP LEVEL METRICS */}
        <Grid numItemsLg={3} className="gap-8 mb-10">
            <Card className="bg-slate-900/40 border-slate-800/60 ring-0">
                <Text className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mb-1">Database Volume</Text>
                <Metric className="text-white font-black text-4xl">{allCandidates.length}</Metric>
                <AreaChart className="h-20 mt-4 -mx-6 -mb-6" data={allCandidates.map((c, i) => ({ i, s: c.score }))} index="i" categories={["s"]} colors={["indigo"]} showXAxis={false} showYAxis={false} showLegend={false} showGridLines={false} />
            </Card>
            <Card className="bg-slate-900/40 border-slate-800/60 ring-0 flex flex-col justify-center items-center py-6">
                <Text className="text-indigo-400 font-black uppercase text-xs tracking-widest mb-2">Today's Intake</Text>
                <Metric className="text-white font-black text-7xl">{filteredCandidates.length}</Metric>
            </Card>
            <Card className="bg-gradient-to-br from-indigo-900/40 to-slate-950 border-indigo-500/20 ring-0 p-8 flex flex-col justify-center">
                 <Flex>
                    <Text className="text-slate-400 text-xs font-bold uppercase">System Status</Text>
                    <Badge color="emerald">Healthy</Badge>
                 </Flex>
                 <Text className="text-slate-500 text-[10px] mt-4 font-mono uppercase italic tracking-widest">Awaiting new PDF socket stream...</Text>
            </Card>
        </Grid>

        {/* CANDIDATE TABLE */}
        <Card className="bg-slate-900/20 border-slate-800/40 ring-0 rounded-[2rem] overflow-hidden shadow-3xl">
          <div className="p-8 border-b border-slate-800/60 flex justify-between items-center bg-slate-900/40">
            <Title className="text-white font-black tracking-tight uppercase text-xl italic">Talent Stream — {selectedDate?.toLocaleDateString()}</Title>
          </div>
          <Table>
            <TableHead className="bg-slate-900/80">
              <TableRow>
                <TableHeaderCell className="text-slate-500 font-black text-[10px] uppercase p-6">Candidate Profile</TableHeaderCell>
                <TableHeaderCell className="text-slate-500 font-black text-[10px] uppercase p-6">Fit Score</TableHeaderCell>
                <TableHeaderCell className="text-slate-500 font-black text-[10px] uppercase p-6">Core Tech</TableHeaderCell>
                <TableHeaderCell className="text-slate-500 font-black text-[10px] uppercase p-6 text-right">Actions</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCandidates.map((item) => (
                <TableRow key={item.id} className="hover:bg-indigo-500/5 transition-all group border-b border-slate-800/30">
                  <TableCell className="p-6">
                    <Text className="text-white font-black text-xl tracking-tight group-hover:text-indigo-400 transition-colors uppercase leading-none mb-1">{item.name}</Text>
                    <Text className="text-slate-600 text-[10px] font-mono">{new Date(item.created_at).toLocaleTimeString()}</Text>
                  </TableCell>
                  <TableCell className="p-6">
                    <div className="w-44">
                        <Text className="text-indigo-400 font-black text-xs mb-1 uppercase tracking-tighter">{item.score}/10 RANK</Text>
                        <ProgressBar value={item.score * 10} color={item.score >= 8 ? "emerald" : "indigo"} className="h-1.5 rounded-full" />
                    </div>
                  </TableCell>
                  <TableCell className="p-6">
                    <div className="flex gap-2">
                      {item.skills?.slice(0, 2).map((s: string) => <Badge key={s} size="xs" className="bg-slate-800 text-slate-400 border-none font-black text-[9px] uppercase px-2">{s}</Badge>)}
                    </div>
                  </TableCell>
                  <TableCell className="p-6 text-right">
                    <Button 
                        size="xs" variant="secondary" 
                        className="bg-indigo-600/10 text-indigo-400 border-indigo-500/40 hover:bg-indigo-600 hover:text-white transition-all font-black px-6 py-2.5 rounded-xl shadow-lg"
                        onClick={() => { setSelectedCandidate(item); setIsOpen(true); }}
                    >
                        VIEW PROFILE <ArrowRight className="ml-2 w-3 h-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredCandidates.length === 0 && <div className="text-center py-40 bg-slate-950/40 text-slate-700 font-mono italic text-sm tracking-widest animate-pulse uppercase">Awaiting n8n evaluation stream...</div>}
        </Card>
      </div>

      {/* --- THE ADVANCED CANDIDATE MINI-DASHBOARD MODAL --- */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} static={true}>
        <DialogPanel className="bg-[#020617] border border-slate-800 p-0 rounded-[3rem] max-w-5xl shadow-[0_0_150px_rgba(79,70,229,0.3)] overflow-hidden">
          
          {/* MODAL HEADER */}
          <div className="bg-slate-900/50 p-10 border-b border-slate-800 flex justify-between items-center">
            <div>
                <Flex className="gap-2 mb-2">
                    <Badge color="emerald" size="xs" className="px-3">PRE-SCREENED</Badge>
                    <Badge color="indigo" size="xs" className="px-3 uppercase font-black">Rank #{filteredCandidates.indexOf(selectedCandidate) + 1}</Badge>
                </Flex>
                <Title className="text-white text-5xl font-black uppercase tracking-tighter leading-none">{selectedCandidate?.name}</Title>
            </div>
            <Button variant="light" onClick={() => setIsOpen(false)} className="bg-slate-800/50 p-3 rounded-full hover:bg-rose-500/20 hover:text-rose-400 transition-all"><X className="w-8 h-8" /></Button>
          </div>

          <div className="p-10">
            {/* MINI METRIC GRID (Matches your screenshot style) */}
            <Grid numItemsMd={4} className="gap-6 mb-10">
                <Card className="bg-slate-900/80 border-slate-800/50 p-4">
                    <Text className="text-slate-500 font-bold uppercase text-[9px] tracking-widest mb-1 flex items-center"><ShieldCheck className="w-3 h-3 mr-1 text-indigo-500" /> Match Index</Text>
                    <Metric className="text-white font-black text-2xl">{selectedCandidate?.score * 10}%</Metric>
                </Card>
                <Card className="bg-slate-900/80 border-slate-800/50 p-4">
                    <Text className="text-slate-500 font-bold uppercase text-[9px] tracking-widest mb-1 flex items-center"><Briefcase className="w-3 h-3 mr-1 text-emerald-500" /> Career Tenure</Text>
                    <Metric className="text-white font-black text-2xl">Verified</Metric>
                </Card>
                <Card className="bg-slate-900/80 border-slate-800/50 p-4">
                    <Text className="text-slate-500 font-bold uppercase text-[9px] tracking-widest mb-1 flex items-center"><GraduationCap className="w-3 h-3 mr-1 text-amber-500" /> Edu. Level</Text>
                    <Metric className="text-white font-black text-2xl truncate">Degree Match</Metric>
                </Card>
                <Card className="bg-indigo-600/10 border-indigo-500/20 p-4">
                    <Text className="text-indigo-400 font-bold uppercase text-[9px] tracking-widest mb-1">Global Percentile</Text>
                    <Metric className="text-white font-black text-2xl">TOP 5%</Metric>
                </Card>
            </Grid>

            {/* TWO COLUMN CONTENT: Info vs Graphs */}
            <Grid numItemsMd={2} className="gap-10">
                {/* Column 1: Contact & Justification */}
                <div className="space-y-6">
                    <div className="p-6 bg-slate-900/50 rounded-3xl border border-slate-800/50 shadow-inner group transition-all">
                        <Title className="text-white text-xs uppercase tracking-widest font-black mb-4 border-b border-slate-800 pb-2 flex items-center"><Phone className="w-3 h-3 mr-2" /> Direct Channels</Title>
                        <Flex className="mb-4">
                            <Text className="text-slate-500 text-xs font-bold uppercase">Email Address</Text>
                            <Text className="text-indigo-400 text-sm font-black truncate max-w-[200px]">{selectedCandidate?.email}</Text>
                        </Flex>
                        <Flex>
                            <Text className="text-slate-500 text-xs font-bold uppercase">Phone Number</Text>
                            <Text className="text-emerald-400 text-sm font-black tracking-widest">{selectedCandidate?.phone || "03XX-XXXXXXX"}</Text>
                        </Flex>
                    </div>

                    <div className="p-8 bg-indigo-600/5 border border-indigo-500/10 rounded-3xl relative overflow-hidden">
                        <Title className="text-indigo-500 text-[10px] uppercase font-black tracking-[0.3em] mb-4">Neural Evaluation Summary</Title>
                        <Text className="text-slate-300 leading-relaxed text-lg font-medium italic">"{selectedCandidate?.justification || "Parsing metadata from n8n..."}"</Text>
                    </div>
                </div>

                {/* Column 2: Graphical Breakdown */}
                <div className="bg-slate-900/30 border border-slate-800/50 p-8 rounded-3xl shadow-inner">
                    <Title className="text-slate-400 text-xs uppercase tracking-widest font-black mb-6">Technical Skill Breakdown</Title>
                    <BarChart
                        data={getSkillData(selectedCandidate?.skills)}
                        index="name"
                        categories={["Match Level"]}
                        colors={["indigo"]}
                        yAxisWidth={48}
                        className="h-60 mt-4"
                        showLegend={false}
                        layout="vertical"
                    />
                </div>
            </Grid>

            {/* ACTION FOOTER */}
            <div className="flex gap-6 mt-12">
                <Button className="w-full py-7 rounded-3xl bg-indigo-600 hover:bg-indigo-500 font-black text-lg border-none shadow-[0_15px_40px_rgba(79,70,229,0.3)] hover:-translate-y-1.5 transition-all uppercase tracking-widest">INITIATE INTERVIEW</Button>
                <Button variant="secondary" className="w-full py-7 rounded-3xl border-slate-800 text-slate-500 font-bold hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/50 transition-all uppercase tracking-widest">REJECT</Button>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </main>
  );
}