# 🤖 Chat Bot Dataset Collector

<p align="center">
  <a href="https://github.com/amkyawdev/dataset-app">
    <img src="https://img.shields.io/badge/maintained-yes-blue?style=flat" alt="Maintained">
  </a>
  <a href="https://github.com/amkyawdev/dataset-app/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-Apache%202.0-green?style=flat" alt="License">
  </a>
  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js" alt="Next.js">
  </a>
  <a href="https://vercel.com">
    <img src="https://img.shields.io/badge/deployed-on-vercel-black?style=flat&logo=vercel" alt="Deployed on Vercel">
  </a>
  <a href="https://huggingface.co/spaces">
    <img src="https://img.shields.io/badge/HuggingFace-Spaces-yellow?style=flat" alt="HuggingFace Spaces">
  </a>
</p>

A professional Next.js 14 application for collecting Chat Bot training data with a modern Glassmorphism Dark Theme UI. Collect user prompts, bot responses, and metadata for training conversational AI models.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **💬 Prompt Collection** | Collect user messages/questions |
| **🤖 Response Collection** | Record bot responses to prompts |
| **📊 CSV Format** | Data saved in CSV format and synced with HuggingFace Dataset |
| **🎨 Glassmorphism UI** | Modern dark theme with glass effect design |
| **👁️ Real-time Preview** | Live CSV preview as you type |
| **🔄 HuggingFace Sync** | Direct sync to your HuggingFace dataset repository |
| **🌍 Multi-language** | Support for Burmese, English, and Mixed language data |
| **📁 Category System** | Organize data by conversation type (greeting, question, etc.) |

---

## 🛠️ Tech Stack

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D2?style=for-the-badge&logo=tailwind-css&logoColor=white)
![HuggingFace](https://img.shields.io/badge/HuggingFace-FFD21E?style=for-the-badge&logo=huggingface)

</div>

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- HuggingFace account with Write access token

### Installation

```bash
# Clone the repository
git clone https://github.com/amkyawdev/dataset-app.git
cd dataset-app

# Install dependencies
npm install

# Copy environment file
cp .env.local .env

# Run development server
npm run dev
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# HuggingFace Configuration
# Get your token from: https://huggingface.co/settings/tokens
# Make sure the token has WRITE permission
HF_TOKEN=your_huggingface_token_here

# Dataset Repository
# Format: username/dataset-name
DATASET_REPO=amkyawdev/burme-dataset
```

---

## 📁 Project Structure

```
dataset-app/
├── app/
│   ├── api/
│   │   └── save-college/
│   │       └── route.ts          # CSV processing & HF Upload API
│   ├── components/
│   │   ├── FormInput.tsx          # Reusable input component
│   │   ├── GlassCard.tsx          # Glassmorphism UI container
│   │   ├── SelectInput.tsx        # Dropdown select component
│   │   └── Spinner.tsx            # Loading spinner component
│   ├── docs/
│   │   └── page.tsx              # Documentation page
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Main dashboard page
├── lib/
│   └── huggingface.ts             # HuggingFace API configuration
├── types/
│   └── index.ts                   # TypeScript interfaces
├── public/
│   └── sw.js                      # Service worker for PWA
├── Dockerfile                     # For HuggingFace Spaces deployment
├── .dockerignore                  # Docker ignore file
├── .env.local                     # Environment variables
├── next.config.js                 # Next.js configuration
└── tailwind.config.ts             # Tailwind CSS configuration
```

---

## 📊 Data Schema

The app collects the following fields for Chat Bot training:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `prompt` | string | Yes | User message or question |
| `response` | string | Yes | Bot's reply to the prompt |
| `context` | string | No | Additional context or background |
| `language` | string | Yes | Burmese, English, or Mixed |
| `category` | string | Yes | Conversation type |

### Language Options

| Value | Description |
|-------|-------------|
| `Burmese` | Myanmar language (မြန်မာစာ) |
| `English` | English language |
| `Mixed` | Mixed Burmese and English |

### Category Options

| Value | Description |
|-------|-------------|
| `greeting` | Greeting messages |
| `question` | Questions and answers |
| `information` | Information sharing |
| `instruction` | Instructions and guides |
| `conversation` | General conversation |
| `technical` | Technical support |
| `general` | General topics |

### Example CSV Entry

```csv
prompt,response,context,language,category
"Hello","Hi there! How can I help you today?","","English","greeting"
"မင်္ဂလာပါ","မင်္ဂလာပါ။ ဘာလုပ်ပါသလဲ။","","Burmese","greeting"
"What is machine learning?","Machine learning is a type of artificial intelligence that allows computers to learn from data without being explicitly programmed.","","English","information"
```

---

## 💻 How to Use Dataset

```python
from datasets import load_dataset

# Load the dataset
dataset = load_dataset("amkyawdev/burme-dataset")

# Access training data
train_data = dataset["train"]

# Iterate through examples
for example in train_data:
    print(f"Prompt: {example['prompt']}")
    print(f"Response: {example['response']}")
    print(f"Language: {example['language']}")
    print(f"Category: {example['category']}")
    print("---")
```

### Loading Specific File

```python
from datasets import load_dataset

# Load specific CSV file (chatbot.csv)
dataset = load_dataset("csv", data_files="https://huggingface.co/datasets/amkyawdev/burme-dataset/resolve/main/chatbot.csv")
```

---

## 🔗 API Endpoints

### POST /api/save-college

Save chat bot data to HuggingFace dataset.

**Request:**
```json
{
  "prompt": "Hello",
  "response": "Hi there! How can I help you?",
  "context": "",
  "language": "English",
  "category": "greeting"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Chat bot data saved successfully"
}
```

### GET /api/save-college

Retrieve current dataset from HuggingFace.

**Response:**
```json
{
  "data": [
    {
      "prompt": "Hello",
      "response": "Hi there!",
      "context": "",
      "language": "English",
      "category": "greeting"
    }
  ],
  "headers": ["prompt", "response", "context", "language", "category"]
}
```

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add Environment Variables in Vercel dashboard:
   - `HF_TOKEN` - Your HuggingFace token
   - `DATASET_REPO` - Your dataset repository
4. Deploy!

### HuggingFace Space

Deploy this app to HuggingFace Spaces:

1. Create a new Space at https://huggingface.co/spaces
2. Select "Docker" as the SDK
3. Upload the Dockerfile and all project files
4. Add Environment Variables in Space settings:
   - `HF_TOKEN` - Your HuggingFace token
   - `DATASET_REPO` - Your dataset repository

---

## 🔗 Links

| Resource | URL |
|----------|-----|
| **Live App (Vercel)** | https://amkyawdev-dataset-app.vercel.app |
| **Documentation** | https://amkyawdev-dataset-app.vercel.app/docs |
| **GitHub Repository** | https://github.com/amkyawdev/dataset-app |
| **HuggingFace Dataset** | https://huggingface.co/datasets/amkyawdev/burme-dataset |
| **HuggingFace Space** | https://huggingface.co/spaces/amkyawdev/chatbot-dataset-collector |

---

## 📝 License

This project is licensed under the [Apache License 2.0](LICENSE).

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

<div align="center">

**Made with ❤️ for AI Development**

<a href="https://github.com/amkyawdev/dataset-app">
  <img src="https://img.shields.io/github/stars/amkyawdev/dataset-app?style=social" alt="Stars">
</a>

</div>