# EJ Serviços — Sistema de Gerenciamento de Produtos

Sistema web desenvolvido em Python e Django para gerenciamento de produtos da **EJ Serviços — Tudo para sua Piscina**.

O projeto oferece uma interface web integrada a uma API REST, permitindo realizar operações de cadastro, consulta, atualização e exclusão de produtos armazenados em um banco de dados MySQL.

## Tecnologias utilizadas

- Python 3.12
- Django 5.2
- Django REST Framework
- MySQL
- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Git e GitHub

## Funcionalidades

- Cadastro de produtos
- Listagem de produtos cadastrados
- Consulta detalhada de produtos
- Pesquisa por ID, nome ou QR Code
- Atualização de informações
- Exclusão de produtos mediante confirmação
- Validação de QR Code único
- Notificações visuais de sucesso e erro
- Interface web integrada à API REST

## API REST

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/produtos/` | Listar produtos |
| POST | `/api/produtos/` | Cadastrar produto |
| GET | `/api/produtos/{id}/` | Consultar produto |
| PUT | `/api/produtos/{id}/` | Atualizar produto |
| PATCH | `/api/produtos/{id}/` | Atualizar parcialmente |
| DELETE | `/api/produtos/{id}/` | Excluir produto |

## Estrutura do projeto

```text
crud_produtos_django/
├── config/
├── produtos/
│   └── templates/
│       └── index.html
├── static/
│   ├── css/
│   ├── img/
│   └── js/
├── .env.example
├── .gitignore
├── manage.py
├── requirements.txt
└── README.md
```

## Como executar localmente

**1. Clone o repositório e entre na pasta do projeto.**

**2. Crie e ative um ambiente virtual Python.**

**3. Instale as dependências:**

```bash
python -m pip install -r requirements.txt
```

**4. Configure o ambiente:**

Crie um arquivo `.env` com base no `.env.example` e preencha a chave secreta do Django e os dados de conexão com o MySQL.

**5. Prepare o banco de dados:**

Crie no MySQL o banco e a tabela `produtos` com a estrutura esperada pelo modelo Django. O projeto utiliza uma tabela existente, configurada com `managed = False`.

**6. Execute o servidor:**

```bash
python manage.py runserver
```

Acesse:

`http://127.0.0.1:8000/`

## Observações

O projeto foi desenvolvido para fins de estudo e portfólio profissional. A configuração padrão é voltada à execução local.

A API não possui autenticação e não deve ser disponibilizada publicamente com operações de escrita habilitadas sem controles adicionais de segurança.

## Autor

**Carlos Alberto Ferreira Júnior**

Desenvolvedor de Software | Python | Django | Django REST Framework | MySQL | JavaScript

GitHub: https://github.com/CarlosFerreiraJr