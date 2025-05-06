# Atividade 1 - API de Produtos e Carrinhos
 
## 📌 Descrição
 
Projeto desenvolvido com Node.js e Express para gerenciar produtos e carrinhos de compras. A persistência dos dados é feita com arquivos JSON.
 
## 🚀 Como rodar o projeto
 
1. Clone o repositório:

   ```bash

   git clone https://github.com/otosales/atividade1.git

   ```

2. Instale as dependências:
 
   ```bash

   npm install

   ```

3. Inicie o servidor:

   ```bash

   npm start

   ```
 
*O servidor estará disponível em:
📍 http://localhost:8080*

## 🔗 Endpoints disponíveis

**Produtos (/api/products)**
 
- GET / – Lista todos os produtos
 
- GET /:pid – Busca produto por ID
 
- POST / – Adiciona novo produto
 
- PUT /:pid – Atualiza produto existente
 
- DELETE /:pid – Remove produto
 
**Carrinhos (/api/carts)**

POST / – Cria novo carrinho
 
GET /:cid – Lista produtos de um carrinho
 
POST /:cid/product/:pid – Adiciona produto a um carrinho
 
## 🛠 Tecnologias

Node.js
 
Express
 
File System (fs)