import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';
import * as exportService from '../services/export.service.js';

export const exportMarkdown = asyncHandler(async (req, res) => {
  const markdown = await exportService.buildMarkdownExport({
    userId: req.user._id,
    projectId: req.params.projectId
  });

  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="project-${req.params.projectId}-tests.md"`);
  res.send(markdown);
});

export const exportJson = asyncHandler(async (req, res) => {
  const data = await exportService.buildJsonExport({
    userId: req.user._id,
    projectId: req.params.projectId
  });

  sendSuccess(res, data, 'JSON export created');
});

export const exportPdf = asyncHandler(async (req, res) => {
  await exportService.streamPdfExport({
    userId: req.user._id,
    projectId: req.params.projectId,
    res
  });
});

