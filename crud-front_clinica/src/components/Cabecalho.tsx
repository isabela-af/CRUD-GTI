import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Cabecalho() {
  const { t, i18n } = useTranslation();

  return (
    <header className="cabecalho">
      <Link to="/" className="cabecalho-titulo">
        {t('sistema')}
      </Link>
      
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {/* Botões para alternar idioma */}
        <button 
          type="button" 
          className="botao botao-claro"
          onClick={() => i18n.changeLanguage('pt')}
        >
          PT
        </button>
        <button 
          type="button" 
          className="botao botao-claro"
          onClick={() => i18n.changeLanguage('en')}
        >
          EN
        </button>

        <Link to="/novo" className="botao botao-claro">
          {t('novoPaciente')}
        </Link>
      </div>
    </header>
  );
}