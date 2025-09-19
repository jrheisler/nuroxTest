import { useEffect, useState } from 'react';
import { apiGet } from './api';

function App() {
  const [message, setMessage] = useState<string>('Loading…');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    apiGet('/hello')
      .then((data) => {
        if (cancelled) return;
        setMessage(typeof data === 'string' ? data : JSON.stringify(data));
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : String(err));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  return <div>{message}</div>;
}

export default App;
