import {
  Controller,
  Inject,
  Logger,
  OnModuleInit,
  ValidationPipe,
} from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaCreateParcelDto } from './dto/create-parcel.dto';
import { UpdateParcelDto } from './dto/update-parcel.dto';
import { ParcelsService } from './parcels.service';

@Controller()
export class ParcelsController implements OnModuleInit {
  constructor(
    private readonly parcelsService: ParcelsService,
    @Inject('KAFKA_SERVER')
    private readonly kafkaClient: ClientKafka,
  ) {}

  onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('checkParcel');
  }

  @MessagePattern('createParcel')
  async create(
    @Payload(new ValidationPipe())
    createParcelDto: KafkaCreateParcelDto,
  ) {
    Logger.debug(createParcelDto.value, ParcelsController.name);

    this.kafkaClient
      .send('checkParcel', JSON.stringify(createParcelDto.value))
      .subscribe((reply) => {
        Logger.debug({ reply }, ParcelsController.name);
      });
  }

  @MessagePattern('findAllParcels')
  findAll() {
    return this.parcelsService.findAll();
  }

  @MessagePattern('findOneParcel')
  findOne(@Payload() id: number) {
    return this.parcelsService.findOne(id);
  }

  @MessagePattern('updateParcel')
  update(@Payload() updateParcelDto: UpdateParcelDto) {
    return this.parcelsService.update(updateParcelDto.id, updateParcelDto);
  }

  @MessagePattern('removeParcel')
  remove(@Payload() id: number) {
    return this.parcelsService.remove(id);
  }
}
