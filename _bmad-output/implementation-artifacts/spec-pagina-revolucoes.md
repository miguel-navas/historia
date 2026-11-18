---
title: 'Página de Revoluções'
type: 'feature'
created: '2026-11-18'
status: 'done'
route: 'oneshot'
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="human-owned intent">

## Intent

Criar a página Revoluções na aplicação existente, seguindo o exemplo da página Idade Média enviado pelo usuário. Usar o primeiro panorama como referência para o banner e a segunda imagem como origem das ilustrações dos nove cards. Preservar cabeçalho, azul-escuro, dourado, banner com título/subtítulo sem botão, busca, filtros e grade responsiva. Ligar o item Revoluções do menu à nova rota. Os cards devem abrir conteúdo pertinente. Ao terminar, executar a aplicação local e abrir a página para visualização.

</frozen-after-approval>

## Implementation Notes

- Reutilizar `EraShowcasePage` e acrescentar a configuração de Revoluções; não alterar o visual das outras épocas.
- Nove temas da referência: Revolução Francesa, Russa, Primavera dos Povos, Americana, Independência do Brasil, Haitiana, Chinesa, Iluminismo e Industrial. Filtros Todos, Europa, Américas, Mundo, Ideias.
- Novos verbetes curtos com referências institucionais complementam os dois existentes; todas as ligações devem resolver para o assunto específico.
- Banner sem letras gerado a partir das referências. Cards usam janelas CSS da segunda referência para preservar as ilustrações sem os textos incorporados. Originais preservados.
- Testar menu, nove cards, combinação busca/filtro, ausência de resultados e ligação de detalhes. Executar testes, lint, build e conferir desktop/celular.
- Pré-requisito: renderizador BMAD agora aceita chaves duplicadas apenas quando os valores resolvidos coincidem; conflito real continua sendo erro.
- Sem publicação remota; visualização local solicitada.
- Implementado menu/rota, banner, nove cards e sete verbetes com fontes institucionais, reutilizando os dois verbetes existentes. As imagens estão preservadas e documentadas em `site/public/assets/revolucoes/README.md`.
- Verificação: 22 testes passaram; lint e build passaram. Navegador: desktop 1440px com três colunas; celular 390px com uma coluna e sem transbordamento horizontal; combinação Américas + 1822 abre o verbete Independência do Brasil com fontes.

## Review Triage Log

- medium / patch: busca por ano não incluía datas intermediárias dos intervalos. Adicionados intervalos numéricos para os cards novos e regressão de busca 1800/Haiti.
- medium / patch: busca sem acentos falhava. Normalização de diacríticos no componente compartilhado e teste de `revolucao francesa`/`independencia`.
- low / patch: janelas da imagem escalavam com proporções variáveis. Fixada proporção 550:170 do elemento ilustrado somente na página Revoluções.
- low / patch: aliases de personagens não correspondiam ao texto do destino. Busca agora indexa as seções do próprio verbete.
- low / patch: aliases posicionais podiam divergir após reordenação. Removida lista paralela de nomes; ligação por ID ao catálogo. Índice do atlas permanece intencionalmente ligado à ordem visual da referência.
- Revisão independente concluída; nenhum achado pendente ou adiado.
