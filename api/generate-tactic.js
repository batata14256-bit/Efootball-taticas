const https = require('https');

const API_KEY = process.env.OPENAI_API_KEY;
const MODEL = 'gpt-3.5-turbo';

async function generateTacticWithAI(teamName, year) {
    const prompt = `Você é um especialista em tática de futebol e conhece a história de todos os times.

Gere uma tática realista e histórica para o time ${teamName} no ano ${year}.

Responda em JSON com exatamente esta estrutura (sem markdown, apenas JSON puro):
{
    "formation": "a formação tática (ex: 4-3-3, 5-2-3, 3-5-2)",
    "style": "descrição breve do estilo de jogo característico do time nesse período (1-2 linhas)",
    "attack": "estratégia ofensiva específica do time (1-2 linhas)",
    "defense": "estratégia defensiva do time (1-2 linhas)",
    "special": "características especiais ou pontos fortes únicos do time (1-2 linhas)",
    "tip": "uma dica estratégica prática para usar esse time no eFootball"
}

Seja específico baseado na realidade histórica do time nesse ano se possível. Se não conhecer o time, crie uma tática realista baseado no contexto da época.`;

    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            model: MODEL,
            messages: [
                {
                    role: 'system',
                    content: 'Você é um especialista em tática de futebol. Sempre responda em JSON válido, sem markdown.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 600
        });

        const options = {
            hostname: 'api.openai.com',
            port: 443,
            path: '/v1/chat/completions',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Length': data.length
            }
        };

        const req = https.request(options, (res) => {
            let body = '';

            res.on('data', (chunk) => {
                body += chunk;
            });

            res.on('end', () => {
                try {
                    const response = JSON.parse(body);
                    
                    if (response.error) {
                        reject(new Error(response.error.message || 'Erro da API OpenAI'));
                        return;
                    }
                    
                    const content = response.choices[0].message.content;
                    const tactic = JSON.parse(content);
                    resolve(tactic);
                } catch (error) {
                    reject(new Error('Erro ao processar resposta da IA: ' + error.message));
                }
            });
        });

        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Método não permitido' });
        return;
    }

    try {
        const { teamName, year } = req.body;

        if (!teamName || !year) {
            res.status(400).json({ error: 'Nome do time e ano são obrigatórios' });
            return;
        }

        if (!API_KEY) {
            res.status(500).json({ error: 'Chave da API OpenAI não configurada. Configure a variável OPENAI_API_KEY.' });
            return;
        }

        const tactic = await generateTacticWithAI(teamName, year);
        
        res.status(200).json({
            teamName,
            year,
            ...tactic
        });
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ 
            error: 'Erro ao gerar tática',
            details: error.message
        });
    }
};
