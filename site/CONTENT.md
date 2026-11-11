# Guia de contribuição de conteúdo

O catálogo inicial é curado e não pretende cobrir toda a história. Cada verbete
deve ajudar a pessoa leitora a compreender um tema e a localizar fontes para
pesquisas adicionais.

## Cadastro

Adicione verbetes em `src/data/catalog.ts` usando os tipos de `src/data/types.ts`.
Use um `id` estável em kebab-case; cards, filtros, rotas e relações devem
referenciar esse identificador, não duplicar o conteúdo.

Todo verbete precisa de:

- tipo, título, resumo, temas e rótulo temporal;
- pelo menos uma seção com cabeçalho, texto e classificação como evidência,
  interpretação ou tradição;
- pelo menos uma referência confiável ou leitura adicional, com título,
  organização, URL e tipo;
- IDs de relações que existam no catálogo.

## Tempo

Use `geological` para tempo geológico e `human` para a cronologia humana. Ambos
exigem `timelineYear`, um número de ano astronômico usado somente para ordenar
a linha do tempo (anos a.C. são negativos, anos d.C. positivos; 1 a.C. é o ano
astronômico 0). Para o tempo geológico, anos muito antigos também são
negativos. `cultural` representa conteúdos sem posição cronológica definida e
não recebe esse número. Mantenha `label` em linguagem natural, com a precisão
que as fontes permitem.

## Fontes e rigor

Prefira instituições de pesquisa, museus, arquivos, universidades e publicações
acadêmicas. Diferencie o que as fontes documentam de interpretações e
incertezas. Identifique tradições mitológicas como tradições culturais, não
como fatos históricos comprovados. Inclua variedade geográfica e perspectivas
locais à medida que o catálogo crescer. Não invente referências para preencher
campos.

## Imagens

Use apenas arquivos locais existentes em `public/media`. Cada imagem precisa de
texto alternativo, legenda, crédito e licença confirmados. Para uma fonte
documental, registre também a procedência. Imagens ilustrativas são apoio
visual, nunca evidência documental. Consulte `ASSET_AUDIT.md` antes de usar
qualquer imagem da galeria original; os arquivos ainda não aprovados não podem
ser copiados para `public/media`.

Execute `npm test` e `npm run build` após alterar o catálogo. A validação
automatizada verifica IDs, campos essenciais, referências internas, datas,
URLs e metadados de imagens.
