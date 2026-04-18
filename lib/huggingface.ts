/**
 * HuggingFace API Configuration
 * Handles interaction with HuggingFace Hub for dataset management
 */

import type { CollegeFormData } from "@/types";

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
 * Format college data as CSV row
 */
export function formatCSVRow(data: CollegeFormData): string {
  const escapeCSV = (str: string) => {
    const escaped = str.replace(/"/g, '""');
    return `"${escaped}"`;
  };

  return [
    escapeCSV(data.name),
    escapeCSV(data.major),
    escapeCSV(data.requirements),
    escapeCSV(data.location),
    escapeCSV(data.description),
  ].join(",") + "\n";
}

/**
 * Create CSV header
 */
export function createCSVHeader(): string {
  return "college_name,major,requirements,location,description\n";
}

/**
 * Append single college entry to existing CSV
 */
export async function appendCollegeToCSV(
  data: CollegeFormData,
  fileName: string = "colleges.csv"
): Promise<void> {
  let csvContent = await fetchCSVFromHF(fileName);
  
  if (!csvContent || !csvContent.includes("college_name")) {
    csvContent = createCSVHeader();
  }
  
  const newRow = formatCSVRow(data);
  
  const updatedCsv = csvContent.endsWith("\n") 
    ? csvContent + newRow 
    : csvContent + "\n" + newRow;
  
  await uploadCSVToHF(updatedCsv, fileName);
}