export const updateSpellSchema = {
  type: 'object',
  properties: {
    file: {
      type: 'string',
      format: 'binary',
    },
    id: { type: 'string' },
    name_rus: { type: 'string' },
    name_eng: { type: 'string' },
    level: { type: 'number' },
    school: { type: 'string' },
    component_m: { type: 'string' },
    source: { type: 'string' },
    range: { type: 'string' },
    duration: { type: 'string' },
    time: { type: 'string' },
    description: { type: 'string' },
    upper: { type: 'string' },
    ritual: { type: 'boolean' },
    component_s: { type: 'boolean' },
    component_v: { type: 'boolean' },
  },
};
