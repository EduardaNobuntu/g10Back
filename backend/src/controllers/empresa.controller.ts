import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { EmpresaService } from "../services/empresa.service";
import { Empresa } from "../models/empresa.model";

export class EmpresaController {

  async create(req: Request, res: Response) {

    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const empresaService: EmpresaService = new EmpresaService(req.databaseConnection.databaseType, req.databaseConnection.models["empresa"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Empresa> = new BaseController(empresaService, "Empresa");

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
      const empresaService: EmpresaService = new EmpresaService(req.databaseConnection.databaseType, req.databaseConnection.models["empresa"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Empresa> = new BaseController(empresaService, "Empresa");

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
      const empresaService: EmpresaService = new EmpresaService(req.databaseConnection.databaseType, req.databaseConnection.models["empresa"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Empresa> = new BaseController(empresaService, "Empresa");

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
      const empresaService: EmpresaService = new EmpresaService(req.databaseConnection.databaseType, req.databaseConnection.models["empresa"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Empresa> = new BaseController(empresaService, "Empresa");

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
      const empresaService: EmpresaService = new EmpresaService(req.databaseConnection.databaseType, req.databaseConnection.models["empresa"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Empresa> = new BaseController(empresaService, "Empresa");

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
      const empresaService: EmpresaService = new EmpresaService(req.databaseConnection.databaseType, req.databaseConnection.models["empresa"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Empresa> = new BaseController(empresaService, "Empresa");

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
      const empresaService: EmpresaService = new EmpresaService(req.databaseConnection.databaseType, req.databaseConnection.models["empresa"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Empresa> = new BaseController(empresaService, "Empresa");

      baseController.deleteAll(req, res);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }
  }

}