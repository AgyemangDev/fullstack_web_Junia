import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from './client.entity';
import { CreateClientDto, UpdateClientDto } from './client.dto';

@Injectable()
export class ClientRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepo: Repository<ClientEntity>,
  ) {}

  async createClient(dto: CreateClientDto): Promise<ClientEntity> {
    const client = this.clientRepo.create(dto);
    return await this.clientRepo.save(client);
  }

  async getAllClients(): Promise<ClientEntity[]> {
    return await this.clientRepo.find();
  }

  async getClientById(id: string): Promise<ClientEntity> {
    const client = await this.clientRepo.findOne({ where: { id } });
    if (!client) throw new NotFoundException('Client not found');
    return client;
  }

  async updateClient(id: string, dto: UpdateClientDto): Promise<ClientEntity> {
    const client = await this.getClientById(id);
    Object.assign(client, dto);
    return await this.clientRepo.save(client);
  }

  async deleteClient(id: string): Promise<void> {
    const result = await this.clientRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Client not found');
  }
}
