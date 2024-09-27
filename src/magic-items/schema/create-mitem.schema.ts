export const createMitemSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    file: {
      type: 'string',
      format: 'binary',
    },
    name_rus: { type: 'string' },
    cost_xge: { type: 'string' },
    name_eng: { type: 'string' },
    customization: { type: 'boolean' },
    homebrew: { type: 'boolean' },
    world_id: { type: 'number' },
    cost_dmg: { type: 'string' },
    source: { type: 'string' },
    description: { type: 'string' },
    type: { type: 'string' },
    rarity: { type: 'string' },
    ext_icon: { type: 'string' },
    spell_id: { type: 'string' },
    detailType: {
      type: 'array',
      items: { type: 'string' },
    },
    detailCustomization: {
      type: 'array',
      items: { type: 'string' },
    },
    allowed_weapon_ids: {
      type: 'array',
      items: { type: 'string' },
    },
    allowed_weapon_types: {
      type: 'array',
      items: { type: 'number' },
    },
  },
};
