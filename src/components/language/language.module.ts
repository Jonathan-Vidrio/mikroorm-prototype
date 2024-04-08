import { Module } from '@nestjs/common';
import { LanguageService } from './language.service';
import { LanguageController } from './language.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Language } from './entities/language.entity';
import { Status } from '../status/entities/status.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Language, Status])],
  controllers: [LanguageController],
  providers: [LanguageService],
})
export class LanguageModule {}
