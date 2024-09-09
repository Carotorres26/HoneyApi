import Router from 'express'
const routesRol = Router()
import { getRol, postRol, putRol, deleteRol } from '../controllers/rolController.js'

Router.get('/', getRol);
Router.post('/', postRol); // Asegúrate de que esta línea esté presente para manejar POST requests
Router.put('/', putRol);
Router.delete('/:id', deleteRol);

export default routesRol