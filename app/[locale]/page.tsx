import {useTranslations} from 'next-intl';
import {useState} from 'react';

export default function Home() {
  const t = useTranslations('Home');
  const [prompt, setPrompt] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    setCode('');
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({prompt})
    });
    const data = await res.json();
    setCode(data.code || 'Error generating code');
    setLoading(false);
  }

  return (
    <main style={{padding: 20, maxWidth: 800, margin: '0 auto', fontFamily: 'sans-serif'}}>
      <h1>{t('title')}</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe the code you want..."
        style={{width: '100%', height: 120, padding: 10, marginTop: 20}}
      />
      <button onClick={generate} disabled={loading || !prompt} style={{marginTop: 10, padding: '10px 20px'}}>
        {loading ? 'Generating...' : 'Generate'}
      </button>
      {code && <pre style={{background: '#1e1e1e', color: '#d4d4d4', padding: 15, marginTop: 20}}><code>{code}</code></pre>}
    </main>
  );
}
