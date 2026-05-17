import { useEffect, useState } from 'react';
import { Copy, Save } from 'lucide-react';
import { Button } from '../common/Button.jsx';
import { Card } from '../common/Card.jsx';
import { Textarea } from '../common/Textarea.jsx';

export const GeneratedEditor = ({ generation, onSave, loading }) => {
  const [content, setContent] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setContent(generation?.generatedContent || '');
  }, [generation]);

  const copy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  if (!generation) {
    return (
      <Card>
        <h2 className="text-lg font-bold">Generated Output</h2>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          Generated tests will appear here and can be edited before export.
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold">Generated Output</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">Quality score: {generation.qualityScore}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={copy}>
            <Copy size={16} />
            {copied ? 'Copied' : 'Copy'}
          </Button>
          <Button onClick={() => onSave(generation._id, { generatedContent: content })} disabled={loading}>
            <Save size={16} />
            Save
          </Button>
        </div>
      </div>
      <Textarea
        className="mt-4 min-h-[520px] font-mono text-sm"
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
    </Card>
  );
};

