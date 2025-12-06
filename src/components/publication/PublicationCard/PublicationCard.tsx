import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { useNavigate } from 'react-router-dom';

import type { Publication } from '../../../api/publication/types';

import { Avatar } from '../../avatar/Avatar';
import { UserBadge } from '../../user-badge';
import { PublicationActions } from '../PublicationActions';
import styles from './publicationCard.module.css';
import { Typography } from '@mui/material';

interface PublicationCardProps {
  publication: Publication;
  isFeed: boolean;
  isClickable?: boolean;
  onUpdate?: (updatedItem: Publication) => void;
  onCommentClick?: (publicationId: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

export const PublicationCard = ({
  publication,
}: PublicationCardProps) => {
  const navigate = useNavigate();

  const isQuote = publication.type === 'quote';
  const isPost = publication.type === 'post';
  const isArticle = publication.type === 'article';

  const roleClass =
    publication.author?.role === 'Creator'
      ? styles.creator
      : publication.author?.role === 'Expert'
      ? styles.expert
      : styles.user;

  const handleClickNaviagate = (e: React.MouseEvent) => {
    navigate(`/publication/${publication.id}`);
  };

  return (
    <article className={styles.publicationCard} onClick={handleClickNaviagate}>
      <div className={styles.publicationHeader}>
        <div className={styles.publicationHeaderLeft}>
          {publication.author && (
            <div className={styles.authorInfo}>
              <Avatar
                src={publication.author.iconUrl}
                alt={publication.author.username}
                initials={publication.author.username?.[0].toUpperCase()}
                size="small"
                clickable={true}
                onClick={() => navigate(`/profile/${publication.author.id}`)}
              />
              <Typography className={styles.authorName} variant='body2'>{publication.author.username}</Typography>
            </div>
          )}
        </div>

        <div className={styles.publicationHeaderRight}>
          {publication.author && <UserBadge role={publication.author.role} />}
        </div>
      </div>

      {isQuote && (
        <>
          <div className={`${styles.quoteContainer} ${roleClass}`}>
            <FormatQuoteIcon className={styles.quoteIcon} />
            <div className={styles.quoteContent}>{publication.content}</div>
          </div>
        </>
      )}

      {isPost && publication.media && (
        <div className={styles.postImageContainer}>
          <img
            src={publication.media.url}
            alt="Post"
            className={styles.postImage}
          />
        </div>
      )}

      {isArticle && (
        <>
          {publication.title && (
            <Typography variant='h4' className={styles.articleTitle}>{publication.title}</Typography>
          )}
          {publication.content && (
            <div className={`${styles.articleContainer} ${roleClass}`}>
              <div className={styles.articleContent}>
                <Typography variant='body1' className={styles.publicationContent}>{publication.content}</Typography>
              </div>
            </div>
          )}
        </>
      )}

      <PublicationActions
        publicationId={publication.id}
        isLiked={publication.isLiked}
        isSaved={publication.isSaved}
        likesCount={publication.likesCount}
        commentsCount={publication.commentsCount}
        savedCount={publication.savedCount}
        showComments={isPost || isArticle}
        onCommentClick={() => navigate(`/publication/${publication.id}`)}
      />
    </article>
  );
};
