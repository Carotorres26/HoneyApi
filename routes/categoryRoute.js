import Router from 'express';
const routesCategory = Router();

import { getCategory, postCategory, putCategory, deleteCategory, addSpecimen, editSpecimen, moveSpecimen, getSpecimenById, getSpecimenByName} from '../controllers/categoryController.js';

routesCategory.get('/', getCategory); 
routesCategory.post('/', postCategory); 
routesCategory.put('/', putCategory); 
routesCategory.delete('/:id', deleteCategory); 
routesCategory.post('/add-specimen', addSpecimen); 
routesCategory.put('/edit-specimen', editSpecimen); 
routesCategory.put('/move-specimen', moveSpecimen); 
//routesCategory.get('/specimen/:id', getSpecimenById);
routesCategory.get('/specimen-name/:name', getSpecimenByName);
  

export default routesCategory;
