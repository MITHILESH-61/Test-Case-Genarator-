import { Link } from 'react-router-dom';
import { ArrowRight, BrainCircuit, FolderSearch, MessageSquareText, ShieldCheck } from 'lucide-react';
import { Button } from '../components/common/Button.jsx';
import { Card } from '../components/common/Card.jsx';
import { useAuthStore } from '../store/authStore.js';

const features = [
  { icon: FolderSearch, title: 'Repository-aware analysis', text: 'Detect routes, models, services, frameworks, and folder shape.' },
  { icon: BrainCircuit, title: 'Memory-driven generation', text: 'Reuse prior generations and feedback through stored embeddings.' },
  { icon: MessageSquareText, title: 'QA chat assistant', text: 'Explain tests, improve assertions, and find missing coverage.' },
  { icon: ShieldCheck, title: 'Secure workflow', text: 'JWT auth, upload validation, sanitized repository handling, and env-based secrets.' }
];

export const LandingPage = () => {
  const token = useAuthStore((state) => state.token);

  return (
    <main className="page-shell">
      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto grid min-h-[82vh] max-w-7xl content-center gap-10 px-4 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-brand">AI developer tooling</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-slate-950 dark:text-white sm:text-6xl">
              Test Case Generator
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Generate unit, integration, API, edge-case, validation, and negative tests from prompts, snippets,
              uploaded repositories, GitHub projects, and historical QA memory.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={token ? '/dashboard' : '/signup'}>
                <Button>
                  Open App <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary">Login</Button>
              </Link>
            </div>
          </div>
          <div className="surface rounded-lg p-5">
            <div className="rounded-lg bg-slate-950 p-4 font-mono text-sm text-slate-100">
              <p className="text-emerald-300">POST /api/generate/tests</p>
              <p className="mt-4 text-slate-300">goal: "Cover auth validation and JWT failures"</p>
              <p className="mt-4 text-blue-300">output:</p>
              <pre className="mt-2 text-slate-100">
{`describe("auth routes", () => {
  it("creates users with hashed passwords");
  it("rejects duplicate emails");
  it("blocks invalid tokens");
});`}
              </pre>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-8 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => (
          <Card key={feature.title}>
            <feature.icon className="text-brand" size={24} />
            <h2 className="mt-4 font-bold">{feature.title}</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{feature.text}</p>
          </Card>
        ))}
      </section>
    </main>
  );
};
