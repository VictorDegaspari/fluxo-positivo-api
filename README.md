# 🩸 API Fluxo Positivo 🩸

### 🛠️ Ferramentas Utilizadas

- **Node.js:** Versão 16.6.0. [Site Oficial](https://nodejs.org/)
- **MongoDB:** Banco de dados NoSQL. [Site Oficial](https://account.mongodb.com/account/login?n=%2Fv2%2F637aab05b69ca83373ea3b11&nextHash=%23clusters)

### 📚 Bibliotecas e Ferramentas Complementares

- **express:** Versão ^4.18.2 [Site Oficial](https://expressjs.com/)
- **mongoose:** Versão ^6.7.2 [Site Oficial](https://mongoosejs.com/)
- **bcrypt**: Versão ^5.1.0 [Link NPM](https://www.npmjs.com/package/bcrypt)
- **body-parser**: Versão ^1.20.1 [Link NPM](https://www.npmjs.com/package/body-parser)
- **cors**: Versão ^2.8.5 [Link NPM](https://www.npmjs.com/package/cors)
- **dotenv**: Versão ^16.0.3 [Link NPM](https://www.npmjs.com/package/dotenv)
- **express-jwt**: Versão ^7.7.7 [Link NPM](https://www.npmjs.com/package/express-jwt)
- **jsonwebtoken**: Versão ^8.5.1 [Link NPM](https://www.npmjs.com/package/jsonwebtoken)
- **mongodb**: Versão ^4.12.0 [Link NPM](https://www.npmjs.com/package/mongodb)

### ⚙️ Configuração da Base de Dados

1. Crie uma conta Free no [Mongo Atlas](https://account.mongodb.com/account/login?n=%2Fv2%2F637aab05b69ca83373ea3b11&nextHash=%23clusters).
2. Crie um novo banco de dados com o nome que desejar.
3. Crie o arquivo `.env` na raiz do projeto seguindo o exemplo do `.env.example`.
4. Nome e senha do CLUSTER são encontrados no seu usuário do banco criado no MongoDB, eles serão usados no arquivo `.env` em `CLUSTER_NAME` e `CLUSTER_PASSWORD`. Dentro do [Mongo Atlas](https://cloud.mongodb.com/) é possível acessar `SECURITY > Database access > Database users` e obter seu usuário, caso não lembre a senha crie um outro com funções de admin para preencher `CLUSTER_NAME` e `CLUSTER_PASSWORD` do arquivo `.env`.

### ▶️ Como Executar o Projeto

1. Clone este repositório em sua máquina.
2. Navegue até a pasta do projeto e execute `npm install` para instalar as dependências.
3. Configure a base de dados.
4. Execute `npm run start` para iniciar o servidor.

### 🧪 Testando o Sistema

Para testar o sistema, utilize qualquer cliente HTTP de sua escolha (como Postman ou cURL) e faça requisições para `http://localhost:3001`.

### 👥 Equipe do Projeto

Este projeto foi desenvolvido pela equipe de alunos da UTFPR do Grupo 10.

- Victor Manoel Degaspari
- Guilherme Francisco Goveia Barros
- Guilherme Rocha Bastos
- Paulo Rogério de Pinho
- Caio Eike Honda Tacahashi 

### 🎯 Objetivo do Sistema

Este sistema foi desenvolvido para ajudar no controle de estoque de absorventes.

### 🚀 Funcionalidades Desenvolvidas

1. Funcionalidades CRUDS de estoque, produto, marca, doador/parceiro e perfil
2. Segurança de rotas com JWT utilizando sessões
3. Tratativas de erros
4. Modelagem dos dados

### 📋 Roteiro para Testar o Sistema

Para testar o sistema, siga estas etapas:

1. Crie uma conta
2. Crie um produto, caso tenha uma marca ou doador/parceiro adicione-os
3. Finalmente, crie um estoque com o produto desejado
4. Se desejar edite/exclua os produtos, estoques, marcas ou doadores

### 🔐 Contas de Acesso Padrão

A seguinte conta pode ser usadas para acessar o sistema em produção (https://fluxo-positivo.vercel.app/):

- Usuário: teste@teste.com, Senha: 123

