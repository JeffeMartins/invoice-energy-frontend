# Painel de faturas de energia

Cliente Next.js/React/TypeScript para consultar a API de faturas, visualizar documentos, enviar PDFs e acompanhar indicadores em gráficos.

[![CI](https://github.com/JeffeMartins/invoice-energy-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/JeffeMartins/invoice-energy-frontend/actions/workflows/ci.yml)

## Melhorias de engenharia

- Next.js e React em versões estáveis atuais, substituindo o React release candidate original.
- TypeScript e tipos alinhados, atualização da cadeia CSS e remoção de ferramentas de lint incompatíveis com Next atual.
- Página inicial redireciona ao dashboard; metadados e idioma descrevem o projeto.
- URL da API configurável, com padrão local `http://localhost:3001`, separada da porta do frontend.
- Build de produção validado com fontes locais, sem depender de download de fontes.

## Executar localmente

Pré-requisitos: Node.js 24 LTS e npm; Docker Compose v2 para os serviços que usam banco.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

No PowerShell, use `Copy-Item .env.example .env.local`. O frontend usa `http://localhost:3000`, backend `http://localhost:3001`. Inicie primeiro [invoice-energy-backend](https://github.com/JeffeMartins/invoice-energy-backend).

Rotas: `/dashboard`, `/fatura`, `/upload-fatura`. Configuração pública: `NEXT_PUBLIC_API_URL`. Nunca coloque senhas ou chaves privadas em variáveis `NEXT_PUBLIC_*`.

Verificação: `npm run build` e `npm run typecheck`; produção local com `npm start`. Não há suíte completa de testes de UI ou login próprio. Dados e disponibilidade vêm da API; os prints em `screenshots/` são referências, não evidência de integração atual. O backend ainda é uma demonstração sem autenticação para dados reais.

## Qualidade e limites da evidência

As mudanças preservam a proposta do exercício e corrigem problemas observados no código. A CI usa Node 24 e `npm ci`, executa o build quando disponível e os testes existentes. O lockfile é versionado; dependências e pastas de build não são. Dependabot acompanha atualizações semanais. Não há promessa de cobertura total, auditoria completa de segurança ou capacidade de produção.

Não publique `.env`, cookies, tokens ou dados reais de clientes. Antes de expor a aplicação à internet, revise autenticação/autorização, TLS, limites de chamadas, logs e backups conforme o domínio. Os exemplos são para execução local. Use `docker compose down` para parar os containers; volumes persistem e `down -v` apaga seus dados.
