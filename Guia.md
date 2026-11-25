# CRUD-GTI

Passo-a-passo:

- npm create vite@latest crud-front -- --template react-ts -> Cria o projeto React com TypeScript

- cd crud-front
- npm install
- npm install react-router-dom

# trocar [em index.html] lang="en" para lang="pt-BR"

# trocar [em App.tsx] tudo por:

import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Cabecalho from './components/Cabecalho';
import { tema } from './config/tema';
import DetalhesPage from './pages/DetalhesPage';
import FormularioPage from './pages/FormularioPage';
import ListaPage from './pages/ListaPage';
export default function App() {
useEffect(() => {
document.documentElement.style.setProperty('--cor-principal', tema.corPrincipal);
document.title = tema.nomeSistema;
}, []);
return (
<>
<Cabecalho />

 <main className="conteudo">
 <Routes>
 <Route path="/" element={<ListaPage />} />
 <Route path="/novo" element={<FormularioPage />} />
 <Route path="/editar/:id" element={<FormularioPage />} />
 <Route path="/detalhes/:id" element={<DetalhesPage />} />
 <Route path="*" element={<p>Página não encontrada.</p>} />
 </Routes>
 </main>
 </>
 );
}

# Criar as seguintes pastas [em src]:

- config
- types
- services
- utils
- components
- pages

# Criar [em src/types]: Item.ts com o seguinte conteúdo:

export type StatusItem = 'ativo' | 'inativo';
export interface Item {
id: string;
nome: string;
categoria: string;
valor: number;
status: StatusItem;
descricao: string;
}
// Os dados que o usuário preenche (ainda sem o "id")
export type ItemFormulario = Omit<Item, 'id'>;

# Criar [em src/config]: tema.ts com o seguinte conteúdo (e escolher o tema desejado no final do codigo):

import type { ItemFormulario } from '../types/Item';
export interface Tema {
nomeSistema: string;
corPrincipal: string;
nomeSingular: string;
labelNome: string;
labelCategoria: string;
labelValor: string;
labelDescricao: string;
categorias: string[];
textoAtivo: string;
textoInativo: string;
exemplos: ItemFormulario[];
}
export const temaLoja: Tema = {
nomeSistema: 'Controle de Produtos',
corPrincipal: '#2563eb',
nomeSingular: 'Produto',
labelNome: 'Nome do produto',
labelCategoria: 'Categoria',
labelValor: 'Preço (R$)',
 labelDescricao: 'Descrição',
 categorias: ['Eletrônicos', 'Roupas', 'Alimentos', 'Casa'],
 textoAtivo: 'Disponível',
 textoInativo: 'Esgotado',
 exemplos: [
 {
 nome: 'Notebook Gamer',
 categoria: 'Eletrônicos',
 valor: 4599.9,
 status: 'ativo',
 descricao: 'Placa de vídeo dedicada, 16 GB de memória.',
 },
 {
 nome: 'Camiseta Básica',
 categoria: 'Roupas',
 valor: 59.9,
 status: 'ativo',
 descricao: 'Algodão, disponível em várias cores.',
 },
 {
 nome: 'Café Torrado 500g',
 categoria: 'Alimentos',
 valor: 24.5,
 status: 'inativo',
 descricao: 'Aguardando reposição do fornecedor.',
 },
 ],
};
export const temaClinica: Tema = {
 nomeSistema: 'Clínica Veterinária',
 corPrincipal: '#0f9d8a',
 nomeSingular: 'Paciente',
 labelNome: 'Nome do pet',
 labelCategoria: 'Espécie',
 labelValor: 'Valor da consulta (R$)',
labelDescricao: 'Observações',
categorias: ['Cachorro', 'Gato', 'Ave', 'Outros'],
textoAtivo: 'Em tratamento',
textoInativo: 'Alta',
exemplos: [
{
nome: 'Thor',
categoria: 'Cachorro',
valor: 150,
status: 'ativo',
descricao: 'Vacinas em dia. Retorno em 15 dias.',
},
{
nome: 'Mia',
categoria: 'Gato',
valor: 120,
status: 'ativo',
descricao: 'Alergia a ração com frango.',
},
{
nome: 'Piu',
categoria: 'Ave',
valor: 90,
status: 'inativo',
descricao: 'Recebeu alta após o tratamento.',
},
],
};
export const temaAcademia: Tema = {
nomeSistema: 'Gestão de Academia',
corPrincipal: '#ea580c',
nomeSingular: 'Aluno',
labelNome: 'Nome do aluno',
labelCategoria: 'Plano',
labelValor: 'Mensalidade (R$)',
labelDescricao: 'Observações',
categorias: ['Mensal', 'Trimestral', 'Semestral', 'Anual'],
textoAtivo: 'Em dia',
textoInativo: 'Inadimplente',
exemplos: [
{
nome: 'Carlos Silva',
categoria: 'Mensal',
valor: 119.9,
status: 'ativo',
descricao: 'Treina de segunda a sexta, pela manhã.',
},
{
nome: 'Ana Souza',
categoria: 'Anual',
valor: 99.9,
status: 'ativo',
descricao: 'Faz aulas de spinning.',
},
{
nome: 'Bruno Lima',
categoria: 'Trimestral',
valor: 109.9,
status: 'inativo',
descricao: 'Mensalidade de outubro em atraso.',
},
],
};
// >>> PARA ESCOLHER O SEU NEGÓCIO, TROQUE APENAS O NOME NA LINHA ABAIXO <<<
export const tema: Tema = temaLoja;

# Criar [em src/utils]: formatar.ts com o seguinte conteúdo:

export function formatarMoeda(valor: number): string {
return valor.toLocaleString('pt-BR', {
style: 'currency',
currency: 'BRL',
});
}

# Criar [em src/services]: itemService.ts com o seguinte conteúdo:

import { tema } from '../config/tema';
import type { Item, ItemFormulario } from '../types/Item';
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
const atualizado: Item = { id, ...dados };
itens = itens.map((i) => (i.id === id ? atualizado : i));
return atualizado;
}
export async function excluir(id: string): Promise<void> {
await esperar(300);
itens = itens.filter((i) => i.id !== id);
}

# Adicionar [em src/index.css]: o seguinte conteúdo:

:root {
--cor-principal: #2563eb;
--cor-texto: #1f2937;
--cor-fundo: #f3f4f6;
--cor-borda: #d1d5db;
}

- {
  box-sizing: border-box;
  }
  body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  color: var(--cor-texto);
  background: var(--cor-fundo);
  }
  a {
  color: var(--cor-principal);
  text-decoration: none;
  }
  /_ ---------- Cabeçalho e área de conteúdo ---------- _/
  .cabecalho {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  background: var(--cor-principal);
  }
  .cabecalho-titulo {
  color: #ffffff;
  font-size: 22px;
  font-weight: bold;
  }
  .conteudo {
  max-width: 960px;
  margin: 24px auto;
  padding: 24px;
  background: #ffffff;
  border-radius: 8px;
  }
  h1 {
  margin-top: 0;
  }
  /_ ---------- Botões ---------- _/
  .botao {
  display: inline-block;
  padding: 10px 18px;
  border: none;
  border-radius: 6px;
  background: var(--cor-principal);
  color: #ffffff;
  font-size: 15px;
  cursor: pointer;
  }
  .botao-claro {
  background: #ffffff;
  color: var(--cor-principal);
  font-weight: bold;
  }
  .botao-secundario {
  background: #e5e7eb;
  color: var(--cor-texto);
  }
  .botao-link {
  padding: 0;
  border: none;
  background: none;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  }
  .perigo {
  color: #dc2626;
  }
  /_ ---------- Tela de lista ---------- _/
  .campo-busca {
  width: 100%;
  margin-bottom: 16px;
  padding: 10px;
  border: 1px solid var(--cor-borda);
  border-radius: 6px;
  font-size: 15px;
  }
  .tabela {
  width: 100%;
  border-collapse: collapse;
  }
  .tabela th,
  .tabela td {
  padding: 12px 8px;
  border-bottom: 1px solid var(--cor-borda);
  text-align: left;
  }
  .tabela th {
  background: var(--cor-fundo);
  }
  .acoes {
  display: flex;
  gap: 12px;
  }
  .badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: bold;
  }
  .badge-ativo {
  background: #dcfce7;
  color: #166534;
  }
  .badge-inativo {
  background: #fee2e2;
  color: #991b1b;
  }
  /_ ---------- Tela de formulário ---------- _/
  .formulario {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 520px;
  }
  .formulario label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-weight: bold;
  }
  .formulario input,
  .formulario select,
  .formulario textarea {
  padding: 10px;
  border: 1px solid var(--cor-borda);
  border-radius: 6px;
  font-family: inherit;
  font-size: 15px;
  }
  .formulario-botoes {
  display: flex;
  gap: 12px;
  margin-top: 8px;
  }
  /_ ---------- Tela de detalhes ---------- _/
  .detalhes {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 12px;
  }
  .detalhes dt {
  font-weight: bold;
  }
  .detalhes dd {
  margin: 0;
  }
  /_ ---------- Mensagens ---------- _/
  .mensagem-erro {
  color: #b91c1c;
  font-weight: bold;
  }
  .mensagem-info {
  color: #6b7280;
  }

# Criar [em src/components]: StatusBadge.tsx com o seguinte conteúdo:

import { tema } from '../config/tema';
import type { StatusItem } from '../types/Item';
interface StatusBadgeProps {
status: StatusItem;
}
export default function StatusBadge({ status }: StatusBadgeProps) {
const ativo = status === 'ativo';
return (
<span className={ativo ? 'badge badge-ativo' : 'badge badge-inativo'}>
{ativo ? tema.textoAtivo : tema.textoInativo}
</span>
);
}

# Criar [em src/components]: Cabecalho.tsx com o seguinte conteúdo:

import { Link } from 'react-router-dom';
import { tema } from '../config/tema';
export default function Cabecalho() {
return (

 <header className="cabecalho">
 <Link to="/" className="cabecalho-titulo">
 {tema.nomeSistema}
 </Link>
 <Link to="/novo" className="botao botao-claro">
 + Novo {tema.nomeSingular}
 </Link>
 </header>
 );
}

# Criar [em src/pages]: ListaPage.tsx com o seguinte conteúdo:

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import { tema } from '../config/tema';
import { excluir, listar } from '../services/itemService';
import type { Item } from '../types/Item';
import { formatarMoeda } from '../utils/formatar';
export default function ListaPage() {
const [itens, setItens] = useState<Item[]>([]);
const [busca, setBusca] = useState('');
const [carregando, setCarregando] = useState(true);
const [erro, setErro] = useState('');
async function carregar() {
try {
setCarregando(true);
setErro('');
const resultado = await listar();
setItens(resultado);
} catch {
setErro('Não foi possível carregar a lista.');
} finally {
setCarregando(false);
}
}
useEffect(() => {
carregar();
}, []);
async function handleExcluir(item: Item) {
const confirmou = window.confirm(`Deseja excluir "${item.nome}"?`);
if (!confirmou) {
return;
}
try {
await excluir(item.id);
await carregar();
} catch {
setErro('Não foi possível excluir o registro.');
}
}
const itensFiltrados = itens.filter((item) =>
item.nome.toLowerCase().includes(busca.toLowerCase()),
);
return (

 <section>
 <h1>Lista de {tema.nomeSingular}s</h1>
 <input
 className="campo-busca"
 type="text"
 placeholder={`Buscar por ${tema.labelNome.toLowerCase()}...`}
 value={busca}
 onChange={(evento) => setBusca(evento.target.value)}
 />
 {erro && <p className="mensagem-erro">{erro}</p>}
 {carregando && <p className="mensagem-info">Carregando...</p>}
 {!carregando && itensFiltrados.length === 0 && (
 <p className="mensagem-info">Nenhum registro encontrado.</p>
 )}
 {!carregando && itensFiltrados.length > 0 && (
 <table className="tabela">
 <thead>
 <tr>
 <th>{tema.labelNome}</th>
 <th>{tema.labelCategoria}</th>
 <th>{tema.labelValor}</th>
 <th>Situação</th>
 <th>Ações</th>
 </tr>
 </thead>
 <tbody>
 {itensFiltrados.map((item) => (
 <tr key={item.id}>
 <td>{item.nome}</td>
 <td>{item.categoria}</td>
 <td>{formatarMoeda(item.valor)}</td>
 <td>
 <StatusBadge status={item.status} />
 </td>
 <td>
 <div className="acoes">
 <Link to={`/detalhes/${item.id}`}>Ver</Link>
<Link to={`/editar/${item.id}`}>Editar</Link>
<button
 className="botao-link perigo"
onClick={() => handleExcluir(item)}
 >
 Excluir
 </button>
 </div>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 )}
 </section>
 );
}

# Criar [em src/pages]: FormularioPage.tsx com o seguinte conteúdo:

import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { tema } from '../config/tema';
import { atualizar, buscarPorId, criar } from '../services/itemService';
import type { ItemFormulario } from '../types/Item';
interface DadosDoFormulario {
nome: string;
categoria: string;
valor: string;
status: string;
descricao: string;
}
const formularioVazio: DadosDoFormulario = {
nome: '',
categoria: tema.categorias[0],
valor: '',
status: 'ativo',
descricao: '',
};
export default function FormularioPage() {
const { id } = useParams();
const navigate = useNavigate();
const editando = Boolean(id);
const [dados, setDados] = useState<DadosDoFormulario>(formularioVazio);
const [carregando, setCarregando] = useState(false);
const [salvando, setSalvando] = useState(false);
const [erro, setErro] = useState('');
useEffect(() => {
async function carregarItem(idDoItem: string) {
try {
setCarregando(true);
const item = await buscarPorId(idDoItem);
setDados({
nome: item.nome,
categoria: item.categoria,
valor: String(item.valor),
status: item.status,
descricao: item.descricao,
});
} catch {
setErro('Não foi possível carregar o registro.');
} finally {
setCarregando(false);
}
}
setErro('');
if (id) {
carregarItem(id);
} else {
setDados(formularioVazio);
}
}, [id]);
function handleChange(
evento: ChangeEvent<
HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

> ,
> ) {
> const { name, value } = evento.target;
> setDados((anterior) => ({ ...anterior, [name]: value }));
> }
> async function handleSubmit(evento: FormEvent<HTMLFormElement>) {
> evento.preventDefault();
> if (dados.nome.trim() === '') {
> setErro(`Preencha o campo "${tema.labelNome}".`);
> return;
> }
> const valorNumerico = Number(dados.valor);
> if (dados.valor === '' || Number.isNaN(valorNumerico) || valorNumerico < 0) {
> setErro(`Informe um valor válido em "${tema.labelValor}".`);
> return;
> }
> const paraSalvar: ItemFormulario = {
> nome: dados.nome.trim(),
> categoria: dados.categoria,
> valor: valorNumerico,
> status: dados.status === 'inativo' ? 'inativo' : 'ativo',
> descricao: dados.descricao.trim(),
> };
> try {
> setSalvando(true);
> setErro('');
> if (id) {
> await atualizar(id, paraSalvar);
> } else {
> await criar(paraSalvar);
> }
> navigate('/');
> } catch {
> setErro('Não foi possível salvar. Tente novamente.');
> setSalvando(false);
> }
> }
> if (carregando) {
> return <p className="mensagem-info">Carregando...</p>;
> }
> return (

 <section>
 <h1>
 {editando ? 'Editar' : 'Novo'} {tema.nomeSingular}
 </h1>
 <form className="formulario" onSubmit={handleSubmit}>
 <label>
 {tema.labelNome}
 <input
 type="text"
 name="nome"
 value={dados.nome}
 onChange={handleChange}
 />
 </label>
 <label>
 {tema.labelCategoria}
 <select
 name="categoria"
 value={dados.categoria}
 onChange={handleChange}
 >
 {tema.categorias.map((categoria) => (
 <option key={categoria} value={categoria}>
 {categoria}
 </option>
 ))}
 </select>
 </label>
 <label>
 {tema.labelValor}
 <input
 type="number"
 name="valor"
 min="0"
 step="0.01"
 value={dados.valor}
 onChange={handleChange}
 />
 </label>
 <label>
 Situação
 <select name="status" value={dados.status} onChange={handleChange}>
 <option value="ativo">{tema.textoAtivo}</option>
 <option value="inativo">{tema.textoInativo}</option>
 </select>
 </label>
 <label>
 {tema.labelDescricao}
 <textarea
 name="descricao"
 rows={4}
 value={dados.descricao}
 onChange={handleChange}
 />
 </label>
 {erro && <p className="mensagem-erro">{erro}</p>}
 <div className="formulario-botoes">
 <button type="submit" className="botao" disabled={salvando}>
 {salvando ? 'Salvando...' : 'Salvar'}
 </button>
 <Link to="/" className="botao botao-secundario">
 Cancelar
 </Link>
 </div>
 </form>
 </section>
 );
}

# Criar [em src/pages]: DetalhesPage.tsx com o seguinte conteúdo:

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import { tema } from '../config/tema';
import { buscarPorId } from '../services/itemService';
import type { Item } from '../types/Item';
import { formatarMoeda } from '../utils/formatar';
export default function DetalhesPage() {
const { id } = useParams();
const [item, setItem] = useState<Item | null>(null);
const [carregando, setCarregando] = useState(true);
const [erro, setErro] = useState('');
useEffect(() => {
async function carregarItem(idDoItem: string) {
try {
const resultado = await buscarPorId(idDoItem);
setItem(resultado);
} catch {
setErro('Registro não encontrado.');
} finally {
setCarregando(false);
}
}
if (id) {
carregarItem(id);
}
}, [id]);
if (carregando) {
return <p className="mensagem-info">Carregando...</p>;
}
if (erro || !item) {
return (

 <section>
 <p className="mensagem-erro">{erro}</p>
 <Link to="/">Voltar para a lista</Link>
 </section>
 );
 }
 return (
 <section>
 <h1>{item.nome}</h1>
 <dl className="detalhes">
 <dt>{tema.labelCategoria}</dt>
 <dd>{item.categoria}</dd>
 <dt>{tema.labelValor}</dt>
 <dd>{formatarMoeda(item.valor)}</dd>
 <dt>Situação</dt>
 <dd>
 <StatusBadge status={item.status} />
 </dd>
 <dt>{tema.labelDescricao}</dt>
 <dd>{item.descricao || '—'}</dd>
 </dl>
 <div className="formulario-botoes">
 <Link to={`/editar/${item.id}`} className="botao">
 Editar
 </Link>
 <Link to="/" className="botao botao-secundario">
 Voltar
 </Link>
 </div>
 </section>
 );
}

# Substituir [em src/main.tsx] tudo por:

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
createRoot(document.getElementById('root')!).render(
<StrictMode>
<BrowserRouter>
<App />
</BrowserRouter>
</StrictMode>,
);
