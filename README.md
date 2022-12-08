## Proposta

    A proposta do projeto foi a criar de uma aplicação que pudesse auxiliar na verificação e no registro de planilhas de serviços e estoque em uma rede de estética automotiva.

---

## Ferramentas

- REST APIs
- Node.js
- TypeScript
- PostgreSQL
- Prisma
- React

---

## Utilização

- crie um arquivo .env dentro das pastas back-end e front-end seguindo a estrutura dos arquivos .env.example que estão nas respectivas pastas:

- rode os seguintes comandos em um terminal na pasta back-end e no front-end respectivamente:

```bash
    $ npm i
    $ npx prisma migrate dev && npx prisma db seed
    $ npm run dev
```
```bash 
    $ npm i && npm run start
```

- Feita a instalação você pode acessar a aplicação em: 
http://localhost:3000/

com as informações abaixo para login.

```js
    email: teste@email.com
    senha: senha
```

