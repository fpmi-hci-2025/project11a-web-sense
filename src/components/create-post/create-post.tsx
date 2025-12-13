import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Box, Container, Alert } from '@mui/material';
import styles from './create-post.module.css';
import { Button } from '../button';
import ImageUpload from '../image-upload';
import AiButton from '../ai-button/ai-button';
import { useAuth } from '../../api/auth/useAuth';
import { usePublication } from '../../api/publication/usePublication';

type TabType = 'article' | 'post' | 'quote';

const CreatePost: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>('article');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null as File | null,
    source: '',
  });
  const [formError, setFormError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { user } = useAuth();
  const { createPublication, error, loading } = usePublication();

  const roleClass =
    user?.role === 'creator'
      ? styles.creator
      : user?.role === 'expert'
        ? styles.expert
        : styles.user;

  const handleTabChange = (tab: TabType) => {
    if (loading) return;
    setSelectedTab(tab);
    setFormError(null);
    setFormData({
      title: '',
      content: '',
      image: null,
      source: '',
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const validateForm = (): string | null => {
    if (selectedTab === 'article') {
      if (!formData.title || !formData.content) {
        return 'Title and article content are required.';
      }
    }

    if (selectedTab === 'post') {
      if (!formData.content && !formData.image) {
        return 'Post must contain a description or an image.';
      }
    }

    if (selectedTab === 'quote') {
      if (!formData.content || !formData.source) {
        return 'Quote and source are required.';
      }
    }

    return null;
  };

  const handleSubmit = async () => {
    setFormError(null);

    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    try {
      await createPublication({
        type: selectedTab,
        ...formData,
      });

      navigate('/profile');
    } catch {
      console.log('Error submitting data');
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: 800,
        margin: '0 auto',
        padding: 2,
      }}
    >
      <div className={styles.tabs}>
        {(['article', 'post', 'quote'] as TabType[]).map((tab) => (
          <button
            key={tab}
            disabled={loading}
            className={`${styles.tab} ${
              selectedTab === tab ? styles.active : ''
            } ${roleClass}`}
            onClick={() => handleTabChange(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {selectedTab === 'article' && (
        <Container sx={{ mt: 2, p: 0 }}>
          <TextField
            className={styles.textField}
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            margin="normal"
            disabled={loading}
          />

          <Box sx={{ position: 'relative' }}>
            <TextField
              className={styles.textField}
              fullWidth
              label="Article content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              margin="normal"
              multiline
              rows={4}
              disabled={loading}
            />
            <Box sx={{ position: 'absolute', bottom: 16, right: 16 }}>
              <AiButton />
            </Box>
          </Box>

          <Button
            label={loading ? 'Creating...' : 'Create'}
            disabled={loading}
            onClick={handleSubmit}
          />
        </Container>
      )}

      {selectedTab === 'post' && (
        <Container sx={{ mt: 2, p: 0 }}>
          <ImageUpload onChange={handleFileChange} disabled={loading} />

          <TextField
            className={styles.textField}
            fullWidth
            label="Description"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            margin="normal"
            disabled={loading}
          />

          <Button
            label={loading ? 'Creating...' : 'Create'}
            disabled={loading}
            onClick={handleSubmit}
          />
        </Container>
      )}

      {selectedTab === 'quote' && (
        <Container sx={{ mt: 2, p: 0 }}>
          <TextField
            className={styles.textField}
            fullWidth
            label="Quote"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            margin="normal"
            disabled={loading}
          />

          <TextField
            className={styles.textField}
            fullWidth
            label="Source"
            name="source"
            value={formData.source}
            onChange={handleInputChange}
            margin="normal"
            disabled={loading}
          />

          <Button
            label={loading ? 'Creating...' : 'Create'}
            disabled={loading}
            onClick={handleSubmit}
          />
        </Container>
      )}

      <Container sx={{ mt: 2 }}>
        {(formError || error) && (
          <Alert color="error" severity="error">
            {formError || error}
          </Alert>
        )}
      </Container>
    </Container>
  );
};

export default CreatePost;
