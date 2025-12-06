import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { BrowserRouter } from 'react-router-dom';
import { PublicationCard } from './PublicationCard';
import type { Publication } from '../../../api/publication/types';

const meta = {
  title: 'Components/PublicationCard',
  component: PublicationCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  args: {
    onUpdate: fn(),
    onCommentClick: fn(),
    onEdit: fn(),
    onDelete: fn(),
  },
} satisfies Meta<typeof PublicationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockPublication: Publication = {
  id: '1',
  authorId: 'author-1',
  type: 'quote',
  title: 'Sample Publication Title',
  content: 'This is a sample publication content. It can contain multiple paragraphs and various types of content.',
  source: 'https://example.com',
  publicationDate: new Date().toISOString(),
  likesCount: 42,
  commentsCount: 15,
  savedCount: 8,
  isLiked: false,
  isSaved: false,
  media: { url: 'src/assets/test.jpg' },
  author: {
    id: 'author-1',
    username: 'janedoe',
    iconUrl: 'https://via.placeholder.com/50',
    role: 'Creator',
  }
};

export const Default: Story = {
  args: {
    publication: mockPublication,
    isFeed: true,
  },
};

export const PostType: Story = {
  args: {
    publication: {
      ...mockPublication,
      type: 'post',
      isLiked: true,
      likesCount: 43,
    },
    isFeed: true,
  },
};

export const ArticleType: Story = {
  args: {
    publication: {
      ...mockPublication,
      type: 'article',
      isLiked: true,
      likesCount: 43,
    },
    isFeed: true,
  },
};

export const ExpertRole: Story = {
  args: {
    publication: {
      ...mockPublication,
      type: 'article',
      isLiked: true,
      likesCount: 43,
      author: {
        ...mockPublication.author,
        role: 'Expert',
      }
    },
    isFeed: true,
  },
};

export const UserRole: Story = {
  args: {
    publication: {
      ...mockPublication,
      type: 'article',
      isLiked: true,
      likesCount: 43,
      author: {
        ...mockPublication.author,
        role: 'User',
      }
    },
    isFeed: true,
  },
};

export const LongArticle: Story = {
  args: {
    publication: {
      ...mockPublication,
      type: 'article',
      isLiked: true,
      likesCount: 43,
      content: 'This is a very long article content that spans multiple lines and demonstrates how the component handles lengthy text. It should wrap properly and maintain good readability. The content can include various formatting and should be displayed in a user-friendly manner.',
    },
    isFeed: true,
  },
};

export const WithLiked: Story = {
  args: {
    publication: {
      ...mockPublication,
      isLiked: true,
      likesCount: 43,
    },
    isFeed: true,
  },
};

export const WithSaved: Story = {
  args: {
    publication: {
      ...mockPublication,
      isSaved: true,
      savedCount: 9,
    },
    isFeed: true,
  },
};

export const WithActions: Story = {
  args: {
    publication: mockPublication,
    showActions: true,
    isFeed: true,
  },
};

export const LongContent: Story = {
  args: {
    publication: {
      ...mockPublication,
      content: 'This is a very long publication content that spans multiple lines and demonstrates how the component handles lengthy text. It should wrap properly and maintain good readability. The content can include various formatting and should be displayed in a user-friendly manner.',
    },
    isFeed: true,
  },
};


