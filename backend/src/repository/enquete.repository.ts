import createDbAdapter, { DbType } from "../adapters/createDb.adapter";
import { IDatabaseAdapter } from "../adapters/IDatabase.adapter";
import { Enquete } from "../models/enquete.model";
import BaseRepository from "./base.repository";

export default class EnqueteRepository extends BaseRepository<Enquete>{

  dbType: DbType;
  model: any;

  constructor(dbType: DbType, model: any){
    const _adapter : IDatabaseAdapter<Enquete> = createDbAdapter<Enquete>(dbType, model, Enquete.fromJson);
    super(_adapter);
    this.dbType = dbType;
    this.model = model;
  }


  public async findOneAggregateDemografica (id: string) {
    if(this.dbType == 'mongodb'){
      var ObjectId = require('mongodb').ObjectID;
      let _aggregate = [];
      _aggregate.push(
        {
          $match: { "_id": new ObjectId(id) } // No need to convert to string and then back to ObjectId
        },
        {
          $lookup:{
              from: 'demograficas',
              "pipeline":[
                {
                  $project: {
                    _id: 1,
                    codPergDemografica: 1,
                    descPergDemografica: 1,
                    tipoPergDemografica: 1,
                    perguntaNoRelatorio: 1,
                    respostaPergDemografica: 1,
                    alternativaPergDemografica: 1,
                  }
                },
              ],
              localField: 'demografica',
              foreignField: '_id',
              as: 'demografica'
          },
        },
      );

      //TODO: verificar esse findCustom
      try {
        const data = await this.adapter.findCustom(_aggregate) as any;
        
        if(data == null){
            return null;
        }
        
        return data;
        
    } catch (error) {
        throw error;
    }
    }else{
        return null;
    }

  }
  
  public async createPergunta(id: string, perg: any): Promise<Object|null> {
    if (this.dbType == 'mongodb') {
      return this.adapter.findById(id).then((enquete: any) => {
        if (!enquete) {
          return null;
        } else {
          enquete.pergunta.push(perg.id);
          return this.adapter.update(id, enquete);
        }
      });
    } else {
      return null;
    }
  }

  public async createTransmissao(id: string, transmi: any): Promise<Object|null> {
    if (this.dbType == 'mongodb') {
      return this.adapter.findById(id).then((enquete: any) => {
        if (!enquete) {
          return null;
        } else {
          enquete.transmissao.push(transmi.id);
          return this.adapter.update(id, enquete);
        }
      });
    } else {
      return null;
    }
  }

  public async createDemografica(id: string, demo: any): Promise<Object|null> {
    if (this.dbType == 'mongodb') {
      return this.adapter.findById(id).then((enquete: any) => {
        if (!enquete) {
          return null;
        } else {
          enquete.demografica.push(demo.id);
          return this.adapter.update(id, enquete);
        }
      });
    } else {
      return null;
    }
  }

  public async gerarAggregateCategorias(perguntaId: string, nameEntrevistado: string, nameEntrevistador: string, pesoEntrevistado: any, pesoEntrevistador: any, numResp: string): Promise<Object|null> {
    if(this.dbType == "mongodb"){
      const limite = parseInt(numResp, 10);
      if (isNaN(limite) || limite < 1) {
        throw new Error(`Valor inválido para limite: ${numResp}`);
      }
    
      const pergunta = await this.model.findById(perguntaId);
      if (!pergunta) {
        throw new Error(`A entidade pergunta com id ${perguntaId} não encontrada!`);
      }
    
      const descricaoPergunta = pergunta.descricao;
      const codigoPergunta = pergunta.codigoPergunta;
      var ObjectId = require('mongodb').ObjectID;
  
      const _aggregate = [
        {
          $match: {
            _id: new ObjectId(perguntaId.toString())
          }
        },
        {
          $unwind: "$resposta"
        },
        {
          $unwind: "$resposta.answer"
        },
        {
          $group: {
            _id: "$resposta.answer",
            answer: { $first: "$resposta.answer" },
            count: { $sum: 1 },
            countEntrevistado: {
              $sum: {
                $cond: {
                  if: { $eq: ["$resposta.quemRespondeu", "entrevistado"] },
                  then: 1,
                  else: 0
                }
              }
            },
            countEntrevistador: {
              $sum: {
                $cond: {
                  if: { $eq: ["$resposta.quemRespondeu", "entrevistador"] },
                  then: 1,
                  else: 0
                }
              }
            }
          }
        },
        {
          $facet: {
            topAnswers: [
              { $sort: { count: -1 } },
              { $limit: limite }
            ],
            otherAnswers: [
              { $skip: limite }
            ]
          }
        },
        {
          $project: {
            resposta: {
              $concatArrays: [
                "$topAnswers",
                [
                  {
                    answer: "Outros",
                    count: {
                      $sum: "$otherAnswers.count"
                    },
                    countEntrevistado: {
                      $sum: "$otherAnswers.countEntrevistado"
                    },
                    countEntrevistador: {
                      $sum: "$otherAnswers.countEntrevistador"
                    }
                  },
                  {
                    answer: "Não Respondeu",
                    count: {
                      $sum: {
                        $cond: {
                          if: { $eq: ["$answer", "Não Respondeu"] },
                          then: "$count",
                          else: 0
                        }
                      }
                    },
                    countEntrevistado: {
                      $sum: {
                        $cond: {
                          if: {
                            $and: [
                              { $eq: ["$answer", "Não Respondeu"] },
                              { $eq: ["$resposta.quemRespondeu", "entrevistado"] }
                            ]
                          },
                          then: "$count",
                          else: 0
                        }
                      }
                    },
                    countEntrevistador: {
                      $sum: {
                        $cond: {
                          if: {
                            $and: [
                              { $eq: ["$answer", "Não Respondeu"] },
                              { $eq: ["$resposta.quemRespondeu", "entrevistador"] }
                            ]
                          },
                          then: "$count",
                          else: 0
                        }
                      }
                    }
                  }
                ]
              ]
            },
            descricao: descricaoPergunta
          }
        },
        {
          $addFields: {
            resposta: {
              $concatArrays: [
                { $filter: { input: "$resposta", cond: { $ne: ["$$this.answer", "Outros"] } } },
                { $filter: { input: "$resposta", cond: { $eq: ["$$this.answer", "Outros"] } } }
              ]
            }
          }
        },
        {
          $addFields: {
            resposta: {
              $map: {
                input: "$resposta",
                as: "item",
                in: {
                  answer: "$$item.answer",
                  count: "$$item.count",
                  countEntrevistado: "$$item.countEntrevistado",
                  countEntrevistador: "$$item.countEntrevistador",
                  countPeso: {
                    $add: [
                      {
                        $multiply: ["$$item.countEntrevistado", parseFloat(pesoEntrevistado)]
                      },
                      {
                        $multiply: ["$$item.countEntrevistador", parseFloat(pesoEntrevistador)]
                      }
                    ]
                  }
                }
              }
            }
          }
        },
        {
          $addFields: {
            resposta: {
              $concatArrays: [
                { $filter: { input: "$resposta", cond: { $ne: ["$$this.answer", "Não sabe"] } } },
                { $filter: { input: "$resposta", cond: { $eq: ["$$this.answer", "Não sabe"] } } }
              ]
            }
          }
        }
      ];
    
      const data = await this.model.aggregate(_aggregate);
    
      return {
        codigoPergunta,
        descricao: descricaoPergunta,
        respostas: data[0]?.resposta || [],
        nameEntrevistado,
        nameEntrevistador
      };
    }else{
      return null;
    }
    
    
    
    
    
   
  }

  public async gerarAggregateAllRespostas(perguntaId: string, nameEntrevistado: string, nameEntrevistador: string, pesoEntrevistado: any, pesoEntrevistador: any): Promise<Object|null> {
    if(this.dbType == "mongodb"){
      const pergunta = await this.model.findById(perguntaId);
      if (!pergunta) {
        throw new Error(`A entidade pergunta com id ${perguntaId} não encontrada!`);
      }

      const descricaoPergunta = pergunta.descricao;
      const codigoPergunta = pergunta.codigoPergunta;
      var ObjectId = require('mongodb').ObjectID;

      const _aggregate = [
        {
          $match: {
            _id: new ObjectId(perguntaId.toString())
          }
        },
        {
          $unwind: "$resposta"
        },
        {
          $unwind: "$resposta.answer"
        },
        {
          $group: {
            _id: "$resposta.answer",
            answer: { $first: "$resposta.answer" },
            count: { $sum: 1 },
            countEntrevistado: {
              $sum: {
                $cond: {
                  if: { $eq: ["$resposta.quemRespondeu", "entrevistado"] },
                  then: 1,
                  else: 0
                }
              }
            },
            countEntrevistador: {
              $sum: {
                $cond: {
                  if: { $eq: ["$resposta.quemRespondeu", "entrevistador"] },
                  then: 1,
                  else: 0
                }
              }
            }
          }
        },
        {
          $project: {
            answer: 1,
            count: 1,
            countEntrevistado: 1,
            countEntrevistador: 1,
            countPeso: {
              $add: [
                {
                  $multiply: ["$countEntrevistado", parseFloat(pesoEntrevistado)]
                },
                {
                  $multiply: ["$countEntrevistador", parseFloat(pesoEntrevistador)]
                }
              ]
            }
          }
        },
        {
          $sort: { count: -1 } // Ordena as respostas pela contagem decrescente
        },
        {
          $addFields: {
            countAdjusted: {
              $cond: { 
                if: { $eq: ["$answer", "Não sabe"] },
                then: -1,
                else: "$count"
              }
            }
          }
        },
        {
          $sort: { countAdjusted: -1 } // Ordena novamente, movendo "Não sabe" para a última posição
        },
        {
          $project: {
            countAdjusted: 0 // Remove o campo temporário countAdjusted
          }
        }
      ];

      const data = await this.model.aggregate(_aggregate);

      return {
        codigoPergunta,
        descricao: descricaoPergunta,
        respostas: data.length > 0 ? data : [],
        nameEntrevistado,
        nameEntrevistador
      };
    }else{
      return null;
    }
  }

}