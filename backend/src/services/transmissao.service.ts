import { DbType } from "../adapters/createDb.adapter";
import { Contato } from "../models/contato.model";
import { Transmissao } from "../models/transmissao.model";
import TransmissaoRepository from "../repository/transmissao.repository";
import BaseService from "./base.service";
import { ContatoService } from "./contato.service";
const enviandoEmail = require("../utils/componentEmail");

export class TransmissaoService extends BaseService<Transmissao> {

  repository: TransmissaoRepository;
  contatoService!: ContatoService;

  constructor(dbType: DbType, model: any) {
    //Cria o repositório com dados para obter o banco de dados
    var _repository: TransmissaoRepository = new TransmissaoRepository(dbType, model);
    super(_repository, dbType, model);
    this.repository = _repository;
  }

  async createContato(id:string, data: any) {
    const contato = {
      email: data.email,
      nome: data.nome,
      telefone: data.telefone,
    }

    const contact = this.contatoService.create(contato);

    return this.repository.createContato(id, {contato: contact});
  }

  async sendEmails(idEnquete:string, idtransmissao: string, data: { contato: string[] }, transporterConfig: any){
    const transmissao = await this.repository.findById(idtransmissao);

    let arrayIdContato = data.contato;
    var listEmails = [];
    var listNomes = [];
    var listIDs = [];
  
    for (let i = 0; i < arrayIdContato.length; i++) {
      if(this.dbType == "mongodb"){
        const data: any = await Contato.findById(arrayIdContato[i]);
        if (data == null) {
          console.log("A entidade Contato com id  não encontrada!");
        } else {
          listEmails[i] = data.email;
          listNomes[i] = data.nome;
          listIDs[i] = data.id;
        }
      }
    }
    return enviandoEmail.enviandoEmail(transporterConfig, transmissao!.emailRemetente, transmissao!.assunto, transmissao!.mensagem,  listEmails, listIDs, listNomes);
    //TODO: verificar os parametros enviados, para modificar isso
  }

  async sendEmailsTeste(idEnquete:string, idtransmissao: string, transporterConfig: any){
    const transmissao = await this.repository.findById(idtransmissao);
    const arrayEmailRemetente = [];
    const arrayNomeRemetente = [];

    arrayEmailRemetente.push(transmissao?.emailRemetente);
    arrayNomeRemetente.push("nomeRemetente");
    //TODO: verificar os parametros enviados, para modificar isso
    return enviandoEmail.enviandoEmail(transporterConfig, transmissao!.emailRemetente, transmissao!.assunto, transmissao!.mensagem, arrayEmailRemetente, arrayNomeRemetente);
  }


  
}

