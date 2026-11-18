---
title: 'Página de Guerras'
type: 'feature'
created: '2026-11-18'
status: 'done'
route: 'oneshot'
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="human-owned intent">

## Intent

Criar Guerras no mesmo padrão da página Revoluções recém-concluída. Usar a primeira referência fornecida (`image_20261110_214754.webp`) para o banner panorâmico sem textos incorporados e a segunda (`image_20261110_214018.webp`) para seis cards: Segunda Guerra Mundial, Conquistas Mongóis, Cruzadas, Conquistas de Alexandre, Guerras Greco-Persas e Guerras Napoleônicas. Manter cabeçalho, visual azul-escuro/dourado, título/subtítulo sem botões no banner, busca, filtros e grade responsiva. Menu Guerras abre a rota nova; cards abrem conteúdo pertinente com referências. Executar e abrir localmente ao terminar.

</frozen-after-approval>

## Implementation Notes

- Reutilizar `EraShowcasePage`, adicionar `guerrasConfig`, rota `#/guerras` e link no menu. Preservar outras páginas.
- Novos temas e verbetes em `site/src/data/wars.ts`; incorporar ao catálogo. Conteúdos curtos sobre causas/contexto, sem tratar ilustrações como fontes documentais.
- Filtros: Todos, Antiguidade, Idade Média, Era Napoleônica, Mundo Contemporâneo. Busca por conflito, personagem ou ano; aceitar acentos omitidos e anos dentro de intervalos, incluindo a.C.
- As janelas CSS da segunda referência exibem só ilustrações, com proporção fixa. Dados de recorte associados por tema, não dependentes de índices de outra lista.
- Criar panorama limpo pela ferramenta integrada ImageGen, preservar arquivos de referência, registrar prompt e caminhos.
- Verificar menu, seis destinos específicos, filtros, busca, ausência de resultados, anos a.C., persistência do padrão visual e transição entre épocas. Rodar testes, lint e build; conferir desktop/celular, abrir localmente e salvar prévia.
- Apenas arquivos locais; sem publicação remota.
- Implementado e aberto localmente. Banner em `site/public/assets/hero-guerras.png`; referências/prompt em `site/public/assets/guerras/README.md`.
- Pedido posterior do usuário: subir título e subtítulo no banner. Aplicado deslocamento responsivo de 32–64px para cima, somente nesta página.
- Verificações: 25 testes, lint e build; navegador desktop 1440px com três colunas, celular 390px com uma coluna, sem transbordamento; busca 480 a.C. abre o verbete correto com fontes.

## Review Triage Log

- low / patch: buscas por figuras principais sem correspondência textual. Acrescentados Hitler/Churchill e Urbano II/Saladino aos contextos correspondentes.
- low / patch: marco 1294 do recorte mongol sem referência específica. Adicionado mapa do National Museum of Mongolia com intervalo 1206–1294.
- low / patch: marco 449 a.C. sem referência específica. Adicionado material educativo do British Museum com periodização 499–449 a.C.
- low / patch: sugestão do Antigo Reino egípcio não contextualizava Alexandre. Substituída por Atenas antiga.
- low / patch: especificação ainda citava Era Moderna. Alinhada ao filtro entregue Era Napoleônica.
- Nenhuma pendência da revisão.
