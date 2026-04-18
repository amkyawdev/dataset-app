/**
 * Save College API Route
 * Handles CSV data processing and HuggingFace upload
 */

import { NextResponse } from "next/server";
import { appendCollegeToCSV, fetchCSVFromHF, formatCSVRow, createCSVHeader } from "@/lib/huggingface";
import type { ChatBotFormData } from "@/types";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { prompt, response, context, language, category } = data;

    // Validate required fields
    if (!prompt || !response || !language || !category) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await appendCollegeToCSV({ prompt, response, context, language, category } as ChatBotFormData, "chatbot.csv");
    
    return NextResponse.json({ success: true, message: "Chat bot data saved successfully" });
    
  } catch (error: unknown) {
    console.error("Error saving chat bot data:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to save data";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function GET() {
  try {
    const csvContent = await fetchCSVFromHF("chatbot.csv");
    
    if (!csvContent) {
      return NextResponse.json({ data: [], headers: [] });
    }
    
    const lines = csvContent.trim().split("\n");
    const headers = lines[0].split(",").map(h => h.trim().replace(/"/g, ""));
    const rows = lines.slice(1).map(line => {
      const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.trim().replace(/^"|"$/g, "").replace(/""/g, '"'));
      return headers.reduce((obj, header, index) => {
        obj[header] = values[index] || "";
        return obj;
      }, {} as Record<string, string>);
    });
    
    return NextResponse.json({ data: rows, headers });
    
  } catch (error) {
    console.error("Error fetching CSV data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}