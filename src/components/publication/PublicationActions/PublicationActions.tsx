import { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import styles from './publicationActions.module.css';
import { usePublication } from '../../../api/publication/usePublication';

interface PublicationActionsProps {
  publicationId: string;
  isLiked: boolean;
  isSaved: boolean;
  likesCount: number;
  commentsCount: number;
  savedCount: number;
  showComments?: boolean;
  onCommentClick: () => void;
}

export const PublicationActions = ({
  publicationId,
  isLiked: initialIsLiked,
  isSaved: initialIsSaved,
  likesCount: initialLikesCount,
  commentsCount,
  savedCount: initialSavedCount,
  showComments = true,
  onCommentClick,
}: PublicationActionsProps) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [savedCount, setSavedCount] = useState(initialSavedCount);

  const { likePublication, savePublication } = usePublication();

  useEffect(() => {
    setIsSaved(initialIsSaved);
    setSavedCount(initialSavedCount);
  }, [initialIsSaved, initialSavedCount]);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const newIsLiked = !isLiked;
    const newLikesCount = Math.max(0, newIsLiked ? likesCount + 1 : likesCount - 1);

    likePublication(publicationId);

    setIsLiked(newIsLiked);
    setLikesCount(newLikesCount);
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const newIsSaved = !isSaved;
    const newSavedCount = Math.max(0, newIsSaved ? savedCount + 1 : savedCount - 1);

    savePublication(publicationId);

    setIsSaved(newIsSaved);
    setSavedCount(newSavedCount);
  };

  return (
    <div className={styles.publicationActions}>
      <IconButton
        onClick={handleLike}
        className={`${styles.actionButton} ${isLiked ? styles.liked : ''}`}
        aria-label="Like"
      >
        {isLiked ? (
          <FavoriteIcon className={styles.icon} />
        ) : (
          <FavoriteBorderIcon className={styles.icon} />
        )}
        <span className={styles.actionCount}>{likesCount}</span>
      </IconButton>

      {showComments && (
        <IconButton
          onClick={onCommentClick}
          className={styles.actionButton}
          aria-label="Comment"
        >
          <CommentIcon className={styles.icon} />
          <span className={styles.actionCount}>{commentsCount}</span>
        </IconButton>
      )}

      <IconButton
        onClick={handleSave}
        className={`${styles.actionButton} ${isSaved ? styles.saved : ''}`}
        aria-label="Save"
      >
        {isSaved ? (
          <BookmarkIcon className={styles.icon} />
        ) : (
          <BookmarkBorderIcon className={styles.icon} />
        )}
        <span className={styles.actionCount}>{savedCount}</span>
      </IconButton>
    </div>
  );
};

