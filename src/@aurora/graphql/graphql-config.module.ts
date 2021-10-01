import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import GraphQLJSON from 'graphql-type-json';
import { Any, Json, Upload } from 'aurora-ts-core';
import { Hello } from './hello.resolver';

@Module({
    imports: [
        GraphQLModule.forRoot({
            context   : ({ req }) => ({ req }),
            debug     : true,
            playground: true,
            typePaths : ['./**/*.graphql'],
            resolvers : {
                JSON: GraphQLJSON // define JSON Scalar type
            },
            definitions: {
                path: join(process.cwd(), 'src/graphql.ts')
            },
            /* uploads: {
                maxFileSize: 100000000, // 100 MB
                maxFiles   : 5,
            } */
        })
    ],
    providers: [
        Any,
        Upload,
        Json,
        Hello
    ],
    exports: [
        GraphQLModule
    ]
})
export class GraphQLConfigModule {}
