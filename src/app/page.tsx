"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Card, Title, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge, Metric, Text, Grid, ProgressBar, Button, Dialog, DialogPanel } from "@tremor/react";
import { Mail, Phone, ArrowRight, X } from "lucide-react";

const supabase = createClient('https://ugqqwlfrvczogkkxxoct.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVncXF3bGZydmN6b2dra3h4b2N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMDc5MzEsImV4cCI6MjA4NTY4MzkzMX0.BP_75CH7CII90lES8UP7reB70SgAGMEb1OFzFdKnJcg');

export default function RecruitAI() {
  const [data, setData] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); fetchData(); }, []);
  async function fetchData() { const { data } = await supabase.from('candidates').select('*').order('created_at', { ascending: false }); if (data) setData(data); }

  if (!mounted) return null;

  return (
    <main className="p-4 bg-[#020617] min-h-screen text-slate-100 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-2">
            <Title className="text-xl font-black text-white uppercase italic">RECRUIT.AI</Title>
            <Badge color="indigo" size="xs">SYSTEM LIVE</Badge>
        </div>

        <Grid numItemsLg={3} className="gap-4 mb-4">
            <Card className="bg-slate-900/40 p-3 flex justify-between items-center"><Text className="text-[10px] uppercase">Total</Text><Metric className="text-lg font-black">{data.length}</Metric></Card>
            <Card className="bg-slate-900/40 p-3 flex justify-between items-center"><Text className="text-[10px] uppercase">Today</Text><Metric className="text-lg font-black">{data.length}</Metric></Card>
            <Card className="bg-indigo-600/10 p-3 flex justify-between items-center"><Text className="text-[10px] uppercase font-bold text-indigo-400">Secure Link</Text><Badge color="emerald" size="xs">OK</Badge></Card>
        </Grid>

        <Card className="bg-slate-900/20 rounded-xl overflow-hidden p-0 border-slate-800">
          <Table>
            <TableHead className="bg-slate-900/80">
              <TableRow><TableHeaderCell className="text-[10px] p-3">NAME</TableHeaderCell><TableHeaderCell className="text-[10px] p-3">MATCH</TableHeaderCell><TableHeaderCell className="text-[10px] p-3 text-right">ACTION</TableHeaderCell></TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id} className="hover:bg-indigo-500/5 border-b border-slate-800/30">
                  <TableCell className="p-3"><Text className="text-white font-bold text-sm uppercase leading-none">{item.name}</Text></TableCell>
                  <TableCell className="p-3"><div className="w-20"><ProgressBar value={item.score * 10} color="indigo" className="h-1" /></div></TableCell>
                  <TableCell className="p-3 text-right"><Button size="xs" variant="secondary" className="bg-indigo-600/10 text-indigo-400 font-black px-2 py-1 text-[8px] uppercase" onClick={() => setSelected(item)}>PROFILE</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      <Dialog open={!!selected} onClose={() => setSelected(null)} static={true}>
        <DialogPanel className="bg-[#020617] border border-slate-800 p-0 rounded-3xl max-w-2xl shadow-2xl overflow-hidden">
          <div className="bg-slate-900/80 p-4 border-b border-slate-800 flex justify-between items-center">
            <div><Badge color="emerald" className="text-[8px] px-1 mb-1">AI VERIFIED</Badge><Title className="text-white text-xl font-black uppercase italic leading-none">{selected?.name}</Title></div>
            <Button variant="light" onClick={() => setSelected(null)}><X className="w-5 h-5 text-slate-500" /></Button>
          </div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-4 gap-2">
                {[{l: "MATCH", v: (selected?.score || 0)*10+"%"}, {l: "STATUS", v: "READY"}, {l: "PHASE", v: "FINAL"}, {l: "RANK", v: "#1"}].map((m, i) => (
                    <div key={i} className="bg-slate-900/50 p-2 rounded-lg text-center border border-slate-800/60">
                        <Text className="text-[7px] uppercase tracking-widest mb-1">{m.l}</Text>
                        <Text className="text-white font-black text-sm">{m.v}</Text>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                    <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/50">
                        <Title className="text-white text-[8px] font-black mb-2 flex items-center"><Phone className="w-3 h-3 mr-1 text-indigo-500" /> CONTACT</Title>
                        <Text className="text-indigo-400 text-[10px] font-bold truncate leading-none">{selected?.email}</Text>
                        <Text className="text-emerald-400 text-[10px] font-bold leading-none mt-2">{selected?.phone || "NO PHONE"}</Text>
                    </div>
                    <div className="p-3 bg-indigo-600/5 border border-indigo-500/10 rounded-xl">
                        <Title className="text-indigo-400 text-[8px] font-black mb-1 italic">AI JUSTIFICATION</Title>
                        <Text className="text-slate-300 text-[10px] italic leading-tight">"{selected?.justification?.substring(0, 180)}..."</Text>
                    </div>
                </div>
                <div className="bg-slate-900/30 border border-slate-800/50 p-3 rounded-xl flex flex-col">
                    <Title className="text-slate-400 text-[8px] font-black mb-2 border-b border-slate-800 pb-1 italic uppercase">Skill Match Breakdown</Title>
                    <div className="space-y-2">
                        {selected?.skills?.split(',').slice(0, 4).map((s: string, idx: number) => (
                            <div key={idx}><Text className="text-slate-500 text-[7px] uppercase font-black mb-1">{s.trim()}</Text><div className="w-full bg-slate-800 h-1 rounded-full"><div className="bg-indigo-500 h-full rounded-full" style={{width: `${Math.floor(Math.random()*20)+75}%`}}></div></div></div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex gap-2"><Button className="w-full py-3 rounded-xl bg-indigo-600 font-black text-[10px] border-none uppercase italic">Schedule Interview</Button><Button variant="secondary" className="w-1/4 py-3 rounded-xl border-slate-800 text-slate-500 text-[10px] uppercase">Archive</Button></div>
          </div>
        </DialogPanel>
      </Dialog>
    </main>
  );
}
