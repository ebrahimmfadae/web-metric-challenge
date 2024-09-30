import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import Fastify from 'fastify';
import routes from 'src/routes';

const fastify = Fastify({ logger: true });

await fastify.register(fastifySwagger, {
	openapi: {
		openapi: '3.0.0',
		info: {
			title: 'WebMetric NodeJS Challenge',
			description:
				'A simple project to demonstrate a working example of caching and rate-limiting.',
			version: '0.1.0',
			contact: { email: 'ebrahimmfadae@gmail.com', name: 'Ebrahim Hoseiny Fadaei' },
		},
		servers: [
			{
				url: 'http://localhost:3000',
				description: 'Development server',
			},
		],
		tags: [{ name: 'user', description: 'User related end-points' }],
		components: {
			securitySchemes: {
				Authorization: {
					type: 'apiKey',
					name: 'Authorization',
					in: 'header',
				},
			},
		},
	},
});

await fastify.register(fastifySwaggerUi, {
	routePrefix: '/documentation',
	uiConfig: {
		docExpansion: 'full',
		deepLinking: false,
	},
	staticCSP: true,
	theme: { title: 'Swagger - WebMetric NodeJS Challenge' },
	transformSpecificationClone: true,
});

fastify.register(routes);
await fastify.ready();
fastify.swagger();

try {
	await fastify.listen({ port: 3000 });
} catch (err) {
	fastify.log.error(err);
	process.exit(1);
}
