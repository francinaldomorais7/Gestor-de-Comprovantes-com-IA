//Prompt do pedito para o Puter saver o que fazer com a imagem que ele vai receber
let pedido = "let pedido = 'Olhe a foto deste comprovante e responda em UMA linha, sem escrever mais nada, com 2 pedaços separados por |. Primeiro pedaço: o emoji da categoria, o nome do estabelecimento dentro de <strong>, e depois cada item comprado com seu valor, um por linha usando <br>. Segundo pedaço: o total pago, só o número, com ponto e sempre com duas casas decimais. As categorias são: 🛒 Mercado, 🚗 Transporte, 🍔 Comida, 💊 Saúde, 🎉 Lazer, 🏠 Casa, 💸 Outros. Exemplo de resposta: 🍔 <strong>Padaria Pão Quente</strong><br>Pão — R$ 5,00<br>Leite — R$ 4,50 | 9.50';"
let compro_lidos = 0

//funcao para ler a foto. async > permite executar tarefas demorada (Buscar dado de API ou ler arquivo)
async function ler_foto() {
    //variavel para guardar o arquivo
    let foto = document.querySelector(".foto").files[0];

    //resposta do Puter. await pausa até o promt ser resolvido
    let resposta = await puter.ai.chat(pedido, foto);
    //pega so o essencial da resposta
    let texto = resposta.message.content
    let partes = texto.split("|")
    let total = 0

    //substitui todo o conteúdo HTML interno do primeiro elemento que possui a classe lista pelo valor armazenado na variável texto.
    document.querySelector(".lista").innerHTML += `
        <div class="comprovantes">

            <div class='itens'>${partes[0]}</div>

            <div class='total_nota'>Total da Nota R$ ${partes[1]}</div>
        
        </div>
    `
    total += Number(partes[1])
    document.querySelector(".total-gasto").innerHTML = 'R$' + total.toFixed(2)
    compro_lidos += 1
    document.querySelector(".total-lidos").innerHTML = `${compro_lidos} comprovantes lidos`
}
