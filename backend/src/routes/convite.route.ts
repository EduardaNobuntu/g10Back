import { Application, Router } from 'express';
import validateHeaders from './validators/index.validator';
import { createNewConviteValidator, findAllConviteValidator } from './validators/convite.validator';
import { ConviteController } from '../controllers/convite.controller';
import changeTenant from '../middlewares/tenant.middleware';
import { verifyAccess } from '../middlewares/auth.middleware';

/**
 * Irá definir as rotas da entidade
 * @param app Instância da aplicação express
 */
export default function defineRoute(app: Application) {
  const controller: ConviteController = new ConviteController();
  const router: Router = Router();

  router.post("/send", [verifyAccess, changeTenant, ...createNewConviteValidator, validateHeaders], controller.sendInvitation);
  router.post("/verifyUser", [verifyAccess, changeTenant, ...createNewConviteValidator, validateHeaders], controller.verifyUser);
  router.post("/verifyInvites", [verifyAccess, changeTenant, ...createNewConviteValidator, validateHeaders], controller.verifyInvites);

  //Create a new
  router.post('/', [verifyAccess, changeTenant, ...createNewConviteValidator, validateHeaders], controller.create);
  //Find all
  router.get('/', [verifyAccess, changeTenant, ...findAllConviteValidator, validateHeaders], controller.findAll);
  //Find by id
  router.get('/:id', controller.findById);
  //Update
  router.put('/:id', controller.update);
  //Delete all
  router.delete('/all', controller.deleteAll);
  //Delete
  router.delete('/:id', controller.delete);



  app.use('/api/convite', router);
};
