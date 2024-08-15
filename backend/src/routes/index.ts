import { Application } from 'express';

import userRoutes from './user.route';
import tenantRoutes from './tenant.route';
import roleRoutes from './role.route';
import tenantCredentialRoutes from './tenantCredential.route';
import orderRoutes from './order.route';
import contatoRoutes from './contato.route';
import conviteRoutes from './convite.route';
import demograficaRoutes from './demografica.route';
import empresaRoutes from './empresa.route';
import enqueteRoutes from './enquete.route';
import perguntaRoutes from './pergunta.route';
import transmissaoRoutes from './transmissao.route';

/**
 * Define as rotas da aplicação
 * @param app Instância do aplicação Express
 */
export function setRoutes(app: Application) {

  /**
   * Chama função que irá definir quais rotas a aplicação terá
   */
  roleRoutes(app);

  userRoutes(app);

  tenantCredentialRoutes(app);

  tenantRoutes(app);

  contatoRoutes(app);

  conviteRoutes(app);

  demograficaRoutes(app);

  empresaRoutes(app);

  enqueteRoutes(app);

  orderRoutes(app);

  perguntaRoutes(app);

  transmissaoRoutes(app);

  orderRoutes(app);

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

}