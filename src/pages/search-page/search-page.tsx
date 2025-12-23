import React, { useState } from 'react';
import styles from './search-page.module.css';
import { PageWrapper } from '../page-wrapper/page-wrapper';
import { useSearch } from '../../api/search/useSearch';
import { useFeed } from '../../api/feed/useFeed';
import { SearchFeed } from './search-feed';
import { Alert, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import type { Publication } from '../../api/publication/types';

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Publication[]>([]);
  const [searched, setSearched] = useState(false);
  const { searchPublications, loading, error } = useSearch();
  const { getFeed } = useFeed();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      const feed = await getFeed(20, 0);
      setResults(feed.items || []);
    } else {
      const res = await searchPublications(query);
      setSearched(true);
      setResults(res || []);
    }
  };

  return (
    <PageWrapper>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            placeholder="Search..."
            value={query}
            onChange={handleInputChange}
          />
          <IconButton className={styles.button} type="submit">
            <Search onClick={handleSubmit} className={styles.searchIcon} />
          </IconButton>
        </form>
      </div>
      {error && (
        <Alert color="error" severity="error" className={styles.alert}>
          Error searching. Try again later.
        </Alert>
      )}
      {searched && !loading && (
        <div style={{ marginTop: 32 }}>
          <SearchFeed publications={results} />
        </div>
      )}
    </PageWrapper>
  );
};

export default SearchPage;
