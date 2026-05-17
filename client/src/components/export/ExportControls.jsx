import { Download } from 'lucide-react';
import { Button } from '../common/Button.jsx';
import { exportApi } from '../../api/exportApi.js';

export const ExportControls = ({ projectId }) => {
  const download = (type) => exportApi.download(type, projectId);

  return (
    <>
      <Button variant="secondary" onClick={() => download('markdown')}>
        <Download size={16} />
        Markdown
      </Button>
      <Button variant="secondary" onClick={() => download('pdf')}>
        <Download size={16} />
        PDF
      </Button>
      <Button variant="secondary" onClick={() => download('json')}>
        <Download size={16} />
        JSON
      </Button>
    </>
  );
};

