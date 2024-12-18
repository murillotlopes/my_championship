import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json'
const endpointsFiles = ['../infra/http/presentation/**/routers/*.ts']
const PORT = process.env.PORT

const doc = {
  info: {
    title: 'API My Championship',
    description: 'Documentação da API My Championship',
    version: '0.1.0',
  },
  host: `localhost:${PORT}`,
  schemes: ['http'],
  tags: [
    { name: 'Compeonato', description: 'Endpoints relacionados a campeonato' },
    { name: 'Times', description: 'Endpoints relacionados a times' },
    { name: 'Chaveamento', description: 'Increve os times na competição' },
  ],
};

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger JSON gerado com sucesso!')
});
