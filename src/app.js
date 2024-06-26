import express from 'express';
import exphbs from 'express-handlebars';
import http from 'http';
import { Server } from 'socket.io';
import displayRoutes from 'express-routemap';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';
import viewsRouter from './routes/views.js';
import { engine } from 'express-handlebars';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./src/public'));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use('/api/products', productsRouter(io));
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

const PORT = 8080;

server.listen(PORT, () => {
  displayRoutes(app);
  console.log(`Server running on port ${PORT}`);
});

io.on('connection', (socket) => {
  console.log('Client connected');
});

export default server;
