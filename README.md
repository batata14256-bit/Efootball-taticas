# ⚽ eFootball Táticas IA

Site para gerar táticas históricas de times para eFootball usando inteligência artificial.

## 🎯 O que faz

Digite o nome e o ano do seu time favorito, e a IA gera uma tática completa com:
- **Formação tática** (ex: 4-3-3, 5-2-3)
- **Estilo de jogo**
- **Estratégia ofensiva**
- **Estratégia defensiva**
- **Características especiais**
- **Dica estratégica**

## 🚀 Como usar

### Deploy no Vercel

1. Faça fork do repositório
2. Conecte ao Vercel
3. Configure `OPENAI_API_KEY` nas variáveis de ambiente
4. Pronto!

### Executar localmente

```bash
git clone https://github.com/batata14256-bit/Efootball-taticas.git
cd Efootball-taticas
npm install
export OPENAI_API_KEY=sua-chave
npm run dev
```

## 🔑 Configurar API Key

1. Obtenha sua chave em [openai.com](https://openai.com)
2. No Vercel: Settings > Environment Variables > OPENAI_API_KEY

## 📁 Arquivos

- `index.html` - Interface principal
- `styles.css` - Estilos
- `script.js` - Lógica frontend
- `api/generate-tactic.js` - Backend com IA

## 🛠️ Stack

- HTML5, CSS3, JavaScript
- Node.js + OpenAI API
- Vercel (deploy)

## 📝 Exemplos

- Manchester United, 2008
- Barcelona, 2011
- Liverpool, 1989
- Real Madrid, 2017

## 📄 Licença

MIT