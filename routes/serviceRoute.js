import Router from 'express'
const routesService = Router()

import { getService, postService, putService, deleteService } from '../controllers/serviceController.js'

routesService.get('/', getService)
routesService.post('/', postService)
routesService.put('/', putService)
routesService.delete('/:id', deleteService)

export default routesService