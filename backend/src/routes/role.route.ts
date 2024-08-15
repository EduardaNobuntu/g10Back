import { Application, Router } from 'express';
import validateHeaders from './validators/index.validator';
import changeTenant from '../middlewares/tenant.middleware';
import { RoleController } from '../controllers/role.controller';
import { createNewRoleValidator, findAllRoleValidator } from './validators/role.validator';

/**
 * Irá definir as rotas da entidade
 * @param app Instância da aplicação express
 */
export default function defineRoute(app: Application){
  const controller : RoleController = new RoleController();
  const router: Router = Router();
  
  //Create a new
  router.post('/', [changeTenant, ...createNewRoleValidator, validateHeaders], controller.create);
  //Find all
  router.get('/', [...findAllRoleValidator, validateHeaders], controller.findAll);
  //Find count
  router.get('/count', controller.getCount);
  //Find by id
  router.get('/:id', controller.findById);
  //Update
  router.put('/:id', controller.update);
  //Delete all
  router.delete('/all', controller.deleteAll);
  //Delete
  router.delete('/:id', controller.delete);
    
  app.use('/api/role', router);
} 