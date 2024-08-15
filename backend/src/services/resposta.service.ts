
export async function createResposta(id: string, model: any, respostaField: string, novaResposta: any) {  
    try {
      const item = await model.findById(id);
      if (!item) {
        return { status: 404, message: `${model.modelName} with id ${id} not found.` };
      }
      const hasExistingResponse = item[respostaField].some((resposta: { usuario: any; }) => resposta.usuario === novaResposta.usuario);
      if (hasExistingResponse) {
        return { status: 400, message: "Nao pode ser salva mais de uma resposta com o mesmo usuario." };
      }
      item[respostaField].push(novaResposta);
      await item.save();
      return { status: 200, data: item };
    } catch (error) {
      console.log(error);
      return { status: 500, message: `Error adding resposta to ${model.modelName}.` };
    }
  }
  
 export async function updateResposta(idResposta:string, model: any, respostaField: string, novaResposta: any) {
    try {
      const item = await model.findOne({ [`${respostaField}._id`]: idResposta });
      if (!item) {
        return { status: 404, message: 'Resposta não encontrada.' };
      }
      const resposta = item[respostaField].find((r: { _id: { toString: () => string; }; }) => r._id.toString() === idResposta);
      if (!resposta) {
        return { status: 404, message: 'Resposta não encontrada.' };
      }
      resposta.answer = novaResposta;
      await item.save();
      return { status: 200, data: resposta };
    } catch (error) {
      console.log(error);
      return { status: 500, message: 'Erro ao atualizar a resposta.' };
    }
  }
  
 export async function updateAllRespostas(idPergunta: string, model: any, respostaField: string, antigaResposta: any, novaResposta: any) {
    try {
      const item = await model.findById(idPergunta);
      if (!item) {
        return { status: 404, message: 'Item não encontrada.' };
      }
      item[respostaField].forEach((resposta: { answer: any; }) => {
        if (resposta.answer === antigaResposta) {
          resposta.answer = novaResposta;
        }
      });
      await item.save();
      return { status: 200, message: 'Respostas atualizadas com sucesso.' };
    } catch (error) {
      console.log(error);
      return { status: 500, message: 'Erro ao atualizar as respostas.' };
    }
  }
  
 export async function getResposta(id: string, idUser: string, model: any, respostaField: string) {
    try{
      const item = await model.findById(id);
  
      if (!item) {
        return { status: 404, message: 'Item não encontrada.' };
      }
  
      const resposta = item[respostaField].find((r: { usuario: string; }) => r.usuario === idUser)
      if (resposta) {
        console.log(resposta)
        return {status: 200, data: resposta}
      } else {
        console.log('resposta')
        return {status: 200, message: 'Respoista nao encontrada'}
      }
    }catch (error) {
      return {status: 500, message: 'Erro ao verificar resposta'}
    }
  }
  
  
 export async function groupRespostas(id:string, model: any, respostaField: string, numResp: any, pesoEntrevistado: any, pesoEntrevistador: any) {
    try {
      const item = await model.findById(id);
      if (!item) {
        return { status: 404, message: `A entidade ${model.modelName} com id ${id} não encontrada!` };
      }
  
      const descricaoField = respostaField === 'resposta' ? 'descricao' : 'descPergDemografica';
      const descricao = item[descricaoField];
      var ObjectId = require('mongodb').ObjectID;

      const _aggregate = [
        {
          $match: { _id: new ObjectId(id.toString()) }
        },
        {
          $unwind: `$${respostaField}`
        },
        {
          $unwind: `$${respostaField}.answer`
        },
        {
          $group: {
            _id: `$${respostaField}.answer`,
            idResposta: { $addToSet: `$${respostaField}._id` },
            answer: { $first: `$${respostaField}.answer` },
            count: { $sum: 1 },
            countEntrevistado: {
              $sum: {
                $cond: {
                  if: { $eq: [`$${respostaField}.quemRespondeu`, 'entrevistado'] },
                  then: 1,
                  else: 0
                }
              }
            },
            countEntrevistador: {
              $sum: {
                $cond: {
                  if: { $eq: [`$${respostaField}.quemRespondeu`, 'entrevistador'] },
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
              { $limit: numResp }
            ],
            otherAnswers: [
              { $skip: numResp }
            ]
          }
        },
        {
          $project: {
            resposta: {
              $concatArrays: [
                '$topAnswers',
                [
                  {
                    idResposta: '$idResposta',
                    answer: 'Outros',
                    count: { $sum: '$otherAnswers.count' },
                    countEntrevistado: { $sum: '$otherAnswers.countEntrevistado' },
                    countEntrevistador: { $sum: '$otherAnswers.countEntrevistador' }
                  },
                  {
                    answer: 'Não Respondeu',
                    count: {
                      $sum: {
                        $cond: {
                          if: { $eq: ['$answer', 'Não Respondeu'] },
                          then: '$count',
                          else: 0
                        }
                      }
                    },
                    countEntrevistado: {
                      $sum: {
                        $cond: {
                          if: {
                            $and: [
                              { $eq: ['$answer', 'Não Respondeu'] },
                              { $eq: [`$${respostaField}.quemRespondeu`, 'entrevistado'] }
                            ]
                          },
                          then: '$count',
                          else: 0
                        }
                      }
                    },
                    countEntrevistador: {
                      $sum: {
                        $cond: {
                          if: {
                            $and: [
                              { $eq: ['$answer', 'Não Respondeu'] },
                              { $eq: [`$${respostaField}.quemRespondeu`, 'entrevistador'] }
                            ]
                          },
                          then: '$count',
                          else: 0
                        }
                      }
                    }
                  }
                ]
              ]
            },
            descricao: descricao
          }
        },
        {
          $addFields: {
            resposta: {
              $concatArrays: [
                { $filter: { input: '$resposta', cond: { $ne: ['$$this.answer', 'Outros'] } } },
                { $filter: { input: '$resposta', cond: { $eq: ['$$this.answer', 'Outros'] } } }
              ]
            }
          }
        },
        {
          $addFields: {
            resposta: {
              $map: {
                input: '$resposta',
                as: 'item',
                in: {
                  idResposta: '$$item.idResposta',
                  answer: '$$item.answer',
                  count: '$$item.count',
                  countEntrevistado: '$$item.countEntrevistado',
                  countEntrevistador: '$$item.countEntrevistador',
                  countPeso: {
                    $add: [
                      { $multiply: ['$$item.countEntrevistado', pesoEntrevistado] },
                      { $multiply: ['$$item.countEntrevistador', pesoEntrevistador] }
                    ]
                  }
                }
              }
            }
          }
        }
      ];
  
      const data = await model.aggregate(_aggregate);
  
      if (!data || !data.length) {
        return { status: 404, message: `A entidade ${model.modelName} com id ${id} não encontrada!` };
      }
  
      const result = {
        descricao: data[0].descricao,
        resposta: data[0].resposta,
        idPerg: id
      };
  
      return { status: 200, data: result };
    } catch (err: any) {
      return { status: 500, message: `Erro ao buscar a entidade ${model.modelName} com o id ${id}: ${err.message}` };
    }
  }
  
  