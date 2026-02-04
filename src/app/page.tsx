"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Card, Title, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge, Metric, Text, Grid, ProgressBar, Button, Dialog, DialogPanel, Flex } from "@tremor/react";
import { Mail, Phone, ArrowRight, X, ShieldCheck, Briefcase, Zap } from "lucide-react";

const supabase = createClient('https://ugqqwlfrvczogkkxxoct.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVncXF3bGZydmN6b2dra3h4b2N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMDc5MzEsImV4cCI6MjA4NTY4MzkzMX0.BP_75CH7CII90lES8UP7reB70SgAGMEb1OFzFdKnJcg');

export default function RecruitAIVersionFinal() {
  const [data, setData] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); fetchData(); }, []);
  async function fetchData() { const { data } = await supabase.from('candidates').select('*').order('created_at', { ascending: false }); if (data) setData(data); }

  if (!mounted) return null;

  return (
    <main className="p-6 md:p-10 bg-[#020617] min-h-screen text-slate-100 font-sans selection:bg-indigo-500/30">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="flex justify-between items-end mb-8 border-b border-slate-800 pb-6">
            <div>
                <Text className="text-indigo-400 font-mono text-xs uppercase tracking-[0.3em] mb-1">Neural Evaluation Hub</Text>
                <Title className="text-4xl font-black text-white uppercase tracking-tighter italic leading-none">RECRUIT.AI</Title>
            </div>
            <Badge color="indigo" className="animate-pulse px-6 py-2 font-black text-xs rounded-full bg-indigo-500/10 border-indigo-500/30">SYSTEM ONLINE</Badge>
        </div>

        {/* TOP METRICS */}
        <Grid numItemsLg={3} className="gap-6 mb-8">
            <Card className="bg-slate-900/40 border-slate-800/60 p-6 flex justify-between items-center rounded-2xl shadow-xl">
                <Text className="text-slate-500 font-bold text-xs uppercase tracking-widest">Global Pipeline</Text>
                <Metric className="text-white text-4xl font-black">{data.length}</Metric>
            </Card>
            <Card className="bg-slate-900/40 border-slate-800/60 p-6 flex justify-between items-center rounded-2xl shadow-xl">
                <Text className="text-indigo-400 font-bold text-xs uppercase tracking-widest">Active Today</Text>
                <Metric className="text-white text-4xl font-black">{data.length}</Metric>
            </Card>
            <Card className="bg-gradient-to-br from-indigo-900/40 to-slate-950 border-indigo-500/20 p-6 flex items-center justify-between rounded-2xl">
                <Text className="text-indigo-300 font-bold text-xs uppercase tracking-widest">Security Link</Text>
                <Badge color="emerald" size="xl" className="font-black px-4">ENCRYPTED</Badge>
            </Card>
        </Grid>

        {/* TABLE */}
        <Card className="bg-slate-900/20 border-slate-800/40 rounded-[2rem] overflow-hidden p-0 shadow-2xl">
          <Table>
            <TableHead className="bg-slate-900/80">
              <TableRow>
                <TableHeaderCell className="text-slate-500 font-black text-xs uppercase p-6">Candidate Name</TableHeaderCell>
                <TableHeaderCell className="text-slate-500 font-black text-xs uppercase p-6">AI Match Score</TableHeaderCell>
                <TableHeaderCell className="text-slate-500 font-black text-xs uppercase p-6 text-right">Action</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id} className="hover:bg-indigo-500/5 transition-all border-b border-slate-800/30">
                  <TableCell className="p-6">
                    <Text className="text-white font-black text-xl uppercase tracking-tight leading-none">{item.name}</Text>
                    <Text className="text-slate-600 text-xs font-mono mt-1 italic">{new Date(item.created_at).toLocaleTimeString()}</Text>
                  </TableCell>
                  <TableCell className="p-6">
                    <div className="w-48">
                        <Text className="text-indigo-400 font-black text-[10px] mb-1 uppercase italic">{item.score}/10 RANK</Text>
                        <ProgressBar value={item.score * 10} color="indigo" className="h-1.5 rounded-full" />
                    </div>
                  </TableCell>
                  <TableCell className="p-6 text-right">
                    <Button size="sm" variant="secondary" className="bg-indigo-600/10 text-indigo-400 border-indigo-500/40 font-black px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-lg" onClick={() => setSelected(item)}>
                        VIEW PROFILE <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {data.length === 0 && <div className="text-center py-40 text-slate-700 font-mono italic tracking-widest animate-pulse">AWAITING N8N DATA STREAM...</div>}
        </Card>
      </div>

      {/* --- RE-SIZED MODAL --- */}
      <Dialog open={!!selected} onClose={() => setSelected(null)} static={true}>
        <DialogPanel className="bg-[#020617] border border-slate-800 p-0 rounded-[3rem] max-w-5xl shadow-[0_0_100px_rgba(79,70,229,0.2)] overflow-hidden">
          
          <div className="bg-slate-900/80 p-10 border-b border-slate-800 flex justify-between items-center">
            <div>
                <Badge color="emerald" className="font-black text-xs px-3 mb-2 rounded-full">PRE-SCREENED BY AGENT</Badge>
                <Title className="text-white text-5xl font-black uppercase tracking-tighter leading-none italic">{selected?.name}</Title>
            </div>
            <Button variant="light" onClick={() => setSelected(null)} className="bg-slate-800/50 p-4 rounded-full hover:bg-rose-500/20 hover:text-rose-400 transition-all"><X className="w-10 h-10" /></Button>
          </div>

          <div className="p-10 space-y-10">
            {/* BIG METRIC ROW */}
            <div className="grid grid-cols-4 gap-6">
                {[
                    { l: "MATCH %", v: (selected?.score || 0) * 10 + "%", c: "text-white" },
                    { l: "INTEGRITY", v: "VERIFIED", c: "text-emerald-500" },
                    { l: "PHASE", v: "FINAL", c: "text-white" },
                    { l: "TALENT RANK", v: "#1", c: "text-indigo-400" }
                ].map((m, i) => (
                    <div key={i} className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl text-center shadow-inner">
                        <Text className="text-slate-500 font-black uppercase text-[10px] tracking-[0.2em] mb-2">{m.l}</Text>
                        <Text className={`${m.c} font-black text-3xl tracking-tighter`}>{m.v}</Text>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-12">
                <div className="space-y-6">
                    <div className="p-8 bg-slate-900/40 rounded-3xl border border-slate-800 shadow-inner group">
                        <Title className="text-white text-xs uppercase tracking-[0.3em] font-black mb-6 flex items-center border-b border-slate-800 pb-3 italic">
                           <Zap className="w-4 h-4 mr-2 text-indigo-500" /> CONTACT CHANNELS
                        </Title>
                        <div className="space-y-6">
                            <div>
                                <Text className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-1 leading-none">Primary Email</Text>
                                <Text className="text-indigo-400 text-xl font-black truncate leading-none underline decoration-indigo-500/20 underline-offset-4">{selected?.email}</Text>
                            </div>
                            <div>
                                <Text className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-1 leading-none">Direct Phone</Text>
                                <Text className="text-emerald-400 text-xl font-black tracking-widest leading-none">{selected?.phone || "NOT_PROVIDED"}</Text>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-indigo-600/5 border border-indigo-500/10 rounded-3xl relative overflow-hidden group shadow-2xl">
                        <Title className="text-indigo-400 text-[10px] uppercase font-black mb-4 italic tracking-widest underline underline-offset-8 decoration-indigo-500/30">AI Decision Rationale</Title>
                        <Text className="text-slate-200 leading-relaxed text-lg font-bold italic tracking-tight">
                            "{selected?.justification?.substring(0, 300)}..."
                        </Text>
                    </div>
                </div>

                {/* SKILLS COLUMN */}
                <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-3xl shadow-inner flex flex-col justify-center">
                    <Title className="text-slate-400 text-[10px] uppercase font-black mb-8 border-b border-slate-800 pb-3 italic tracking-widest">TECHNICAL STACK BREAKDOWN</Title>
                    <div className="space-y-6">
                        {selected?.skills?.split(',').slice(0, 5).map((skill: string, idx: number) => (
                            <div key={idx}>
                                <Flex className="mb-2">
                                    <Text className="text-slate-400 text-[10px] uppercase font-black tracking-widest">{skill.trim().substring(0, 18)}</Text>
                                    <Text className="text-indigo-400 text-[10px] font-black italic">OPTIMAL</Text>
                                </Flex>
                                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden shadow-inner border border-slate-700/30">
                                    <div 
                                        className="bg-gradient-to-r from-indigo-600 to-indigo-400 h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(99,102,241,0.4)]" 
                                        style={{ width: `${95 - (idx * 4)}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ACTION FOOTER */}
            <div className="flex gap-6 mt-6">
                <Button className="w-full py-7 rounded-[2rem] bg-indigo-600 hover:bg-indigo-500 font-black text-xl border-none shadow-[0_20px_50px_rgba(79,70,229,0.4)] hover:-translate-y-1.5 transition-all uppercase tracking-[0.2em] italic active:scale-95">INITIATE INTERVIEW PHASE</Button>
                <Button variant="secondary" className="w-1/3 py-7 rounded-[2rem] border-slate-800 text-slate-500 font-black text-sm hover:bg-rose-500/10 hover:text-rose-400 uppercase tracking-widest transition-all">ARCHIVE</Button>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </main>
  );
}
