# UniForum

## Visão Geral

Este projeto consiste em um fórum online dedicado aos alunos do Centro Universitário Maurício de Nassau (UNINASSAU), particulamente para os do câmpus de Cacoal. O fórum servirá como uma plataforma interativa onde os alunos poderão trocar informações, discutir temas relacionados aos seus cursos, compartilhar experiências e promover um ambiente acadêmico colaborativo e engajado.

## Objetivos

O UniForum possui uma série de objetivos que visam criar uma plataforma que atenda às necessidades e expectativas dos alunos da UNINASSAU, promovendo um ambiente de aprendizado colaborativo e enriquecedor:

- **Facilitar a comunicação entre os alunos:** Proporcionar um espaço onde os alunos possam se conectar, trocar informações e colaborar uns com os outros.
- **Promover o compartilhamento de conhecimento:** Incentivar discussões e debates sobre temas relacionados aos cursos, permitindo que os alunos compartilhem experiências e aprendam uns com os outros.
- **Estimular a interdisciplinaridade:** Criar um ambiente que promova a colaboração entre diferentes áreas de estudo, incentivando a troca de ideias e perspectivas.
- **Fomentar a participação e o engajamento:** Encorajar os alunos a participarem ativamente do fórum, compartilhando suas opiniões, dúvidas e contribuindo para o crescimento da comunidade acadêmica.
- **Oferecer recursos para o desenvolvimento acadêmico:** Disponibilizar materiais de estudo, dicas, orientações e outras informações úteis que possam auxiliar os alunos em seu processo de aprendizado e crescimento acadêmico.

## Tecnologias Utilizadas

- **Linguagens de Programação:** Python, Node.js e TypeScript
- **Frameworks:** Django, Vue.js e Tailwind
- **Bancos de Dados:** SQLite
- **Ferramentas de Desenvolvimento:** Visual Studio Code e Postman
- **Ferramentas de Modelagem:** Draw.io e UML

## Requisitos Funcionais

### **Autenticação e Conta**

---

### [RF001] Login

**Prioridade:** ✅ Essencial ⬜ Importânte ⬜ Desejável

Permitir que os usuários façam login em suas contas utilizando o número da matricula e a senha.

### [RF002] Cadastro

**Prioridade:** ✅ Essencial ⬜ Importânte ⬜ Desejável

Permitir que os alunos da UNINASSAU se cadastrem no fórum, fornecendo informações como nome, curso, número de matrícula, e-mail e senha.

### [RF003] Recuperação de conta

**Prioridade:** ⬜ Essencial ✅ Importânte ⬜ Desejável

Fornecer um mecanismo para que os usuários possam recuperar o acesso à sua conta em caso de esquecimento de senha ou problemas de login.

### [RF004] Edição de perfil

**Prioridade:** ✅ Essencial ⬜ Importânte ⬜ Desejável

Permitir que os usuários visualizem e atualizem as informações do seu perfil.

### [RF005] Edição de conta

**Prioridade:** ✅ Essencial ⬜ Importânte ⬜ Desejável

Permitir que os usuários visualizem e atualizem as informações da sua conta, como email e senha.

### Tópicos e Comentários

---

### [RF006] Postagem de tópicos

**Prioridade:** ✅ Essencial ⬜ Importânte ⬜ Desejável

Permitir que os usuários logados criem novos tópicos de discussão inserindo as informações como curso, tag para classificações e o conteúdo da publicação.

### [RF007] Comentário de tópicos

**Prioridade:** ✅ Essencial ⬜ Importânte ⬜ Desejável

Permitir que os usuários logados comentem nas postagens de tópicos.

### [RF008] Resposta de comentários

**Prioridade:** ⬜ Essencial ✅ Importânte ⬜ Desejável

Permitir que os usuários logados respondam a comentários de outros usuários.

### [RF009] Interações

**Prioridade:** ✅ Essencial ⬜ Importânte ⬜ Desejável

Permitir que os usuários logados curtam os tópicos e comentários.

### [RF010] Edição e exclusão de tópicos e comentários

**Prioridade:** ✅ Essencial ⬜ Importânte ⬜ Desejável

Permitir que os usuários logados editem e excluam os próprios tópicos e comentários.

### [RF011] Listagem de tópicos

**Prioridade:** ✅ Essencial ⬜ Importânte ⬜ Desejável

Permitir que os usuários naveguem pelos tópicos do fórum, visualizando uma lista de tópicos.

### [RF012] Filtragem

**Prioridade:** ✅ Essencial ⬜ Importânte ⬜ Desejável

Fornecer uma funcionalidade de filtragem por matérias, tags e de pesquisa que permita aos usuários buscar tópicos por título.

### [RF013] Ordenação

**Prioridade:** ✅ Essencial ⬜ Importânte ⬜ Desejável

Permitir que os usuários ordenem os tópicos por relevância ou data de postagem.

### **Notificações**

---

### [RF014] Notificações de interações

**Prioridade:** ✅ Essencial ⬜ Importânte ⬜ Desejável

Os usuários devem ser notificados quando alguém interage com um dos seus tópico ou comentários.

## Requisitos Não Funcionais

### [RNF001] Responsividade

**Prioridade:** ✅ Essencial ⬜ Importânte ⬜ Desejável

O layout do sistema deve ser flexível e adaptável, ajustando-se automaticamente para acomodar diferentes tamanhos de tela e proporções, mantendo a integridade do design e a usabilidade.

### [RNF002] Usabilidade

**Prioridade:** ✅ Essencial ⬜ Importânte ⬜ Desejável

O sistema deve ser fácil de usar e intuitivo, com uma interface amigável que permita aos usuários navegar e interagir com facilidade.

### [RNF003] Autenticação e Autorização

**Prioridade:** ✅ Essencial ⬜ Importânte ⬜ Desejável

O sistema deve utilizar tokens JWT para autenticar os usuários, garantindo que apenas usuários autenticados tenham acesso aos recursos protegidos.

## Modelagem de software

### Diagrama de Caso de Uso

### Diagrama de Sequência

### Diagrama de Atividade
![Diagrama de atividade](https://github.com/felipemdf/UniForum/assets/99979201/6e8ea138-a8b6-4df8-abe8-0996135ac941)

### Diagrama de Classe

### Diagramade Entidade Relacionamento

