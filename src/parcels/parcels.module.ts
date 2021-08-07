import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CheckParcelService } from './check-parcel.service';
import { ParcelsController } from './parcels.controller';
import { ParcelsService } from './parcels.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVER',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['host.docker.internal:9094'],
          },
          consumer: {
            groupId: 'test-group' + Math.random(),
          },
        },
      },
    ]),
  ],
  controllers: [ParcelsController, CheckParcelService],
  providers: [ParcelsService],
})
export class ParcelsModule {}
