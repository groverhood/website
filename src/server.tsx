
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Root } from './components/Root';
import { join } from 'path';

const port = 4040;

console.log(__dirname);

const app = express();
app.use(express.static(join(__dirname, 'public')));
app.get('/', (_, res) => {
	res.send(
		`<!DOCTYPE html>
		<html>
			<head>
				<meta charSet="utf-8"/>
				<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1"/>
				<link rel="stylesheet" type="text/css" href="http://localhost:${port}/index.css"/>
				<script src="http://localhost:${port}/bundle.js" defer></script>
			</head>
			<body>
				<div id="duncan-react-root">${ReactDOMServer.renderToString(<Root />)}</div>
			</body>
		</html>`
	);
});

app.listen(port, () => { console.log("Listening to port", port) });