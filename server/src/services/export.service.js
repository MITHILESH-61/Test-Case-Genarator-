import PDFDocument from 'pdfkit';
import { Generation } from '../models/Generation.js';
import { getOwnedProject } from './project.service.js';

const buildExportData = async ({ userId, projectId }) => {
  const project = await getOwnedProject(userId, projectId);
  const generations = await Generation.find({ userId, projectId }).sort({ createdAt: -1 });

  return { project, generations };
};

export const buildJsonExport = async (payload) => {
  const { project, generations } = await buildExportData(payload);

  return {
    project,
    generations,
    exportedAt: new Date().toISOString()
  };
};

export const buildMarkdownExport = async (payload) => {
  const { project, generations } = await buildExportData(payload);

  return `# ${project.projectName}

## Repository Summary
${project.repositorySummary || 'No repository summary available.'}

## Detected Technologies
${(project.detectedTechnologies || []).map((item) => `- ${item}`).join('\n') || '- None detected'}

## Architecture Summary
${project.architectureSummary || 'No architecture summary available.'}

## Generated Test Cases
${generations
  .map(
    (generation, index) => `### ${index + 1}. ${generation.generationType}

- Goal: ${generation.goal}
- Quality score: ${generation.qualityScore}
- Feedback: ${generation.feedback?.status || 'pending'}

${generation.generatedContent}`
  )
  .join('\n\n---\n\n') || 'No generations available.'}
`;
};

export const streamPdfExport = async ({ userId, projectId, res }) => {
  const markdown = await buildMarkdownExport({ userId, projectId });
  const doc = new PDFDocument({ margin: 48 });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="project-${projectId}-tests.pdf"`);

  doc.pipe(res);
  doc.fontSize(16).text('AI Test Case Export', { underline: true });
  doc.moveDown();
  doc.fontSize(10).text(markdown, {
    lineGap: 4
  });
  doc.end();
};

