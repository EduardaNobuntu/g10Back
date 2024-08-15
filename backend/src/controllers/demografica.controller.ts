import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { DemograficaService } from "../services/demografica.service";
import { Demografica } from "../models/demografica.model";

export class DemograficaController {

  async create(req: Request, res: Response) {

    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const demograficaService: DemograficaService = new DemograficaService(req.databaseConnection.databaseType, req.databaseConnection.models["demografica"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Demografica> = new BaseController(demograficaService, "Demografica");

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
      const demograficaService: DemograficaService = new DemograficaService(req.databaseConnection.databaseType, req.databaseConnection.models["demografica"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Demografica> = new BaseController(demograficaService, "Demografica");

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
      const demograficaService: DemograficaService = new DemograficaService(req.databaseConnection.databaseType, req.databaseConnection.models["demografica"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Demografica> = new BaseController(demograficaService, "Demografica");

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
      const demograficaService: DemograficaService = new DemograficaService(req.databaseConnection.databaseType, req.databaseConnection.models["demografica"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Demografica> = new BaseController(demograficaService, "Demografica");

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
      const demograficaService: DemograficaService = new DemograficaService(req.databaseConnection.databaseType, req.databaseConnection.models["demografica"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Demografica> = new BaseController(demograficaService, "Demografica");

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
      const demograficaService: DemograficaService = new DemograficaService(req.databaseConnection.databaseType, req.databaseConnection.models["demografica"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Demografica> = new BaseController(demograficaService, "Demografica");

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
      const demograficaService: DemograficaService = new DemograficaService(req.databaseConnection.databaseType, req.databaseConnection.models["demografica"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Demografica> = new BaseController(demograficaService, "Demografica");

      baseController.deleteAll(req, res);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }
  }

  async getResposta(req: Request, res: Response) {
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const demograficaService: DemograficaService = new DemograficaService(req.body.databaseConnection.dbType, req.body.databaseConnection.user);
      const baseController: BaseController<Demografica> = new BaseController(demograficaService, "demografica");

      const demografica = await demograficaService.getResposta(req.params.id, req.body.idUser);
      if (!demografica) {
        return res.status(404).json({ message: "A entidade pergunta com id " + req.params.id + " não encontrada!" });
      }

      return res.status(200).json(demografica);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

  async createResposta(req: Request, res: Response) {
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const demograficaService: DemograficaService = new DemograficaService(req.body.databaseConnection.dbType, req.body.databaseConnection.user);
      const baseController: BaseController<Demografica> = new BaseController(demograficaService, "demografica");

      const demografica = await demograficaService.createResposta(req.params.id, req.body);
      if (!demografica) {
        return res.status(404).json({ message: "A entidade pergunta com id " + req.params.id + " não encontrada!" });
      }

      return res.status(200).json(demografica);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

  async groupRespostas(req: Request, res: Response) {
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const demograficaService: DemograficaService = new DemograficaService(req.body.databaseConnection.dbType, req.body.databaseConnection.user);
      const baseController: BaseController<Demografica> = new BaseController(demograficaService, "demografica");

      const demografica = await demograficaService.groupRespostas(req.params.id, req.body.numResp, req.body.pesoEntrevistado, req.body.pesoEntrevistador);
      if (!demografica) {
        return res.status(404).json({ message: "A entidade pergunta com id " + req.params.id + " não encontrada!" });
      }

      return res.status(200).json(demografica);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

  async createAlternativa(req: Request, res: Response) {
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const demograficaService: DemograficaService = new DemograficaService(req.body.databaseConnection.dbType, req.body.databaseConnection.user);
      const baseController: BaseController<Demografica> = new BaseController(demograficaService, "demografica");

      const demografica = await demograficaService.createAlternativa(req.params.id, req.body);
      if (!demografica) {
        return res.status(404).json({ message: "A entidade pergunta com id " + req.params.id + " não encontrada!" });
      }

      return res.status(200).json(demografica);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

  async updateAlternativa(req: Request, res: Response) {
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const demograficaService: DemograficaService = new DemograficaService(req.body.databaseConnection.dbType, req.body.databaseConnection.user);
      const baseController: BaseController<Demografica> = new BaseController(demograficaService, "demografica");

      const demografica = await demograficaService.updateAlternativa(req.params.id, req.body);
      if (!demografica) {
        return res.status(404).json({ message: "A entidade pergunta com id " + req.params.id + " não encontrada!" });
      }

      return res.status(200).json(demografica);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

  async uploadDemografica(req: Request, res: Response) {
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const demograficaService: DemograficaService = new DemograficaService(req.body.databaseConnection.dbType, req.body.databaseConnection.user);
      const baseController: BaseController<Demografica> = new BaseController(demograficaService, "demografica");

      const demografica = await demograficaService.uploadDemografica(req.params.id, req.body.filePath);
      if (!demografica) {
        return res.status(404).json({ message: "A entidade pergunta com id " + req.params.id + " não encontrada!" });
      }

      return res.status(200).json(demografica);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }
  }

}