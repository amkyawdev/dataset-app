/**
 * College Data Interface
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
 * Form Data Interface
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
 * CSV Row Interface
 */
export interface CSVRow {
  college_name: string;
  major: string;
  requirements: string;
  location: string;
  description: string;
}