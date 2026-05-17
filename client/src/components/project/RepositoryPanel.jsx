import { useState } from 'react';
import { Github, Upload } from 'lucide-react';
import { Button } from '../common/Button.jsx';
import { Card } from '../common/Card.jsx';
import { Input } from '../common/Input.jsx';

export const RepositoryPanel = ({ projectId, onUpload, onImport, loading }) => {
  const [file, setFile] = useState(null);
  const [repositoryUrl, setRepositoryUrl] = useState('');

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) return;
    await onUpload({ projectId, file });
    setFile(null);
    event.currentTarget.reset();
  };

  const handleImport = async (event) => {
    event.preventDefault();
    if (!repositoryUrl.trim()) return;
    await onImport({ projectId, repositoryUrl });
  };

  return (
    <Card>
      <h2 className="text-lg font-bold">Repository Context</h2>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <form onSubmit={handleUpload} className="space-y-3">
          <Input
            label="Upload ZIP"
            type="file"
            accept=".zip"
            onChange={(event) => setFile(event.target.files?.[0] || null)}
          />
          <Button type="submit" disabled={!file || loading}>
            <Upload size={16} />
            Analyze ZIP
          </Button>
        </form>
        <form onSubmit={handleImport} className="space-y-3">
          <Input
            label="GitHub Repository URL"
            value={repositoryUrl}
            onChange={(event) => setRepositoryUrl(event.target.value)}
            placeholder="https://github.com/owner/repo"
          />
          <Button type="submit" variant="secondary" disabled={!repositoryUrl.trim() || loading}>
            <Github size={16} />
            Import GitHub
          </Button>
        </form>
      </div>
    </Card>
  );
};

