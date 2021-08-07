import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class CheckParcelService {
  @MessagePattern('checkParcel')
  checkParcel(@Payload() data: { value: object }) {
    Logger.log(data.value, CheckParcelService.name);
    return { ok: true };
  }
}
