let historicoBuscas = [];

async function buscarCEP() {
  let cep = document.getElementById("cep").value.trim();

  if (cep === "") {
    alert("Digite um CEP!");
    return;
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      alert("CEP não encontrado!");
      return;
    }

    document.getElementById("localidade").value = data.localidade;
    document.getElementById("estado").value = data.uf;
    document.getElementById("bairro").value = data.bairro;
    document.getElementById("logradouro").value = data.logradouro;
    document.getElementById("ddd").value = data.ddd;

    salvarHistorico(data);
  } catch (error) {
    alert("Erro ao buscar o CEP!");
  }
}

function salvarHistorico(dados) {
  let item = {
    localidade: dados.localidade,
    bairro: dados.bairro,
    logradouro: dados.logradouro,
    uf: dados.uf,
    cep: dados.cep,
    ddd: dados.ddd
  };
  historicoBuscas.push(item);
  atualizarHistorico();
}

function atualizarHistorico() {
  let lista = document.getElementById("historico");
  lista.innerHTML = "";

  historicoBuscas.forEach((busca, excluir) => {
    let li = document.createElement("li");
    li.textContent = `${busca.localidade}, ${busca.bairro}, ${busca.logradouro}, ${busca.uf}, ${busca.cep} (DDD: ${busca.ddd})`;

   
    let removerX = document.createElement("span");
    removerX.textContent = "x";
    removerX.classList.add("remover-x");
    removerX.onclick = () => removerItemHistorico(excluir);

 
    li.appendChild(removerX);

    lista.appendChild(li);
  });
}

function removerItemHistorico(excluir) {
  historicoBuscas.splice(excluir, 1); 
  atualizarHistorico(); 
}