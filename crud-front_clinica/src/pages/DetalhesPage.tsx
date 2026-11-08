import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import { tema } from '../config/tema';
import {
  adicionarVisita,
  buscarPorId,
  excluirVisita,
} from '../services/itemService';
import type { Item } from '../types/Item';
import { formatarMoeda } from '../utils/formatar';

export default function DetalhesPage() {
  const { id } = useParams();
  const [item, setItem] = useState<Item | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  // Estados do formulário de nova visita
  const [data, setData] = useState('');
  const [motivo, setMotivo] = useState('');
  const [veterinario, setVeterinario] = useState('');
  const [laudo, setLaudo] = useState('');

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

  async function handleAdicionarVisita(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (!item || !data || !motivo.trim() || !veterinario.trim() || !laudo.trim()) {
      return;
    }
    const atualizado = await adicionarVisita(item.id, {
      data,
      motivo: motivo.trim(),
      veterinario: veterinario.trim(),
      laudo: laudo.trim(),
    });
    setItem(atualizado);
    setData('');
    setMotivo('');
    setVeterinario('');
    setLaudo('');
  }

  async function handleExcluirVisita(visitaId: string) {
    if (!item) return;
    const atualizado = await excluirVisita(item.id, visitaId);
    setItem(atualizado);
  }

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

  const visitas = item.visitas ?? [];

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

      <hr style={{ margin: '32px 0', borderColor: 'var(--cor-borda)' }} />

      <h2>Histórico de Visitas</h2>

      {visitas.length === 0 ? (
        <p className="mensagem-info">Nenhuma visita registrada para este pet.</p>
      ) : (
        <table className="tabela" style={{ marginBottom: '24px' }}>
          <thead>
            <tr>
              <th>Data</th>
              <th>Motivo / Procedimento</th>
              <th>Veterinário(a)</th>
              <th>Laudo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {visitas.map((visita) => (
              <tr key={visita.id}>
                <td>{visita.data}</td>
                <td>{visita.motivo}</td>
                <td>{visita.veterinario}</td>
                <td>{visita.laudo}</td>
                <td>
                  <button
                    className="botao-link perigo"
                    onClick={() => handleExcluirVisita(visita.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3>Registrar Visita Anterior</h3>
      <form className="formulario" onSubmit={handleAdicionarVisita}>
        <label>
          Data da visita
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </label>
        <label>
          Motivo / Procedimento
          <input
            type="text"
            placeholder="Ex: Vacina V10, Consulta de rotina..."
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            required
          />
        </label>
        <label>
          Veterinário(a)
          <input
            type="text"
            placeholder="Ex: Dra. Ana"
            value={veterinario}
            onChange={(e) => setVeterinario(e.target.value)}
            required
          />
        </label>
        <label>
          Laudo
          <input
            type="text"
            placeholder="Ex: Animal saudável, vacinado..."
            value={laudo}
            onChange={(e) => setLaudo(e.target.value)}
            required
          />
        </label>
        <div className="formulario-botoes">
          <button type="submit" className="botao">
            Adicionar Visita
          </button>
        </div>
      </form>
    </section>
  );
}
