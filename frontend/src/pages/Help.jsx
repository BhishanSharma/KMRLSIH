// src/pages/Help.jsx
import { useState } from "react";
import {
  Folder,
  FolderOpen,
  FileText,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export default function Help() {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (id) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const Section = ({ id, title, children }) => (
    <div className="mb-2">
      <button
        onClick={() => toggleSection(id)}
        className="flex items-center space-x-2 text-left w-full group px-2 py-1 
                   rounded-md transition-all duration-200
                   hover:bg-neutral-100 hover:border-l-4 hover:border-primary"
      >
        {openSections[id] ? (
          <ChevronDown className="w-4 h-4 text-primary transition-transform" />
        ) : (
          <ChevronRight className="w-4 h-4 text-primary transition-transform" />
        )}
        {openSections[id] ? (
          <FolderOpen className="w-4 h-4 text-primary" />
        ) : (
          <Folder className="w-4 h-4 text-primary" />
        )}
        <span className="font-medium text-neutral-800 group-hover:text-primary">
          {title}
        </span>
      </button>

      {openSections[id] && (
        <div className="ml-8 mt-2 text-sm text-neutral-700 space-y-2 border-l border-neutral-200 pl-4">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="px-6 py-10 max-w-8xl h-full mx-auto">
      {/* Header */}
      <header className="text-center mb-12">
        <img
          src="help.png"
          alt="Kochi Metro"
          className="mx-auto mb-4 w-full h-80 object-contain"
        />
        <h1 className="text-3xl font-heading text-primary mb-2">
          KMRLSIH — Smart Engine of Directives
        </h1>
        <p className="text-neutral-600">
          📂 A folder-structured guide for setup, usage & deployment.
        </p>
      </header>

      {/* Explorer-like Sections */}
      <div className="bg-neutral-50 p-6 rounded-lg shadow-md border border-neutral-200">
        <Section id="intro" title="🤖 Introduction">
          <p>
            KMRLSIH converts fragmented and multilingual documents into{" "}
            <strong>searchable, prioritized directives</strong>.
          </p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Ingest → WhatsApp, Email, SharePoint, uploads</li>
            <li>Process → OCR → NLP → Semantic chunking → Summarization</li>
            <li>Classify → Priority detection + notifications</li>
            <li>Deliver → Role-based dashboards (EN / ML)</li>
          </ul>
        </Section>

        <Section id="tech" title="⚙️ Tech Stack">
          <ul className="list-disc ml-6 space-y-1">
            <li>Frontend: React (Vite)</li>
            <li>Backend: FastAPI (Python)</li>
            <li>AI/ML: OCR, NLP, Transformers, FAISS</li>
            <li>Database: PostgreSQL, FAISS</li>
            <li>Cache: Redis</li>
            <li>Notifications: EmailJS</li>
            <li>Deployment: Docker / Compose</li>
          </ul>
        </Section>

        <Section id="features" title="🔋 Features">
          <ul className="list-disc ml-6 space-y-1">
            <li>Unified Upload Hub</li>
            <li>Five-stage AI pipeline</li>
            <li>Priority classification + alerts</li>
            <li>Bilingual UI</li>
            <li>Fast vector search (FAISS + Redis)</li>
            <li>Role-based dashboards</li>
            <li>Audit logging</li>
          </ul>
        </Section>

        <Section id="quick" title="🤸 Quick Start">
          <div>
            <p className="font-semibold">1) Clone</p>
            <pre className="bg-neutral-100 p-2 rounded">
              git clone https://github.com/BhishanSharma/KMRLSIH
              {"\n"}cd KMRLSIH
            </pre>
          </div>
          <div>
            <p className="font-semibold">2) Frontend</p>
            <pre className="bg-neutral-100 p-2 rounded">
              cd frontend{"\n"}npm install{"\n"}npm run dev
            </pre>
          </div>
          <div>
            <p className="font-semibold">3) Backend</p>
            <pre className="bg-neutral-100 p-2 rounded">
              cd backend{"\n"}python -m venv venv{"\n"}source venv/bin/activate
              {"\n"}pip install -r requirements.txt{"\n"}
              uvicorn app.main:app --reload
            </pre>
          </div>
        </Section>

        <Section id="env" title="🧾 Environment Variables">
          <pre className="bg-neutral-100 p-3 rounded text-xs overflow-x-auto">
            {`SUPABASE_URL=...
SUPABASE_KEY=...
DATABASE_URL=...
REDIS_URL=redis://redis:6379/0`}
          </pre>
          <p className="text-warning">
            ⚠️ Never commit .env — use a secrets manager.
          </p>
        </Section>

        <Section id="docker" title="🐳 Docker Setup">
          <p>Backend Dockerfile example:</p>
          <pre className="bg-neutral-100 p-2 rounded text-xs">
            {`FROM python:3.11-slim
RUN apt-get update && apt-get install -y tesseract-ocr ...`}
          </pre>
        </Section>

        <Section id="api" title="🔁 API Examples">
          <pre className="bg-neutral-100 p-2 rounded text-xs">
            {`POST /profile/history
GET  /profile/history?user_id=<id>`}
          </pre>
        </Section>

        <Section id="structure" title="📂 Project Structure">
          <pre className="bg-neutral-100 p-2 rounded text-xs">
            {`KMRLSIH/
├─ frontend/
├─ backend/
├─ database/
├─ docker-compose.yml
└─ README.md`}
          </pre>
        </Section>

        <Section id="notes" title="✅ Notes & Recommendations">
          <ul className="list-disc ml-6 space-y-1">
            <li>Hash passwords, never plaintext</li>
            <li>Keep Supabase keys server-side</li>
            <li>Ensure Malayalam OCR traineddata</li>
            <li>Enable TLS, CORS, CI/CD pipelines</li>
          </ul>
        </Section>
      </div>
    </div>
  );
}
