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

