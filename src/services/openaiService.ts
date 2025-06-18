import OpenAI from 'openai';
import type { OpenAIServiceResponse, ModuleWithOutcomes } from '../../types';

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const SYSTEM_PROMPT = `Analyseer dit kwalificatiedossier en schrijf per onderdeel overzichtelijke modules met concrete leeruitkomsten. Output in gestructureerd JSON:
[{"moduleTitle": "","learningOutcomes": ["", "", ...]}]`;

export async function generateModules(
  text: string,
  onData?: (chunk: string) => void
): Promise<OpenAIServiceResponse> {
  if (!API_KEY) {
    return { success: false, error: 'OpenAI API sleutel ontbreekt.' };
  }

  try {
    const openai = new OpenAI({ apiKey: API_KEY, dangerouslyAllowBrowser: true });
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o',
      stream: true,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: text }
      ]
    });

    let result = '';
    for await (const part of stream) {
      const content = part.choices[0]?.delta?.content;
      if (content) {
        result += content;
        onData?.(content);
      }
    }

    const modules: ModuleWithOutcomes[] = JSON.parse(result.trim());
    return { success: true, data: modules };
  } catch (e: any) {
    console.error('OpenAI API fout', e);
    return { success: false, error: 'OpenAI aanvraag mislukt.' };
  }
}
