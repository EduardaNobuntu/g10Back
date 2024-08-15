import { Application, Router } from 'express';
import validateHeaders from './validators/index.validator';
import { createNewEmpresaValidator, findAllEmpresaValidator } from './validators/empresa.validator';
import { EmpresaController } from '../controllers/empresa.controller';
import { verifyAccess } from '../middlewares/auth.middleware';
import changeTenant from '../middlewares/tenant.middleware';

/**
 * Irá definir as rotas da entidade
 * @param app Instância da aplicação express
 */
export default function defineRoute(app: Application){
  const controller : EmpresaController = new EmpresaController();
  const router: Router = Router();

   //Create a new
   router.post('/', [verifyAccess, changeTenant, ...createNewEmpresaValidator, validateHeaders] ,controller.create);
   //Find all
   router.get('/', [verifyAccess, changeTenant, ...findAllEmpresaValidator, validateHeaders], controller.findAll);
   //Find by id
   router.get('/:id', controller.findById);
   //Update
   router.put('/:id', controller.update);
   //Delete all
   router.delete('/all', controller.deleteAll);
   //Delete
   router.delete('/:id', controller.delete);
  

  app.use('/api/empresa', router);
};
