# Contexto da modernização

Repositório: `invoice-energy-frontend`. Revisão em 28/10/2026. O objetivo é tornar o clone reproduzível e o comportamento compreensível em uma entrevista técnica, preservando o contexto histórico de exercício/protótipo.

## Decisões e validação

- Next.js e React em versões estáveis atuais, substituindo o React release candidate original.
- TypeScript e tipos alinhados, atualização da cadeia CSS e remoção de ferramentas de lint incompatíveis com Next atual.
- Página inicial redireciona ao dashboard; metadados e idioma descrevem o projeto.
- URL da API configurável, com padrão local `http://localhost:3001`, separada da porta do frontend.
- Build de produção validado com fontes locais, sem depender de download de fontes.


Consulte os scripts reais em `package.json` (ou nos módulos do monorepo). Build, teste unitário e teste com serviços externos são evidências diferentes. A CI não valida credenciais de terceiros nem garante comportamento em produção. O README informa dependências externas e funcionalidades ainda não implementadas.

## Segurança de configurações antigas

Configurações locais e segredos foram retirados da versão atual quando presentes. Isso não remove conteúdo de commits antigos. Se algum segredo histórico ainda estiver ativo, revogue-o no provedor e gere outro; não reutilize credenciais publicadas. A revisão preserva o histórico Git e não faz force push.
