import { createGroqChatCompletion } from './groqClient.js';
import { buildTestGenerationMessages } from './promptBuilder.js';

const fallbackGeneration = ({ project, goal, inputSnippet, instructions, memories }) => {
  const technologies = project?.detectedTechnologies?.join(', ') || 'JavaScript';
  const hasApi = project?.detectedRoutes?.length;

  return `# Generated Test Plan

## Goal
${goal}

## Context Used
- Project: ${project?.projectName || 'Untitled project'}
- Technologies: ${technologies}
- Similar historical generations: ${memories.length}
- Extra instructions: ${instructions || 'None'}

## Unit Test Cases
1. Validate the happy path for the target function/component.
2. Verify invalid input handling and clear error responses.
3. Check boundary values, missing optional fields, and empty payloads.
4. Confirm dependencies are mocked and assertions verify observable behavior.

## Integration/API Test Cases
${hasApi ? project.detectedRoutes.slice(0, 8).map((route) => `- ${route}: assert status code, response schema, auth behavior, and failure modes.`).join('\n') : '- No API routes were detected yet. Add repository analysis or provide route snippets for stronger API tests.'}

## Edge And Negative Cases
- Null, undefined, and malformed input.
- Duplicate requests or repeated submissions.
- Unauthorized access and expired JWT tokens.
- Database unavailable or downstream AI/API failures.

## Mock Data
\`\`\`js
export const validPayload = {
  name: "Example",
  email: "tester@example.com"
};

export const invalidPayload = {
  email: "not-an-email"
};
\`\`\`

## Example Test Skeleton
\`\`\`js
describe("generated behavior", () => {
  it("handles the happy path", async () => {
    // Arrange
    const input = validPayload;

    // Act
    const result = await subjectUnderTest(input);

    // Assert
    expect(result).toBeDefined();
  });

  it("rejects invalid input", async () => {
    await expect(subjectUnderTest(invalidPayload)).rejects.toThrow();
  });
});
\`\`\`

## Expected Outputs
- Successful cases return the documented response or rendered state.
- Invalid cases return validation errors without leaking internal details.
- Auth failures return 401/403 responses.

## Coverage Gaps To Review
- Branch coverage for validation and error paths.
- Repository-specific services that were not visible in the supplied context.
- Persistence side effects and cleanup behavior.

${inputSnippet ? `## Supplied Snippet\n\`\`\`\n${inputSnippet.slice(0, 2000)}\n\`\`\`` : ''}`;
};

export const generateTestContent = async (payload) => {
  const messages = buildTestGenerationMessages(payload);
  const aiContent = await createGroqChatCompletion(messages);

  return aiContent || fallbackGeneration(payload);
};

