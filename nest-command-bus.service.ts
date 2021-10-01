import { Injectable } from '@nestjs/common';
import { CommandBus as NestCommandBusImplementation, ICommand } from '@nestjs/cqrs';


@Injectable()
export abstract class ICommandBus
{
    abstract dispatch<T>(command: T): Promise<any>;
}


@Injectable()
export class NestCommandBus implements ICommandBus
{
    constructor(
        private readonly commandBus: NestCommandBusImplementation
    ) {}

    async dispatch<T extends ICommand>(command: T): Promise<any>
    {
        return await this.commandBus.execute(command);
    }
}




