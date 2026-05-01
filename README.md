# 🏥 CareEase - B2B Healthcare SaaS

CareEase is a premium, state-of-the-art Healthcare SaaS platform designed for medical providers. It offers a seamless, high-performance interface for managing patients, analyzing clinic performance, and handling real-time notifications.

![CareEase Dashboard](https://raw.githubusercontent.com/palakverma25/care-ease/main/src/assets/vite.svg)

## ✨ Key Features

- **🔐 Secure Authentication**: Integrated with Firebase Authentication (Email/Password & Demo Mode fallback).
- **📊 Real-time Analytics**: High-fidelity charts for revenue, efficiency, and patient demographics using Recharts.
- **👥 Patient Management**:
  - Dual View: Seamless toggle between **Grid** and **List** views.
  - Search & Filter: Instant search across patient names and conditions.
  - Add Patient: Reusable modal interface for quick patient onboarding.
- **🔔 Notifications**: Service Worker-based notification system for critical alerts and updates.
- **💎 Premium UI/UX**: Modern glassmorphism aesthetic with responsive design and smooth animations.

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Vanilla CSS Modules (Glassmorphism design system)
- **State Management**: Zustand
- **Charts**: Recharts
- **Icons**: Lucide React
- **Auth**: Firebase Authentication

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/palakverma25/care-ease.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and add your Firebase credentials:
   ```dotenv
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## 📦 Deployment

The project is optimized for **Vercel**. When deploying, ensure all `VITE_` environment variables are added to the Vercel dashboard.

## 📄 License

This project is for demonstration purposes.

---
Built with ❤️ for Modern Healthcare.
