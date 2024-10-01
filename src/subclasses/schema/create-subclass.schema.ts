export const createSubclassSchema = {
  type: 'object',
  properties: {
    file: {
      type: 'string',
      format: 'binary',
    },
    name: { type: 'string' },
    class_id: { type: 'number' },
    source: { type: 'string' },
    spell_ability: { type: 'string' },
    description: { type: 'string' },
  },
};
