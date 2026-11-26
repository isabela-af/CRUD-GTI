import { Link } from 'react-router-dom';
import { tema } from '../config/tema';
export default function Cabecalho() {
 return (
 <header className="cabecalho">
 <Link to="/" className="cabecalho-titulo">
 {tema.nomeSistema}
 </Link>
 <Link to="/novo" className="botao botao-claro">
 + Novo {tema.nomeSingular}
 </Link>
 </header>
 );
}
