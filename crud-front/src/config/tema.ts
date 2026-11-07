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

// >>> PARA ESCOLHER O SEU NEGÓCIO, TROQUE APENAS O NOME NA LINHA ABAIXO <<<
export const tema: Tema =  temaClinica;