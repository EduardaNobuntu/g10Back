import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { ContatoService } from "../services/contato.service";
import { Contato } from "../models/contato.model";

export class ContatoController {

  async create(req: Request, res: Response) {

    try {

      if(req.databaseConnection == undefined){
        console.warn("Erro ao obter dados da conexão com Contato");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const contatoService: ContatoService = new ContatoService(req.databaseConnection.databaseType, req.databaseConnection.models["contato"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Contato> = new BaseController(contatoService, "Contato");

      baseController.create(req, res);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

  async findAll(req: Request, res: Response) {

    try {
      if(req.databaseConnection == undefined){
        console.warn("Erro ao obter dados da conexão com Contato");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const contatoService: ContatoService = new ContatoService(req.databaseConnection.databaseType, req.databaseConnection.models["contato"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Contato> = new BaseController(contatoService, "Contato");

      baseController.findAll(req, res);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

  async findById(req: Request, res: Response) {

    try {
      if(req.databaseConnection == undefined){
        console.warn("Erro ao obter dados da conexão com Contato");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const contatoService: ContatoService = new ContatoService(req.databaseConnection.databaseType, req.databaseConnection.models["contato"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Contato> = new BaseController(contatoService, "Contato");

      baseController.findById(req, res);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

  async getCount(req: Request, res: Response) {

    try {
      if(req.databaseConnection == undefined){
        console.warn("Erro ao obter dados da conexão com Contato");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const contatoService: ContatoService = new ContatoService(req.databaseConnection.databaseType, req.databaseConnection.models["contato"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Contato> = new BaseController(contatoService, "Contato");

      baseController.getCount(req, res);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

  async update(req: Request, res: Response) {

    try {
      if(req.databaseConnection == undefined){
        console.warn("Erro ao obter dados da conexão com Contato");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const contatoService: ContatoService = new ContatoService(req.databaseConnection.databaseType, req.databaseConnection.models["contato"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Contato> = new BaseController(contatoService, "Contato");

      baseController.update(req, res);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

  async delete(req: Request, res: Response) {

    try {
      if(req.databaseConnection == undefined){
        console.warn("Erro ao obter dados da conexão com Contato");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const contatoService: ContatoService = new ContatoService(req.databaseConnection.databaseType, req.databaseConnection.models["contato"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Contato> = new BaseController(contatoService, "Contato");

      baseController.delete(req, res);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

  async deleteAll(req: Request, res: Response) {

    try {
      if(req.databaseConnection == undefined){
        console.warn("Erro ao obter dados da conexão com Contato");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const contatoService: ContatoService = new ContatoService(req.databaseConnection.databaseType, req.databaseConnection.models["contato"]);
      //Base Controller é uma classe que já tem implementado todas as funções de CRUD
      const baseController: BaseController<Contato> = new BaseController(contatoService, "Contato");

      baseController.deleteAll(req, res);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }

  }

  async uploadContato(req: Request, res: Response) {
    try {
      if (req.databaseConnection == undefined) {
        console.warn("Erro ao obter dados da conexão com tenant");
        return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
      }

      //O Service será criado com base no tipo de banco de dados e o model usado
      const contatoService: ContatoService = new ContatoService(req.databaseConnection.databaseType, req.databaseConnection.models["contato"]);
      const baseController: BaseController<Contato> = new BaseController(contatoService, "Contato");

      const contato = await contatoService.uploadContato(req.params.id, req.body.filePath);
      if (!contato) {
        return res.status(404).json({ message: "A entidade pergunta com id " + req.params.id + " não encontrada!" });
      }

      return res.status(200).json(contato);
    } catch (error) {
      return res.status(500).send({ message: "Ocorreu um erro desconhecido no servidor" });
    }
  }



}