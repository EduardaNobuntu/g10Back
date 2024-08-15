import { Application, Router } from 'express';
import validateHeaders from './validators/index.validator';
import { createNewPdfValidator, findAllPdfValidator } from './validators/pdf.validator';
import { PdfController } from '../controllers/pdf.controller';
import { verifyAccess } from '../middlewares/auth.middleware';
import changeTenant from '../middlewares/tenant.middleware';

/**
 * Irá definir as rotas da entidade
 * @param app Instância da aplicação express
 */
export default function defineRoute(app: Application) {
  const controller: PdfController = new PdfController();
  const router: Router = Router();

  router.get("/pdfs/:file", verifyAccess, controller.baixar);
  router.get('/pdfsFind/:id', controller.getpdf); 

  //Create a new
  router.post('/', [verifyAccess, changeTenant, ...createNewPdfValidator, validateHeaders], controller.create);
  //Find all
  router.get('/', [verifyAccess, changeTenant, ...findAllPdfValidator, validateHeaders], controller.findAll);
  //Find by id
  router.get('/:id', controller.findById);
  //Update
  router.put('/:id', controller.update);
  //Delete all
  router.delete('/all', controller.deleteAll);
  //Delete
  router.delete('/:id', controller.delete);


  app.use('/api/pdf', router);
};
