import type { FastifyPluginCallback, RouteShorthandOptions } from 'fastify';

const routes: FastifyPluginCallback = async function (fastify) {
	const opts: RouteShorthandOptions = {
		schema: {
			response: {
				200: {
					type: 'object',
					properties: {
						id: { type: 'string' },
						nonce: { type: 'string' },
					},
					required: ['id', 'nonce'],
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
