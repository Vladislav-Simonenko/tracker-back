export const UpdateClassSchema = {
  type: 'object',
  properties: {
    file: {
      type: 'string',
      format: 'binary',
    },
    name: { type: 'string' },
    main_ability: { type: 'string' },
    hit_dice: { type: 'number' },
    description: { type: 'string' },
    subclass_level: { type: 'number' },
    spell_ability: { type: 'string' },
    metamagic: { type: 'boolean' },
  },
};
