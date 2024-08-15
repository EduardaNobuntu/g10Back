import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { Convite } from "../models/convite.model";
import { ConviteService } from "../services/convite.service";

export class ConviteController {

  async create(req: Request, res: Response) {

    try {

      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com Convite");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const conviteService: ConviteService = new ConviteService(req.databaseConnection.databaseType, req.databaseConnection.models["convite"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Convite> = new BaseController(conviteService, "Convite");

      baseController.create(req, res);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

  async findAll(req: Request, res: Response) {

    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com Convite");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const conviteService: ConviteService = new ConviteService(req.databaseConnection.databaseType, req.databaseConnection.models["convite"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Convite> = new BaseController(conviteService, "Convite");

      baseController.findAll(req, res);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

  async findById(req: Request, res: Response) {

    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com Convite");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const conviteService: ConviteService = new ConviteService(req.databaseConnection.databaseType, req.databaseConnection.models["convite"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Convite> = new BaseController(conviteService, "Convite");

      baseController.findById(req, res);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

  async getCount(req: Request, res: Response) {

    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com Convite");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const conviteService: ConviteService = new ConviteService(req.databaseConnection.databaseType, req.databaseConnection.models["convite"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Convite> = new BaseController(conviteService, "Convite");

      baseController.getCount(req, res);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

  async update(req: Request, res: Response) {

    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com Convite");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const conviteService: ConviteService = new ConviteService(req.databaseConnection.databaseType, req.databaseConnection.models["convite"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Convite> = new BaseController(conviteService, "Convite");

      baseController.update(req, res);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

  async delete(req: Request, res: Response) {

    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com Convite");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const conviteService: ConviteService = new ConviteService(req.databaseConnection.databaseType, req.databaseConnection.models["Cconvite"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Convite> = new BaseController(conviteService, "Convite");

      baseController.delete(req, res);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

  async deleteAll(req: Request, res: Response) {

    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com Convite");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const conviteService: ConviteService = new ConviteService(req.databaseConnection.databaseType, req.databaseConnection.models["convite"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Convite> = new BaseController(conviteService, "Convite");

      baseController.deleteAll(req, res);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

  async sendInvitation(req: Request, res: Response) {
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com convite");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const conviteService: ConviteService = new ConviteService(req.body.databaseConnection.dbType, req.body.databaseConnection.user);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Convite> = new BaseController(conviteService, "convite");

      const convite = await conviteService.sendInvitation(req.body.users, req.body.expirationDays, req.body.transporterConfig);
      if (!convite) {
        return res.status(404).json({ message: "A entidade convite com id " + req.params.id + " não encontrada!" });
      }

      return res.status(200).json(convite);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

  async verifyUser(req: Request, res: Response) {
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com convite");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      const conviteService: ConviteService = new ConviteService(req.body.databaseConnection.dbType, req.body.databaseConnection.user);
      const baseController: BaseController<Convite> = new BaseController(conviteService, "convite");

      const convite = await conviteService.verifyUser(req.body.email, req.body.name, req.body.roles);
      if (!convite) {
        return res.status(404).json({ message: "A entidade convite com id " + req.params.id + " não encontrada!" });
      }

      return res.status(200).json(convite);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }


  }

  async verifyInvites(req: Request, res: Response) {
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com convite");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const conviteService: ConviteService = new ConviteService(req.body.databaseConnection.dbType, req.body.databaseConnection.user);
      const baseController: BaseController<Convite> = new BaseController(conviteService, "convite");

      const convite = await conviteService.verifyInvites(req.body.email, req.body.name, req.body.roles);
      if (!convite) {
        return res.status(404).json({ message: "A entidade convite com id " + req.params.id + " não encontrada!" });
      }

      return res.status(200).json(convite);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

}


