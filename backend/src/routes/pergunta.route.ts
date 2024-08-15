import { Application, Router } from 'express';
import validateHeaders from './validators/index.validator';
import { createNewPerguntaValidator, findAllPerguntaValidator } from './validators/pergunta.validator';
import { PerguntaController } from '../controllers/pergunta.controller';
import { verifyAccess } from '../middlewares/auth.middleware';
import changeTenant from '../middlewares/tenant.middleware';

/**
 * Irá definir as rotas da entidade
 * @param app Instância da aplicação express
 */
export default function defineRoute(app: Application) {
  const controller: PerguntaController = new PerguntaController();
  const router: Router = Router();

  router.put("/updateResposta/:id/:novaResposta", [verifyAccess, changeTenant, ...createNewPerguntaValidator, validateHeaders], controller.updateResposta);
  router.put("/updateRespostaAll/:id", [verifyAccess, changeTenant, ...createNewPerguntaValidator, validateHeaders], controller.updateAllRespostas);
  router.put("/updateAlternativa/:id", [verifyAccess, changeTenant, ...createNewPerguntaValidator, validateHeaders], controller.updateAlternativa)
  router.get("/alternativaFind/:id", [verifyAccess, changeTenant, ...createNewPerguntaValidator, validateHeaders], controller.findAlternativa);
  router.get("/premiada/:id/:colocado", [verifyAccess, changeTenant, ...createNewPerguntaValidator, validateHeaders], controller.premiado);
  router.get("/getRespostas/:id", [verifyAccess, changeTenant, ...createNewPerguntaValidator, validateHeaders], controller.getQuestionWithResponses);
  router.get("/respostas/:idPergunta/:idPergunta", [verifyAccess, changeTenant, ...createNewPerguntaValidator, validateHeaders], controller.getRespostas);
  router.get("/group/:id/:numResp/:pesoEntrevistado/:pesoEntrevistador", [verifyAccess, changeTenant, ...createNewPerguntaValidator, validateHeaders], controller.groupRespostas);
  router.post("/alternativa/:id", [verifyAccess, changeTenant, ...createNewPerguntaValidator, validateHeaders], controller.createAlternativa);
  router.post("/resposta/:id", [verifyAccess, changeTenant, ...createNewPerguntaValidator, validateHeaders], controller.createResposta);

  router.post("/upload/:id", verifyAccess, controller.uploadPergunta);
  router.post("/uploadResposta/:id", verifyAccess, controller.uploadResposta);


  //Create a new
  router.post('/', [verifyAccess, changeTenant, ...createNewPerguntaValidator, validateHeaders], controller.create);
  //Find all
  router.get('/', [verifyAccess, changeTenant, ...findAllPerguntaValidator, validateHeaders], controller.findAll);
  //Find by id
  router.get('/:id', controller.findById);
  //Update
  router.put('/:id', controller.update);
  //Delete all
  router.delete('/all', controller.deleteAll);
  //Delete
  router.delete('/:id', controller.delete);


  app.use('/api/pergunta', router);
};
