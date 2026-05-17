import { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { Button } from '../common/Button.jsx';
import { Card } from '../common/Card.jsx';
import { Input } from '../common/Input.jsx';
import { Textarea } from '../common/Textarea.jsx';

export const GenerationForm = ({ projectId, onGenerate, loading }) => {
  const [form, setForm] = useState({
    goal: '',
    generationType: 'test-suite',
    inputSnippet: '',
    instructions: ''
  });

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onGenerate({ ...form, projectId });
  };

  return (
    <Card>
      <h2 className="text-lg font-bold">Generate Tests</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <Input
          label="Testing Goal"
          value={form.goal}
          onChange={updateField('goal')}
          placeholder="Generate API tests for auth and validation paths"
          required
        />
        <Input
          label="Generation Type"
          value={form.generationType}
          onChange={updateField('generationType')}
          placeholder="unit, integration, api, edge-case"
        />
        <Textarea
          label="Code Snippet"
          value={form.inputSnippet}
          onChange={updateField('inputSnippet')}
          placeholder="Paste a function, route, component, or model here"
        />
        <Textarea
          label="Additional Instructions"
          value={form.instructions}
          onChange={updateField('instructions')}
          placeholder="Use Jest and Supertest. Mock MongoDB. Include negative cases."
        />
        <Button type="submit" disabled={!form.goal.trim() || loading}>
          <Wand2 size={16} />
          Generate
        </Button>
      </form>
    </Card>
  );
};

