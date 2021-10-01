import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ICommandBus, NestCommandBus, IQueryBus, NestQueryBus } from '@aurora/cqrs';
import { CoreModule as AuroraCoreModule, ICriteria, SequelizeCriteria } from 'aurora-ts-core';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AuroraCoreModule,
        CqrsModule
    ],
    providers: [
        {
            provide : ICommandBus,
            useClass: NestCommandBus
        },
        {
            provide : IQueryBus,
            useClass: NestQueryBus
        },
        {
            provide : ICriteria,
            useClass: SequelizeCriteria
        }
    ],
    exports: [
        ConfigModule,
        CqrsModule
    ]
})
export class SharedModule {}
