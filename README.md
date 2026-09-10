# Human Concursos — Site institucional (multi-página)

Site da mentoria Human Concursos, no mesmo estilo do portal da GCM Iguatu (portalgcmi): páginas separadas com menu fixo, e os concursos administrados por um arquivo JSON + gerador visual — sem precisar editar HTML no dia a dia.

## Páginas

| Página | Arquivo | Conteúdo |
|---|---|---|
| Início | `index.html` | Hero + resumo da mentoria + atalhos para as outras páginas |
| Apostilas | `apostilas.html` | Grade de amostras de apostila, cada uma com botão de WhatsApp já dizendo qual apostila interessou |
| Concursos Abertos | `concursos-abertos.html` | Editais com inscrições em andamento — carregados de `assets/data/concursos.json` |
| Em Breve | `em-breve.html` | Concursos previstos para os próximos meses — carregados do mesmo JSON |
| Sobre | `sobre.html` | Bio da mentoria + seção de contato (WhatsApp, Instagram, e-mail) |
| **Gerador de Concursos** | `gerador-concurso.html` | **Ferramenta interna** — não aparece no menu do site. Veja a seção 3 abaixo. |

## Estrutura de arquivos

```
human-concursos-site/
├── index.html
├── apostilas.html
├── concursos-abertos.html
├── em-breve.html
├── sobre.html
├── gerador-concurso.html      → ferramenta para adicionar/editar/remover concursos
├── assets/
│   ├── css/style.css          → cores, fontes, componentes (inclui o card de concurso)
│   ├── js/
│   │   ├── main.js            → WhatsApp, menu mobile, destaque da página ativa
│   │   └── concursos-render.js → transforma um item do JSON em cartão HTML
│   ├── data/concursos.json    → TODOS os concursos (abertos e previstos) vivem aqui
│   └── img/
│       ├── favicon.svg
│       └── concursos/         → imagens dos cartões de concurso ficam aqui
├── .nojekyll
└── README.md
```

## 1. Publicar no GitHub Pages

Igual ao processo já usado no portalgcmi:

1. Suba todo o conteúdo desta pasta para a **raiz** do repositório (o `index.html` deve ficar direto na raiz).
2. **Settings → Pages** → Source: branch `main`, pasta `/ (root)`.
3. Em alguns minutos o site sobe em `https://seu-usuario.github.io/nome-do-repositorio/`.

## 2. Domínio próprio

Quando o Tomaz comprar o domínio (mesmo fluxo do `portalgcmi.com.br`):

1. Crie um arquivo `CNAME` (sem extensão) na raiz do repositório com o domínio, ex.: `humanconcursos.com.br`.
2. Configure o DNS: `CNAME` de `www` para `seu-usuario.github.io`, ou registros `A` para os IPs do GitHub Pages (185.199.108.153, .109.153, .110.153, .111.153).
3. Confirme o domínio em **Settings → Pages** do repositório.

## 3. Como adicionar, editar ou remover um concurso (o "gerador de postagem")

Não precisa mais editar HTML. O fluxo é:

1. Abra `gerador-concurso.html` no navegador (localmente ou já publicado — funciona dos dois jeitos).
2. Se a imagem do concurso já existir, envie o arquivo para a pasta `assets/img/concursos/` do repositório pelo GitHub (mesmo processo manual de sempre) **antes** de gerar o JSON, e anote o nome do arquivo.
3. Preencha o formulário à esquerda — a pré-visualização à direita mostra exatamente como o cartão vai ficar, incluindo a imagem.
4. Escolha a página de destino (**Concursos Abertos** ou **Em Breve**) — isso decide em qual página o cartão aparece.
5. Clique em "Adicionar à lista".
6. Repita para quantos concursos quiser incluir, editar ou remover nesta sessão (a ferramenta já carrega os concursos atuais automaticamente quando publicada; se abrir o arquivo direto do computador, use o botão "Carregar concursos.json atual" para trazer os existentes).
7. Clique em "Baixar concursos.json atualizado".
8. Suba o arquivo baixado para `assets/data/concursos.json` no GitHub, substituindo o antigo (mesmo processo de upload direto pelo site do GitHub que já é usado).

Pronto — as duas páginas (Concursos Abertos e Em Breve) atualizam sozinhas, porque ambas leem do mesmo `concursos.json` e cada uma filtra pelo campo `status` ("aberto" ou "previsto").

**Remover um concurso:** carregue o `concursos.json` atual na ferramenta, clique em "Remover" no item desejado na lista da direita, e baixe o arquivo atualizado.

**Editar um concurso:** carregue o JSON atual, clique em "Editar" no item — os dados voltam para o formulário, você ajusta e clica em "Adicionar à lista" de novo.

> A ferramenta não fica linkada no menu do site (é só um arquivo a mais no repositório) — assim visitantes não chegam nela por acaso, mas você e o Tomaz acessam direto pela URL (ex.: `seusite.com/gerador-concurso.html`).

## 4. Testar localmente

As páginas de Concursos Abertos, Em Breve e o Gerador carregam o `concursos.json` via `fetch`, e navegadores bloqueiam isso por segurança quando você abre um `.html` direto (duplo clique, `file://`). Duas opções:

- **Mais simples:** já teste direto no GitHub Pages depois de publicar — lá funciona normalmente.
- **Testar antes de publicar:** rode um servidor local simples a partir da pasta do site:
  ```
  python3 -m http.server 8000
  ```
  e abra `http://localhost:8000/` no navegador. (Se não tiver Python, o VS Code tem a extensão "Live Server" que faz o mesmo.)

As demais páginas (Início, Apostilas, Sobre) não dependem de JSON e abrem normalmente com duplo clique.

## 5. O que já foi preenchido com dados reais do Tomaz

- WhatsApp: `assets/js/main.js` já está com o número real.
- Instagram: `@mentoriatomaz`, já atualizado em todas as páginas.
- Um exemplo real já está no `concursos.json`: o cartão "Guarda Municipal de Fortaleza" usa a imagem promocional que o Tomaz enviou. Está marcado como `"exemplo": true` — quando as inscrições estiverem confirmadas, edite esse item pelo gerador (ou diretamente no JSON) e mude para `"exemplo": false`.

## 6. O que falta ajustar antes de divulgar

| O quê | Onde |
|---|---|
| Link do portfólio no rodapé ("Desenvolvido por Maurílio Vieira") | busque por `Desenvolvido por` em cada página — hoje aponta para `#`, trocar pelo domínio do portfólio assim que for comprado |
| Concursos de exemplo | use o gerador para remover os itens com `"exemplo": true` conforme forem substituídos por editais reais |
| Apostilas novas | `apostilas.html` — duplique um `.book-card`, mude o selo de "Em breve" para "Amostra gratuita" e ajuste o `data-msg` do botão quando a apostila estiver pronta |
| E-mail | busque por `contato@humanconcursos.com.br` e troque se for diferente |

## 7. Mensagens de WhatsApp por contexto

Cada botão leva uma mensagem pré-pronta específica:

- Apostila de amostra → "Vi a apostila de [nome] no site da Human Concursos e tenho interesse em adquirir."
- Concurso aberto → "Vi que as inscrições para o concurso de [cargo] estão abertas e quero ajuda para me preparar."
- Concurso em breve → "Quero ser avisado quando o concurso de [cargo] abrir."

No gerador, essa mensagem é sugerida automaticamente ao preencher o cargo, mas pode ser editada livremente antes de adicionar o concurso à lista.
