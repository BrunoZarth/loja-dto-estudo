class CamadaDePersistenciaDeLoja {
    constructor() {
      this.lojas = [];
    }
  
    adicionarLoja(registrarLojaDTO) {
      const id = this.lojas.length + 1;
      const novaLoja = { id, ...registrarLojaDTO };
      
      this.lojas.push(novaLoja);
      
      return novaLoja;
    }
  
    listarLojas() {
      return [...this.lojas]; //sread op utilizado para garantir uma cópia independente
    }
  
    obterLojaPorId(id) {

      return this.lojas.find((loja) => loja.id === parseInt(id));
    }

    excluirLoja(id) {
        const indiceLoja = this.lojas.findIndex((loja) => loja.id === id);
      
        if (indiceLoja !== -1) {
          const lojaExcluida = this.lojas.splice(indiceLoja, 1)[0];
          return lojaExcluida;
        }
      
        return null;
      }
      
  }

  module.exports = new CamadaDePersistenciaDeLoja();