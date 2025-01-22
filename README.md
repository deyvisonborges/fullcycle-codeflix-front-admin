# Codeflix Admin

O **Codeflix Admin** é uma aplicação front-end projetada para gerenciamento e administração de conteúdos. O projeto utiliza **React** como base para a construção de interfaces, juntamente com ferramentas modernas para desenvolvimento, teste, estilização e gerenciamento de estado. Ele inclui funcionalidades de desenvolvimento local, testes automatizados, integração de APIs simuladas e suporte a Storybook para desenvolvimento e documentação de componentes.

## Principais Tecnologias e Ferramentas

### Frameworks e Bibliotecas

- **React** e **React-DOM** para construção de interfaces de usuário.
- **React Router DOM** para gerenciamento de rotas.
- **@Reduxjs/Toolkit** e **React-Redux** para gerenciamento de estado.
- **Styled-Components** para estilização dinâmica.

### Desenvolvimento e Build

- **Vite** como ferramenta de build e servidor de desenvolvimento rápido.
- **TypeScript** para tipagem estática.
- **Storybook** para desenvolvimento e documentação de componentes de forma isolada.

### Testes

- **Jest** como framework principal de testes.
- **Testing Library** para testes de componentes React.
- **MSW** para simulação de APIs durante os testes e desenvolvimento.

### Ferramentas de Qualidade de Código

- **ESLint** para linting.
- **Prettier** para formatação de código.
- Configurações específicas para integração com Storybook.

### Mock e APIs Simuladas

- **JSON Server** para criação de mocks de APIs REST.
- **MSW** para simulação de requisições HTTP no desenvolvimento e testes.

### Outras Ferramentas Notáveis

- **Axios** para requisições HTTP.
- **Notistack** para notificações.
- **Keycloak** para gerenciamento de autenticação.

## Scripts Disponíveis

### Desenvolvimento

- `npm run dev`: Inicia o servidor local com Vite.
- `npm run dev:mock`: Ativa o mock de APIs com o MSW.

### Build e Pré-visualização

- `npm run build`: Gera os arquivos otimizados para produção.
- `npm run preview`: Inicia a pré-visualização da build.

### Testes

- `npm run test`: Executa testes com Jest.
- `npm run test:watch`: Executa testes no modo de observação.
- `npm run test:cover`: Gera relatórios de cobertura.

### Storybook

- `npm run storybook`: Inicia o Storybook no ambiente local.
- `npm run build-storybook`: Cria uma versão estática do Storybook.

### Mock Server

- `npm run mock-server`: Inicia um servidor de APIs mock com JSON Server.

### Linting e Formatação

- `npm run code:check`: Verifica a qualidade do código.
- `npm run code:format`: Corrige problemas de formatação automaticamente.

## Finalidade

O **Codeflix Admin** serve como um painel administrativo para gerenciar dados, conteúdos e integrações em um ambiente moderno e eficiente. Ele é altamente configurável, utilizando boas práticas de desenvolvimento e integração contínua para garantir qualidade e escalabilidade.
