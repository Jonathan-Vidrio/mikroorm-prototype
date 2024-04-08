import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LanguageService } from './language.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './entities/language.entity';

@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Post()
  async create(
    @Body() createLanguageDto: CreateLanguageDto,
  ): Promise<Language> {
    return await this.languageService.create(createLanguageDto);
  }

  @Get()
  async findAll(): Promise<Language[]> {
    return await this.languageService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Language> {
    return await this.languageService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLanguageDto: UpdateLanguageDto,
  ): Promise<Language> {
    return await this.languageService.update(+id, updateLanguageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Language> {
    return await this.languageService.remove(+id);
  }
}
