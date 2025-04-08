'use client';

import { useState, useEffect } from 'react';
import styles from './files.module.css';
import { useRouter } from 'next/navigation';

export default function FilesPage() {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const router = useRouter();

  // Fetch files on component mount
  useEffect(() => {
    fetchFiles();
  }, []);

  // Function to fetch the list of files
  const fetchFiles = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/files/list');
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch files');
      }
      
      setFiles(data.files);
    } catch (err) {
      console.error('Error fetching files:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    try {
      setIsUploading(true);
      setUploadProgress(0);
      setUploadError(null);
      
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to upload file');
      }
      
      fetchFiles();
      
      event.target.value = '';
    } catch (err) {
      console.error('Error uploading file:', err);
      setUploadError(err.message);
    } finally {
      setIsUploading(false);
      setUploadProgress(100);
    }
  };

  const handleDeleteFile = async (filename) => {
    if (!confirm('Are you sure you want to delete this file?')) return;
    
    try {
      const response = await fetch('/api/files/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename }),
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to delete file');
      }
      
      fetchFiles();
    } catch (err) {
      console.error('Error deleting file:', err);
      alert(`Error deleting file: ${err.message}`);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const handleBackClick = () => {
    router.push('/');
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.boxContainer}>
        <main className={styles.container}>
          <header className={styles.header}>
            <div className={styles.headerLeft}>
              <button 
                className={styles.backButton}
                onClick={handleBackClick}
                aria-label="Go back"
              >
                ← Back
              </button>
              <h1 className={styles.title}>File Management</h1>
            </div>
          </header>
          
          {/* File Upload Section */}
          <div className={styles.uploadSection}>
            <h2>Upload Files</h2>
            <p>Upload videos or other large files (max 100MB)</p>
            
            <div className={styles.uploadControls}>
              <input
                type="file"
                id="fileInput"
                onChange={handleFileUpload}
                disabled={isUploading}
                className={styles.fileInput}
              />
              <label htmlFor="fileInput" className={styles.uploadButton}>
                {isUploading ? 'Uploading...' : 'Choose File'}
              </label>
            </div>
            
            {isUploading && (
              <div className={styles.progressContainer}>
                <div 
                  className={styles.progressBar} 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}
            
            {uploadError && (
              <div className={styles.error}>
                Error: {uploadError}
              </div>
            )}
          </div>
          
          {/* File List Section */}
          <div className={styles.fileListSection}>
            <h2>Uploaded Files</h2>
            
            {isLoading ? (
              <p>Loading files...</p>
            ) : error ? (
              <div className={styles.error}>
                Error: {error}
              </div>
            ) : files.length === 0 ? (
              <p>No files uploaded yet.</p>
            ) : (
              <div className={styles.fileList}>
                {files.map((file) => (
                  <div key={file.filename} className={styles.fileItem}>
                    <div className={styles.fileInfo}>
                      <h3>{file.originalName}</h3>
                      <p>Size: {formatFileSize(file.size)}</p>
                      <p>Uploaded: {formatDate(file.createdAt)}</p>
                    </div>
                    
                    <div className={styles.fileActions}>
                      <a 
                        href={file.url} 
                        download={file.originalName}
                        className={styles.downloadButton}
                      >
                        Download
                      </a>
                      <button
                        onClick={() => handleDeleteFile(file.filename)}
                        className={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
} 