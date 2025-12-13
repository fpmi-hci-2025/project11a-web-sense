import React, { useState } from 'react';
import { Box, Button as MuiButton } from '@mui/material';
import styles from './image-upload.module.css';
import { Button } from '../button';

interface ImageUploadProps {
  onChange: (file: File | null) => void;
  disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, disabled }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      onChange(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setFileName('');
    onChange(null);
  };

  return (
    <Box sx={{ marginY: 2 }}>
      {preview ? (
        <Box className={styles.previewContainer}>
          <img src={preview} alt="Preview" className={styles.previewImage} />
          <Box className={styles.fileInfo}>
            <p>{fileName}</p>
            <Button label="Remove" onClick={handleRemove} />
          </Box>
        </Box>
      ) : (
        <MuiButton
          className={styles.uploadButton}
          variant="contained"
          component="label"
          disabled={disabled}
          fullWidth
        >
          Upload Image
          <input
            type="file"
            hidden
            accept="image/*"
            disabled={disabled}
            onChange={handleFileChange}
          />
        </MuiButton>
      )}
    </Box>
  );
};

export default ImageUpload;
