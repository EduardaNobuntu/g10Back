export async function createAlternativa(id:string , model: any, alternativaField: any, novaAlternativa: any) {  
    try {
      const item = await model.findById(id);
      if (!item) {
        return { status: 404, message: `${model.modelName} with id ${id} not found.` };
      }
      item[alternativaField].push(novaAlternativa);
      await item.save();
      return { status: 200, data: item };
    } catch (error) {
      console.log(error);
      return { status: 500, message: `Error adding alternativa to ${model.modelName}.` };
    }
  }
  
  export async function updateAlternativa(id: string, model: any, alternativaField: any, codigoField: any, descricaoField: any, novaAlternativa: any) {
    try {
      console.log(novaAlternativa);
      const item = await model.findById(id);
      if (!item) {
        return { status: 404, message: `${model.modelName} with id ${id} not found.` };
      }
  
      const alternativa = item[alternativaField].find((a: { [x: string]: any; }) => a[codigoField] === novaAlternativa[codigoField]);
      if (!alternativa) {
        return { status: 404, message: 'Alternativa não encontrada.' };
      }
  
      alternativa[descricaoField] = novaAlternativa[descricaoField];
      await item.save();
      return { status: 200, data: alternativa };
    } catch (error) {
      console.log(error);
      return { status: 500, message: 'Erro ao atualizar a alternativa.' };
    }
  }
  
  export async function findAlternativas(id: string, model: any, alternativaField: any) {
    try {
      const item = await model.findById(id);
      if (!item) {
        return { status: 404, message: `${model.modelName} with id ${id} not found.` };
      }
      return { status: 200, data: item[alternativaField] };
    } catch (error) {
      console.log(error);
      return { status: 500, message: `Erro ao buscar alternativas em ${model.modelName}.` };
    }
  }
  
  