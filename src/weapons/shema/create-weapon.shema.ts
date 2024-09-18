export const createWeaponSchema = {
  type: 'object',
  properties: {
    file: {
      type: 'string',
      format: 'binary',
    },
    name_rus: { type: 'string' },
    name_eng: { type: 'string' },
    type: { type: 'number' },
    damage_dice: { type: 'string' },
    damage_type: { type: 'string' },
    price: { type: 'string' },
    source: { type: 'string' },
    weight: { type: 'number' },
    description: { type: 'string' },
    properties: {
      type: 'array',
      items: { type: 'object' },
    },
    special: { type: 'string' },
    homebrew: { type: 'boolean' },
    world_id: { type: 'number' },
  },
};
