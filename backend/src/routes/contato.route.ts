import { Application, Router } from 'express';
import validateHeaders from './validators/index.validator';
import { createNewContatoValidator, findAllContatoValidator } from './validators/contato.validator';
import { ContatoController } from '../controllers/contato.controller';
import { verifyAccess } from '../middlewares/auth.middleware';
import changeTenant from '../middlewares/tenant.middleware';

/**
 * Irá definir as rotas da entidade
 * @param app Instância da aplicação express
 */
export default function defineRoute(app: Application){
  const controller : ContatoController = new ContatoController();
  const router: Router = Router();

  //****router.post("/:id", verifyAccess, teste.teste);
   router.post("/upload/:id", verifyAccess, controller.uploadContato);

    //Create a new
    router.post('/', [verifyAccess, changeTenant, ...createNewContatoValidator, validateHeaders] ,controller.create);
    //Find all
    router.get('/', [verifyAccess, changeTenant, ...findAllContatoValidator, validateHeaders], controller.findAll);
    //Find by id
    router.get('/:id', controller.findById);
    //Update
    router.put('/:id', controller.update);
    //Delete all
    router.delete('/all', controller.deleteAll);
    //Delete
    router.delete('/:id', controller.delete);
  

  app.use('/api/contato', router);
};


