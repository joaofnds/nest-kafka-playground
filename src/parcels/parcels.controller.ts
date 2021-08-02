import { Controller, Inject, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { ParcelsService } from './parcels.service';
import { CreateParcelDto } from './dto/create-parcel.dto';
import { UpdateParcelDto } from './dto/update-parcel.dto';
import { Producer } from '@nestjs/microservices/external/kafka.interface';

@Controller()
export class ParcelsController implements OnModuleInit, OnModuleDestroy {
  producer: Producer;

  constructor(
    private readonly parcelsService: ParcelsService,
    @Inject('KAFKA_SERVER')
    private readonly kafkaClient: ClientKafka
  ) { }

  async onModuleInit() {
    this.producer = await this.kafkaClient.connect();
  }

  onModuleDestroy() {
    this.kafkaClient.close();
  }

  @MessagePattern('createParcel')
  create(@Payload() createParcelDto: CreateParcelDto) {
    Logger.debug(createParcelDto, ParcelsController.name)
    return this.parcelsService.create(createParcelDto);
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
