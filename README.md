# tcc-ads
Projeto aplicado de Análise e Desenvolvimento de Sistemas

Este projeto é uma aplicação web fullstack que permite registro e autenticação de usuários, além de funcionalidades relacionadas ao domínio da aplicação (exemplo: gerenciamento de pacientes, consultas, dashboard de visualização, etc.).

- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: React.js, React Router
- Autenticação: JWT
- Segurança: Senhas criptografadas com bcrypt

1. Backend
Para rodar o projeto localmente, primeiro clone o repositório. 
```bash 
git clone https://github.com/leticiaafranca/tcc-ads.git
```
Logo em seguida, entre na pasta do projeto por meio de linha de comando ou navegando normalmente. O projeto contém duas pastas, chamadas frontend e backend. Entre na pasta do backend e execute o seguinte comando:

```bash
npm install
```
O arquivo .env não está incluso no repositório por motivos de segurança e boas práticas. Enviei o arquivo por meio da plataforma do AVA. Arraste o arquivo para a pasta raiz do projeto, no mesmo nível que a pasta src, server.js, etc. Feito isso, inicie o servidor:

```bash
npm start
```
A API estará rodando na porta 3000. O Cluster do MongoDB está setado para permitir a conexão de qualquer IP.

2. Frontend
   
Para rodar o frontend, acesse a pasta frontend e execute o seguinte comando:

```bash
npm install
```

Agora, rode:

```bash
npm start
```

Caso dê conflito de portas, digite Y ou y para seguir. 

E é isso. Qualquer problema com o projeto, basta me contatar :)
