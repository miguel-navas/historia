---
title: 'Menu e página Oriental'
type: 'feature'
created: '2026-11-18'
status: 'done'
route: 'oneshot'
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="human-owned intent">

## Intent

Criar menu e página Oriental no mesmo padrão das páginas Revoluções e Guerras. Usar primeira referência `image_20261110_230701.webp` para banner panorâmico sem textos incorporados e segunda `image_20261110_230839.webp` para ilustrações dos cards. Cabeçalho existente, azul-escuro e dourado, título Oriental e subtítulo, busca e filtros Todos/China/Japão/Impérios/Guerreiros. Doze temas da referência, incluindo o card Samurai cujo texto falta no desenho. Corrigir legendas evidentemente trocadas, manter originais intactos. Cards abrem conteúdo pertinente com fontes; abrir a página localmente ao concluir.

</frozen-after-approval>

## Implementation Notes

- Reutilizar EraShowcasePage, acrescentar config Oriental, rota `#/oriental` e link do menu. Não alterar outras páginas.
- Temas: China Imperial, Grande Muralha, Exército de Terracota, Rota da Seda, Japão Feudal, Samurais, Ninjas, Império Mongol, Império Persa, Índia/Império Mughal, Genghis Khan, Buda/Budismo.
- Reutilizar verbete do Império Mongol. Outros conteúdos curtos com fontes institucionais em `site/src/data/oriental.ts`, adicionados ao catálogo.
- Legendas históricas cuidadosas: Império Persa aquemênida 550–330 a.C.; não copiar legenda japonesa associada por erro na referência. Datas de Buda e faixas de Rota da Seda/Muralha são aproximadas, não cronologias rígidas.
- Ilustrações dos doze cards selecionadas por janelas CSS específicas de cada região, sem expor títulos embutidos. Aspecto fixo das janelas; viewport responsivo com três/duas/uma coluna.
- Banner ImageGen baseado nas referências, título ligeiramente elevado como pedido para Guerras. Registrar prompt e origem dos assets.
- Verificar doze links, menu ativo, filtros combinados com busca sem acentos/dinastia/personagem, ausência de resultados, passagem a.C./d.C., fontes, desktop/celular e console. Testes/lint/build e revisão independente.
- Apenas execução local. Sem publicação na VM nem push.
- Entregue: 12 cards, 11 verbetes novos e 1 reutilizado, menu/rota, atlas e panorama. 28 testes, lint e build passaram. Desktop 1440px: três colunas; celular 390px: uma coluna sem transbordamento.
- Imagens HTTP200 e captura visual verificadas após recarregar a página que havia sido aberta antes da conclusão da geração.

## Review Triage Log

- low / patch: busca Gêngis/Gengis não encontrava a biografia. Adicionada a grafia portuguesa ao corpo pesquisável.
- low / patch: samurais/ninjas classificados como tradições entravam na trilha mitológica. Reclassificados como recortes históricos (`period`).
- low / patch: budismo como período não entrava na trilha de tradições culturais. Classificado como tradição, preservando contexto humano e cronologia debatida de Buda.
- Atlas inspecionado, fontes institucionais verificadas, sem pendências da revisão.
