import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { TransmissaoService } from "../services/transmissao.service";
import { Transmissao } from "../models/transmissao.model";

export class TransmissaoController {

  async create(req: Request, res: Response) {

    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const transmissaoService: TransmissaoService = new TransmissaoService(req.databaseConnection.databaseType, req.databaseConnection.models["transmissao"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Transmissao> = new BaseController(transmissaoService, "Transmissao");

      baseController.create(req, res);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const transmissaoService: TransmissaoService = new TransmissaoService(req.databaseConnection.databaseType, req.databaseConnection.models["transmissao"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Transmissao> = new BaseController(transmissaoService, "Transmissao");

      baseController.findAll(req, res);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const transmissaoService: TransmissaoService = new TransmissaoService(req.databaseConnection.databaseType, req.databaseConnection.models["transmissao"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Transmissao> = new BaseController(transmissaoService, "Transmissao");

      baseController.findById(req, res);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }
  }

  async getCount(req: Request, res: Response) {
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const transmissaoService: TransmissaoService = new TransmissaoService(req.databaseConnection.databaseType, req.databaseConnection.models["transmissao"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Transmissao> = new BaseController(transmissaoService, "Transmissao");

      baseController.getCount(req, res);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const transmissaoService: TransmissaoService = new TransmissaoService(req.databaseConnection.databaseType, req.databaseConnection.models["transmissao"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Transmissao> = new BaseController(transmissaoService, "Transmissao");

      baseController.update(req, res);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const transmissaoService: TransmissaoService = new TransmissaoService(req.databaseConnection.databaseType, req.databaseConnection.models["transmissao"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Transmissao> = new BaseController(transmissaoService, "Transmissao");

      baseController.delete(req, res);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const transmissaoService: TransmissaoService = new TransmissaoService(req.databaseConnection.databaseType, req.databaseConnection.models["transmissao"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Transmissao> = new BaseController(transmissaoService, "Transmissao");

      baseController.deleteAll(req, res);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }
  }

  async createContato(req: Request, res: Response) {
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const transmissaoService: TransmissaoService = new TransmissaoService(req.body.databaseConnection.dbType, req.body.databaseConnection.user);
      const baseController: BaseController<Transmissao> = new BaseController(transmissaoService, "transmissao");

      const result = await transmissaoService.createContato(req.params.id, req.body.data);
      return result;
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

  async sendEmails(req: Request, res: Response) {
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const transmissaoService: TransmissaoService = new TransmissaoService(req.body.databaseConnection.dbType, req.body.databaseConnection.user);
      const baseController: BaseController<Transmissao> = new BaseController(transmissaoService, "transmissao");

      const result = await transmissaoService.sendEmails(req.params.idEnquete, req.params.idtransmissao, req.body.data, req.body.transporterConfig);
      return result;
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

  async sendEmailsTeste(req: Request, res: Response) {
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const transmissaoService: TransmissaoService = new TransmissaoService(req.body.databaseConnection.dbType, req.body.databaseConnection.user);
      const baseController: BaseController<Transmissao> = new BaseController(transmissaoService, "transmissao");

      const result = await transmissaoService.sendEmailsTeste(req.params.idEnquete, req.params.idtransmissao, req.body.transporterConfig);
      return result;
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }


}