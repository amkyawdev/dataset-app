"use client";

import { useState } from "react";
import { MessageCircle, Bot, FileText, Send, Upload, AlertCircle, CheckCircle2, BookMarked, Sparkles, ExternalLink, Globe, Tags } from "lucide-react";
import { GlassCard } from "./components/GlassCard";
import { FormInput } from "./components/FormInput";
import { SelectInput } from "./components/SelectInput";
import { Spinner } from "./components/Spinner";
import type { ChatBotFormData } from "@/types";
import Link from "next/link";

interface FormData extends ChatBotFormData {}

interface PreviewData {
  prompt: string;
  response: string;
  context: string;
  language: string;
  category: string;
}

// Language Options
const LANGUAGE_OPTIONS = [
  { value: "Burmese", label: "Burmese (မြန်မာစာ)" },
  { value: "English", label: "English" },
  { value: "Mixed", label: "Mixed (Burmese + English)" },
];

// Category Options
const CATEGORY_OPTIONS = [
  { value: "greeting", label: "Greeting" },
  { value: "question", label: "Question" },
  { value: "information", label: "Information" },
  { value: "instruction", label: "Instruction" },
  { value: "conversation", label: "Conversation" },
  { value: "technical", label: "Technical Support" },
  { value: "general", label: "General" },
];

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    prompt: "",
    response: "",
    context: "",
    language: "Burmese",
    category: "general",
  });

  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    const newData = { ...formData, [field]: value };
    const hasContent = Object.values(newData).some((v) => v.trim().length > 0);

    if (hasContent) {
      setPreviewData(newData as PreviewData);
    } else {
      setPreviewData(null);
    }

    setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.prompt || !formData.response || !formData.language || !formData.category) {
      setMessage({ type: "error", text: "Please fill in all required fields" });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/save-college", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ type: "success", text: "Chat bot data saved successfully!" });
        setFormData({ prompt: "", response: "", context: "", language: "Burmese", category: "general" });
        setPreviewData(null);
      } else {
        setMessage({ type: "error", text: result.error || "Failed to save data" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8 relative overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-blue-600/5 to-transparent rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">Chat Bot Training Data Collector</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Chat Bot <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Dataset</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-6">
            Collect and manage conversation data for AI model training with real-time CSV preview
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/docs" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all duration-300 text-white/80 hover:text-white backdrop-blur-sm">
              <BookMarked className="w-4 h-4" />
              <span>Docs</span>
            </Link>
            <a href="https://huggingface.co/datasets/amkyawdev/burme-dataset" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/20 transition-all duration-300 text-purple-300 hover:text-purple-200">
              <Bot className="w-4 h-4" />
              <span>HuggingFace</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Form Card */}
          <div className="transition-transform duration-300 hover:scale-[1.01]">
            <GlassCard className="p-6 md:p-8" title="Add Chat Data">
              <form onSubmit={handleSubmit} className="space-y-5">
                <FormInput
                  label="Prompt (User Message)"
                  placeholder="Enter user message or question"
                  value={formData.prompt}
                  onChange={(v) => handleInputChange("prompt", v)}
                  required
                  icon={<MessageCircle className="w-5 h-5" />}
                  rows={3}
                />

                <FormInput
                  label="Response (Bot Reply)"
                  placeholder="Enter bot's response"
                  value={formData.response}
                  onChange={(v) => handleInputChange("response", v)}
                  required
                  icon={<Bot className="w-5 h-5" />}
                  rows={4}
                />

                <FormInput
                  label="Context (Optional)"
                  placeholder="Additional context or background information"
                  value={formData.context}
                  onChange={(v) => handleInputChange("context", v)}
                  icon={<FileText className="w-5 h-5" />}
                  rows={2}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <SelectInput
                    label="Language"
                    value={formData.language}
                    onChange={(v) => handleInputChange("language", v)}
                    options={LANGUAGE_OPTIONS}
                    required
                    icon={<Globe className="w-5 h-5" />}
                  />
                  <SelectInput
                    label="Category"
                    value={formData.category}
                    onChange={(v) => handleInputChange("category", v)}
                    options={CATEGORY_OPTIONS}
                    required
                    icon={<Tags className="w-5 h-5" />}
                  />
                </div>

                {message && (
                  <div className={`flex items-center gap-3 p-4 rounded-xl ${message.type === "success" ? "bg-green-500/20 border border-green-500/30" : "bg-red-500/20 border border-red-500/30"}`}>
                    {message.type === "success" ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
                    <span className={message.type === "success" ? "text-green-300" : "text-red-300"}>{message.text}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? <><Spinner size="sm" /><span>Saving to Dataset...</span></> : <><Send className="w-5 h-5" /><span>Save to HuggingFace</span></>}
                </button>
              </form>
            </GlassCard>
          </div>

          {/* Preview Card */}
          <div className="transition-transform duration-300 hover:scale-[1.01]">
            <GlassCard className="p-6 md:p-8" title="CSV Preview">
              <div className="space-y-4">
                {previewData ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-white/50 text-sm">
                      <Upload className="w-4 h-4" />
                      <span>Real-time Preview</span>
                    </div>
                    <div className="bg-slate-900/50 rounded-xl p-4 font-mono text-sm overflow-x-auto border border-slate-700/50">
                      <div className="text-blue-400 mb-2">prompt,response,context,language,category</div>
                      <div className="text-white/80 break-all leading-relaxed whitespace-pre-wrap">"{previewData.prompt}","{previewData.response}","{previewData.context}","{previewData.language}","{previewData.category}"</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                        <div className="text-white/40 text-xs mb-1">Prompt</div>
                        <div className="text-white text-sm truncate">{previewData.prompt || "-"}</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                        <div className="text-white/40 text-xs mb-1">Response</div>
                        <div className="text-white text-sm truncate">{previewData.response || "-"}</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                        <div className="text-white/40 text-xs mb-1">Language</div>
                        <div className="text-white text-sm truncate">{previewData.language || "-"}</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                        <div className="text-white/40 text-xs mb-1">Category</div>
                        <div className="text-white text-sm truncate">{previewData.category || "-"}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16 text-white/40">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                      <Upload className="w-8 h-8 opacity-50" />
                    </div>
                    <p className="text-lg">Start typing to see CSV preview</p>
                    <p className="text-sm mt-2 opacity-60">Your data will be formatted for ML training</p>
                  </div>
                )}
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Info Cards */}
        <GlassCard className="mt-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">How It Works</h3>
              <ul className="space-y-3 text-white/60 text-sm">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-blue-400 mt-1.5" />
                  Enter the user's prompt or question
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-purple-400 mt-1.5" />
                  Write the bot's response to that prompt
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-green-400 mt-1.5" />
                  Select language and category, then submit
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Data Schema</h3>
              <div className="bg-slate-800/50 rounded-xl p-4 font-mono text-sm space-y-1 border border-slate-700/30 overflow-x-auto">
                <div className="text-blue-400">prompt,response,context,language,category</div>
                <div className="text-white/40">"Hello","Hi there!","greeting","English","greeting"</div>
              </div>
            </div>
          </div>
        </GlassCard>

        <footer className="mt-8 text-center text-white/30 text-sm">
          <p>Powered by Next.js • Tailwind CSS • HuggingFace</p>
        </footer>
      </div>
    </main>
  );
}