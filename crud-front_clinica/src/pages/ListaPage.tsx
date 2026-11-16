import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import StatusBadge from '../components/StatusBadge';
import { tema } from '../config/tema';
import { excluir, listar } from '../services/itemService';
import type { Item } from '../types/Item';
import { formatarMoeda } from '../utils/formatar';

export default function ListaPage() {
  const { t } = useTranslation();
  const [itens, setItens] = useState<Item[]>([]);
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [filtroEspecie, setFiltroEspecie] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');

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

  // Cálculos para os cards de estatísticas:
  const totalPacientes = itens.length;
  const emTratamento = itens.filter((item) => item.status === 'ativo').length;
  const comAlta = itens.filter((item) => item.status === 'inativo').length;
  const faturamentoTotal = itens.reduce((soma, item) => soma + (Number(item.valor) || 0), 0);


  // Lista de espécies disponíveis (inclui espécies personalizadas cadastradas)
  const listaEspecies = Array.from(
    new Set([...tema.categorias, ...itens.map((i) => i.categoria)]),
  );

  const itensFiltrados = itens.filter((item) => {
    // 1. Checa o nome
    const atendeNome = item.nome.toLowerCase().includes(busca.toLowerCase());
    
    // 2. Checa a espécie (se vazio, aceita todas)
    const atendeEspecie = filtroEspecie === '' || item.categoria === filtroEspecie;
    
    // 3. Checa a situação (se vazio, aceita todas)
    const atendeStatus = filtroStatus === '' || item.status === filtroStatus;

    return atendeNome && atendeEspecie && atendeStatus;
  });

  return (
    <section>
      <h1>{t('listaTitulo')}</h1>

      {/* Bloco de Cards de Estatísticas */}
      <div className="cards-estatisticas">
        <div className="card-item">
          <span className="card-icone">🐾</span>
          <div>
            <h3>Total de Pacientes</h3>
            <p className="card-valor">{totalPacientes}</p>
          </div>
        </div>

        <div className="card-item">
          <span className="card-icone">🏥</span>
          <div>
            <h3>Em Tratamento</h3>
            <p className="card-valor">{emTratamento}</p>
          </div>
        </div>

        <div className="card-item">
          <span className="card-icone">✅</span>
          <div>
            <h3>Altas Concedidas</h3>
            <p className="card-valor">{comAlta}</p>
          </div>
        </div>

        <div className="card-item">
          <span className="card-icone">💰</span>
          <div>
            <h3>Faturamento</h3>
            <p className="card-valor">{formatarMoeda(faturamentoTotal)}</p>
          </div>
        </div>
      </div>

      {/* Barra de Filtros: Nome + Espécie + Situação */}
      <div className="barra-filtros">
        <input
          className="campo-busca"
          type="text"
          placeholder={t('buscarPlaceholder')}
          value={busca}
          onChange={(evento) => setBusca(evento.target.value)}
        />

        {/* Filtro de Espécie */}
        <select
          className="filtro-select"
          value={filtroEspecie}
          onChange={(evento) => setFiltroEspecie(evento.target.value)}
        >
          <option value="">Todas as espécies</option>
          {listaEspecies.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Filtro de Situação */}
        <select
          className="filtro-select"
          value={filtroStatus}
          onChange={(evento) => setFiltroStatus(evento.target.value)}
        >
          <option value="">Todas as situações</option>
          <option value="ativo">Em tratamento</option>
          <option value="inativo">Alta</option>
        </select>

        {/* Botão para limpar filtros */}
        {(busca || filtroEspecie || filtroStatus) && (
          <button
            className="botao botao-secundario"
            type="button"
            onClick={() => {
              setBusca('');
              setFiltroEspecie('');
              setFiltroStatus('');
            }}
          >
            Limpar
          </button>
        )}
      </div>
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
