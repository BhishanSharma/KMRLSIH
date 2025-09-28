import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import DocumentStacksSection from "../components/DocumentStacksSection";
import RecentDocuments from "../components/RecentDocuments";
import FloatingMenu from "../components/FloatingMenu";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const uid = user?.id;
  const [activeItem, setActiveItem] = useState("dashboard");

  const handleFileUpload = () => {
    console.log("Upload File Clicked");
  };

  const handleUrlUpload = () => {
    console.log("Upload URL Clicked");
  };

  return (
    <div className="min-h-[200vh] ms-6 bg-white/30  rounded-4xl mt-10">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        toggleSearch={() => {
          setSearchOpen((prev) => !prev);
          setActiveItem("search");
        }}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />

      {/* Main Content */}
      <div
        className={`transition-all p-1 duration-300 ${
          sidebarOpen ? "lg:ml-64" : "ml-0"
        }`}
      >
        <main
          className="
            min-h-[100vh] overflow-auto
          backdrop-blur-3xl bg-neutral-300/20
             rounded-4xl
            mt-6 m-5 sm:mx-4 lg:mx-8 p-4 sm:p-6 
          "
        >
          <DocumentStacksSection userId={uid} />

          <div className="mt-10">
            <RecentDocuments />
          </div>
        </main>
        <FloatingMenu
          onFileClick={handleFileUpload}
          onLinkClick={handleUrlUpload}
        />
      </div>

      {/* Search Drawer */}
    </div>
  );
};

export default Dashboard;
