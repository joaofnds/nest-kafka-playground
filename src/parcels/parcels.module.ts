import { Module } from '@nestjs/common';
import { ParcelsService } from './parcels.service';
import { ParcelsController } from './parcels.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVER',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'nest',
            brokers: ['host.docker.internal:9094'],
          },
          consumer: {
            groupId: 'test-group'
          }
        }
      }
    ])
  ],
  controllers: [ParcelsController],
  providers: [ParcelsService]
})
export class ParcelsModule {}
