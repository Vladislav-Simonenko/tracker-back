import { Injectable, NotFoundException } from '@nestjs/common'; 
import { PrismaService } from '@prisma/prisma.service'; 
import { CreateWeaponDto } from './dto/create-weapon.dto';  
import { UpdateWeaponDto } from './dto/update-weapon.dto'; 
import { bigintToJSON } from 'src/utils/bigint-transformer'; 
   
@Injectable() 
export class WeaponService { 
  constructor(private prisma: PrismaService) {} 
 
  async getAllWeapons() { 
    const weapons = await this.prisma.weapons.findMany(); 
    return bigintToJSON(weapons); 
  } 
 
  async getWeaponById(id: string) {   
    const weapon = await this.prisma.weapons.findUnique({  
      where: { id },  
    });  
    if (!weapon) {   
      throw new NotFoundException(`Weapon with ID ${id} not found`);  
    }   
    return bigintToJSON(weapon);   
  }  
   
  async createWeapon(createWeaponDto: CreateWeaponDto) {  
    const weapon = await this.prisma.weapons.create({  
      data: createWeaponDto,   
    });  
    return bigintToJSON(weapon);  
  }  
 
  async updateWeapon(id: string, updateWeaponDto: UpdateWeaponDto) { 
    const weapon = await this.prisma.weapons.findUnique({ 
      where: { id },  
    }); 
    return bigintToJSON(weapon); 
  } 
 
  async deleteWeapon(id: string) {  
    const deletedWeapon = await this.prisma.weapons.delete({ 
      where: { id }, 
    }); 
    return bigintToJSON(deletedWeapon); 
  } 
}  
 