import { DbType } from "../adapters/createDb.adapter";
import { Convite } from "../models/convite.model";
import ConviteRepository from "../repository/convite.repository";
import BaseService from "./base.service";
const csvHandler = require('../utils/componentUploadCsv');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment'); 
const enviandoEmail = require('../utils/componentEmail');

export class ConviteService extends BaseService<Convite> {
  
  repository: ConviteRepository;


  constructor(dbType: DbType, model: any) {
    //Cria o repositório com dados para obter o banco de dados
    var _repository: ConviteRepository = new ConviteRepository(dbType, model);
    super(_repository, dbType, model);
    this.repository = _repository;
  }

  async sendInvitation (users: any[], expirationDays: any, transporterConfig: any) {
    const emailRemetente = "eduardadudavaz@hotmail.com";
    const senhaRemetente = "#EdVaMa7760";
    const assunto = 'Convite para entrar na aplicação';

    let todosSucessos = true;
    let resultados = [];

    for (let i = 0; i < users.length; i++) {
        const arrayemailRecebedor = [users[i].email];
        const arraynomeRecebedor = [users[i].name];

        const roles = users[i].roles;
        const token = uuidv4();
        const signUpUrl = `https://localhost:4200/signup?token=${token}`;
        const mensagem = `Olá ${arraynomeRecebedor}, <p>Clique <a href="${signUpUrl}">aqui</a> para participar do nosso aplicativo</p>`;
        const expirationDate = moment().add(expirationDays, 'days').toDate();

        const resultado = await enviandoEmail(transporterConfig, emailRemetente, assunto, mensagem, arrayemailRecebedor, arraynomeRecebedor);
        resultados.push({ email: arrayemailRecebedor, resultado });

        if (resultado !== 'Sucesso') {
            todosSucessos = false;
        }

        const newInvitation = ({
            userName: arraynomeRecebedor[0],
            userEmail: arrayemailRecebedor[0],
            date: new Date(),
            token: token,
            roles: roles,
            expirationDate: expirationDate
        });

        this.repository.create(newInvitation);
        console.log("Convite salvo no banco de dados:", newInvitation);
    }

    if (todosSucessos) {
      return { message: 'Todos os e-mails foram enviados com sucesso', resultados };
    } else {
      return { message: 'Houve erros no envio de alguns e-mails', resultados }
    }
  }


  async verifyUser (email: string, name: string, roles: [string]){
    if (!email || !name) {
      console.log('Email and name are required');
      return false;
    }
    
    try{
      let user = await this.repository.findOne({userEmail: email, userName: name});
      if(user){
        return true;
      }else{
        return false;
      }
    }catch(e){
      console.log(e);
      return false;
    }
  }


  async verifyInvites(email: string, name: string, roles: [string]){
    if (!email || !name) {
      console.log('Email and name are required');
      return false;
    }

    try{
      let invites = await this.repository.findCustom({email: email});
      if(invites){
        return true;
      }else{
        return false;
      }
    }catch(e){
      console.log(e);
      return false;
    }
  }
  
}

