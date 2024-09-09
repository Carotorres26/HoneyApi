import Router from 'express'
const routesRol = Router()
import { getRol, postRol, putRol, deleteRol } from '../controllers/rolController.js'

routesRol.get('/', getRol);
routesRol.post('/', postRol); // Asegúrate de que esta línea esté presente para manejar POST requests
routesRol.put('/', putRol);
routesRol.delete('/:id', deleteRol);

export default routesRol