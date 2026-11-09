import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Cabecalho from './components/Cabecalho';
import { tema } from './config/tema';
import DetalhesPage from './pages/DetalhesPage';
import FormularioPage from './pages/FormularioPage';
import ListaPage from './pages/ListaPage';
export default function App() {
useEffect(() => {
document.documentElement.style.setProperty('--cor-principal', tema.corPrincipal);
document.title = tema.nomeSistema;
}, []);
return (
<>
<Cabecalho />

 <main className="conteudo">
 <Routes>
 <Route path="/" element={<ListaPage />} />
 <Route path="/novo" element={<FormularioPage />} />
 <Route path="/editar/:id" element={<FormularioPage />} />
 <Route path="/detalhes/:id" element={<DetalhesPage />} />
 <Route path="*" element={<p>Página não encontrada.</p>} />
 </Routes>
 </main>
 </>
 );
}