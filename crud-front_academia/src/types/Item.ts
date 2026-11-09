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