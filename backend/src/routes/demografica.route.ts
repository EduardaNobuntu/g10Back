import { Application, Router } from 'express';
import validateHeaders from './validators/index.validator';
import { createNewDemograficaValidator, findAllDemograficaValidator } from './validators/demografica.validator';
import { DemograficaController } from '../controllers/demografica.controller';
import { verifyAccess } from '../middlewares/auth.middleware';
import changeTenant from '../middlewares/tenant.middleware';

/**
 * Irá definir as rotas da entidade
 * @param app Instância da aplicação express
 */
export default function defineRoute(app: Application) {
  const controller: DemograficaController = new DemograficaController();
  const router: Router = Router();

  router.get("/groupDemo/:id", [verifyAccess, changeTenant, ...createNewDemograficaValidator, validateHeaders], controller.groupRespostas);
  router.get("/respostasDemo/:idPergunta/:idDemografica", [verifyAccess, changeTenant, ...createNewDemograficaValidator, validateHeaders], controller.getResposta);
  router.post("/respostaDemografica/:id", [verifyAccess, changeTenant, ...createNewDemograficaValidator, validateHeaders], controller.createResposta);
  router.post("/alternativaDemografica/:id", [verifyAccess, changeTenant, ...createNewDemograficaValidator, validateHeaders], controller.createAlternativa);
  router.put("/alternativaDemografica/edit/:id", [verifyAccess, changeTenant, ...createNewDemograficaValidator, validateHeaders], controller.updateAlternativa);
  router.post("/uploadDemografica/:id", [verifyAccess, changeTenant, ...createNewDemograficaValidator, validateHeaders] , controller.uploadDemografica);

  //Create a new
  router.post('/', [verifyAccess, changeTenant, ...createNewDemograficaValidator, validateHeaders], controller.create);
  //Find all
  router.get('/', [verifyAccess, changeTenant, ...findAllDemograficaValidator, validateHeaders], controller.findAll);
  //Find by id
  router.get('/:id', controller.findById);
  //Update
  router.put('/:id', controller.update);
  //Delete all
  router.delete('/all', controller.deleteAll);
  //Delete
  router.delete('/:id', controller.delete);


  app.use('/api/demografica', router);
};
