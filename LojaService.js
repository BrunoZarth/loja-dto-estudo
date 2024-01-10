export class LojaService {
    async registrarLoja(reqBody) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('Ação assíncrona concluída com êxito.');
            }, 2000);
        });
    }
}