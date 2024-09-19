export const createArmorShema = {
  type: 'object',
  properties: {
    file: {
      type: 'string',
      format: 'binary',
    },
    name_rus: { type: 'string' },
    name_eng: { type: 'string' },
    type: { type: 'number' },
    base_ac: { type: 'number' },
    ac: { type: 'string' },
    price: { type: 'string' },
    source: { type: 'string' },
    weight: { type: 'number' },
    description: { type: 'string' },
    duration: { type: 'string' },
    disadvantage: { type: 'boolean' },
    requirement: { type: 'number' },
    homebrew: { type: 'boolean' },
  },
};
