import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { EnqueteService } from "../services/enquete.service";
import { Enquete } from "../models/enquete.model";

export class EnqueteController {

  async create(req: Request, res: Response) {

    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const enqueteService: EnqueteService = new EnqueteService(req.databaseConnection.databaseType, req.databaseConnection.models["enquete"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Enquete> = new BaseController(enqueteService, "Enquete");

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
      const enqueteService: EnqueteService = new EnqueteService(req.databaseConnection.databaseType, req.databaseConnection.models["enquete"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Enquete> = new BaseController(enqueteService, "Enquete");

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
      const enqueteService: EnqueteService = new EnqueteService(req.databaseConnection.databaseType, req.databaseConnection.models["enquete"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Enquete> = new BaseController(enqueteService, "Enquete");

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
      const enqueteService: EnqueteService = new EnqueteService(req.databaseConnection.databaseType, req.databaseConnection.models["enquete"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Enquete> = new BaseController(enqueteService, "Enquete");

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
      const enqueteService: EnqueteService = new EnqueteService(req.databaseConnection.databaseType, req.databaseConnection.models["enquete"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Enquete> = new BaseController(enqueteService, "Enquete");

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
      const enqueteService: EnqueteService = new EnqueteService(req.databaseConnection.databaseType, req.databaseConnection.models["enquete"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Enquete> = new BaseController(enqueteService, "Enquete");

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
      const enqueteService: EnqueteService = new EnqueteService(req.databaseConnection.databaseType, req.databaseConnection.models["enquete"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Enquete> = new BaseController(enqueteService, "Enquete");

      baseController.deleteAll(req, res);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }
  }

  async findOneAggregateDemografica(req: Request, res: Response) {
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const enqueteService: EnqueteService = new EnqueteService(req.body.databaseConnection.dbType, req.body.databaseConnection.user);
      const baseController: BaseController<Enquete> = new BaseController(enqueteService, "enquete");

      const enquete = await enqueteService.findOneAggregateDemografica(req.params.id);
      if (!enquete) {
        return res.status(404).json({ message: "A entidade pergunta com id " + req.params.id + " não encontrada!" });
      }

      return res.status(200).json(enquete);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

  async createPergunta(req: Request, res: Response) {
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const enqueteService: EnqueteService = new EnqueteService(req.body.databaseConnection.dbType, req.body.databaseConnection.user);
      const baseController: BaseController<Enquete> = new BaseController(enqueteService, "enquete");

      const pergunta = await enqueteService.createPergunta(req.params.id, req.body);
      if (!pergunta) {
        return res.status(404).json({ message: "A entidade pergunta com id " + req.params.id + " não encontrada!" });
      }

      return res.status(200).json(pergunta);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

  async createTransmissao(req: Request, res: Response) {
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const enqueteService: EnqueteService = new EnqueteService(req.body.databaseConnection.dbType, req.body.databaseConnection.user);
      const baseController: BaseController<Enquete> = new BaseController(enqueteService, "enquete");

      const transmissao = await enqueteService.createTransmissao(req.params.id, req.body);
      if (!transmissao) {
        return res.status(404).json({ message: "A entidade pergunta com id " + req.params.id + " não encontrada!" });
      }

      return res.status(200).json(transmissao);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

  async createDemografica(req: Request, res: Response) {
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const enqueteService: EnqueteService = new EnqueteService(req.body.databaseConnection.dbType, req.body.databaseConnection.user);
      const baseController: BaseController<Enquete> = new BaseController(enqueteService, "enquete");

      const demografica = await enqueteService.createDemografica(req.params.id, req.body);
      if (!demografica) {
        return res.status(404).json({ message: "A entidade pergunta com id " + req.params.id + " não encontrada!" });
      }

      return res.status(200).json(demografica);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

  async relatorioCategorias(req: Request, res: Response) {
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const enqueteService: EnqueteService = new EnqueteService(req.body.databaseConnection.dbType, req.body.databaseConnection.user);
      const baseController: BaseController<Enquete> = new BaseController(enqueteService, "enquete");

      const relatorio = await enqueteService.relatorioCategorias(req.params.id);
      if (!relatorio) {
        return res.status(404).json({ message: "A entidade pergunta com id " + req.params.id + " não encontrada!" });
      }

      return res.status(200).json(relatorio);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }
  }

  async relatorioAllRespostas(req: Request, res: Response) {
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const enqueteService: EnqueteService = new EnqueteService(req.body.databaseConnection.dbType, req.body.databaseConnection.user);
      const baseController: BaseController<Enquete> = new BaseController(enqueteService, "enquete");

      const relatorio = await enqueteService.relatorioAllRespostas(req.params.id);
      if (!relatorio) {
        return res.status(404).json({ message: "A entidade pergunta com id " + req.params.id + " não encontrada!" });
      }

      return res.status(200).json(relatorio);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }
  }

  async relatorioPremiada(req: Request, res: Response) {
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const enqueteService: EnqueteService = new EnqueteService(req.body.databaseConnection.dbType, req.body.databaseConnection.user);
      const baseController: BaseController<Enquete> = new BaseController(enqueteService, "enquete");

      const relatorio = await enqueteService.relatorioPremiada(req.params.id, req.params.colocado);
      if (!relatorio) {
        return res.status(404).json({ message: "A entidade pergunta com id " + req.params.id + " não encontrada!" });
      }

      return res.status(200).json(relatorio);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }
  }



}