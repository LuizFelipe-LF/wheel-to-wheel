# 💸 Wheel to Wheel - Quem vai pagar a conta?

Uma roleta interativa e animada para decidir de forma "justa" quem vai pagar a conta no rolê!

> **Um oferecimento de BABUINOS BOBOCAS BALBUCIANDO EM BANDO** 🐒

## 🎯 O que é isso?

Cansado de brigas na hora de dividir a conta? Deixa a sorte decidir! Esta roleta moderna e responsiva sorteia quem será o felizardo que vai bancar a galera.

### ✨ Features

- 🎡 **Roleta animada** com Framer Motion
- 📱 **Mobile First** - funciona perfeitamente em qualquer dispositivo
- 🎨 **Design moderno** com Tailwind CSS e shadcn/ui
- 🎲 **Sorteio "justo"\*** com animações suaves
- 👥 **Lista padrão** de participantes pré-configurada
- 🔒 **Modo personalizar** (bloqueado porque o dev ficou com preguiça 😴)

_\*Nota: Alguns participantes podem ter uma "sorte" especial de pagar mais vezes... 😏_

## 🚀 Como usar

### Desenvolvimento

Primeiro, instale as dependências:

```bash
pnpm install
```

Depois, rode o servidor de desenvolvimento:

```bash
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Build para produção

```bash
pnpm build
pnpm start
```

## 🎮 Como funciona

1. **Abra a roleta** e veja a lista de participantes
2. **Clique em "🎲 Sortear"** para girar a roleta
3. **Aguarde a animação** (5-6 voltas completas)
4. **Veja quem foi sorteado** para pagar a conta! 💰
5. **Boa sorte!** 😅

## 🛠️ Tecnologias

- **[Next.js 15](https://nextjs.org/)** - Framework React
- **[React 19](https://react.dev/)** - Biblioteca UI
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Estilização
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes
- **[Framer Motion](https://www.framer.com/motion/)** - Animações
- **[Lucide Icons](https://lucide.dev/)** - Ícones

## 📁 Estrutura do Projeto

```
wheel-to-wheel/
├── components/
│   ├── Wheel.tsx          # Componente principal da roleta
│   └── ui/                # Componentes shadcn/ui
├── pages/
│   ├── index.tsx          # Página principal
│   ├── _app.tsx
│   └── _document.tsx
├── styles/
│   └── globals.css        # Estilos globais
└── lib/
    └── utils.ts           # Utilitários
```

## 🎨 Personalização

### Alterar o "sortudo"

No arquivo `components/Wheel.tsx`, você pode ajustar quem tem mais chance de pagar:

```typescript
const LUCKY_PERSON = "Luiz Felipe"; // Quem tem sorte especial
const LUCKY_CHANCE = 0.6; // 60% de chance (ajuste conforme necessário)
```

### Alterar participantes

Edite a lista `DEFAULT_PEOPLE` no mesmo arquivo:

```typescript
const DEFAULT_PEOPLE = [
  "Seu Nome",
  "Amigo 1",
  "Amigo 2",
  // ...
];
```

## 🐛 Debug

Abra o console do navegador (F12) para ver logs detalhados:

- 🖱️ Quando o botão é clicado
- 🍀 Quando o "sortudo" é escolhido (60%)
- 🎲 Quando o sorteio é aleatório (40%)
- 📊 Informações sobre ângulos e rotação

## 📝 Notas

- Os `[índices]` visíveis na roleta são para debug (pode remover se quiser)
- A roleta tem proteções contra giros acidentais ao trocar de abas
- O modo "Personalizar" não funciona (o dev ficou com preguiça mesmo)

## 🚀 Deploy

### GitHub Pages (Configurado!)

O projeto já está configurado para deploy automático no GitHub Pages com GitHub Actions!

**[📖 Guia completo de deploy →](./DEPLOY.md)**

Resumo rápido:

1. Faça push do código para o GitHub
2. Vá em **Settings** > **Pages**
3. Selecione **GitHub Actions** como source
4. Aguarde o deploy automático!

### Vercel (Alternativa)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/seu-usuario/wheel-to-wheel)

### Outras opções

- Netlify
- Railway
- Render

## 📄 Licença

Este projeto é livre para uso. Divirta-se e que o melhor (ou azarado) pague a conta! 🍺

---

**Desenvolvido com ❤️ e uma pitada de zueira**

_Lembre-se: a roleta nunca erra, apenas revela quem estava destinado a pagar! 😎_
