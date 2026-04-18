/**
 * HuggingFace API Configuration
 * Handles interaction with HuggingFace Hub for dataset management
 */

import type { ChatBotFormData } from "@/types";

/**
 * Get the dataset repository name from environment
 */
export function getDatasetRepo(): string {
  return process.env.DATASET_REPO || "amkyawdev/burme-dataset";
}

/**
 * Get the HuggingFace token from environment
 */
export function getHfToken(): string {
  const token = process.env.HF_TOKEN;
  if (!token) {
    throw new Error("HF_TOKEN is not configured");
  }
  return token;
}

/**
 * Fetch existing CSV content from HuggingFace dataset
 */
export async function fetchCSVFromHF(fileName: string = "colleges.csv"): Promise<string> {
  const repo = getDatasetRepo();
  try {
    const response = await fetch(
      `https://huggingface.co/datasets/${repo}/raw/main/${fileName}`
    );
    if (response.ok) {
      return await response.text();
    }
    return "";
  } catch (error) {
    console.log("File doesn't exist yet, will be created:", error);
    return "";
  }
}

/**
 * Upload CSV content to HuggingFace dataset using API
 */
export async function uploadCSVToHF(
  content: string,
  fileName: string = "colleges.csv"
): Promise<void> {
  const repo = getDatasetRepo();
  const token = getHfToken();
  
  // Use the HF Hub API for upload
  const apiUrl = `https://huggingface.co/datasets/${repo}/commit/main`;
  
  const payload = {
    operations: [
      {
        op: "update",
        path: fileName,
        content: content,
        encoding: "utf-8"
      }
    ]
  };
  
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to upload to HuggingFace: ${errorText}`);
  }
}

/**
 * Format chat bot data as CSV row
 */
export function formatCSVRow(data: ChatBotFormData): string {
  const escapeCSV = (str: string) => {
    const escaped = str.replace(/"/g, '""');
    return `"${escaped}"`;
  };

  return [
    escapeCSV(data.prompt),
    escapeCSV(data.response),
    escapeCSV(data.context || ""),
    escapeCSV(data.language),
    escapeCSV(data.category),
  ].join(",") + "\n";
}

/**
 * Create CSV header for chat bot data
 */
export function createCSVHeader(): string {
  return "prompt,response,context,language,category\n";
}

/**
 * Append single chat bot entry to existing CSV
 */
export async function appendCollegeToCSV(
  data: ChatBotFormData,
  fileName: string = "chatbot.csv"
): Promise<void> {
  let csvContent = await fetchCSVFromHF(fileName);
  
  if (!csvContent || !csvContent.includes("prompt")) {
    csvContent = createCSVHeader();
  }
  
  const newRow = formatCSVRow(data);
  
  const updatedCsv = csvContent.endsWith("\n") 
    ? csvContent + newRow 
    : csvContent + "\n" + newRow;
  
  await uploadCSVToHF(updatedCsv, fileName);
}