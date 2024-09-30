import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateClassSpellDto } from './dto/create-cs.dto';
import { UpdateClassSpellDto } from './dto/update-cs.dto';
import { bigintToJSON } from 'src/utils/bigint-transformer';
@Injectable()
export class ClassSpellsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createClassSpellDto: CreateClassSpellDto) {
    const cs = this.prisma.class_spells.create({
      data: createClassSpellDto,
    });
    return bigintToJSON(cs);
  }

  findAll() {
    const cs = this.prisma.class_spells.findMany();
    return bigintToJSON(cs);
  }

  findOne(class_id: number, spell_id: string) {
    const cs = this.prisma.class_spells.findUnique({
      where: {
        class_id_spell_id: { class_id, spell_id },
      },
    });
    return bigintToJSON(cs);
  }

  update(
    class_id: number,
    spell_id: string,
    updateClassSpellDto: UpdateClassSpellDto,
  ) {
    const cs = this.prisma.class_spells.update({
      where: {
        class_id_spell_id: { class_id, spell_id },
      },
      data: updateClassSpellDto,
    });
    return bigintToJSON(cs);
  }

  remove(class_id: number, spell_id: string) {
    const cs = this.prisma.class_spells.delete({
      where: {
        class_id_spell_id: { class_id, spell_id },
      },
    });
    return bigintToJSON(cs);
  }
}
