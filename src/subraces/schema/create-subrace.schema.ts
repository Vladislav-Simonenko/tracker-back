export const createSubraceSchema = {
  type: 'object',
  properties: {
    file: {
      type: 'string',
      format: 'binary',
    },
    race_id: { type: 'number' },
    description: { type: 'string' },
    name: { type: 'string' },
    speed: { type: 'number' },
    features_done: { type: 'boolean' },
  },
};
