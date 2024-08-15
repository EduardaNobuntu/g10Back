import { Application, Router } from 'express';
import validateHeaders from './validators/index.validator';
import { createNewTransmissaoValidator, findAllTransmissaoValidator } from './validators/transmissao.validator';
import { TransmissaoController } from '../controllers/transmissao.controller';
import { verifyAccess } from '../middlewares/auth.middleware';
import changeTenant from '../middlewares/tenant.middleware';

/**
 * Irá definir as rotas da entidade
 * @param app Instância da aplicação express
 */
export default function defineRoute(app: Application) {
  const controller: TransmissaoController = new TransmissaoController();
  const router: Router = Router();

  router.post("/:id", [verifyAccess, changeTenant, ...createNewTransmissaoValidator, validateHeaders], controller.createContato);
  router.post("/emails/:id", [verifyAccess, changeTenant, ...createNewTransmissaoValidator, validateHeaders], controller.sendEmails);
  router.post("/emailsTeste/:id", [verifyAccess, changeTenant, ...createNewTransmissaoValidator, validateHeaders], controller.sendEmailsTeste);


  //Create a new
  router.post('/', [verifyAccess, changeTenant, ...createNewTransmissaoValidator, validateHeaders], controller.create);
  //Find all
  router.get('/', [verifyAccess, changeTenant, ...findAllTransmissaoValidator, validateHeaders], controller.findAll);
  //Find by id
  router.get('/:id', controller.findById);
  //Update
  router.put('/:id', controller.update);
  //Delete all
  router.delete('/all', controller.deleteAll);
  //Delete
  router.delete('/:id', controller.delete);


  app.use('/api/transmissao', router);
};
