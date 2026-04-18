# 🏛️ Burmese College Dataset Collector

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
</p>

A professional Next.js 14 application for collecting Burmese Myanmar college data with a modern Glassmorphism Dark Theme UI. Built with App Router, TypeScript, and integrated with HuggingFace for dataset management.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **📚 Data Collection** | Collect College Name, Major/Specialization, Entrance Requirements, Location, and Description |
| **📊 CSV Format** | Data saved in CSV format and synced with HuggingFace Dataset |
| **🎨 Glassmorphism UI** | Modern dark theme with glass effect design |
| **👁️ Real-time Preview** | Live CSV preview as you type |
| **🔄 HuggingFace Sync** | Direct sync to your HuggingFace dataset repository |
| **✅ Validation** | Proper Burmese text input handling with loading states |

---

## 🛠️ Tech Stack

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D2?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide_React-latest-ffffff?style=for-the-badge)

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
# or
yarn install

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
DATASET_REPO=username/your-dataset-name
```

---

## 📁 Project Structure

```
burmese-college-dataset/
├── app/
│   ├── api/
│   │   └── save-college/
│   │       └── route.ts          # CSV processing & HF Upload API
│   ├── components/
│   │   ├── FormInput.tsx          # Reusable Burmese Input component
│   │   ├── GlassCard.tsx         # Glassmorphism UI container
│   │   └── Spinner.tsx           # Loading spinner component
│   ├── globals.css               # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main dashboard page
├── lib/
│   └── huggingface.ts            # HuggingFace API configuration
├── types/
│   └── index.ts                 # TypeScript interfaces
├── .env.local                   # Environment variables
├── next.config.js               # Next.js configuration
└── tailwind.config.ts           # Tailwind CSS configuration
```

---

## 📊 Data Schema

The app collects the following fields:

| Field | Type | Description |
|-------|------|-------------|
| `college_name` | string | College name in Burmese or English |
| `major` | string | Major or specialization |
| `requirements` | string | Entrance requirements |
| `location` | string | Location (city, state) |
| `description` | string | Additional description |

---

## 🔗 API Endpoints

### POST /api/save-college

Save college data to HuggingFace dataset.

**Request:**
```json
{
  "name": "ရန်းရှားကောလိပ်",
  "major": "အင်ဂျင်နီယာ",
  "requirements": "သင်္ဂါယန်း(၉) အောင်ပါးရန်",
  "location": "ရန်းရှားမြို့",
  "description": "အဆင့်မြင့်ဆွယ်တားအတွက် ကောလိပ်"
}
```

**Response:**
```json
{
  "success": true,
  "message": "College data saved successfully"
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

You can also deploy this app to HuggingFace Spaces using Docker.

---

## 📝 License

This project is licensed under the [Apache License 2.0](LICENSE).

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

<div align="center">

**Made with ❤️ for Myanmar Education**

<a href="https://github.com/amkyawdev/dataset-app">
  <img src="https://img.shields.io/github/stars/amkyawdev/dataset-app?style=social" alt="Stars">
</a>

</div>