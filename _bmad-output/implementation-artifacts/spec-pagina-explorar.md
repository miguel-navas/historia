---
title: 'Página central Explorar'
type: 'feature'
created: '2026-11-18'
status: 'done'
route: 'oneshot'
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="human-owned intent">

## Intent

Criar a página central Explorar seguindo as duas referências fornecidas, mantendo o padrão das páginas anteriores. Banner panorâmico com título/subtítulo na área livre superior e botão Começar a Explorar; busca global e filtros; seis mundos; seis destaques; linha do tempo. O item Explorar do cabeçalho deve abrir a página. Links levam aos conteúdos e páginas já existentes. Abrir a aplicação localmente para visualização.

</frozen-after-approval>

## Implementation Notes

- Rota `#/explorar`; novo componente `site/src/components/ExplorePage.tsx` e CSS isolado. Menu vira link direto; destinos do antigo dropdown permanecem acessíveis na navegação da página central (linha do tempo, períodos, trilhas, busca e pré-história).
- Seis mundos da referência: Antiguidade, Idade Média, Revoluções, Guerras, Oriental, Mitologia. Destaques: Revolução Francesa, Samurais, Mitologia Grega, Segunda Guerra Mundial, Império Romano, Zeus. Datas e resumos usam o catálogo atual, sem copiar inexatidões das imagens.
- Busca por título, contexto, assunto, personagem, civilização e ano sobre todo o catálogo. Filtros Todos/Épocas/Guerras/Deuses/Impérios/Personagens. Quando busca ou filtro ativo, mostrar resultados no lugar das duas grades iniciais; limpar restaura a visão geral. URL compartilhável no envio; voltar/avançar sincroniza os campos. Estado vazio e contagem anunciada.
- Linha do tempo resumida com oito conteúdos históricos existentes, ordem cronológica e links próprios. Distribuição editorial de marcos, sem alegar escala linear; mitos não recebem datas históricas.
- Banner e atlas único3x4 para12ilustrações via ferramenta integrada ImageGen. Instalar arquivos antes de expor rota; verificar HTTP200 e aparência. Originais preservados, prompts documentados.
- Verificar menu, seis destinos de mundos, destaques, cronologia, CTA, busca/filtros combinados, acentos, anos a.C./d.C., estados vazios e histórico da URL. Rodar testes/lint/build e revisão independente; desktop/celular sem transbordamento.
- Execução local; sem deploy na VM nem push.
- Entregue: cabeçalho abre hub, panorama com CTA, seis mundos, seis destaques, busca global e oito marcos ligados a artigos reais. Navegação do antigo dropdown disponível nos atalhos.
- Verificação: 34 testes passaram; lint sem avisos; build concluído. Imagens HTTP200. Navegador desktop1440px com seis colunas e celular390px sem transbordamento, resultados em uma coluna. CTA rola/foca busca. Pesquisa1944d.C./Guerras retorna Segunda Guerra e DiaD; consulta480a.C. via Enter mantém foco, Voltar restaura1944d.C. Console sem erros.
- Captura final: `docs/explorar-preview.jpg`. Assets e prompts: `site/public/assets/explorar/README.md`.

## Review Triage Log

- medium / patch: ano com sufixo d.C. falhava em entradas sem intervalo explícito. Usado timelineYear como intervalo pontual quando não há faixa; acrescentada regressão1944d.C./DiaD.
- medium / patch: chave da URL remontava a árvore e perdia foco de teclado. Removida remontagem; atualização condicional do rascunho quando a URL muda preserva o elemento de busca. Testes e navegação manual verificaram foco, submissão e histórico.
- Nenhuma outra falha comprovada de rotas, filtros, ordem cronológica ou associação de cenas. Sem pendências de revisão.
