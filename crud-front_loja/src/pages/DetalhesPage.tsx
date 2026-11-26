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