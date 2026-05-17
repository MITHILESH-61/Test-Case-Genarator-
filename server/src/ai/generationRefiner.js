export const buildRegenerationGoal = (generation, overrideInstructions) => {
  return [
    generation.goal,
    'Regenerate this test suite with stronger assertions, clearer mock data, and more explicit edge cases.',
    overrideInstructions || generation.instructions || ''
  ]
    .filter(Boolean)
    .join('\n');
};

