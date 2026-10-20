// Endereço da API REST
const API_URL = "/api/produtos/";

let idProdutoEdicao = null;
let produtosCarregados = [];

// Consultar produtos cadastrados
async function carregarProdutos() {

    const tabela = document.getElementById("lista-produtos");

    try {

        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error("Erro ao consultar produtos.");
        }

        const produtos = await resposta.json();

        // Guardar os produtos para realizar pesquisas
        produtosCarregados = produtos;

        // Limpar a tabela
        tabela.innerHTML = "";

        // Verificar se existem produtos cadastrados
        if (produtos.length === 0) {

            const linha = tabela.insertRow();
            const celula = linha.insertCell();

            celula.colSpan = 5;
            celula.textContent = "Nenhum produto cadastrado.";

            return;
        }

        // Percorrer os produtos retornados pela API
        produtos.forEach(produto => {

            const linha = tabela.insertRow();

            const campos = [
                produto.id_produto,
                produto.nome_produto,
                produto.tipo_produto,
                produto.status_produto
            ];

            // Adicionar os valores nas células
            campos.forEach(valor => {

                const celula = linha.insertCell();

                celula.textContent = valor ?? "";

            });

            // Coluna de ações
            const celulaAcoes = linha.insertCell();

            // Botão Visualizar
            const btnVisualizar = document.createElement("button");

            btnVisualizar.type = "button";
            btnVisualizar.textContent = "Visualizar";
            btnVisualizar.className = "btn-visualizar";

            btnVisualizar.addEventListener("click", () => {
                visualizarProduto(produto.id_produto);
            });

            celulaAcoes.appendChild(btnVisualizar);

            // Botão Editar
            const btnEditar = document.createElement("button");

            btnEditar.type = "button";
            btnEditar.textContent = "Editar";
            btnEditar.className = "btn-editar";

            btnEditar.addEventListener("click", () => {
                editarProduto(produto.id_produto);
            });

            celulaAcoes.appendChild(btnEditar);

            // Botão Excluir
            const btnExcluir = document.createElement("button");

            btnExcluir.type = "button";
            btnExcluir.textContent = "Excluir";
            btnExcluir.className = "btn-excluir";

            btnExcluir.addEventListener("click", () => {
                excluirProduto(produto.id_produto);
            });

            celulaAcoes.appendChild(btnExcluir);

        });

    } catch (erro) {

        console.error("Erro:", erro.message);

        tabela.innerHTML = "";

        const linha = tabela.insertRow();
        const celula = linha.insertCell();

        celula.colSpan = 5;
        celula.textContent = "Erro ao carregar produtos.";
    }
}

// Consultar os detalhes de um produto
async function visualizarProduto(idProduto) {

    try {
        const resposta = await fetch(`${API_URL}${idProduto}/`);

        if (!resposta.ok) {
            throw new Error("Erro ao consultar produto.");
        }

        const produto = await resposta.json();

        // Guardar o ID do produto que será editado
        idProdutoEdicao = idProduto;

        const campos = [
            ["ID", produto.id_produto],
            ["Nome do Produto", produto.nome_produto],
            ["ID QR Code", produto.id_qrcode],
            ["Descrição Técnica", produto.descricao_tecnica],
            ["Status", produto.status_produto],
            ["Nome da Imagem", produto.nome_imagem],
            ["Tipo de Produto", produto.tipo_produto],
            ["Local de Instalação", produto.local_instalacao],
            ["Tipo de Gás", produto.tipo_gas],
            ["Situação", produto.situacao_produto]
        ];

        const detalhes = document.getElementById("detalhes-produto");

        detalhes.replaceChildren();

        campos.forEach(([nome, valor]) => {

            const campo = document.createElement("div");

            const titulo = document.createElement("strong");
            titulo.textContent = nome;

            const texto = document.createElement("p");
            texto.textContent = valor ?? "Não informado";

            campo.appendChild(titulo);
            campo.appendChild(texto);

            detalhes.appendChild(campo);
        });

        document.getElementById("modal-detalhes").hidden = false;

    } catch (erro) {
        console.error("Erro:", erro.message);
        alert("Não foi possível consultar os detalhes do produto.");
    }
}

// Fechar o modal pelo botão X
document.getElementById("btn-fechar-modal")
    .addEventListener("click", () => {
        document.getElementById("modal-detalhes").hidden = true;
    });

// Fechar o modal pela tecla ESC
document.addEventListener("keydown", (evento) => {

    if (evento.key === "Escape") {
        document.getElementById("modal-detalhes").hidden = true;
    }

});

// Referências aos elementos do formulário
const modalCadastro = document.getElementById("modal-cadastro");
const btnNovo = document.getElementById("btn-novo");
const btnFecharCadastro = document.getElementById("btn-fechar-cadastro");
const btnCancelarCadastro = document.getElementById("btn-cancelar-cadastro");
const formProduto = document.getElementById("form-produto");

// Abrir o formulário de cadastro
function abrirCadastro() {

    // Limpar os campos do formulário
    formProduto.reset();

    // Indicar que estamos realizando um novo cadastro
    idProdutoEdicao = null;

    // Restaurar o título para o cadastro
    document.querySelector(
        "#modal-cadastro .modal-cabecalho h2"
    ).textContent = "Novo Produto";    

    // Exibir a janela modal
    modalCadastro.hidden = false;

    // Posicionar o cursor no nome do produto
    document.getElementById("nome_produto").focus();
}

// Fechar o formulário de cadastro
function fecharCadastro() {
    modalCadastro.hidden = true;
}

// Evento do botão Novo Produto
btnNovo.addEventListener("click", abrirCadastro);

// Evento do botão X
btnFecharCadastro.addEventListener("click", fecharCadastro);

// Evento do botão Cancelar
btnCancelarCadastro.addEventListener("click", fecharCadastro);

// Fechar ao pressionar ESC
document.addEventListener("keydown", (evento) => {

    if (evento.key === "Escape" && !modalCadastro.hidden) {
        fecharCadastro();
    }

});

// Cadastrar um novo produto
async function cadastrarProduto(evento) {

    evento.preventDefault();

    const produto = {
        nome_produto: document.getElementById("nome_produto").value.trim(),
        id_qrcode: document.getElementById("id_qrcode").value.trim(),
        status_produto: document.getElementById("status_produto").value.trim(),
        tipo_produto: document.getElementById("tipo_produto").value,
        nome_imagem: document.getElementById("nome_imagem").value.trim(),
        local_instalacao: document.getElementById("local_instalacao").value.trim(),
        tipo_gas: document.getElementById("tipo_gas").value.trim(),
        situacao_produto: document.getElementById("situacao_produto").value.trim(),
        descricao_tecnica: document.getElementById("descricao_tecnica").value.trim()
    };

    try {

        // Verificar se estamos cadastrando ou editando
        const editando = idProdutoEdicao !== null;

        // Definir a URL e o método HTTP
        const url = editando
            ? `${API_URL}${idProdutoEdicao}/`
            : API_URL;

        const metodo = editando ? "PATCH" : "POST";

        // Enviar os dados para a API
        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(produto)
        });

        if (!resposta.ok) {

            const erros = await resposta.json();

            console.error("Erro de validação:", erros);

            let mensagem = editando
                ? "Não foi possível alterar o produto."
                : "Não foi possível cadastrar o produto.";

            // Identificar mensagens retornadas pela API
            if (erros.id_qrcode) {
                mensagem = "Este QR Code já está cadastrado.";
            }
            else if (erros.nome_produto) {
                mensagem = "Verifique o nome do produto.";
            }
            else if (erros.status_produto) {
                mensagem = "Status inválido. Utilize ATIVO ou INATIVO.";
            }
            else if (erros.tipo_produto) {
                mensagem = "Tipo de produto inválido.";
            }

            throw new Error(mensagem);
        }

        mostrarNotificacao(
            editando
                ? "Produto alterado com sucesso!"
                : "Produto cadastrado com sucesso!",
            "sucesso"
        );

        fecharCadastro();

        await carregarProdutos();

    } catch (erro) {
        console.error("Erro:", erro.message);
        mostrarNotificacao(erro.message, "erro");
    }
}

// Consultar e preencher os dados para edição
async function editarProduto(idProduto) {

    try {

        // Consultar o produto pela API
        const resposta = await fetch(`${API_URL}${idProduto}/`);

        if (!resposta.ok) {
            throw new Error("Erro ao consultar produto.");
        }

        const produto = await resposta.json();

        // Guardar o ID do produto em edição
        idProdutoEdicao = idProduto;

        console.log("ID do produto em edição:", idProdutoEdicao);

        // Preencher os campos do formulário
        document.getElementById("nome_produto").value =
            produto.nome_produto ?? "";

        document.getElementById("id_qrcode").value =
            produto.id_qrcode ?? "";

        document.getElementById("status_produto").value =
            produto.status_produto ?? "";

        document.getElementById("tipo_produto").value =
            produto.tipo_produto ?? "";

        document.getElementById("nome_imagem").value =
            produto.nome_imagem ?? "";

        document.getElementById("local_instalacao").value =
            produto.local_instalacao ?? "";

        document.getElementById("tipo_gas").value =
            produto.tipo_gas ?? "";

        document.getElementById("situacao_produto").value =
            produto.situacao_produto ?? "";

        document.getElementById("descricao_tecnica").value =
            produto.descricao_tecnica ?? "";

        // Abrir o formulário
        modalCadastro.hidden = false;

        // Alterar o título da janela
        document.querySelector(
            "#modal-cadastro .modal-cabecalho h2"
        ).textContent = "Editar Produto";

    } catch (erro) {

        console.error("Erro:", erro.message);
        alert("Não foi possível carregar o produto para edição.");

    }
}

// Excluir um produto
async function excluirProduto(idProduto) {

    // Solicitar confirmação antes da exclusão
    const confirmar = confirm(
        `Deseja realmente excluir o produto de ID ${idProduto}?`
    );

    // Se o usuário cancelar, interromper a operação
    if (!confirmar) {
        return;
    }

    try {

        // Enviar a requisição DELETE para a API
        const resposta = await fetch(`${API_URL}${idProduto}/`, {
            method: "DELETE"
        });

        // Verificar se a exclusão foi realizada
        if (!resposta.ok) {
            throw new Error("Não foi possível excluir o produto.");
        }

        // Informar que a exclusão foi concluída
        mostrarNotificacao(
            "Produto excluído com sucesso!",
            "sucesso"
        );

        // Atualizar a tabela automaticamente
        await carregarProdutos();

    } catch (erro) {

        console.error("Erro:", erro.message);

        mostrarNotificacao(
            "Erro ao excluir o produto.",
            "erro"
        );
    }
}

// Pesquisar produtos na tabela
function pesquisarProdutos() {

    const termo = document.getElementById("pesquisa-produto")
        .value.trim().toLowerCase();

    const linhas = document.querySelectorAll(
        "#lista-produtos tr"
    );

    let quantidadeEncontrada = 0;

    produtosCarregados.forEach((produto, indice) => {

        const id = String(produto.id_produto);
        const nome = (produto.nome_produto ?? "").toLowerCase();
        const qrcode = (produto.id_qrcode ?? "").toLowerCase();

        // Se o termo contém apenas números, pesquisar pelo ID
        const pesquisaPorId = /^\d+$/.test(termo);

        const encontrado = termo === "" ||
            (pesquisaPorId
                ? id === termo
                : nome.includes(termo) || qrcode.includes(termo));

        linhas[indice].hidden = !encontrado;

        if (encontrado) {
            quantidadeEncontrada++;
        }
    });

    // Remover mensagem anterior, caso exista
    const mensagemAnterior = document.getElementById(
        "mensagem-sem-resultados"
    );

    if (mensagemAnterior) {
        mensagemAnterior.remove();
    }

    // Exibir mensagem quando nenhum produto for encontrado
    if (quantidadeEncontrada === 0) {

        const tabela = document.getElementById("lista-produtos");

        const linha = tabela.insertRow();
        linha.id = "mensagem-sem-resultados";

        const celula = linha.insertCell();
        celula.colSpan = 5;
        celula.textContent = "Nenhum produto encontrado.";

        celula.className = "sem-resultados";
    }
}

// Limpar a pesquisa e exibir todos os produtos
function limparPesquisa() {

    // Limpar o campo de pesquisa
    document.getElementById("pesquisa-produto").value = "";

    // Exibir novamente todos os produtos
    pesquisarProdutos();

}

// Exibir notificações no sistema
function mostrarNotificacao(mensagem, tipo = "sucesso") {

    const area = document.getElementById("area-notificacoes");

    const notificacao = document.createElement("div");

    notificacao.className = `notificacao ${tipo}`;
    notificacao.textContent = mensagem;

    area.appendChild(notificacao);

    // Remover automaticamente após 4 segundos
    setTimeout(() => {
        notificacao.remove();
    }, 4000);
}

// Evento do botão Limpar
document.getElementById("btn-limpar")
    .addEventListener("click", limparPesquisa);

// Botão Pesquisar
document.getElementById("btn-pesquisar")
    .addEventListener("click", pesquisarProdutos);

// Associar o envio do formulário à função de cadastro
formProduto.addEventListener("submit", cadastrarProduto);

// Carregar produtos ao abrir a página
document.addEventListener("DOMContentLoaded", carregarProdutos);