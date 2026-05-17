import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';
import { Badge } from '../components/common/Badge.jsx';
import { Card } from '../components/common/Card.jsx';
import { ChatPanel } from '../components/chat/ChatPanel.jsx';
import { ExportControls } from '../components/export/ExportControls.jsx';
import { GeneratedEditor } from '../components/generation/GeneratedEditor.jsx';
import { GenerationForm } from '../components/generation/GenerationForm.jsx';
import { GenerationHistory } from '../components/generation/GenerationHistory.jsx';
import { RepositoryPanel } from '../components/project/RepositoryPanel.jsx';
import { WorkspaceLayout } from '../layouts/WorkspaceLayout.jsx';
import { useChatStore } from '../store/chatStore.js';
import { useGenerationStore } from '../store/generationStore.js';
import { useProjectStore } from '../store/projectStore.js';

export const ProjectWorkspacePage = () => {
  const { id } = useParams();
  const currentProject = useProjectStore((state) => state.currentProject);
  const generations = useProjectStore((state) => state.generations);
  const projectLoading = useProjectStore((state) => state.loading);
  const projectError = useProjectStore((state) => state.error);
  const fetchProject = useProjectStore((state) => state.fetchProject);
  const uploadRepository = useProjectStore((state) => state.uploadRepository);
  const importGitHub = useProjectStore((state) => state.importGitHub);
  const prependGeneration = useProjectStore((state) => state.prependGeneration);
  const updateProjectGeneration = useProjectStore((state) => state.updateGeneration);
  const activeGeneration = useGenerationStore((state) => state.activeGeneration);
  const generationLoading = useGenerationStore((state) => state.loading);
  const generationError = useGenerationStore((state) => state.error);
  const generate = useGenerationStore((state) => state.generate);
  const regenerate = useGenerationStore((state) => state.regenerate);
  const saveFeedback = useGenerationStore((state) => state.saveFeedback);
  const updateContent = useGenerationStore((state) => state.updateContent);
  const setActiveGeneration = useGenerationStore((state) => state.setActiveGeneration);
  const chats = useChatStore((state) => state.chats);
  const chatLoading = useChatStore((state) => state.loading);
  const chatError = useChatStore((state) => state.error);
  const fetchChats = useChatStore((state) => state.fetchChats);
  const sendMessage = useChatStore((state) => state.sendMessage);

  useEffect(() => {
    fetchProject(id).then(({ generations: loadedGenerations }) => {
      if (loadedGenerations?.[0]) {
        setActiveGeneration(loadedGenerations[0]);
      }
    });
    fetchChats(id);
  }, [id, fetchProject, fetchChats, setActiveGeneration]);

  const handleGenerate = async (payload) => {
    const generation = await generate(payload);
    prependGeneration(generation);
    setActiveGeneration(generation);
  };

  const handleRegenerate = async (generationId) => {
    const generation = await regenerate({ generationId });
    prependGeneration(generation);
    setActiveGeneration(generation);
  };

  const handleFeedback = async (generationId, feedback) => {
    const generation = await saveFeedback(generationId, feedback);
    updateProjectGeneration(generation);
    setActiveGeneration(generation);
  };

  const handleSave = async (generationId, payload) => {
    const generation = await updateContent(generationId, payload);
    updateProjectGeneration(generation);
    setActiveGeneration(generation);
  };

  const handleRepositoryChange = async (action) => {
    await action();
    await fetchProject(id);
  };

  return (
    <WorkspaceLayout
      title={currentProject?.projectName || 'Project Workspace'}
      actions={
        <>
          <Link to={`/projects/${id}/analysis`}>
            <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800">
              <BarChart3 size={16} />
              Analysis
            </button>
          </Link>
          <ExportControls projectId={id} />
        </>
      }
    >
      {(projectError || generationError || chatError) && (
        <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-200">
          {projectError || generationError || chatError}
        </p>
      )}
      <div className="mb-5 grid gap-4 lg:grid-cols-4">
        <Card className="lg:col-span-2">
          <p className="label">Repository Summary</p>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
            {currentProject?.repositorySummary || 'No repository context analyzed yet.'}
          </p>
        </Card>
        <Card>
          <p className="label">Technologies</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {(currentProject?.detectedTechnologies || []).slice(0, 5).map((item) => (
              <Badge key={item} tone="blue">
                {item}
              </Badge>
            ))}
          </div>
        </Card>
        <Card>
          <p className="label">Routes</p>
          <p className="mt-2 text-3xl font-black">{currentProject?.detectedRoutes?.length || 0}</p>
        </Card>
      </div>
      <div className="grid gap-5 xl:grid-cols-[420px_1fr]">
        <div className="space-y-5">
          <RepositoryPanel
            projectId={id}
            loading={projectLoading}
            onUpload={(payload) => handleRepositoryChange(() => uploadRepository(payload))}
            onImport={(payload) => handleRepositoryChange(() => importGitHub(payload))}
          />
          <GenerationForm projectId={id} onGenerate={handleGenerate} loading={generationLoading} />
          <GenerationHistory
            generations={generations}
            activeId={activeGeneration?._id}
            onSelect={setActiveGeneration}
            onRegenerate={handleRegenerate}
            onFeedback={handleFeedback}
            loading={generationLoading}
          />
        </div>
        <div className="space-y-5">
          <GeneratedEditor generation={activeGeneration} onSave={handleSave} loading={generationLoading} />
          <ChatPanel chats={chats} projectId={id} onSend={sendMessage} loading={chatLoading} />
        </div>
      </div>
    </WorkspaceLayout>
  );
};

