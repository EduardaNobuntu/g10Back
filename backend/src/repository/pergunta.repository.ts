import createDbAdapter, { DbType } from "../adapters/createDb.adapter";
import { IDatabaseAdapter } from "../adapters/IDatabase.adapter";
import { Pergunta } from "../models/pergunta.model";
import { PerguntaService } from "../services/pergunta.service";
import BaseRepository from "./base.repository";

export default class PerguntaRepository extends BaseRepository<Pergunta> {

  dbType: DbType;
  model: any;

  constructor(dbType: DbType, model: any) {
    const _adapter: IDatabaseAdapter<Pergunta> = createDbAdapter<Pergunta>(dbType, model, Pergunta.fromJson);
    super(_adapter);
    this.dbType = dbType;
    this.model = model;
  }

  public async obterRespostasDeTodasPerguntas(id: string, pesoEntrevistado: string, pesoEntrevistador: string): Promise<Object | null> {
    //Chamar servico da entidade pergunta para obter pelo id
    //const pergunta = await Pergunta.findById(id);
    /* const perguntaService : PerguntaService = new PerguntaService(this.dbType, this.model);
     const pergunta = await perguntaService.findById(id) as any;
     if (!pergunta) {
         return null;
         //return res.status(404).json({ message: "A entidade pergunta com id " + id + " não encontrada!" });
     }
 
     const descricaoPergunta = pergunta.descricao;
     const codigoPergunta = pergunta.codigoPergunta;
     */

    if (this.dbType == 'mongodb') {
      var ObjectId = require('mongodb').ObjectID;
      const _aggregate = [
        {
          $match: {
            _id: new ObjectId(id.toString())
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

      try {
        //const data = await Pergunta.aggregate(_aggregate);
        const data = await this.adapter.findCustom(_aggregate) as any;

        if (data == null) {
          return null;
        }

        return data;

      } catch (error) {
        throw error;
      }

    } else {
      return null;
    }


  }
  //arrumar o response desse
  public async premiado(id: string, colocado: any): Promise<any | null> {
    if (this.dbType == 'mongodb') {
      const pergunta = this.adapter.findById(id);

      var ObjectId = require('mongodb').ObjectID;
      const _aggregate = [
        {
          $match: {
            _id: new ObjectId(id.toString())
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
            count: { $sum: 1 },
            usuarios: { $push: "$resposta.usuario" }
          }
        },
        {
          $sort: {
            count: -1
          }
        },
        {
          $project: {
            _id: 0,
            answer: "$_id",
            count: 1,
            usuarios: 1
          }
        },

      ];
      const results = [];
      let respostaMaisVotada = '';

      const data = await this.adapter.findCustom(_aggregate) as any;
      const groupedDemograficas = {};
      if (data[colocado - 1] !== undefined) {
        const resposta = data[colocado - 1]
        respostaMaisVotada = resposta.answer;
        const _usuarios = resposta.usuarios;

        const _aggregate2 = [
          {
            $match: {
              "respostaPergDemografica.usuario": { $in: _usuarios },
              "perguntaNoRelatorio": 'true'
            }
          },
          {
            $match: {
              "respostaPergDemografica.answerPergDemografica": { $exists: true }
            }
          },
          {
            $unwind: "$respostaPergDemografica.answerPergDemografica"
          },
          {
            $group: {
              _id: "$respostaPergDemografica.answerPergDemografica",
              answer: { $first: "$respostaPergDemografica.answerPergDemografica" },
              count: { $sum: 1 },

            }
          },
          {
            $project: {
              data: {
                descPergDemografica: "$_id",
                answers: "$answers"
              },
              descPergDemografica: "descPergDemografica",
              respostaMaisVotada: resposta.answer
            }
          },
        ];
        const data2 = await this.adapter.findCustom(_aggregate2) as any;
        console.log(data2);

        const response = {
          data: data2,
          respostaMaisVotada: respostaMaisVotada,
          //descricaoPergunta: pergunta.descricao
        };

        return response;

        //mandar um array com esse ultimo data e o respostaMaisVotada
      }
    } else {
      return null;
    }
  }

  public async getQuestionWithResponses(id: string) {
    if (this.dbType == 'mongodb') {
      try {
        var ObjectId = require('mongodb').ObjectID;

        const _aggregate = [
          {
            $match: {
              _id: new ObjectId(id.toString())
            }
          },
          {
            $unwind: "$resposta"
          },
          {
            $group: {
              _id: "$_id",
              descricao: { $first: "$descricao" },
              resposta: { $push: "$resposta" }
            }
          }
        ];

        try {
          const data = await this.adapter.findCustom(_aggregate) as any;

          if (data == null) {
            return null;
          }

          const result = {
            perguntaId: id.toString(), // Acesse o _id diretamente do objeto pergunta
            descricao: data[0].descricao,
            resposta: data[0].resposta,
          };
          return result;

        } catch (err) {
          console.log(err);
          return null;
        }
      } catch (err) {
        console.log(err);
        return null;
      }
    } else {
      return null;
    }
  }

  public async salvarPergunta(pergunta: any) {
    try {
      if (pergunta.bloco == "A") {
        pergunta.bloco = 1;
      } else if (pergunta.bloco == "B") {
        pergunta.bloco = 2;
      }

      const _pergunta = ({
        codigoPergunta: pergunta.codigo,
        descricao: pergunta.descricao,
        tipoPergunta: pergunta.tipoPergunta,
        obrigatoria: pergunta.obrigatoria,
        outro: pergunta.outro,
        bloco: pergunta.bloco,
      });


      const novaPergunta = await this.adapter.create(_pergunta);
      return novaPergunta;
    } catch (error) {
      console.log("Erro ao salvar pergunta! " + error);
      return null;
    }
  }

  public async saveAlternativa(alternativaEncontrada: any, idPergunta: any){
    try {
        const alternativa = {
            codigoAlternativa: alternativaEncontrada.codigo,
            descricaoAlternativa: alternativaEncontrada.descricao
        };

        const pergunta = await this.adapter.findById(idPergunta);
        if (!pergunta) {
            console.log(`Pergunta with id ${idPergunta} not found.`);
            return;
        }

        pergunta.alternativa!.push(alternativa);
        if (pergunta.id) {
          await this.adapter.update(pergunta.id, pergunta);
        } else {
          console.log('Invalid pergunta ID');
        }
    } catch (error) {
        console.log(error);
        console.log('Error adding alternativa to pergunta.');
    }
};

}