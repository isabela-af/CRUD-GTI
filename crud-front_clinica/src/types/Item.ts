export type StatusItem = 'ativo' | 'inativo';

export interface Visita {
 id: string;
 data: string;
 veterinario: string;
 motivo: string;
 laudo: string;
}

export interface Item {
 id: string;
 nome: string;
 tutor: string;
 categoria: string;
 valor: number;
 status: StatusItem;
 descricao: string;
 visitas?: Visita[];
}

// Os dados que o usuário preenche (ainda sem o "id")

export type ItemFormulario = Omit<Item, 'id'>;
export type NovaVisita = Omit<Visita, 'id'>;
