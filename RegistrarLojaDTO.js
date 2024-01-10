class RegistrarLojaDTO {
    tipo;
    nome;
    descricao;
    id_dono;
    localizacao;
    itens;
  
    constructor(data) {
      this.tipo = data.tipo;
      this.nome = data.nome;
      this.descricao = data.descricao;
      this.id_dono = data.id_dono;
      this.localizacao = {
        numero: data.localizacao.numero,
        rua: data.localizacao.rua,
        bairro: data.localizacao.bairro,
        cidade: data.localizacao.cidade,
        estado: data.localizacao.estado,
      };
      this.itens = data.itens || [];
    }
  }
  
  module.exports = RegistrarLojaDTO;