import type { ItemFormulario } from '../types/Item';
export interface Tema {
 nomeSistema: string;
 corPrincipal: string;
 nomeSingular: string;
 labelNome: string;
 labelTutor: string;
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
 labelTutor: 'Nome do tutor',
 labelCategoria: 'Espécie',
 labelValor: 'Valor da consulta (R$)',
 labelDescricao: 'Observações',
 categorias: ['Cachorro', 'Gato', 'Ave', 'Outros'],
 textoAtivo: 'Em tratamento',
 textoInativo: 'Alta',
 exemplos: [
    {
      nome: 'Thor',
      tutor: 'Carlos Silva',
      categoria: 'Cachorro',
      valor: 150,
      status: 'ativo',
      descricao: 'Vacinas em dia. Retorno em 15 dias.',
      visitas: [
        {
          id: 'v1',
          data: '2026-08-10',
          motivo: 'Primeira dose da vacina V10',
          veterinario: 'Dr. Carlos',
          laudo: 'Vacinado',
        },
        {
          id: 'v2',
          data: '2026-09-01',
          motivo: 'Check-up geral e vermífugo',
          veterinario: 'Dra. Ana',
          laudo: 'Vermifugado',
        },
      ],
    },
    {
      nome: 'Mia',
      tutor: 'Mariana Souza',
      categoria: 'Gato',
      valor: 120,
      status: 'ativo',
      descricao: 'Alergia a ração com frango.',
    },
    {
      nome: 'Piu',
      tutor: 'Roberto Lima',
      categoria: 'Ave',
      valor: 90,
      status: 'inativo',
      descricao: 'Recebeu alta após o tratamento.',
    },
    {
      nome: 'Coalhada',
      tutor: 'Mariana Souza',
      categoria: 'Arara',
      valor: 120,
      status: 'ativo',
      descricao: 'Alergia a ração com peixe.',
    },
 ],
};

// >>> PARA ESCOLHER O SEU NEGÓCIO, TROQUE APENAS O NOME NA LINHA ABAIXO <<<
export const tema: Tema =  temaClinica;
