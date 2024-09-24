import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';

@Injectable()
export class ToolService {
  constructor(private prisma: PrismaService) {}

  async getAllTools() {
    const tools = await this.prisma.tools.findMany();
    return tools;
  }

  async getToolById(id: number) {
    const tool = await this.prisma.tools.findUnique({
      where: { id: Number(id) },
    });
    if (!tool) {
      throw new NotFoundException(`Tool with ID ${id} not found`);
    }
    return tool;
  }

  async createTool(createToolDto: CreateToolDto) {
    const newTool = await this.prisma.tools.create({
      data: createToolDto,
    });
    return newTool;
  }

  async updateTool(id: number, updateToolDto: UpdateToolDto) {
    const updatedTool = await this.prisma.tools.update({
      where: { id: Number(id) },
      data: updateToolDto,
    });
    return updatedTool;
  }

  async deleteTool(id: number) {
    const deletedTool = await this.prisma.tools.delete({
      where: { id: Number(id) },
    });
    return {
      message: `Tool with ID ${id} deleted`,
      deletedTool,
    };
  }
}
