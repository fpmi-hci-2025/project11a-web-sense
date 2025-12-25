import React, { useState } from 'react';
import { Modal, Box, TextField, Button, CircularProgress } from '@mui/material';

interface AiPromptModalProps {
  open: boolean;
  onClose: () => void;
  onResult: (result: string) => void;
  loading: boolean;
  onSubmit: (prompt: string) => void;
}

export const AiPromptModal: React.FC<AiPromptModalProps> = ({
  open,
  onClose,
  loading,
  onSubmit,
}) => {
  const [prompt, setPrompt] = useState('');

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(prompt);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          minWidth: 520,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="AI Prompt"
            value={prompt}
            onChange={handlePromptChange}
            fullWidth
            autoFocus
            disabled={loading}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={onClose} disabled={loading} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading || !prompt.trim()}
            >
              {loading ? <CircularProgress size={20} /> : 'Generate'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
