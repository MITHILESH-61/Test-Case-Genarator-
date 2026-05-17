import { RefreshCw, Star } from 'lucide-react';
import { Badge } from '../common/Badge.jsx';
import { Button } from '../common/Button.jsx';
import { Card } from '../common/Card.jsx';
import { EmptyState } from '../common/EmptyState.jsx';
import { formatDate, truncate } from '../../utils/formatters.js';

export const GenerationHistory = ({ generations, activeId, onSelect, onRegenerate, onFeedback, loading }) => (
  <Card>
    <h2 className="text-lg font-bold">Generation History</h2>
    <div className="mt-4 space-y-3">
      {generations.length ? (
        generations.map((generation) => (
          <article
            key={generation._id}
            className={`rounded-lg border p-3 transition ${
              activeId === generation._id
                ? 'border-brand bg-blue-50 dark:bg-blue-950/30'
                : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            <button className="block w-full text-left" onClick={() => onSelect(generation)}>
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold">{truncate(generation.goal, 80)}</h3>
                <Badge tone={generation.feedback?.status === 'approved' ? 'green' : generation.feedback?.status === 'rejected' ? 'red' : 'slate'}>
                  {generation.feedback?.status || 'pending'}
                </Badge>
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{formatDate(generation.createdAt)}</p>
            </button>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button variant="secondary" onClick={() => onRegenerate(generation._id)} disabled={loading}>
                <RefreshCw size={15} />
                Regenerate
              </Button>
              <Button
                variant="ghost"
                onClick={() => onFeedback(generation._id, { status: 'approved', rating: 5 })}
                disabled={loading}
              >
                <Star size={15} />
                Approve
              </Button>
              <Button variant="ghost" onClick={() => onFeedback(generation._id, { status: 'rejected', rating: 1 })} disabled={loading}>
                Reject
              </Button>
            </div>
          </article>
        ))
      ) : (
        <EmptyState title="No generations yet" description="Generate a first suite to start building project memory." />
      )}
    </div>
  </Card>
);

