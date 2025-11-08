import { Injectable } from '@nestjs/common';
import { ClientRepository } from './client.repository';
import { CreateClientDto, UpdateClientDto } from './client.dto';
import { ClientEntity } from './client.entity';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepo: ClientRepository) {}

  create(dto: CreateClientDto): Promise<ClientEntity> {
    return this.clientRepo.createClient(dto);
  }

  findAll(): Promise<ClientEntity[]> {
    return this.clientRepo.getAllClients();
  }

  findOne(id: string): Promise<ClientEntity> {
    return this.clientRepo.getClientById(id);
  }

  update(id: string, dto: UpdateClientDto): Promise<ClientEntity> {
    return this.clientRepo.updateClient(id, dto);
  }

  remove(id: string): Promise<void> {
    return this.clientRepo.deleteClient(id);
  }
}
