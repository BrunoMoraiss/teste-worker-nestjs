import { parentPort } from 'worker_threads';

let num = 1;

// Função para executar em segundo plano
function doWork() {
  setTimeout(async () => {
    setInterval(async () => {
      const req = await fetch(
        'https://sgu.universal.org.br/sgiurd/tipoPastor.do?api_key=C66C73A75E725F35F1DD6E7519AC20BE&cod_language=pt-br&cod_subModulo=4&cod_modulo=4&token=yGWrVy+akt+3cUNHSTi6oQooWfaM/mD9cSY2WOjuGGRE3SSaXMXk350fzpusSwbEfws0G2JQFOnNvgM09/wBZXwjSbb76rcIKpmDVcPz1tHurvZ6byD2wzvDdH1iQxkVidfog5KMAS4=&cod_item=467&item=pastores_cadastro_ativos&acao=3',
        {
          method: 'GET',
        },
      );

      const res = await req.json();

      num = res.data[3].cod;
      parentPort.postMessage(num); // Envia o valor atualizado para o processo pai
    }, 1000);
  }, 5000);
}

// Execute a função em segundo plano
doWork();
