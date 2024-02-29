import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ShellController } from './shell.controller';
import { ShellService } from './shell.service';

@Module({
  imports: [HttpModule],
  controllers: [ShellController],
  providers: [ShellService],
})
export class ShellModule {}
