/*
  Warnings:

  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `World` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Item";

-- DropTable
DROP TABLE "World";

-- CreateTable
CREATE TABLE "armors" (
    "name_rus" TEXT DEFAULT '',
    "name_eng" TEXT DEFAULT '',
    "type" SMALLINT NOT NULL,
    "base_ac" BIGINT,
    "ac" TEXT,
    "price" TEXT,
    "source" TEXT,
    "weight" DOUBLE PRECISION,
    "description" TEXT,
    "duration" TEXT,
    "disadvantage" BOOLEAN,
    "requirement" BIGINT,
    "homebrew" BOOLEAN,
    "icon" TEXT,
    "id" BIGSERIAL NOT NULL,

    CONSTRAINT "armors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auto_prepared_spells" (
    "spell_id" TEXT NOT NULL,
    "subclass_id" BIGINT,
    "class_id" SMALLINT,
    "id" BIGSERIAL NOT NULL,

    CONSTRAINT "auto_prepared_spells_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "battle_members" (
    "id" BIGSERIAL NOT NULL,
    "world_id" BIGINT NOT NULL,
    "initiative" BIGINT,
    "max_hp" BIGINT,
    "current_hp" BIGINT,
    "hero_id" BIGINT,
    "monster_id" BIGINT,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT,

    CONSTRAINT "battle_member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "class_spells" (
    "class_id" SMALLINT NOT NULL,
    "spell_id" TEXT NOT NULL,

    CONSTRAINT "class_spells_pkey" PRIMARY KEY ("class_id","spell_id")
);

-- CreateTable
CREATE TABLE "classes" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT DEFAULT '',
    "main_ability" TEXT DEFAULT 'cha',
    "hit_dice" SMALLINT,
    "icon" TEXT,
    "description" TEXT,
    "subclass_level" SMALLINT NOT NULL,
    "spell_ability" TEXT,
    "metamagic" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eldritch_invocations" (
    "id" TEXT NOT NULL,
    "name_rus" TEXT NOT NULL,
    "name_eng" TEXT NOT NULL,
    "requirements" TEXT,
    "description" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "spell_id" TEXT,

    CONSTRAINT "eldritch_invocations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "features" (
    "id" TEXT NOT NULL,
    "class_id" SMALLINT,
    "subclass_id" BIGINT,
    "description" TEXT,
    "level" SMALLINT,
    "name" TEXT NOT NULL,
    "upgrade" TEXT,
    "source" TEXT NOT NULL,
    "race_id" SMALLINT,
    "subrace_id" SMALLINT,
    "spell_id" TEXT,

    CONSTRAINT "features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fighting_styles" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "fighting_styles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hero_arcanums" (
    "hero_id" BIGINT NOT NULL,
    "spell_id" TEXT NOT NULL,

    CONSTRAINT "hero_arcanums_pkey" PRIMARY KEY ("hero_id","spell_id")
);

-- CreateTable
CREATE TABLE "hero_eldritch_invocations" (
    "hero_id" BIGINT NOT NULL,
    "eldritch_invocation_id" TEXT NOT NULL,

    CONSTRAINT "hero_eldritch_invocations_pkey" PRIMARY KEY ("hero_id","eldritch_invocation_id")
);

-- CreateTable
CREATE TABLE "hero_fighting_styles" (
    "hero_id" BIGINT NOT NULL,
    "style_id" BIGINT NOT NULL,

    CONSTRAINT "hero_fighting_styles_pkey" PRIMARY KEY ("hero_id","style_id")
);

-- CreateTable
CREATE TABLE "hero_items" (
    "hero_id" BIGINT NOT NULL,
    "item_id" TEXT NOT NULL,
    "count" SMALLINT NOT NULL DEFAULT 1,
    "icon" TEXT,

    CONSTRAINT "hero_items_pkey" PRIMARY KEY ("hero_id","item_id")
);

-- CreateTable
CREATE TABLE "hero_levels" (
    "hero_id" BIGINT NOT NULL,
    "class_id" SMALLINT NOT NULL,
    "level" SMALLINT NOT NULL,
    "subclass_id" BIGINT,
    "metamagic_ids" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "basic" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "hero_levels_pkey" PRIMARY KEY ("hero_id","class_id")
);

-- CreateTable
CREATE TABLE "hero_magic_items" (
    "hero_id" BIGINT NOT NULL,
    "magic_item_id" TEXT NOT NULL,
    "count" SMALLINT NOT NULL DEFAULT 1,
    "icon" TEXT,

    CONSTRAINT "hero_magic_items_pkey" PRIMARY KEY ("hero_id","magic_item_id")
);

-- CreateTable
CREATE TABLE "hero_skills" (
    "hero_id" BIGINT NOT NULL,
    "skill_key" TEXT NOT NULL,
    "level" SMALLINT NOT NULL,

    CONSTRAINT "hero_skills_pkey" PRIMARY KEY ("skill_key")
);

-- CreateTable
CREATE TABLE "hero_spellbook" (
    "hero_id" BIGINT NOT NULL,
    "spell_id" TEXT NOT NULL,

    CONSTRAINT "hero_spellbook_pkey" PRIMARY KEY ("hero_id","spell_id")
);

-- CreateTable
CREATE TABLE "hero_spells" (
    "hero_id" BIGINT NOT NULL,
    "spell_id" TEXT NOT NULL,
    "class_id" SMALLINT NOT NULL,

    CONSTRAINT "hero_spells_pkey" PRIMARY KEY ("hero_id","spell_id","class_id")
);

-- CreateTable
CREATE TABLE "hero_traits" (
    "hero_id" BIGINT NOT NULL,
    "trait_id" TEXT NOT NULL,

    CONSTRAINT "hero_traits_pkey" PRIMARY KEY ("hero_id","trait_id")
);

-- CreateTable
CREATE TABLE "hero_weapons" (
    "hero_id" BIGINT NOT NULL,
    "weapon_id" TEXT NOT NULL,
    "count" SMALLINT NOT NULL DEFAULT 1,
    "magic_item_id" TEXT,
    "id" BIGSERIAL NOT NULL,
    "icon" TEXT,
    "attack_bonus" SMALLINT NOT NULL DEFAULT 0,
    "damage_bonus" SMALLINT NOT NULL DEFAULT 0,

    CONSTRAINT "hero_weapons_pkey" PRIMARY KEY ("id","hero_id")
);

-- CreateTable
CREATE TABLE "heroes" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "world_id" BIGINT NOT NULL,
    "user_id" UUID,
    "cha" SMALLINT NOT NULL DEFAULT 10,
    "con" SMALLINT NOT NULL DEFAULT 10,
    "dex" SMALLINT NOT NULL DEFAULT 10,
    "int" SMALLINT NOT NULL DEFAULT 10,
    "str" SMALLINT NOT NULL DEFAULT 10,
    "wis" SMALLINT NOT NULL DEFAULT 10,
    "notes" TEXT DEFAULT '',
    "armorBonus" SMALLINT NOT NULL DEFAULT 0,
    "armor_types_prof" TEXT[],
    "buff_hp" SMALLINT NOT NULL DEFAULT 0,
    "copper_coins" INTEGER NOT NULL DEFAULT 0,
    "silver_coins" INTEGER NOT NULL DEFAULT 0,
    "electrum_coins" INTEGER NOT NULL DEFAULT 0,
    "gold_coins" INTEGER NOT NULL DEFAULT 0,
    "platinum_coins" INTEGER NOT NULL DEFAULT 0,
    "current_hp" SMALLINT NOT NULL DEFAULT 0,
    "image_url" TEXT,
    "max_hp" SMALLINT NOT NULL DEFAULT 0,
    "temp_hp" SMALLINT NOT NULL DEFAULT 0,
    "subrace_id" SMALLINT,
    "race_id" SMALLINT,
    "weapon_types_prof" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "creation_done" BOOLEAN NOT NULL DEFAULT false,
    "traits" TEXT,
    "ideals" TEXT,
    "bounds" TEXT,
    "flaws" TEXT,
    "languages_ids" SMALLINT[],
    "tools_ids" SMALLINT[],
    "armor_id" BIGINT,
    "shield_id" BIGINT,
    "armor_bonus" BIGINT,
    "experience" BIGINT,
    "warlock_pact_id" BIGINT,

    CONSTRAINT "heroes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" TEXT NOT NULL,
    "name_rus" TEXT NOT NULL,
    "name_eng" TEXT NOT NULL,
    "homebrew" BOOLEAN NOT NULL,
    "price" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "weight" TEXT,
    "description" TEXT NOT NULL,
    "categories" TEXT[],
    "icon" TEXT,
    "world_id" BIGINT,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "magic_items" (
    "id" TEXT NOT NULL,
    "name_rus" TEXT NOT NULL,
    "name_eng" TEXT NOT NULL,
    "homebrew" BOOLEAN NOT NULL,
    "cost_dmg" TEXT,
    "source" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "detailType" TEXT[],
    "type" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "cost_xge" TEXT,
    "customization" BOOLEAN NOT NULL,
    "detailCustomization" TEXT[],
    "allowed_weapon_ids" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "allowed_weapon_types" SMALLINT[] DEFAULT ARRAY[]::SMALLINT[],
    "icon" TEXT,
    "ext_icon" TEXT,
    "world_id" BIGINT,
    "spell_id" TEXT,

    CONSTRAINT "magic_items_pkey1" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "monsters" (
    "id" BIGINT NOT NULL,
    "name_rus" TEXT,
    "name_eng" TEXT,
    "size" JSON,
    "type" TEXT,
    "challenge_rating" TEXT,
    "url" TEXT,
    "source" TEXT,
    "experience" BIGINT,
    "armor_class" BIGINT,
    "armors" JSON[],
    "hits" JSON,
    "speed" JSON[],
    "ability" JSON,
    "skills" JSON[],
    "senses" JSON,
    "languages" TEXT[],
    "feats" JSON[],
    "actions" JSON[],
    "bonus_actions" JSON[],
    "tags" JSONB[],
    "images" TEXT[],
    "alignment" TEXT,
    "saving_throws" JSONB[],
    "condition_immunities" TEXT[],
    "damage_immunities" TEXT[],
    "proficiency_bonus" TEXT,
    "reactions" JSONB[],
    "reaction" TEXT,
    "damage_resistances" JSONB[],
    "legendary" JSONB,
    "lair" JSONB,

    CONSTRAINT "monster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL,
    "updated_at" TIMESTAMPTZ(6),
    "full_name" TEXT,
    "avatar_url" TEXT,
    "master" BOOLEAN NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "races" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT,
    "icon" TEXT DEFAULT '',
    "description" TEXT,
    "speed" SMALLINT NOT NULL DEFAULT 30,

    CONSTRAINT "races_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rules" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spells" (
    "id" TEXT NOT NULL,
    "name_rus" TEXT,
    "name_eng" TEXT,
    "level" SMALLINT NOT NULL,
    "school" TEXT,
    "component_v" BOOLEAN NOT NULL,
    "component_s" BOOLEAN NOT NULL,
    "component_m" TEXT,
    "source" TEXT,
    "range" TEXT,
    "duration" TEXT,
    "time" TEXT,
    "description" TEXT,
    "upper" TEXT,
    "icon" TEXT NOT NULL,
    "ritual" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "spells_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subclass_spells" (
    "subclass_id" BIGINT NOT NULL,
    "spell_id" TEXT NOT NULL,

    CONSTRAINT "subslass_spells_pkey" PRIMARY KEY ("subclass_id","spell_id")
);

-- CreateTable
CREATE TABLE "subclasses" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "class_id" SMALLINT NOT NULL,
    "icon" TEXT,
    "description" TEXT,
    "source" TEXT,
    "spell_ability" TEXT,

    CONSTRAINT "subclasses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subraces" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "race_id" SMALLINT NOT NULL,
    "icon" TEXT,
    "description" TEXT,
    "speed" SMALLINT,
    "features_done" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "subraces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trait_spells" (
    "trait_id" TEXT NOT NULL,
    "spell_id" TEXT NOT NULL,

    CONSTRAINT "trait_spells_pkey" PRIMARY KEY ("trait_id","spell_id")
);

-- CreateTable
CREATE TABLE "traits" (
    "id" TEXT NOT NULL,
    "name_rus" TEXT NOT NULL,
    "name_eng" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "homebrew" BOOLEAN NOT NULL,

    CONSTRAINT "traits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "warlock_pacts" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "warlock_pacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weapons" (
    "id" TEXT NOT NULL,
    "name_rus" TEXT NOT NULL,
    "name_eng" TEXT NOT NULL,
    "type" SMALLINT NOT NULL,
    "damage_dice" TEXT,
    "damage_type" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "weight" DECIMAL NOT NULL,
    "description" TEXT NOT NULL,
    "properties" JSONB[],
    "special" TEXT,
    "homebrew" BOOLEAN NOT NULL,
    "icon" TEXT,
    "world_id" BIGINT,

    CONSTRAINT "weapons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "worlds" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "sources" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Worlds_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "armors_id_key" ON "armors"("id");

-- CreateIndex
CREATE UNIQUE INDEX "auto_prepared_spells_id_key" ON "auto_prepared_spells"("id");

-- CreateIndex
CREATE UNIQUE INDEX "hero_weapons_id_key" ON "hero_weapons"("id");

-- CreateIndex
CREATE UNIQUE INDEX "monsters_url_key" ON "monsters"("url");

-- AddForeignKey
ALTER TABLE "auto_prepared_spells" ADD CONSTRAINT "auto_prepared_spells_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auto_prepared_spells" ADD CONSTRAINT "auto_prepared_spells_spell_id_fkey" FOREIGN KEY ("spell_id") REFERENCES "spells"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auto_prepared_spells" ADD CONSTRAINT "auto_prepared_spells_subclass_id_fkey" FOREIGN KEY ("subclass_id") REFERENCES "subclasses"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "battle_members" ADD CONSTRAINT "battle_members_hero_id_fkey" FOREIGN KEY ("hero_id") REFERENCES "heroes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "battle_members" ADD CONSTRAINT "battle_members_monster_id_fkey" FOREIGN KEY ("monster_id") REFERENCES "monsters"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "battle_members" ADD CONSTRAINT "battle_members_world_id_fkey" FOREIGN KEY ("world_id") REFERENCES "worlds"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "class_spells" ADD CONSTRAINT "class_spells_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "class_spells" ADD CONSTRAINT "class_spells_spell_id_fkey" FOREIGN KEY ("spell_id") REFERENCES "spells"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eldritch_invocations" ADD CONSTRAINT "eldritch_invocations_spell_id_fkey" FOREIGN KEY ("spell_id") REFERENCES "spells"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "features" ADD CONSTRAINT "features_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "features" ADD CONSTRAINT "features_race_id_fkey" FOREIGN KEY ("race_id") REFERENCES "races"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "features" ADD CONSTRAINT "features_spell_id_fkey" FOREIGN KEY ("spell_id") REFERENCES "spells"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "features" ADD CONSTRAINT "features_subclass_id_fkey" FOREIGN KEY ("subclass_id") REFERENCES "subclasses"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "features" ADD CONSTRAINT "features_subrace_id_fkey" FOREIGN KEY ("subrace_id") REFERENCES "subraces"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hero_arcanums" ADD CONSTRAINT "hero_arcanums_hero_id_fkey" FOREIGN KEY ("hero_id") REFERENCES "heroes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hero_arcanums" ADD CONSTRAINT "hero_arcanums_spell_id_fkey" FOREIGN KEY ("spell_id") REFERENCES "spells"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hero_eldritch_invocations" ADD CONSTRAINT "hero_eldritch_invocations_eldritch_invocation_id_fkey" FOREIGN KEY ("eldritch_invocation_id") REFERENCES "eldritch_invocations"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hero_eldritch_invocations" ADD CONSTRAINT "hero_eldritch_invocations_hero_id_fkey" FOREIGN KEY ("hero_id") REFERENCES "heroes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hero_fighting_styles" ADD CONSTRAINT "hero_fighting_styles_hero_id_fkey" FOREIGN KEY ("hero_id") REFERENCES "heroes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hero_fighting_styles" ADD CONSTRAINT "hero_fighting_styles_style_id_fkey" FOREIGN KEY ("style_id") REFERENCES "fighting_styles"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hero_items" ADD CONSTRAINT "hero_items_hero_id_fkey" FOREIGN KEY ("hero_id") REFERENCES "heroes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hero_items" ADD CONSTRAINT "hero_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hero_levels" ADD CONSTRAINT "hero_levels_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hero_levels" ADD CONSTRAINT "hero_levels_hero_id_fkey" FOREIGN KEY ("hero_id") REFERENCES "heroes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hero_levels" ADD CONSTRAINT "hero_levels_subclass_id_fkey" FOREIGN KEY ("subclass_id") REFERENCES "subclasses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hero_magic_items" ADD CONSTRAINT "hero_magic_items_hero_id_fkey" FOREIGN KEY ("hero_id") REFERENCES "heroes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hero_magic_items" ADD CONSTRAINT "hero_magic_items_magic_item_id_fkey" FOREIGN KEY ("magic_item_id") REFERENCES "magic_items"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hero_skills" ADD CONSTRAINT "hero_skills_hero_id_fkey" FOREIGN KEY ("hero_id") REFERENCES "heroes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hero_spellbook" ADD CONSTRAINT "hero_spellbook_hero_id_fkey" FOREIGN KEY ("hero_id") REFERENCES "heroes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hero_spellbook" ADD CONSTRAINT "hero_spellbook_spell_id_fkey" FOREIGN KEY ("spell_id") REFERENCES "spells"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hero_spells" ADD CONSTRAINT "hero_spells_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hero_spells" ADD CONSTRAINT "hero_spells_hero_id_fkey" FOREIGN KEY ("hero_id") REFERENCES "heroes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hero_spells" ADD CONSTRAINT "hero_spells_spell_id_fkey" FOREIGN KEY ("spell_id") REFERENCES "spells"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hero_traits" ADD CONSTRAINT "hero_traits_hero_id_fkey" FOREIGN KEY ("hero_id") REFERENCES "heroes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hero_traits" ADD CONSTRAINT "hero_traits_trait_id_fkey" FOREIGN KEY ("trait_id") REFERENCES "traits"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hero_weapons" ADD CONSTRAINT "hero_weapons_hero_id_fkey" FOREIGN KEY ("hero_id") REFERENCES "heroes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hero_weapons" ADD CONSTRAINT "hero_weapons_magic_item_id_fkey" FOREIGN KEY ("magic_item_id") REFERENCES "magic_items"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hero_weapons" ADD CONSTRAINT "hero_weapons_weapon_id_fkey" FOREIGN KEY ("weapon_id") REFERENCES "weapons"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "heroes" ADD CONSTRAINT "heroes_armor_id_fkey" FOREIGN KEY ("armor_id") REFERENCES "armors"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "heroes" ADD CONSTRAINT "heroes_race_id_fkey" FOREIGN KEY ("race_id") REFERENCES "races"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "heroes" ADD CONSTRAINT "heroes_shield_id_fkey" FOREIGN KEY ("shield_id") REFERENCES "armors"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "heroes" ADD CONSTRAINT "heroes_subrace_id_fkey" FOREIGN KEY ("subrace_id") REFERENCES "subraces"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "heroes" ADD CONSTRAINT "heroes_warlock_pact_id_fkey" FOREIGN KEY ("warlock_pact_id") REFERENCES "warlock_pacts"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "heroes" ADD CONSTRAINT "heroes_world_id_fkey" FOREIGN KEY ("world_id") REFERENCES "worlds"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_world_id_fkey" FOREIGN KEY ("world_id") REFERENCES "worlds"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "magic_items" ADD CONSTRAINT "magic_items_spell_id_fkey" FOREIGN KEY ("spell_id") REFERENCES "spells"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "magic_items" ADD CONSTRAINT "magic_items_world_id_fkey" FOREIGN KEY ("world_id") REFERENCES "worlds"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subclass_spells" ADD CONSTRAINT "subclass_spells_spell_id_fkey" FOREIGN KEY ("spell_id") REFERENCES "spells"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subclass_spells" ADD CONSTRAINT "subclass_spells_subclass_id_fkey" FOREIGN KEY ("subclass_id") REFERENCES "subclasses"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subclasses" ADD CONSTRAINT "subclasses_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subraces" ADD CONSTRAINT "subraces_race_id_fkey" FOREIGN KEY ("race_id") REFERENCES "races"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trait_spells" ADD CONSTRAINT "trait_spells_spell_id_fkey" FOREIGN KEY ("spell_id") REFERENCES "spells"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trait_spells" ADD CONSTRAINT "trait_spells_trait_id_fkey" FOREIGN KEY ("trait_id") REFERENCES "traits"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "weapons" ADD CONSTRAINT "weapons_world_id_fkey" FOREIGN KEY ("world_id") REFERENCES "worlds"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
