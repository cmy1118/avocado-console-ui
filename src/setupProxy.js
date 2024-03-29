const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = (app) => {
	app.use(
		createProxyMiddleware('/oauth2', {
			target:
				'http://ec2-3-36-116-0.ap-northeast-2.compute.amazonaws.com:10200',
			changeOrigin: true,
		}),
	);
	app.use(
		createProxyMiddleware('/open-api', {
			target:
				'http://ec2-3-34-138-163.ap-northeast-2.compute.amazonaws.com:10200',
			changeOrigin: true,
			exposedHedaers: ['*'],
		}),
	);
	// app.use(
	// 	createProxyMiddleware('/altauthredirect/naver', {
	// 		target: 'https://nid.naver.com/oauth2.0/authorize',
	// 		changeOrigin: true,
	// 		exposedHedaers: ['*'],
	// 	}),
	// );
};
