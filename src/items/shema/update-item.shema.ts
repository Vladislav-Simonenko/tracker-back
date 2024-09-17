export const updateItemShema = {
  type: 'object',
  properties: {
    file: {
      type: 'string',
      format: 'binary',
    },
    name_rus: { type: 'string' },
    name_eng: { type: 'string' },
    homebrew: { type: 'boolean' },
    price: { type: 'string' },
    source: { type: 'string' },
    weight: { type: 'string' },
    description: { type: 'string' },
    categories: {
      type: 'array',
      items: { type: 'string' },
    },
    world_id: { type: 'number' },
  },
};
