import { useEffect, useState } from 'react';
import { ACCESS_SIGN_IN_INSTRUCTIONS, apiGet } from './api';

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
        const message = err instanceof Error ? err.message : String(err);
        if (
          err instanceof TypeError ||
          (err instanceof Error && /Failed to fetch/i.test(err.message))
        ) {
          setError(ACCESS_SIGN_IN_INSTRUCTIONS);
          return;
        }
        setError(message);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  return <div>{message}</div>;
}

export default App;
