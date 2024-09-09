import express, { json } from 'express';
import dbConnection from '../database/config.js'; // Asegúrate de que esta función esté exportando una conexión a la base de datos
import 'dotenv/config'; // Para cargar las variables de entorno desde un archivo .env
import routesRol from '../routes/rolRoute.js';
import routesService from '../routes/serviceRoute.js';

class Server {
    constructor() {
        this.app = express();
        this.pathRol = '/api/Rol'; // Coincide con la solicitud que estás enviando
        this.pathService = '/api/services'; // Cambiado a minúsculas para la convención
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.connectToDatabase();
        this.listen();
    }

    async connectToDatabase() {
        try {
            await dbConnection();
            console.log('Connected to Mongo DB');
        } catch (error) {
            console.error('Failed to connect to Mongo DB:', error);
        }
    }

    initializeMiddlewares() {
        this.app.use(express.json()); // Habilitar middleware para analizar cuerpos JSON
    }

    initializeRoutes() {
        this.app.use(this.pathRol, routesRol);
        this.app.use(this.pathService, routesService);
    }

    listen() {
        const port = process.env.PORT || 3000; // Usa un puerto por defecto si no está definido en las variables de entorno
        this.app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    }
}

export default Server;
