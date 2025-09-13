import React, { useState, useRef } from 'react';
import { Upload, FileText, Search, Bell, User, Menu, X, Filter, Eye, Download, Clock, AlertTriangle } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      name: 'Safety Directive - Track Maintenance.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2025-01-15',
      status: 'processed',
      priority: 'urgent',
      department: 'Safety',
      summary: 'Critical safety protocols for track maintenance during operational hours...'
    },
    {
      id: 2,
      name: 'Procurement Guidelines 2025.docx',
      type: 'doc',
      size: '1.2 MB',
      uploadDate: '2025-01-14',
      status: 'processing',
      priority: 'medium',
      department: 'Procurement',
      summary: 'Updated procurement guidelines and vendor evaluation criteria...'
    }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef(null);

  // backend URL from env
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

  // endpoints
  const API_ENDPOINTS = {
    UPLOAD_FILE: `${BACKEND_URL}/file`,
    GET_URL: `${BACKEND_URL}/url`
  };

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    
    if (files.length === 0) return;
    
    for (const file of files) {
      const fileId = Date.now() + Math.random();
      
      // Validate file type and size
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
      const maxSize = 10 * 1024 * 1024; // 10MB
      
      if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx|xls|xlsx)$/i)) {
        alert(`File type not supported: ${file.name}`);
        continue;
      }
      
      if (file.size > maxSize) {
        alert(`File too large: ${file.name}. Maximum size is 10MB.`);
        continue;
      }
      
      // Add file to state with uploading status
      const newFile = {
        id: fileId,
        name: file.name,
        type: file.type.includes('pdf') ? 'pdf' : 
              file.type.includes('word') || file.name.includes('doc') ? 'doc' : 
              file.type.includes('sheet') || file.name.includes('xls') ? 'excel' : 'other',
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'uploading',
        priority: 'medium',
        department: 'General',
        summary: 'Uploading document...'
      };

      setUploadedFiles(prev => [newFile, ...prev]);
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));

      try {
        // Create FormData for file upload
        const formData = new FormData();
        formData.append('file', file);

        // Upload file with progress tracking
        const response = await axios.post(API_ENDPOINTS.UPLOAD_FILE, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(prev => ({ ...prev, [fileId]: progress }));
          },
          timeout: 30000, // 30 second timeout
        });

        // Update file status to processing
        setUploadedFiles(prev =>
          prev.map(f => f.id === fileId ? { 
            ...f, 
            status: 'processing',
            summary: response.data?.message || 'Document uploaded successfully. Processing...'
          } : f)
        );

        // Clear upload progress
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[fileId];
          return newProgress;
        });

        // Poll for processing status (you can replace this with WebSocket or actual API polling)
        pollProcessingStatus(fileId);

      } catch (error) {
        console.error('File upload error:', error);
        
        let errorMessage = 'Upload failed. Please try again.';
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.code === 'ECONNABORTED') {
          errorMessage = 'Upload timeout. Please try again.';
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        // Update file status to error
        setUploadedFiles(prev =>
          prev.map(f => f.id === fileId ? { 
            ...f, 
            status: 'error',
            summary: errorMessage
          } : f)
        );
        
        // Clear upload progress
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[fileId];
          return newProgress;
        });
      }
    }

    // Clear file input
    if (event.target) {
      event.target.value = '';
    }
  };

  // Simulate processing status polling
  const pollProcessingStatus = (fileId) => {
    // In a real implementation, you would poll your backend for status updates
    setTimeout(() => {
      setUploadedFiles(prev =>
        prev.map(f => f.id === fileId ? { 
          ...f, 
          status: 'processed',
          summary: 'Document processed and indexed successfully.'
        } : f)
      );
    }, 3000);
  };

  // Function to get URL 
  const getUrl = async (url) => {
    try {
      const response = await axios.post(API_ENDPOINTS.GET_URL, {
        url: url
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000
      });
      
      return response.data;
    } catch (error) {
      console.error('Get URL error:', error);
      throw error;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processed': return 'text-green-600 bg-green-50';
      case 'processing': return 'text-yellow-600 bg-yellow-50';
      case 'uploading': return 'text-blue-600 bg-blue-50';
      case 'error': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredFiles = uploadedFiles.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const text = {
    en: {
      dashboard: 'Dashboard',
      documents: 'Documents',
      search: 'Search',
      analytics: 'Analytics',
      settings: 'Settings',
      uploadDocument: 'Upload Document',
      recentDocuments: 'Recent Documents',
      quickStats: 'Quick Stats',
      urgentDirectives: 'Urgent Directives',
      searchPlaceholder: 'Search documents...',
      totalDocuments: 'Total Documents',
      pendingReview: 'Pending Review',
      thisWeek: 'This Week',
      view: 'View',
      download: 'Download',
      processing: 'Processing',
      processed: 'Processed',
      uploading: 'Uploading',
      error: 'Error',
      uploadInfo: 'PDF, DOC, DOCX, XLS, XLSX (Max 10MB)',
      dragDrop: 'Click to upload or drag and drop',
      noDocuments: 'No documents found matching your search.'
    },
    ml: {
      dashboard: 'ഡാഷ്ബോർഡ്',
      documents: 'പ്രമാണങ്ങൾ',
      search: 'തിരയൽ',
      analytics: 'വിശകലനം',
      settings: 'ക്രമീകരണങ്ങൾ',
      uploadDocument: 'പ്രമാണം അപ്‌ലോഡ് ചെയ്യുക',
      recentDocuments: 'പുതിയ പ്രമാണങ്ങൾ',
      quickStats: 'വേഗത്തിലുള്ള സ്ഥിതിവിവരക്കണക്കുകൾ',
      urgentDirectives: 'അടിയന്തര നിർദ്ദേശങ്ങൾ',
      searchPlaceholder: 'പ്രമാണങ്ങൾ തിരയുക...',
      totalDocuments: 'മൊത്തം പ്രമാണങ്ങൾ',
      pendingReview: 'അവലോകനം കാത്തിരിക്കുന്നു',
      thisWeek: 'ഈ ആഴ്ച',
      view: 'കാണുക',
      download: 'ഡൌൺലോഡ്',
      processing: 'പ്രോസസ്സിംഗ്',
      processed: 'പ്രോസസ് ചെയ്തു',
      uploading: 'അപ്‌ലോഡ് ചെയ്യുന്നു',
      error: 'പിശക്',
      uploadInfo: 'PDF, DOC, DOCX, XLS, XLSX (പരമാവധി 10MB)',
      dragDrop: 'അപ്‌ലോഡ് ചെയ്യാൻ ക്ലിക്ക് ചെയ്യുക അല്ലെങ്കിൽ ഇഴുത്ത് വിടുക',
      noDocuments: 'നിങ്ങളുടെ തിരയലുമായി പൊരുത്തപ്പെടുന്ന പ്രമാണങ്ങൾ കണ്ടെത്തിയില്ല.'
    }
  };

  const t = text[selectedLanguage];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 px-4 lg:px-6 h-16 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <FileText className="text-white" size={16} />
            </div>
            <h1 className="text-xl font-heading font-semibold text-primary">KMRL Doc Intelligence</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Language Toggle */}
          <div className="flex bg-neutral-100 rounded-lg p-1">
            <button
              onClick={() => setSelectedLanguage('en')}
              className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                selectedLanguage === 'en' ? 'bg-white text-primary shadow-sm' : 'text-neutral-600'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setSelectedLanguage('ml')}
              className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                selectedLanguage === 'ml' ? 'bg-white text-primary shadow-sm' : 'text-neutral-600'
              }`}
            >
              ML
            </button>
          </div>
          
          <button className="relative p-2 hover:bg-neutral-100 rounded-lg transition-colors" aria-label="Notifications">
            <Bell size={20} className="text-neutral-600" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-danger text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>
          
          <button className="flex items-center gap-2 p-2 hover:bg-neutral-100 rounded-lg transition-colors" aria-label="User menu">
            <User size={20} className="text-neutral-600" />
            <span className="hidden sm:block text-sm font-medium text-neutral-700">Alan-W-Arch</span>
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-neutral-200 transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          <nav className="p-4 space-y-2 mt-4">
            <a href="#" className="flex items-center gap-3 px-3 py-2 bg-accent/10 text-accent rounded-lg font-medium">
              <FileText size={20} />
              {t.dashboard}
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
              <FileText size={20} />
              {t.documents}
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
              <Search size={20} />
              {t.search}
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
              <FileText size={20} />
              {t.analytics}
            </a>
          </nav>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 max-w-full">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-xl border border-neutral-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">{t.totalDocuments}</p>
                  <p className="text-2xl font-bold text-primary">1,247</p>
                </div>
                <FileText className="text-neutral-400" size={24} />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-neutral-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">{t.pendingReview}</p>
                  <p className="text-2xl font-bold text-warning">23</p>
                </div>
                <Clock className="text-neutral-400" size={24} />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-neutral-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">{t.urgentDirectives}</p>
                  <p className="text-2xl font-bold text-danger">8</p>
                </div>
                <AlertTriangle className="text-neutral-400" size={24} />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-neutral-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">{t.thisWeek}</p>
                  <p className="text-2xl font-bold text-success">156</p>
                </div>
                <FileText className="text-neutral-400" size={24} />
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 mb-8">
            <h2 className="text-lg font-heading font-semibold text-primary mb-4">{t.uploadDocument}</h2>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-neutral-300 rounded-xl p-8 text-center hover:border-accent hover:bg-accent/5 transition-colors cursor-pointer"
            >
              <Upload className="mx-auto mb-4 text-neutral-400" size={48} />
              <p className="text-lg font-medium text-neutral-700 mb-2">
                {t.dragDrop}
              </p>
              <p className="text-sm text-neutral-500">
                {t.uploadInfo}
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Recent Documents */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-heading font-semibold text-primary">{t.recentDocuments}</h2>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={16} />
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent w-full sm:w-auto"
                  />
                </div>
                <button className="flex items-center justify-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
                  <Filter size={16} />
                  Filter
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredFiles.length === 0 ? (
                <div className="text-center py-8 text-neutral-500">
                  <FileText size={48} className="mx-auto mb-4 text-neutral-300" />
                  <p>{t.noDocuments}</p>
                </div>
              ) : (
                filteredFiles.map((file) => (
                  <div key={file.id} className="border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <div className={`w-2 h-2 rounded-full ${getPriorityColor(file.priority)} mt-2`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-primary truncate">{file.name}</h3>
                            <p className="text-sm text-neutral-600 mt-1 line-clamp-2">{file.summary}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-neutral-500">
                              <span>{file.size}</span>
                              <span>{file.uploadDate}</span>
                              <span className="capitalize">{file.department}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(file.status)}`}>
                          {t[file.status] || file.status}
                        </span>
                        
                        {/* Progress bar for uploading files */}
                        {uploadProgress[file.id] !== undefined && (
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-24 h-2 bg-neutral-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-accent transition-all duration-300"
                                style={{ width: `${uploadProgress[file.id]}%` }}
                              />
                            </div>
                            <span className="text-xs text-neutral-500 whitespace-nowrap">{uploadProgress[file.id]}%</span>
                          </div>
                        )}
                        
                        <div className="flex gap-2">
                          <button 
                            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors disabled:cursor-not-allowed"
                            disabled={file.status === 'uploading' || file.status === 'error'}
                            aria-label={t.view}
                          >
                            <Eye size={16} className={`${file.status === 'uploading' || file.status === 'error' ? 'text-neutral-300' : 'text-neutral-600'}`} />
                          </button>
                          <button 
                            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors disabled:cursor-not-allowed"
                            disabled={file.status === 'uploading' || file.status === 'error'}
                            aria-label={t.download}
                          >
                            <Download size={16} className={`${file.status === 'uploading' || file.status === 'error' ? 'text-neutral-300' : 'text-neutral-600'}`} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;