"use client";

import { useState } from "react";
import { GraduationCap, MapPin, BookOpen, FileText, Save, Upload, AlertCircle, CheckCircle2, Database } from "lucide-react";
import { GlassCard } from "./components/GlassCard";
import { FormInput } from "./components/FormInput";
import { Spinner } from "./components/Spinner";
import type { CollegeFormData } from "@/types";

interface FormData extends CollegeFormData {}

interface PreviewData {
  name: string;
  major: string;
  requirements: string;
  location: string;
  description: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    major: "",
    requirements: "",
    location: "",
    description: "",
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
    
    if (!formData.name || !formData.major || !formData.requirements || !formData.location || !formData.description) {
      setMessage({ type: "error", text: "Please fill in all fields" });
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
        setMessage({ type: "success", text: "College data saved successfully!" });
        setFormData({ name: "", major: "", requirements: "", location: "", description: "" });
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
    <main className="min-h-screen p-4 md:p-8">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-3 mb-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20">
            <Database className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Burmese College Dataset</h1>
          <p className="text-white/60 max-w-xl mx-auto">Collect and manage Myanmar college data with real-time CSV preview</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlassCard className="p-6" title="Add New College">
            <form onSubmit={handleSubmit} className="space-y-5">
              <FormInput label="College Name" placeholder="ကောလိပ်အမည်" value={formData.name} onChange={(v) => handleInputChange("name", v)} required icon={<GraduationCap className="w-5 h-5" />} />
              <FormInput label="Major/Specialization" placeholder="မေဂျာအမည်" value={formData.major} onChange={(v) => handleInputChange("major", v)} required icon={<BookOpen className="w-5 h-5" />} />
              <FormInput label="Entrance Requirements" placeholder="ဝင်ခွင့်အခြေအနေ" value={formData.requirements} onChange={(v) => handleInputChange("requirements", v)} required icon={<FileText className="w-5 h-5" />} />
              <FormInput label="Location" placeholder="တည်နေရာ" value={formData.location} onChange={(v) => handleInputChange("location", v)} required icon={<MapPin className="w-5 h-5" />} />
              <FormInput label="Description" placeholder="ဖေါ်ပါးချက်" value={formData.description} onChange={(v) => handleInputChange("description", v)} required rows={4} />

              {message && (
                <div className={`flex items-center gap-2 p-4 rounded-xl ${message.type === "success" ? "bg-green-500/20 border border-green-500/30" : "bg-red-500/20 border border-red-500/30"}`}>
                  {message.type === "success" ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
                  <span className={`text-sm ${message.type === "success" ? "text-green-300" : "text-red-300"}`}>{message.text}</span>
                </div>
              )}

              <button type="submit" disabled={isLoading} className="w-full py-4 px-6 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2">
                {isLoading ? (<><Spinner size="sm" /><span>Saving...</span></>) : (<><Save className="w-5 h-5" /><span>Save to Dataset</span></>)}
              </button>
            </form>
          </GlassCard>

          <GlassCard className="p-6" title="CSV Preview">
            <div className="space-y-4">
              {previewData ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
                    <Upload className="w-4 h-4" />
                    <span>Real-time Preview</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                    <div className="text-blue-400 mb-2">college_name,major,requirements,location,description</div>
                    <div className="text-white/80 break-all">"{previewData.name}","{previewData.major}","{previewData.requirements}","{previewData.location}","{previewData.description}"</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-white/5 rounded-lg p-3"><div className="text-white/40 text-xs mb-1">College Name</div><div className="text-white text-sm truncate">{previewData.name || "-"}</div></div>
                    <div className="bg-white/5 rounded-lg p-3"><div className="text-white/40 text-xs mb-1">Major</div><div className="text-white text-sm truncate">{previewData.major || "-"}</div></div>
                    <div className="bg-white/5 rounded-lg p-3"><div className="text-white/40 text-xs mb-1">Location</div><div className="text-white text-sm truncate">{previewData.location || "-"}</div></div>
                    <div className="bg-white/5 rounded-lg p-3"><div className="text-white/40 text-xs mb-1">Requirements</div><div className="text-white text-sm truncate">{previewData.requirements || "-"}</div></div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-white/40">
                  <Upload className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Start typing to see CSV preview</p>
                </div>
              )}
            </div>
          </GlassCard>
        </div>

        <GlassCard className="mt-6 p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">How It Works</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2" />Fill in the college information in Burmese or English</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2" />Real-time CSV preview shows how data will be formatted</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2" />Submit to save directly to your HuggingFace dataset</li>
              </ul>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">Environment Variables</h3>
              <div className="bg-slate-800/50 rounded-xl p-4 font-mono text-sm space-y-2">
                <div className="text-white/40">HF_TOKEN = (configured)</div>
                <div className="text-white/40">DATASET_REPO = amkyawdev/burme-dataset</div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}