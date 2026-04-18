"use client";

import { useState } from "react";
import { GraduationCap, BookOpen, MapPin, FileText, ExternalLink, Download, Code, ChevronRight, Menu, X, Home } from "lucide-react";
import { GlassCard } from "../components/GlassCard";

export default function Docs() {
  const [activeSection, setActiveSection] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sections = [
    {
      id: "overview",
      title: "ပါးစပ်ပတ်ရှင်း",
      content: (
        <div className="space-y-6">
          <p className="text-white/70">ဒီ App သည် မြန်မာနိုင်ငံရှိ ကောလိပ်များပါးစပ်ပတ်ရှင်းဖို့အတွက် ဖန်တီးထားပါပါကျမ်း။</p>
          <ul className="space-y-2 text-white/70">
            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2" />AI/ML Engineers အတွက် Myanmar Data ပါးစပ်</li>
            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2" />Researchers အတွက် Education Data</li>
            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2" />Developers အတွက် College App</li>
          </ul>
        </div>
      ),
    },
    {
      id: "data-schema",
      title: "Data Schema",
      content: (
        <div className="space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 px-3 text-white">Column</th>
                  <th className="text-left py-2 px-3 text-white">Type</th>
                  <th className="text-left py-2 px-3 text-white">Description</th>
                </tr>
              </thead>
              <tbody className="text-white/80">
                <tr className="border-b border-white/10"><td className="py-2 px-3 font-mono text-blue-400">college_name</td><td className="py-2 px-3">string</td><td className="py-2 px-3">ကောလိပ်အမည်</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-3 font-mono text-blue-400">major</td><td className="py-2 px-3">string</td><td className="py-2 px-3">မေဂျာ</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-3 font-mono text-blue-400">requirements</td><td className="py-2 px-3">string</td><td className="py-2 px-3">ဝင်ခွင့်အခြေအနေ</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-3 font-mono text-blue-400">location</td><td className="py-2 px-3">string</td><td className="py-2 px-3">တည်နေရာ</td></tr>
                <tr><td className="py-2 px-3 font-mono text-blue-400">description</td><td className="py-2 px-3">string</td><td className="py-2 px-3">ဖေါ်ပါးချက်</td></tr>
              </tbody>
            </table>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 font-mono text-sm text-white/70">
            college_name,major,requirements,location,description<br/>
            "ရန်းရှားကောလိပ်","အင်ဂျင်နီယာ","သင်္ဂါယန်း(၉)","ရန်းရှားမြို့","..."
          </div>
        </div>
      ),
    },
    {
      id: "usage",
      title: "ဘယ်လိုသုံးရမလဲ",
      content: (
        <div className="space-y-4">
          <div className="bg-slate-800/50 rounded-xl p-4"><span className="text-blue-400 font-bold">၁</span> ကောလိပ်အမည် ရိုက်ထည့်ပါ</div>
          <div className="bg-slate-800/50 rounded-xl p-4"><span className="text-blue-400 font-bold">၂</span> မေဂျာ ရွေးပါ</div>
          <div className="bg-slate-800/50 rounded-xl p-4"><span className="text-blue-400 font-bold">၃</span> ဝင်ခွင့်အခြေအနေ ဖြည့်ပါ</div>
          <div className="bg-slate-800/50 rounded-xl p-4"><span className="text-blue-400 font-bold">၄</span> တည်နေရာ ဖြည့်ပါ</div>
          <div className="bg-slate-800/50 rounded-xl p-4"><span className="text-blue-400 font-bold">၅</span> ဖေါ်ပါးချက် ရိုက်ထည့်ပါ</div>
          <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">Submit လုပ်ပါ - Data သည် HuggingFace သို့ ပို့ပါတယ်။</div>
        </div>
      ),
    },
    {
      id: "hf-download",
      title: "HuggingFace ဒေါင်းလုဒါ",
      content: (
        <div className="space-y-4">
          <div className="bg-slate-800/50 rounded-xl p-4 font-mono text-sm">
            <div className="text-white mb-2">Python:</div>
            <div className="text-white/70">from datasets import load_dataset</div>
            <div className="text-white/70">dataset = load_dataset("amkyawdev/burme-dataset")</div>
          </div>
          <a href="https://huggingface.co/datasets/amkyawdev/burme-dataset" target="_blank" className="flex items-center gap-2 text-blue-400 hover:underline">
            View on HuggingFace <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      ),
    },
  ];

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/" className="text-white/60 hover:text-white"><Home className="w-5 h-5" /></a>
              <ChevronRight className="w-4 h-4 text-white/40" />
              <span className="text-white">Docs</span>
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white/60"><Menu className="w-5 h-5" /></button>
          </div>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <aside className={`md:col-span-1 ${mobileMenuOpen ? "block" : "hidden md:block"}`}>
            <GlassCard className="p-4 sticky top-8">
              <nav className="space-y-2">
                {sections.map((s) => (
                  <button key={s.id} onClick={() => setActiveSection(s.id)} className={`w-full text-left px-4 py-3 rounded-xl ${activeSection === s.id ? "bg-blue-600 text-white" : "text-white/60 hover:text-white hover:bg-white/10"}`}>{s.title}</button>
                ))}
              </nav>
            </GlassCard>
          </aside>
          <div className="md:col-span-3">
            <GlassCard className="p-6" title="ပါးစပ်ပတ်ရှင်း">{sections.find(s => s.id === activeSection)?.content}</GlassCard>
          </div>
        </div>
      </div>
    </main>
  );
}