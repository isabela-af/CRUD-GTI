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
 >,
 ) {
 const { name, value } = evento.target;
 setDados((anterior) => ({ ...anterior, [name]: value }));
 }
 async function handleSubmit(evento: FormEvent<HTMLFormElement>) {
 evento.preventDefault();
 if (dados.nome.trim() === '') {
 setErro(`Preencha o campo "${tema.labelNome}".`);
 return;
 }
 const valorNumerico = Number(dados.valor);
 if (dados.valor === '' || Number.isNaN(valorNumerico) || valorNumerico < 0) {
 setErro(`Informe um valor válido em "${tema.labelValor}".`);
 return;
 }
 const paraSalvar: ItemFormulario = {
 nome: dados.nome.trim(),
 categoria: dados.categoria,
 valor: valorNumerico,
 status: dados.status === 'inativo' ? 'inativo' : 'ativo',
 descricao: dados.descricao.trim(),
 };
 try {
 setSalvando(true);
 setErro('');
 if (id) {
 await atualizar(id, paraSalvar);
 } else {
 await criar(paraSalvar);
 }
 navigate('/');
 } catch {
 setErro('Não foi possível salvar. Tente novamente.');
 setSalvando(false);
 }
 }
 if (carregando) {
 return <p className="mensagem-info">Carregando...</p>;
 }
 return (
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