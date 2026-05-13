import { Typography } from '@mui/material';
import React, { useState } from 'react'
import { UploadFile } from '@mui/icons-material';
const NotificationUpload = ({ onFileSelect }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadPercentage, setUploadPercentage] = useState(0);
   
    const handleFileChange = async (event) => {
      const file = event.target.files[0];
  
      if (file) {
        setSelectedFile(file);
  
        // Simulate file upload with a delay and update the percentage
        for (let i = 0; i <= 100; i += 10) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          setUploadPercentage(i);
        }
  
        // Invoke the callback function from the parent with the file name and upload percentage
        onFileSelect(file.name, 100);
      }
    };
  return (
    <div className="flex h-[111px] w-[316px] flex-col items-center justify-center rounded border border-dashed border-white/20 bg-[#39383d] px-5 py-3">
         <label htmlFor="fileInput">
          <input
          type="file"
          id="fileInput"
          accept=".pdf, .doc, .docx, .zip" // Specify accepted file types if needed
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <UploadFile style={{ fontSize: '24px' }} />
    
        </label>
     
      <Typography variant="caption" gutterBottom>
        Drop your files or browse
      </Typography>
      
    </div>
  )
}

export default NotificationUpload
