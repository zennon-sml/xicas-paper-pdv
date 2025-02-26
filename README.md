# XICAS PAPER PDV
Esse projeto é uma aplicação web voltada para a gestão de vendas, estoque e finanças de uma papelaria chamada "XICAS PAPER". A aplicação permite que os usuários realizem operações como cadastro de produtos, registro de vendas, controle de estoque e visualização de histórico de vendas. Além disso, a aplicação oferece funcionalidades como adição rápida de produtos, cálculo de descontos, e finalização de vendas com diferentes métodos de pagamento.

### Principais Funcionalidades:
1. *Gestão de Vendas:*
   - Registro de vendas com cálculo automático de totais e descontos.
   - Finalização de vendas com opções de pagamento (ex: dinheiro).
   - Histórico de vendas com filtros por dia, semana, mês e ano.

2. *Gestão de Estoque:*
   - Cadastro de produtos com informações como nome, código de barras, quantidade, custo, preço de venda, descrição e tags.
   - Edição e exclusão de produtos.
   - Pesquisa de produtos por nome, código de barras ou ID.
   - Controle de estoque baixo e produtos com cadastro pendente.

3. *Interface de Usuário:*
   - Barra lateral com navegação entre diferentes módulos (vendas, estoque, finanças).
   - Modais para adicionar/editar produtos e finalizar vendas.
   - Tabelas interativas para visualização de dados.

### Tecnologias Envolvidas:
1. *Frontend:*
   - *React*: Biblioteca JavaScript para construção de interfaces de usuário.
   - *Next.js*: Framework React para renderização do lado do servidor (SSR) e geração de sites estáticos.
   - *Tailwind CSS*: Framework CSS utilitário para estilização rápida e responsiva.
   - *TypeScript*: Superset de JavaScript que adiciona tipagem estática ao código.
   - *Fuse.js*: Biblioteca para busca difusa (fuzzy search) em listas de produtos.
   - *React Icons*: Biblioteca de ícones para React.

2. *Backend:*
   - *Node.js*: Ambiente de execução JavaScript para o servidor.
   - *Express.js*: Framework para construção de APIs RESTful.
   - *Fetch API*: Para fazer requisições HTTP ao backend.
   - *Serviços de Produto*: Funções para buscar, criar, atualizar e deletar produtos (ex: getAllProducts, createProduct, updateProductById, deleteProductById).

3. *Outras Ferramentas:*
   - *LocalStorage*: Para armazenamento local de dados no navegador.
   - *FileReader API*: Para leitura de arquivos de imagem e conversão para base64.
   - *React Modal*: Para criação de modais interativos.

### Estrutura do Projeto:
- *Componentes Reutilizáveis*: A aplicação é construída com base em componentes reutilizáveis como SideBar, ItemList, ItemProperties, SaleList, ModalItemScreen, entre outros.
- *Roteamento*: Utiliza o Next.js para roteamento entre diferentes páginas (ex: vendas, estoque, finanças).
- *Estado Global*: O estado da aplicação é gerenciado principalmente através de hooks do React como useState e useEffect.

### Fluxo de Trabalho:
1. *Vendas:*
   - O usuário seleciona produtos, define quantidades e descontos, e finaliza a venda.
   - A venda é registrada no histórico e o estoque é atualizado.

2. *Estoque:*
   - O usuário pode adicionar novos produtos, editar informações existentes ou deletar produtos.
   - A aplicação permite a busca rápida de produtos e a filtragem por diferentes categorias (ex: estoque baixo, cadastro pendente).

3. *Finanças:*
   - A aplicação oferece uma visão geral das finanças, incluindo ganhos brutos, líquidos e gastos.

### Conclusão:
Este projeto é uma solução completa para a gestão de uma papelaria, integrando funcionalidades de vendas, estoque e finanças em uma única plataforma. A utilização de tecnologias modernas como React, Next.js e Tailwind CSS garante uma experiência de usuário fluida e responsiva, enquanto o uso de TypeScript e boas práticas de desenvolvimento assegura a manutenibilidade e escalabilidade do código.
