import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { Pergunta } from "../models/pergunta.model";
import { PerguntaService } from "../services/pergunta.service";

export class PerguntaController {

  async create(req: Request, res: Response) {

    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const perguntaService: PerguntaService = new PerguntaService(req.databaseConnection.databaseType, req.databaseConnection.models["pergunta"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Pergunta> = new BaseController(perguntaService, "Pergunta");

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
      const perguntaService: PerguntaService = new PerguntaService(req.databaseConnection.databaseType, req.databaseConnection.models["pergunta"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Pergunta> = new BaseController(perguntaService, "Pergunta");

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
      const perguntaService: PerguntaService = new PerguntaService(req.databaseConnection.databaseType, req.databaseConnection.models["pergunta"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Pergunta> = new BaseController(perguntaService, "Pergunta");

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
      const perguntaService: PerguntaService = new PerguntaService(req.databaseConnection.databaseType, req.databaseConnection.models["pergunta"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Pergunta> = new BaseController(perguntaService, "Pergunta");

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
      const perguntaService: PerguntaService = new PerguntaService(req.databaseConnection.databaseType, req.databaseConnection.models["pergunta"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Pergunta> = new BaseController(perguntaService, "Pergunta");

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
      const perguntaService: PerguntaService = new PerguntaService(req.databaseConnection.databaseType, req.databaseConnection.models["pergunta"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Pergunta> = new BaseController(perguntaService, "Pergunta");

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
      const perguntaService: PerguntaService = new PerguntaService(req.databaseConnection.databaseType, req.databaseConnection.models["pergunta"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Pergunta> = new BaseController(perguntaService, "Pergunta");

      baseController.deleteAll(req, res);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }
  }

  async obterRespostasDeTodasPerguntas(req: Request, res: Response) {
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const perguntaService: PerguntaService = new PerguntaService(req.body.databaseConnection.dbType, req.body.databaseConnection.user);
      const baseController: BaseController<Pergunta> = new BaseController(perguntaService, "pergunta");

      const pergunta = await perguntaService.obterRespostasDeTodasPerguntas(req.params.id, req.body.nameEntrevistado, req.body.nameEntrevistador, req.body.pesoEntrevistado, req.body.pesoEntrevistador);
      if (!pergunta) {
        return res.status(404).json({ message: "A entidade pergunta com id " + req.params.id + " não encontrada!" });
      }

      return res.status(200).json(pergunta);
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
      const perguntaService: PerguntaService = new PerguntaService(req.body.databaseConnection.dbType, req.body.databaseConnection.user);
      const baseController: BaseController<Pergunta> = new BaseController(perguntaService, "pergunta");

      const result = await perguntaService.createAlternativa(req.params.id, req.body.data);
      return res.status(result!.status).json(result);
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
      const perguntaService: PerguntaService = new PerguntaService(req.body.databaseConnection.dbType, req.body.databaseConnection.user);
      const baseController: BaseController<Pergunta> = new BaseController(perguntaService, "pergunta");

      const result = await perguntaService.updateAlternativa(req.params.id, req.body.data);
      return res.status(result!.status).json(result);

    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

  async findAlternativa(req: Request, res: Response) {
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const perguntaService: PerguntaService = new PerguntaService(req.body.databaseConnection.dbType, req.body.databaseConnection.user);
      const baseController: BaseController<Pergunta> = new BaseController(perguntaService, "pergunta");

      const result = await perguntaService.findAlternativa(req.params.id);
      return res.status(result!.status).json(result);
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
      const perguntaService: PerguntaService = new PerguntaService(req.body.databaseConnection.dbType, req.body.databaseConnection.user);
      const baseController: BaseController<Pergunta> = new BaseController(perguntaService, "pergunta");

      const result = await perguntaService.createResposta(req.params.id, req.body.data);
      return res.status(result!.status).json(result);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

  async updateResposta(req: Request, res: Response) {
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }
      //O Service será criado com base no tipo de banco de dados e o model usado
      const perguntaService: PerguntaService = new PerguntaService(req.body.databaseConnection.dbType, req.body.databaseConnection.user);
      const baseController: BaseController<Pergunta> = new BaseController(perguntaService, "pergunta");

      const result = await perguntaService.updateResposta(req.params.id, req.body.data);
      return res.status(result!.status).json(result);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

  async updateAllRespostas(req: Request, res: Response) {
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }
      //O Service será criado com base no tipo de banco de dados e o model usado
      const perguntaService: PerguntaService = new PerguntaService(req.body.databaseConnection.dbType, req.body.databaseConnection.user);
      const baseController: BaseController<Pergunta> = new BaseController(perguntaService, "pergunta");

      const result = await perguntaService.updateAllRespostas(req.params.id, req.body.data);
      return res.status(result!.status).json(result);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

  async getRespostas(req: Request, res: Response) {
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const perguntaService: PerguntaService = new PerguntaService(req.body.databaseConnection.dbType, req.body.databaseConnection.user);
      const baseController: BaseController<Pergunta> = new BaseController(perguntaService, "pergunta");

      const result = await perguntaService.getRespostas(req.params.id, req.params.idUser);
      return res.status(result!.status).json(result);
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
      const perguntaService: PerguntaService = new PerguntaService(req.body.databaseConnection.dbType, req.body.databaseConnection.user);
      const baseController: BaseController<Pergunta> = new BaseController(perguntaService, "pergunta");

      const result = await perguntaService.groupRespostas(req.params.id, req.body.numResp, req.body.pesoEntrevistado, req.body.pesoEntrevistador);
      return res.status(result!.status).json(result);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

  async getQuestionWithResponses(req: Request, res: Response) {
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const perguntaService: PerguntaService = new PerguntaService(req.body.databaseConnection.dbType, req.body.databaseConnection.user);
      const baseController: BaseController<Pergunta> = new BaseController(perguntaService, "pergunta");

      const result = await perguntaService.getQuestionWithResponses(req.params.id);
      return result;
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

  async premiado(req: Request, res: Response) {
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const perguntaService: PerguntaService = new PerguntaService(req.body.databaseConnection.dbType, req.body.databaseConnection.user);
      const baseController: BaseController<Pergunta> = new BaseController(perguntaService, "pergunta");

      const result = await perguntaService.premiado(req.params.id, req.params.colocado, req.params.nameEntrevistado, req.params.nameEntrevistador);
      return res.status(result.status).json(result);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

  async uploadPergunta(req: Request, res: Response){
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const perguntaService: PerguntaService = new PerguntaService(req.body.databaseConnection.dbType, req.body.databaseConnection.user);
      const baseController: BaseController<Pergunta> = new BaseController(perguntaService, "pergunta");

      const result = await perguntaService.uploadPergunta(req.params.id, req.body.filePath);
      return result;
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }
  }

  async uploadResposta(req: Request, res: Response){
    
  }
}