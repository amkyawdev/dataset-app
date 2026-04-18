"use client";

import { useState } from "react";
import { Bot, FileText, Download, Code, ChevronRight, Menu, Home } from "lucide-react";
import { GlassCard } from "../components/GlassCard";
import Link from "next/link";

export default function Docs() {
  const [activeSection, setActiveSection] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sections = [
    {
      id: "overview",
      title: "Overview",
      content: (
        <div className="space-y-6">
          <p className="text-white/70">
            This application collects conversation data for training Chat Bot AI models. 
            Data is stored in CSV format and uploaded to HuggingFace dataset repository.
          </p>
          <ul className="space-y-3 text-white/70">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-blue-400 mt-1.5" />
              Collect user prompts and bot responses
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-purple-400 mt-1.5" />
              Support Burmese, English, and Mixed languages
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-green-400 mt-1.5" />
              Real-time CSV preview before upload
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "data-schema",
      title: "Data Schema",
      content: (
        <div className="space-y-6">
          <p className="text-white/70">
            The dataset uses a structured format optimized for LLM training. 
            Each row represents a single conversation turn.
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-white font-semibold">Column</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">Type</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">Description</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">Required</th>
                </tr>
              </thead>
              <tbody className="text-white/80">
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-mono text-blue-400">prompt</td>
                  <td className="py-3 px-4">string</td>
                  <td className="py-3 px-4">User message or question</td>
                  <td className="py-3 px-4 text-green-400">Yes</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-mono text-blue-400">response</td>
                  <td className="py-3 px-4">string</td>
                  <td className="py-3 px-4">Bot's reply to the prompt</td>
                  <td className="py-3 px-4 text-green-400">Yes</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-mono text-blue-400">context</td>
                  <td className="py-3 px-4">string</td>
                  <td className="py-3 px-4">Additional context or background</td>
                  <td className="py-3 px-4 text-yellow-400">No</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-mono text-blue-400">language</td>
                  <td className="py-3 px-4">string</td>
                  <td className="py-3 px-4">Burmese, English, or Mixed</td>
                  <td className="py-3 px-4 text-green-400">Yes</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-blue-400">category</td>
                  <td className="py-3 px-4">string</td>
                  <td className="py-3 px-4">Conversation type (greeting, question, etc.)</td>
                  <td className="py-3 px-4 text-green-400">Yes</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-4 font-mono text-sm text-white/70 overflow-x-auto border border-slate-700/50">
            <div className="text-blue-400 mb-2">prompt,response,context,language,category</div>
            <div className="text-white/80">"Hello, how are you?","I'm doing well, thank you!","","English","greeting"</div>
            <div className="text-white/60 mt-1">"မင်္ဂလာပါ","မင်္ဂလာပါ။ ဘာလုပ်ပါသလဲ။","","Burmese","greeting"</div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
            <h4 className="text-blue-400 font-semibold mb-2">Training Tip</h4>
            <p className="text-white/70 text-sm">
              For best results, include diverse conversation patterns. Mix formal and informal language, 
              different lengths of prompts and responses, and various categories.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "usage",
      title: "How to Use",
      content: (
        <div className="space-y-4">
          <div className="bg-slate-800/50 rounded-xl p-4 flex items-start gap-4">
            <span className="text-blue-400 font-bold text-xl">1</span>
            <div>
              <div className="text-white font-medium mb-1">Enter Prompt</div>
              <div className="text-white/60 text-sm">Type the user's message or question in the Prompt field</div>
            </div>
          </div>
          
          <div className="bg-slate-800/50 rounded-xl p-4 flex items-start gap-4">
            <span className="text-blue-400 font-bold text-xl">2</span>
            <div>
              <div className="text-white font-medium mb-1">Write Response</div>
              <div className="text-white/60 text-sm">Enter the bot's appropriate response to that prompt</div>
            </div>
          </div>
          
          <div className="bg-slate-800/50 rounded-xl p-4 flex items-start gap-4">
            <span className="text-blue-400 font-bold text-xl">3</span>
            <div>
              <div className="text-white font-medium mb-1">Add Context (Optional)</div>
              <div className="text-white/60 text-sm">Add any background information if needed</div>
            </div>
          </div>
          
          <div className="bg-slate-800/50 rounded-xl p-4 flex items-start gap-4">
            <span className="text-blue-400 font-bold text-xl">4</span>
            <div>
              <div className="text-white font-medium mb-1">Select Language & Category</div>
              <div className="text-white/60 text-sm">Choose Burmese, English, or Mixed, and select the conversation type</div>
            </div>
          </div>
          
          <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 flex items-center gap-3">
            <span className="text-green-400 font-bold text-xl">5</span>
            <div>
              <div className="text-green-300 font-medium">Submit</div>
              <div className="text-green-300/70 text-sm">Click "Save to HuggingFace" to upload your data</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "hf-download",
      title: "Python Usage",
      content: (
        <div className="space-y-6">
          <p className="text-white/70">
            Load the dataset directly in Python using the datasets library.
          </p>
          
          <div className="bg-slate-800/50 rounded-xl p-4 font-mono text-sm border border-slate-700/50">
            <div className="text-purple-400 mb-3"># Install datasets library</div>
            <div className="text-white/70 mb-4">pip install datasets</div>
            
            <div className="text-purple-400 mb-3"># Load dataset</div>
            <div className="text-white/70">from datasets import load_dataset</div>
            <div className="text-white/70 mb-4">dataset = load_dataset("amkyawdev/burme-dataset")</div>
            
            <div className="text-purple-400 mb-3"># Access training data</div>
            <div className="text-white/70">train_data = dataset["train"]</div>
            <div className="text-white/70">print(train_data[0])</div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-4 font-mono text-sm border border-slate-700/50">
            <div className="text-purple-400 mb-3"># Example output</div>
            <div className="text-white/70">{`{'prompt': 'Hello', 'response': 'Hi there!', 'context': '', 'language': 'English', 'category': 'greeting'}`}</div>
          </div>

          <a 
            href="https://huggingface.co/datasets/amkyawdev/burme-dataset" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 text-blue-400 hover:underline"
          >
            View on HuggingFace <Bot className="w-4 h-4" />
          </a>
        </div>
      ),
    },
  ];

  return (
    <main className="min-h-screen p-4 md:p-8 relative overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-white/60 hover:text-white">
                <Home className="w-5 h-5" />
              </Link>
              <ChevronRight className="w-4 h-4 text-white/40" />
              <span className="text-white">Docs</span>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden text-white/60 hover:text-white p-2"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <aside className={`md:col-span-1 ${mobileMenuOpen ? "block" : "hidden md:block"}`}>
            <GlassCard className="p-4 sticky top-8">
              <nav className="space-y-2">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSection(s.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                      activeSection === s.id 
                        ? "bg-blue-600 text-white" 
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </nav>
            </GlassCard>
          </aside>

          <div className="md:col-span-3">
            <GlassCard className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                {sections.find(s => s.id === activeSection)?.title}
              </h2>
              {sections.find(s => s.id === activeSection)?.content}
            </GlassCard>
          </div>
        </div>
      </div>
    </main>
  );
}