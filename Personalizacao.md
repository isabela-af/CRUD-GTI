# Personalizações

## Troca de Idioma (Método com `react-i18next`)

Este guia explica o passo a passo para configurar e adicionar idiomas ao projeto utilizando a biblioteca **`react-i18next`**.

---

### 1. Instalar os pacotes necessários

No terminal, dentro da pasta do front-end (`crud-front_clinica`), instale as dependências:

```bash
npm install i18next react-i18next
```

---

### 2. Criar o arquivo de configuração (`src/i18n.ts`)

Crie o arquivo `src/i18n.ts` para registrar os idiomas disponíveis e seus respectivos dicionários de termos:

```ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    pt: {
      translation: {
        sistema: 'Clínica Veterinária',
        novoPaciente: '+ Novo Paciente',
        buscarPlaceholder: 'Buscar por nome do pet...',
        listaTitulo: 'Lista de Pacientes',
        colunaNome: 'Nome do pet',
        colunaEspecie: 'Espécie',
        colunaValor: 'Valor da consulta',
        colunaSituacao: 'Situação',
        colunaAcoes: 'Ações',
        ver: 'Ver',
        editar: 'Editar',
        excluir: 'Excluir',
        ativo: 'Em tratamento',
        inativo: 'Alta'
      }
    },
    en: {
      translation: {
        sistema: 'Veterinary Clinic',
        novoPaciente: '+ New Patient',
        buscarPlaceholder: 'Search by pet name...',
        listaTitulo: 'Patient List',
        colunaNome: 'Pet Name',
        colunaEspecie: 'Species',
        colunaValor: 'Consultation Fee',
        colunaSituacao: 'Status',
        colunaAcoes: 'Actions',
        ver: 'View',
        editar: 'Edit',
        excluir: 'Delete',
        ativo: 'In treatment',
        inativo: 'Discharged'
      }
    }
  },
  lng: 'pt', // Idioma padrão inicial
  fallbackLng: 'pt',
  interpolation: {
    escapeValue: false // O React já previne ataques XSS
  }
});

export default i18n;
```

---

### 3. Importar a configuração no ponto de entrada (`src/main.tsx`)

Para que o React carregue as traduções antes de renderizar os componentes, adicione a importação do `i18n` em `src/main.tsx`:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import './i18n'; // <-- Inicializa o i18next

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
```

---

### 4. Adicionar botões de troca no cabeçalho (`src/components/Cabecalho.tsx`)

Adicione botões para alternar o idioma chamando `i18n.changeLanguage(...)`:

```tsx
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
        {/* Botões seletores de idioma */}
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
```

---

### 5. Utilizar as traduções nas páginas e componentes

Em qualquer página ou componente que precise exibir textos traduzidos (como `src/pages/ListaPage.tsx` ou `src/components/StatusBadge.tsx`):

1. Importe o hook:
   ```tsx
   import { useTranslation } from 'react-i18next';
   ```
2. Inicialize o hook dentro do componente:
   ```tsx
   const { t } = useTranslation();
   ```
3. Substitua o texto fixo por `{t('chave')}`:
   ```tsx
   <h1>{t('listaTitulo')}</h1>
   <input placeholder={t('buscarPlaceholder')} />
   <th>{t('colunaNome')}</th>
   ```

---

### Como adicionar um novo idioma no futuro (ex: Espanhol `es`)

1. Em `src/i18n.ts`, adicione o novo idioma dentro de `resources`:
   ```ts
   es: {
     translation: {
       sistema: 'Clínica Veterinaria',
       novoPaciente: '+ Nuevo Paciente',
       // ... demais chaves traduzidas
     }
   }
   ```
2. No componente `Cabecalho.tsx`, adicione um novo botão:
   ```tsx
   <button type="button" className="botao botao-claro" onClick={() => i18n.changeLanguage('es')}>
     ES
   </button>
   ```
