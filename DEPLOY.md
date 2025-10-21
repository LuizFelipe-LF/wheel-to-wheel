# 🚀 Deploy no GitHub Pages

Guia passo a passo para fazer o deploy da roleta no GitHub Pages.

## 📋 Pré-requisitos

1. Repositório no GitHub
2. Conta do GitHub
3. Código commitado no repositório

## 🔧 Configuração (já feita!)

O projeto já está configurado com:

- ✅ Workflow do GitHub Actions (`.github/workflows/deploy.yml`)
- ✅ Next.js configurado para exportação estática (`next.config.ts`)
- ✅ Arquivo `.nojekyll` na pasta `public`

## 📝 Passos para Deploy

### 1. Envie o código para o GitHub

```bash
# Se ainda não iniciou o repositório
git init
git add .
git commit -m "feat: roleta quem paga a conta"

# Adicione o repositório remoto (substitua com seu repo)
git remote add origin https://github.com/SEU-USUARIO/wheel-to-wheel.git
git branch -M main
git push -u origin main
```

### 2. Configure o GitHub Pages

1. Vá até o seu repositório no GitHub
2. Clique em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Build and deployment** > **Source**, selecione:
   - **GitHub Actions** (não "Deploy from a branch")

### 3. Ajuste o basePath (se necessário)

**Importante**: Se seu repositório **NÃO** for `username.github.io`, edite o `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/wheel-to-wheel", // <- Descomente e ajuste
  assetPrefix: "/wheel-to-wheel/", // <- Descomente e ajuste
};
```

**Nota**: Use o nome do seu repositório após a `/`.

### 4. Faça o Deploy

O deploy é automático! Basta fazer push:

```bash
git add .
git commit -m "config: ajusta basePath para GitHub Pages"
git push
```

### 5. Acompanhe o Deploy

1. Vá até a aba **Actions** no seu repositório
2. Você verá o workflow "Deploy to GitHub Pages" rodando
3. Aguarde alguns minutos (primeira vez pode levar ~5 min)
4. Quando aparecer ✅, o site está no ar!

### 6. Acesse seu site

Seu site estará disponível em:

- Se for `username.github.io`: `https://username.github.io`
- Caso contrário: `https://username.github.io/wheel-to-wheel`

## 🔍 Verificando Erros

Se algo der errado:

1. Vá em **Actions** no seu repositório
2. Clique no workflow que falhou
3. Expanda os logs para ver o erro
4. Corrija e faça push novamente

### Erros Comuns

**❌ Erro 404 nos assets:**

- Solução: Configure o `basePath` e `assetPrefix` no `next.config.ts`

**❌ "Process completed with exit code 1":**

- Solução: Execute `pnpm build` localmente para ver o erro

**❌ "Permission denied" no deploy:**

- Solução: Verifique se o workflow tem permissões corretas (já configurado)

## 🔄 Atualizações Futuras

Toda vez que você fizer push na branch `main`, o site será atualizado automaticamente! 🎉

```bash
# Faça suas alterações
git add .
git commit -m "fix: ajusta probabilidade do sortudo"
git push

# O GitHub Actions fará o resto!
```

## 🎨 Personalizando

### Alterar o domínio

Se quiser usar um domínio próprio (ex: `roleta.meusite.com`):

1. Vá em **Settings** > **Pages**
2. Em **Custom domain**, adicione seu domínio
3. Configure o DNS do seu domínio (siga as instruções do GitHub)

## 📊 Monitoramento

- **GitHub Actions**: Veja todos os deploys em `Actions`
- **Environments**: Veja o histórico em `Deployments`
- **Logs**: Acesse logs detalhados de cada build

## 🆘 Suporte

Se tiver problemas:

1. Verifique os logs em **Actions**
2. Teste o build localmente: `pnpm build`
3. Consulte a [documentação do Next.js](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports)
4. Veja a [documentação do GitHub Pages](https://docs.github.com/pt/pages)

---

**Boa sorte com o deploy!** 🚀💸
