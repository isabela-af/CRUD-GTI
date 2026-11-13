import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import StatusBadge from '../components/StatusBadge';
import { excluir, listar } from '../services/itemService';
import type { Item } from '../types/Item';
import { formatarMoeda } from '../utils/formatar';

export default function ListaPage() {
  const { t } = useTranslation();
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
      <h1>{t('listaTitulo')}</h1>
      <input
        className="campo-busca"
        type="text"
        placeholder={t('buscarPlaceholder')}
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
              <th>{t('colunaNome')}</th>
              <th>{t('colunaEspecie')}</th>
              <th>{t('colunaValor')}</th>
              <th>{t('colunaSituacao')}</th>
              <th>{t('colunaAcoes')}</th>
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
                    <Link to={`/detalhes/${item.id}`}>{t('ver')}</Link>
                    <Link to={`/editar/${item.id}`}>{t('editar')}</Link>
                    <button
                      className="botao-link perigo"
                      onClick={() => handleExcluir(item)}
                    >
                      {t('excluir')}
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
