import { Module } from '@nestjs/common';
import { CorePreparationRequestController } from 'aurora-ts-core';
import { SharedModule } from './shared.module';
import { GraphQLConfigModule } from './graphql/graphql-config.module';

@Module({
    imports: [
        SharedModule,
        GraphQLConfigModule
    ],
    controllers: [
        CorePreparationRequestController
    ],
    exports: []
})
export class CoreModule {}