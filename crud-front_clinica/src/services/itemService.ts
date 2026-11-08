import { tema } from '../config/tema';
import type { Item, ItemFormulario, NovaVisita, Visita } from '../types/Item';


// Lista de itens guardada na memória do navegador (some ao recarregar a página)
let itens: Item[] = tema.exemplos.map((exemplo, posicao) => ({
 id: String(posicao + 1),
 ...exemplo,
}));
let proximoId = itens.length + 1;
// Simula o tempo que um servidor real levaria para responder
function esperar(milissegundos: number): Promise<void> {
 return new Promise((resolver) => setTimeout(resolver, milissegundos));
}
export async function listar(): Promise<Item[]> {
 await esperar(300);
 return [...itens];
}
export async function buscarPorId(id: string): Promise<Item> {
 await esperar(300);

 const item = itens.find((i) => i.id === id);
 if (!item) {
 throw new Error('Item não encontrado');
 }
 return item;
}
export async function criar(dados: ItemFormulario): Promise<Item> {
 await esperar(300);
 const novo: Item = { id: String(proximoId++), ...dados };
 itens = [novo, ...itens];
 return novo;
}
export async function atualizar(
 id: string,
 dados: ItemFormulario,
): Promise<Item> {
 await esperar(300);
 const atual = itens.find((i) => i.id === id);
 if (!atual) {
 throw new Error('Item não encontrado');
 }
 const atualizado: Item = { id, visitas: atual.visitas, ...dados };
 itens = itens.map((i) => (i.id === id ? atualizado : i));
 return atualizado;
}
export async function excluir(id: string): Promise<void> {
 await esperar(300);
 itens = itens.filter((i) => i.id !== id);
}

// adicao de funcoes adicionais 

export async function adicionarVisita(
  itemId: string,
  dadosVisita: NovaVisita,
): Promise<Item> {
  await esperar(300);
  const item = itens.find((i) => i.id === itemId);
  if (!item) {
    throw new Error('Item não encontrado');
  }
  const novaVisita: Visita = {
    id: String(Date.now()),
    ...dadosVisita,
  };
  const atualizado: Item = {
    ...item,
    visitas: [novaVisita, ...(item.visitas ?? [])],
  };
  itens = itens.map((i) => (i.id === itemId ? atualizado : i));
  return atualizado;
}

export async function excluirVisita(
  itemId: string,
  visitaId: string,
): Promise<Item> {
  await esperar(300);
  const item = itens.find((i) => i.id === itemId);
  if (!item) {
    throw new Error('Item não encontrado');
  }
  const atualizado: Item = {
    ...item,
    visitas: (item.visitas ?? []).filter((v) => v.id !== visitaId),
  };
  itens = itens.map((i) => (i.id === itemId ? atualizado : i));
  return atualizado;
}