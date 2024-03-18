import fastify from 'fastify';
import cors from '@fastify/cors';
import userRoutes from './routes/user.routes.js';

const app = fastify({ logger: true });

app.register(cors, {
    origin: '*',
});

app.get('/', (res, reply) => {
    return {
        "code": 200,
        status: "UP",
        message: "Servidor Rodando!"
    }
})

app.register(userRoutes);

app.listen({ host: 'localhost', port: `5000` }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    //app.log.info(`Server listening on ${address}`);
    console.log(`Server listening on ${address}`);
});
