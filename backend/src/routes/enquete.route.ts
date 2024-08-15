import { Application, Router } from 'express';
import validateHeaders from './validators/index.validator';
import { createNewEnqueteValidator, findAllEnqueteValidator } from './validators/enquete.validator';
import { verifyAccess } from '../middlewares/auth.middleware';
import changeTenant from '../middlewares/tenant.middleware';
import { EnqueteController } from '../controllers/enquete.controller';

/**
 * Irá definir as rotas da entidade
 * @param app Instância da aplicação express
 */
export default function defineRoute(app: Application){
  const controller : EnqueteController = new EnqueteController();
  const router: Router = Router();

  router.post("/transmissao/:id", [verifyAccess, changeTenant, ...createNewEnqueteValidator, validateHeaders], controller.createTransmissao);
  router.post("/demografica/:id", [verifyAccess, changeTenant, ...createNewEnqueteValidator, validateHeaders], controller.createDemografica);
  router.post("/:id", [verifyAccess, changeTenant, ...createNewEnqueteValidator, validateHeaders], controller.createPergunta);
  router.get("/aggregateDemografica:id", [verifyAccess, changeTenant, ...createNewEnqueteValidator, validateHeaders], controller.findOneAggregateDemografica);
 
   router.get("/pdfpremiada/:id/:colocado", verifyAccess, controller.relatorioPremiada);
   router.get("/pdfcategorias/:id", verifyAccess, controller.relatorioCategorias);
   router.get("/pdfallresp/:id", verifyAccess, controller.relatorioAllRespostas);

   //Create a new
   router.post('/', [verifyAccess, changeTenant, ...createNewEnqueteValidator, validateHeaders] ,controller.create);
   //Find all
   router.get('/', [verifyAccess, changeTenant, ...findAllEnqueteValidator, validateHeaders], controller.findAll);
   //Find by id
   router.get('/:id', controller.findById);
   //Update
   router.put('/:id', controller.update);
   //Delete all
   router.delete('/all', controller.deleteAll);
   //Delete
   router.delete('/:id', controller.delete);
  

  app.use('/api/enquete', router);
};
