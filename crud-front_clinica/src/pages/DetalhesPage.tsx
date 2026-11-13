import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import StatusBadge from '../components/StatusBadge';
import {
  adicionarVisita,
  buscarPorId,
  excluirVisita,
} from '../services/itemService';
import type { Item } from '../types/Item';
import { formatarMoeda } from '../utils/formatar';

export default function DetalhesPage() {
  const { t } = useTranslation();
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
    return <p className="mensagem-info">{t('carregando')}</p>;
  }

  if (erro || !item) {
    return (
      <section>
        <p className="mensagem-erro">{erro}</p>
        <Link to="/">{t('voltarParaLista')}</Link>
      </section>
    );
  }

  const visitas = item.visitas ?? [];

  return (
    <section>
      <h1>{item.nome}</h1>
      <dl className="detalhes">
        <dt>{t('colunaEspecie')}</dt>
        <dd>{item.categoria}</dd>
        <dt>{t('colunaValor')}</dt>
        <dd>{formatarMoeda(item.valor)}</dd>
        <dt>{t('colunaSituacao')}</dt>
        <dd>
          <StatusBadge status={item.status} />
        </dd>
        <dt>{t('campoDescricao')}</dt>
        <dd>{item.descricao || '—'}</dd>
      </dl>

      <div className="formulario-botoes">
        <Link to={`/editar/${item.id}`} className="botao">
          {t('editar')}
        </Link>
        <Link to="/" className="botao botao-secundario">
          {t('voltar')}
        </Link>
      </div>

      <hr style={{ margin: '32px 0', borderColor: 'var(--cor-borda)' }} />

      <h2>{t('historicoVisitas')}</h2>

      {visitas.length === 0 ? (
        <p className="mensagem-info">{t('nenhumaVisita')}</p>
      ) : (
        <table className="tabela" style={{ marginBottom: '24px' }}>
          <thead>
            <tr>
              <th>{t('colunaData')}</th>
              <th>{t('colunaMotivo')}</th>
              <th>{t('colunaVeterinario')}</th>
              <th>{t('colunaLaudo')}</th>
              <th>{t('colunaAcoes')}</th>
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
                    {t('excluir')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3>{t('registrarVisita')}</h3>
      <form className="formulario" onSubmit={handleAdicionarVisita}>
        <label>
          {t('colunaData')}
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </label>
        <label>
          {t('colunaMotivo')}
          <input
            type="text"
            placeholder="Ex: Vacina V10, Consulta de rotina..."
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            required
          />
        </label>
        <label>
          {t('colunaVeterinario')}
          <input
            type="text"
            placeholder="Ex: Dra. Ana"
            value={veterinario}
            onChange={(e) => setVeterinario(e.target.value)}
            required
          />
        </label>
        <label>
          {t('colunaLaudo')}
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
            {t('adicionarVisita')}
          </button>
        </div>
      </form>
    </section>
  );
}
