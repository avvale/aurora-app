import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ICustomerRepository } from '@hades/test/customer/domain/customer.repository';
import { MockCustomerSeeder } from '@hades/test/customer/infrastructure/mock/mock-customer.seeder';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { TestModule } from './../../../src/apps/test/test.module';
import * as request from 'supertest';
import * as _ from 'lodash';


const importForeignModules = [];

describe('customer', () =>
{
    let app: INestApplication;
    let repository: ICustomerRepository;
    let seeder: MockCustomerSeeder;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    TestModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRoot({
                        dialect: 'sqlite',
                        storage: ':memory:',
                        logging: false,
                        autoLoadModels: true,
                        models: [],
                    }),
                ],
                providers: [
                    MockCustomerSeeder,
                ]
            })
            .compile();

        app         = module.createNestApplication();
        repository  = module.get<ICustomerRepository>(ICustomerRepository);
        seeder      = module.get<MockCustomerSeeder>(MockCustomerSeeder);

        // seed mock data in memory database
        repository.insert(seeder.collectionSource);

        await app.init();
    });

    test(`/REST:POST test/customer - Got 400 Conflict, CustomerId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/test/customer')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'bng0hspoyqwvhbwgzfjl7wum0klozs5nf5jfhjzlfjtr1lc9qmlwuxuyt9izyilwhifa62iubol68tswzyfeb63jk7ttwkd54qvpjfs8j5bfcx6rx6cwo59ulwdrmpzmbwytinpdzwlqnhc5b5y9ajwcma5bkhppdjr62aqy1zn375blvp0n6b1vnd60bxw16jvymq76x1unes5e9w11ahgdd8fngi8pvb3wkvlvegfcmpnd18564z6cyhcgbm7',
                country: 'db0qhuoinafr336ada2o250iwnh65ci13869o1sqsdmz594cb6',
                year: 2225357539,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CustomerId must be defined, can not be null');
            });
    });

    test(`/REST:POST test/customer - Got 400 Conflict, CustomerName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/test/customer')
            .set('Accept', 'application/json')
            .send({
                id: '5d928440-c904-4ad0-9c2c-1058b8a70372',
                name: null,
                country: 'dq58qsmkwe8hytta2s56zhssnc72wanjm1b7dnxchisdtdrsai',
                year: 7931436364,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CustomerName must be defined, can not be null');
            });
    });

    test(`/REST:POST test/customer - Got 400 Conflict, CustomerYear property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/test/customer')
            .set('Accept', 'application/json')
            .send({
                id: '3b00b56d-e28a-4003-aadb-514af84a1feb',
                name: '7x1b8x2gr292qhzv3ew9lngz1ux9a1houtsy064uptabqc1ogn01zc9v467xwiwzicvxklwsubhl5hbinv7cu102guqivnd44oz7mofjpmyd6gundor8vcnj6zp5hszwa5okwpr9opjm22bnqkxczu3gnvcpgcrs8sw8dv89acq36f4uf019ui2hrlr33xsoozmzliym983h2bi1nomlrr90rbbr3q9gn4uxzdj2r7rb6a5ezol12p042725m6n',
                country: 'bkdr883ea2qp1mhln4zvkxz98vfc6np45jw4n3l8ch7mcwpnnf',
                year: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CustomerYear must be defined, can not be null');
            });
    });

    test(`/REST:POST test/customer - Got 400 Conflict, CustomerId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/test/customer')
            .set('Accept', 'application/json')
            .send({
                name: 'qqhudqpndgqsyebiiibv3h48vzcus1dotbudpweudockcxpkho6w0bp9eiwefu4znamf5n032w0zqsvg0jdyhlt6p9kvhdakcqacrs03b9a5jpqx3ebg6h3k4hxfpfx8wzsd0f09o4move05rwlrdq6xb0hpx8wyy8tbw5bfsh91z6lu8sk4xj0gosx0md4f6lea4gom0nugjkfcibw7axk5ghimi2bw06iv9npwmdnxa61tkloyv589oev4mqm',
                country: 'jvtjje1lsbj32jyjqmdtv44ny7beybuikgp8kzbk8kn6f81wcp',
                year: 2979624613,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CustomerId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST test/customer - Got 400 Conflict, CustomerName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/test/customer')
            .set('Accept', 'application/json')
            .send({
                id: 'a634af6f-8479-44dc-8847-b8cb4a811abf',
                country: 'ltduv2agbbg1m4auc3avmjviguefd1uv58vv31aoby31f3vpaf',
                year: 3284982164,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CustomerName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST test/customer - Got 400 Conflict, CustomerYear property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/test/customer')
            .set('Accept', 'application/json')
            .send({
                id: 'bbabcb9d-a546-494e-8061-d2d8f52b807e',
                name: 'y2trb43pw1c58fujp0rarq58xta94jtt2w3a4o7o2zc3bp7wo3vwsaxbc3x7ij5mub9iinzcg3f00p0lojmpgqzf3xwuv0brfwalejyo8363enz9tgwtg307bsow5kh63l3vgqw8f6c0xno87ap12o89mhkp7tvwyo63oqe5tt20ibku07xhp5owd1t6xg2wwq6n874sxj54tm5w4ntl49q67w2t3y25ut7gk1q9wmj0w9oh0qzdjnrtlj6om5b',
                country: '9g185e8exqdy7udgt7spre02oassqx3qdukf45dfq2b3lojflg',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CustomerYear must be defined, can not be undefined');
            });
    });

    test(`/REST:POST test/customer - Got 400 Conflict, CustomerId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/test/customer')
            .set('Accept', 'application/json')
            .send({
                id: 'g1rgh517ti8c5kof0irhppcn3mgwoy5pddy4j',
                name: 'hf0lhyvkwlpobh5jelcfg218j6ynytyzy0ng7qv3h69m9v75j5nbrfpgd3nhfwdfd3isajyhlkz6eqhj9b1k5xfy5i6ijlpt2qzu1ijawvow9gcuei3978olm30hzwctu1nvafcbmeehh240bgbdxfh195rp3rahoguxdv7a4n0a9tw3qg8saeaa9lymri1by0rulxar49lxxt6lhh7p1qg3kvxy2ltlaqrwzp87seufg00vjjvo1sm08uz06na',
                country: '0lb7myldn2hqmp4zdty5hw2ymzon7ml84j4ozqi5k1yjj5bbf2',
                year: 1977458536,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CustomerId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST test/customer - Got 400 Conflict, CustomerName is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/test/customer')
            .set('Accept', 'application/json')
            .send({
                id: 'ea095065-a331-489d-901d-77c4be9d9f34',
                name: 'igq1q25x2w6zb48uulc1qiexmmzatnsjdyykxwrbb5yq5wcm6kjryllzekja4gdhc4talbnnvt72gqhpnjgtx5myxtigit3utd4s18zfgyxyijznk0fuhjxim591c1bgpy7g0mdulv54xbn6atzbc95oyutvq6wlww18uvp9etrhndb1irdmhuv26m0244bolfyvi0c4ab070m7qob6t5u14o1nj7mtugugsezgbu1vy4kfq5f3g09gy8qy6eqi3',
                country: 'b7gxa0l6doto7sirzmryc8jx5irm0ngcguwwuc5jrsgp8k0x2u',
                year: 8644839117,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CustomerName is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST test/customer - Got 400 Conflict, CustomerCountry is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/test/customer')
            .set('Accept', 'application/json')
            .send({
                id: '1f330e9e-1929-4df4-94c5-41904feeca8d',
                name: 'ur64u06dwndyyhx6zaanjp4kvm9f7dg0nofgt4bmzjxfm5tmup3d6m2lk36hmz7v2cyw8al2rgk7wwuh38axuyhs8ovhdhtyrbhkxfmh6pbmd68rzxk5kywi6gorr3wp0pxy8o6jjtrycy4rl39nfdj0k97ljukb59xrg7o0cduosl28jws2l5nekswmycv4vv1hncu2j2231278qvay4xyvmz1h1ibe3spza1qwjg1kurdvyrk15fj8bkg23sz',
                country: '4g3bm8waph6mokogwsk0fpjp60hrbt4o7d27qnljwf905s38mkx',
                year: 4714970709,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CustomerCountry is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST test/customer - Got 400 Conflict, CustomerYear is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/test/customer')
            .set('Accept', 'application/json')
            .send({
                id: '354c4fb2-431a-451c-8022-ccf45aa60333',
                name: '0uybhamsriukoukoh1h6q92ai9ji8wi9rrigjz0i40zgu1b0pmte6l4chdnk9d28aclweinpud5trr5c1v94vdnqcne3c7a3x92j9hhtg3ol648c5y1hgafe76l1ojljno46tch5a0bury7ga38lsm7u2vck3mdvgk6ibgq82yz6dyzigaev1iuh52x31zr6gzx1hapenejel9jzy5jitjfd12i260xyivo2b4efj31huu0kuguga0dhgnj5aqs',
                country: 'mqo9mxuj24r7njci7y54yb741rt5tgiknzss8upl0984y5mbwj',
                year: 43366604298,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CustomerYear is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST test/customer - Got 400 Conflict, CustomerYear must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/test/customer')
            .set('Accept', 'application/json')
            .send({
                id: 'aa275ee9-b01b-4143-92c8-790dcbbd5a55',
                name: '95sxriq3g90mmsyabh7ofkpuxjkazasyybp9k14wr1mcje7rtjqeup42jxdygolgnaba4u8snwz75dv1hrqd4244n1v4ir4c2p1kxj36v5b93fyjo56zjtlidnut36xbem0ygt1y7sl4ckxqp5ysr68tz2lq6gqar3zbynhmypehoa6x6zh9he0atkjsuk34id98511pd0qhb2lr3s3d4rog9vcjaxkkmwpwxq5wtbmd0zn8qqy2alx9cj0r580',
                country: 'ld5mih6h7x1ktzaqhbr2lpricj1q40ejtd6xrfwz9z0tsehw1x',
                year: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for CustomerYear must have a positive sign, this field does not accept negative values');
            });
    });

    test(`/REST:POST test/customer - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/test/customer')
            .set('Accept', 'application/json')
            .send(seeder.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:GET test/customers/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/test/customers/paginate')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    offset: 0,
                    limit: 5
                }
            })
            .expect(200)
            .expect({
                total   : seeder.collectionResponse.length,
                count   : seeder.collectionResponse.length,
                rows    : seeder.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET test/customers`, () =>
    {
        return request(app.getHttpServer())
            .get('/test/customers')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(seeder.collectionResponse);
    });

    test(`/REST:GET test/customer - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/test/customer')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: 'c4051556-682d-46d4-a72a-66d63f6a2277'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:POST test/customer`, () =>
    {
        return request(app.getHttpServer())
            .post('/test/customer')
            .set('Accept', 'application/json')
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                country: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                year: 3170693562,
            })
            .expect(201);
    });

    test(`/REST:GET test/customer`, () =>
    {
        return request(app.getHttpServer())
            .get('/test/customer')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:GET test/customer/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/test/customer/67a358da-ffe5-4850-85c2-57c27064f716')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET test/customer/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/test/customer/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:PUT test/customer - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/test/customer')
            .set('Accept', 'application/json')
            .send({
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                name: '12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g4',
                country: '3tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkp',
                year: 6799810054,
            })
            .expect(404);
    });

    test(`/REST:PUT test/customer`, () =>
    {
        return request(app.getHttpServer())
            .put('/test/customer')
            .set('Accept', 'application/json')
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                country: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                year: 7655093940,
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:DELETE test/customer/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/test/customer/407c9fc4-ed2d-4576-95a9-aec543b2d134')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE test/customer/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/test/customer/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL testCreateCustomer - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:TestCreateCustomerInput!)
                    {
                        testCreateCustomer (payload:$payload)
                        {
                            id
                            name
                            country
                            year
                        }
                    }
                `,
                variables:
                {
                    payload: _.omit(seeder.collectionResponse[0], ['createdAt','updatedAt','deletedAt'])
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('already exist in database');
            });
    });

    test(`/GraphQL testPaginateCustomers`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        testPaginateCustomers (query:$query constraint:$constraint)
                        {
                            total
                            count
                            rows
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        offset: 0,
                        limit: 5
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.testPaginateCustomers.total).toBe(seeder.collectionResponse.length);
                expect(res.body.data.testPaginateCustomers.count).toBe(seeder.collectionResponse.length);
                expect(res.body.data.testPaginateCustomers.rows).toStrictEqual(seeder.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL testGetCustomers`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        testGetCustomers (query:$query)
                        {
                            id
                            name
                            country
                            year
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.testGetCustomers.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL testCreateCustomer`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:TestCreateCustomerInput!)
                    {
                        testCreateCustomer (payload:$payload)
                        {
                            id
                            name
                            country
                            year
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        country: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        year: 3073512940,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.testCreateCustomer).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL testFindCustomer - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        testFindCustomer (query:$query)
                        {
                            id
                            name
                            country
                            year
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: '59e35f7f-1241-4702-8214-af74e1c625a3'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL testFindCustomer`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        testFindCustomer (query:$query)
                        {
                            id
                            name
                            country
                            year
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.testFindCustomer.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL testFindCustomerById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        testFindCustomerById (id:$id)
                        {
                            id
                            name
                            country
                            year
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7ae99a83-6006-4532-b5f7-01d39a5b784c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL testFindCustomerById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        testFindCustomerById (id:$id)
                        {
                            id
                            name
                            country
                            year
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.testFindCustomerById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL testUpdateCustomer - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:TestUpdateCustomerInput!)
                    {
                        testUpdateCustomer (payload:$payload)
                        {
                            id
                            name
                            country
                            year
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        name: '12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g4',
                        country: '3tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkp',
                        year: 8658950605,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL testUpdateCustomer`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:TestUpdateCustomerInput!)
                    {
                        testUpdateCustomer (payload:$payload)
                        {
                            id
                            name
                            country
                            year
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        country: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        year: 7178642594,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.testUpdateCustomer.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL testDeleteCustomerById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        testDeleteCustomerById (id:$id)
                        {
                            id
                            name
                            country
                            year
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '82599706-f856-414b-9714-5f8af82524ef'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL testDeleteCustomerById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        testDeleteCustomerById (id:$id)
                        {
                            id
                            name
                            country
                            year
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.testDeleteCustomerById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});