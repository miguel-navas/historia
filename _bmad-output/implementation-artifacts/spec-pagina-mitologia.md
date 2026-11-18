---
title: 'Página Mitologia e título elevado no banner'
type: 'feature'
created: '2026-11-18'
status: 'done'
route: 'oneshot'
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="human-owned intent">

## Intent

Seguir a sequência de páginas do usuário com Mitologia, usando as referências `image_20261110_231214.webp` e `image_20261110_231230.webp`. O texto do primeiro banner deve ocupar mais a área livre acima: título e subtítulo elevados, sem sobrepor os personagens principais. Mesmo padrão de navegação, busca, filtros e cards das páginas anteriores; menu Mitologia funcional, conteúdos pertinentes e execução local para visualização.

</frozen-after-approval>

## Implementation Notes

- Reutilizar EraShowcasePage, configurar `#/mitologia`, título Mitologia, subtítulo da referência e deslocamento vertical responsivo maior que o de Guerras/Oriental.
- Onze cards presentes na referência: Mitologia Grega; Zeus/Olimpo; Hércules/12Trabalhos; Medusa/Minotauro; Mitologia Nórdica; Thor/Ragnarök; Mitologia Egípcia; Mitologia Romana; Mitologia Asteca/Maia; Mitologia Hindu; Dragões/Criaturas Lendárias.
- Filtros Todos, Grega, Nórdica, Egípcia, Criaturas. Demais tradições disponíveis em Todos e busca. Reutilizar verbete grego existente, acrescentar dez verbetes culturais com fontes institucionais sem datas artificiais na linha do tempo.
- Narrativas identificadas como tradições, com versões e contextos distintos; não apresentar seres mitológicos como acontecimentos históricos. Respeitar tradições religiosas vivas.
- Primeiro panorama e atlas único3x4 derivados das referências usando ferramenta ImageGen; remover textos e UI, preservar motivos culturais. Última célula não utilizada. Thor permanece em cenário nórdico, sem motivos japoneses incidentais na referência.
- Testes de menu/onze destinos, filtros e busca sem acentos, destino Zeus com fontes e classificação cultural, reset entre páginas. Conferir desktop/celular, posição do título e HTTP200 das imagens antes de abrir para o usuário.
- Somente execução local; sem publicação remota.
- Implementados os onze cards, dez verbetes culturais novos e reutilizado o grego existente, com destinos e fontes. Testes: 30 passaram; lint/build concluídos.
- Navegador: desktop 1440px, três colunas, título a 79px do topo de um banner de 490px; celular 390px, uma coluna e sem transbordamento. Busca Nórdica/Mjolnir encontrou Thor. Imagens HTTP200 e console sem erros.
- Rótulos de evidência/interpretação/tradição traduzidos na página de conteúdo.

## Review Triage Log

- low / patch: o atlas dava a Hércules um martelo semelhante ao de Thor. Edição localizada solicitada para substituí-lo por clava, preservando os outros painéis e a malha3x4.
- Correção visual concluída e inspecionada: Hércules agora segura uma clava de madeira, Thor mantém o martelo, demais células preservadas.
- Nenhuma regressão comprovada de rotas, filtros, classificação cultural ou associação de cenas. Onze destinos alinhados.
- Referência Cambridge retornou falha em uma consulta da revisão, mas foi encontrada com conteúdo no mecanismo de busca. Sem evidência de link inválido; nenhuma mudança de URL baseada apenas nessa falha de coleta.
