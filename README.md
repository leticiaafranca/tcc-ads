# tcc-ads
### Introdução ao PrisMED

Este projeto é uma aplicação web fullstack que permite registro e autenticação de usuários, além de funcionalidades relacionadas ao domínio da aplicação (exemplo: gerenciamento de pacientes, consultas, dashboard de visualização, etc.). O sistema busca oferecer uma gestão eficiente e intuitiva da rotina médica, permitindo o controle centralizado de horários, pacientes e profissionais da saúde. O escopo deste README abrange o planejamento e a implementação do sistema, destacando os requisitos funcionais, as tecnologias a serem utilizadas e os objetivos específicos do projeto.

O público-alvo deste projeto é composto por dois grupos fundamentais: as equipes médicas e os pacientes. O sistema foi desenvolvido para atender às demandas específicas das equipes médicas, oferecendo uma plataforma intuitiva que possibilita o acesso rápido e organizado às agendas clínicas. Além disso, a ferramenta incorpora recursos visuais, como gráficos e tabelas, que facilitam a análise e o acompanhamento das consultas em aberto, otimizando o fluxo de trabalho na clínica. Para os pacientes, o sistema representa um avanço na experiência de atendimento, eliminando a necessidade de longas esperas em filas e garantindo um acesso mais eficiente aos serviços médicos, promovendo, assim, maior conforto e satisfação.

A arquitetura adotada neste projeto segue uma organização de separar o código em três principais camadas: components, utils e pages. Os components são responsáveis por abrigar os elementos reutilizáveis da interface, facilitando a manutenção e o reaproveitamento do código. A pasta utils concentra funções auxiliares e utilitários que suportam a lógica da aplicação. Já as pages representam as telas e rotas principais da aplicação, orquestrando os componentes e definindo a estrutura da navegação.

O projeto utiliza as seguintes tecnologias:

No backend, foi usado Node.js como ambiente de execução JavaScript, combinado com o framework Express para criar uma API REST que gerencia as requisições e respostas do sistema. Para o banco de dados, usou-se o MongoDB, um banco NoSQL que permite armazenar os dados de forma flexível. O acesso e manipulação dos dados no banco são feitos através do Mongoose, uma biblioteca que facilita a modelagem dos dados e a criação de esquemas.

No frontend, a interface do usuário foi construída com React.js. A navegação entre as diferentes telas da aplicação é controlada pelo React Router, que permite gerenciar rotas de forma simples e eficiente.

Para autenticação, o sistema usa JWT (JSON Web Token), que permite validar usuários de forma segura e sem necessidade de manter sessões no servidor. Além disso, as senhas dos usuários são armazenadas com criptografia, utilizando a biblioteca bcrypt, que protege os dados sensíveis contra acessos não autorizados.

Como forma de validar o conceito do projeto e receber feedback relativo a usabilidade, foi feita uma reunião com o médico de estratégia da família de um posto de saúde de Fortaleza. Nessa reunião, foi possível mostrar o projeto em execução. O gestor da unidade não pode comparecer à reunião.Add commentMore actions

<details>
  <summary>Ver imagem</summary>
  
![IMG_8685](https://github.com/user-attachments/assets/6e59c15b-5b1c-4a9a-86ed-45e6cfcf8566)

</details>

### Instruções para rodar o projeto:

1. Backend
Para rodar o projeto localmente, primeiro clone o repositório. 
```bash 
git clone https://github.com/leticiaafranca/tcc-ads.git
```
Logo em seguida, entre na pasta do projeto por meio de linha de comando ou navegando normalmente. O projeto contém duas pastas, chamadas frontend e backend. Entre na pasta do backend e execute o seguinte comando:

```bash
npm install
```
O arquivo .env não está incluído no repositório por motivos de segurança e boas práticas. Enviei o conteúdo do arquivo por meio da plataforma do AVA, no arquivo onde estava o link para o repo. Para criar o arquivo manualmente, siga os passos abaixo:

Acesse a pasta raiz do projeto (onde estão localizados src/, server.js, etc.) e execute:

```bash
touch .env
```
Você pode abrir o arquivo .env como preferir. Caso prefira fazer por linha de comando, execute o comando abaixo para criar e editar o arquivo .env com o editor nano:

```bash
nano .env
```
Com o editor aberto, cole o conteúdo enviado pela plataforma do AVA. Após colar o conteúdo, pressione:

- Ctrl + O para salvar (novamente: na RAIZ DO PROJETO BACKEND),

- Enter para confirmar,

- Ctrl + X para sair do editor.

O arquivo .env é oculto, então por padrão ele não irá "aparecer" na pasta. Mas confie: ele está lá, se tudo tiver dado certo. Para confirmar, você pode exibir os itens ocultos do Windows ou clicar em Command + Shift + . se tiver no MacOS.

Feito isso, inicie o servidor:

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

Projeto desenvolvido por: Letícia Albuquerque de França - 2326941
