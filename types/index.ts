/**
 * Chat Bot Training Data Interface
 */
export interface ChatBotData {
  id: string;
  prompt: string;
  response: string;
  context: string;
  language: string;
  category: string;
  createdAt: string;
}

/**
 * Form Data Interface for Chat Bot Data
 */
export interface ChatBotFormData {
  prompt: string;
  response: string;
  context: string;
  language: string;
  category: string;
}

/**
 * College Data Interface (Legacy)
 */
export interface College {
  id: string;
  collegeName: string;
  major: string;
  requirements: string;
  location: string;
  description: string;
  createdAt: string;
}

/**
 * Form Data Interface (Legacy)
 */
export interface CollegeFormData {
  name: string;
  major: string;
  requirements: string;
  location: string;
  description: string;
}

/**
 * API Response Interface
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * CSV Row Interface for Chat Bot
 */
export interface ChatBotCSVRow {
  prompt: string;
  response: string;
  context: string;
  language: string;
  category: string;
}

/**
 * CSV Row Interface (Legacy)
 */
export interface CSVRow {
  college_name: string;
  major: string;
  requirements: string;
  location: string;
  description: string;
}