# Design

## Context

Consulte [proposal.md](./proposal.md) para a motivação e [specs/historical-exploration/spec.md](./specs/historical-exploration/spec.md) para os comportamentos requeridos.

O projeto contém um `index.html` vazio, não contém manifesto de dependências nem código-fonte de uma aplicação, e possui 30 imagens WebP em `imagens/galeria`. O `LEIA-ME.txt` descreve um site React compilado e instruções para abrir o HTML diretamente, mas esse conteúdo não está presente no arquivo atual. A direção confirmada é desenvolver um app React com build; a primeira versão terá navegação pelas áreas com um conjunto curado de conteúdos, não um catálogo exaustivo.

## Goals / Non-Goals

**Goals:**
- Construir uma aplicação de pesquisa navegável, com páginas reutilizáveis e conteúdo editorial separado da interface.
- Permitir ampliar o catálogo sem reorganizar ou duplicar a navegação.
- Manter fontes, contexto temporal, ligações e informações de uso de imagens associadas aos conteúdos.
- Usar a galeria existente como referência visual, validando cada imagem antes de a publicar.

**Non-Goals:**
- Criar backend, contas de usuário, personalização ou edição de conteúdo pelo público.
- Cobrir toda a história em uma única entrega.
- Tratar artes conceituais ou reconstruções como fontes históricas.
- Garantir execução por duplo clique via `file://`; desenvolvimento usará o servidor local e a versão final será um build estático para servir por HTTP.

## Decisions

### Aplicação React com build e distribuição estática

Criar uma aplicação de página única com React, TypeScript e Vite. Manter código e conteúdo-fonte em diretórios próprios e gerar arquivos estáticos para distribuição. O servidor de desenvolvimento dará suporte ao trabalho local; a publicação poderá usar hospedagem estática, sem serviço de aplicação ou backend.

Essa estrutura preserva o app React desejado e permite evolução e verificação do código-fonte. Um HTML monolítico compilado, como sugere o README atual, torna a manutenção e a organização de conteúdo mais difíceis. HTML/CSS/JavaScript sem framework também seria menor, mas não corresponde à decisão de desenvolver o produto em React. Abrir o build diretamente por `file://` não será um requisito: importações de módulos e caminhos de assets podem depender de um servidor HTTP.

### Navegação cronológica e temática na mesma aplicação

Organizar a aplicação em torno de uma linha do tempo, com entradas de períodos e páginas temáticas relacionadas. Disponibilizar páginas de descoberta para períodos e trilhas, uma página inicial, páginas de conteúdo reutilizáveis e uma área de exploração com busca e filtros. Usar URLs distintas para conteúdos importantes, para que sejam compartilháveis e acessíveis por links diretos.

Manter o tempo geológico separado da história humana na organização do conteúdo e na apresentação da linha do tempo. Trilhas de guerras, revoluções e mitologias podem apontar para vários períodos; não serão forçadas a caber em uma única categoria cronológica.

### Conteúdo local, tipado e ligado por identificadores

Manter o conteúdo inicial em módulos de dados locais tipados, sem banco de dados ou CMS. Cada entrada terá um identificador estável, tipo, título, resumo, intervalo ou rótulo temporal, categorias e referências para conteúdos relacionados. Os dados de tempo geológico e os de história humana permanecerão distinguíveis.

Uma entrada poderá registrar referências bibliográficas e fontes primárias, links, tipo de fonte, legenda e texto alternativo da imagem, além de crédito e licença quando aplicáveis. A interface apresentará as referências disponíveis junto ao conteúdo. Os módulos de dados serão a origem dos cards, filtros, resultados e links, evitando listas divergentes embutidas nos componentes.

Começar com um conjunto curado de exemplos distribuídos pelas áreas de lançamento. A seleção exata de assuntos e suas referências será uma etapa editorial com pesquisa; as imagens da galeria não substituem esse trabalho.

### Busca e filtros no catálogo carregado

Executar busca e filtros no catálogo local da aplicação. Pesquisar títulos, resumos e termos associados, e permitir refinar resultados por tipo, tema ou período quando a informação existir. Para o primeiro catálogo curado, a busca no próprio cliente evita introduzir um serviço e mantém os mesmos dados usados nas páginas.

### Galeria como material visual sujeito a revisão

Preservar os arquivos originais em `imagens/galeria` e registrar, para cada asset selecionado, seu uso, texto alternativo, legenda e informação de autoria/licença disponível. Priorizar imagens com função visual de apoio; não lhes atribuir valor de evidência documental. Só usar uma imagem como fonte histórica quando sua procedência estiver identificada.

Adotar a direção visual observada nas referências — fundo azul-escuro, acentos dourados, imagens panorâmicas e cards — sem copiar texto ou tratar os mockups como especificação final de conteúdo. Interface responsiva, contraste legível e navegação por teclado devem ser considerados ao compor os componentes.

A página inicial seguirá a composição panorâmica da referência espacial, adaptada ao tema histórico, com uma chamada principal e navegação visual por cards. A segunda referência histórica orientará a hierarquia dos cards de época e dos conteúdos em destaque. Até que autoria e licença sejam confirmadas, a implementação usará elementos gráficos próprios em CSS em vez de distribuir imagens da galeria ou capturas de referência.

### Verificação da aplicação e do conteúdo

Adicionar verificações para build, comportamento da navegação e busca, além de testes dos dados essenciais. Validar que as entradas têm identificadores únicos, campos obrigatórios, referências internas resolvidas e distinção temporal consistente. Conferir também links e metadados de fontes e imagens antes da publicação.

## Risks / Trade-offs

- [Risco] O README anuncia um site React completo, embora o HTML atual esteja vazio. → [Mitigação] Tratar o repositório como uma aplicação nova e atualizar a documentação de execução quando o scaffold for criado.
- [Risco] Datas, nomes ou relações apresentados nos mockups podem conter simplificações ou erros históricos. → [Mitigação] Usar os mockups apenas como referência visual e pesquisar cada conteúdo e data antes de publicá-los.
- [Risco] A origem e os direitos de uso das imagens da galeria não estão documentados aqui. → [Mitigação] Auditar licença, autoria e adequação antes de incluir cada imagem na versão distribuída; substituir assets sem direitos confirmados.
- [Risco] Busca no cliente pode ficar lenta quando o catálogo crescer muito. → [Mitigação] Começar pelo catálogo curado e medir antes de introduzir indexação especializada ou busca remota.
- [Trade-off] Um app React com build exige Node.js e um servidor local no desenvolvimento, ao contrário da promessa atual de abrir o HTML por duplo clique. → [Mitigação] Documentar instalação, desenvolvimento e build; distribuir os arquivos estáticos por hospedagem HTTP.
