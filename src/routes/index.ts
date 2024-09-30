import type { FastifyPluginCallback, RouteShorthandOptions } from 'fastify';

const routes: FastifyPluginCallback = async function (fastify) {
	const opts: RouteShorthandOptions = {
		schema: {
			description:
				'Returns a mocked response based on authenticated user. The `nonce` field is defined to differentiate individual requests that will reach the backend. For cached responses the `nonce` will not change.',
			tags: ['user'],
			security: [{ Authorization: [] }],
			response: {
				200: {
					type: 'object',
					properties: {
						id: { type: 'string' },
						nonce: { type: 'string' },
					},
					required: ['id', 'nonce'],
				},
				401: {
					type: 'object',
					properties: {
						message: { type: 'string', example: 'Unauthorized access.' },
					},
					required: ['message'],
				},
				429: {
					type: 'object',
					properties: {
						message: {
							type: 'string',
							example: 'Too many requests, please try again later.',
						},
					},
					required: ['message'],
				},
			},
		},
	};
	fastify.get('/data', opts, async function (request) {
		const { authorization } = request.headers;
		return { id: authorization ?? '', nonce: globalThis.crypto.randomUUID() };
	});
};

export default routes;
