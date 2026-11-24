# Guia Completo do Projeto CRUD — Clínica

Este documento explica **para que serve cada pasta e arquivo**, **como eles se conectam** e **o que você deve editar** quando quiser mudar qualquer coisa em cada página do sistema.

---

## 1. Estrutura de Pastas e Arquivos (`src/`)

Pense na pasta `src/` como uma clínica veterinária organizada por setores: alguns arquivos definem as **fichas e regras** (`types`, `config`), outros cuidam do **arquivo de pacientes e cálculos** (`services`, `utils`), e outros são as **salas e telas** que o usuário vê (`components`, `pages`, `App.tsx`).

### A. Formato dos Dados e Configuração (A Planta do Sistema)

- **`src/types/Item.ts`**
  - **O que faz:** Define o "contrato" (formato) dos dados usando TypeScript (`interface Item`, `interface Visita`, `type ItemFormulario`).
  - **Por que existe:** Garante que todo paciente e toda visita tenham exatamente os mesmos campos e avisa se você digitar o nome de algum campo errado em outro arquivo.
- **`src/config/tema.ts`**
  - **O que faz:** Guarda as configurações fixas do sistema: nome da clínica, cor principal (`#0f9d8a`), textos dos rótulos (_"Nome do pet"_, _"Espécie"_), lista de espécies e os pacientes iniciais de exemplo (`Thor`, `Mia`, `Piu`).
  - **Por que existe:** Permite mudar textos, cores e opções em um único lugar sem precisar editar várias telas.

### B. Lógica e Manipulação de Dados (O Motor)

- **`src/services/itemService.ts`**
  - **O que faz:** Contém as funções que manipulam os dados na memória:
    - **C**reate (Criar): `criar()` e `adicionarVisita()`
    - **R**ead (Ler): `listar()` e `buscarPorId()`
    - **U**pdate (Atualizar): `atualizar()`
    - **D**elete (Excluir): `excluir()` e `excluirVisita()`
  - **Por que existe:** As páginas visuais não mexem na lista de dados diretamente — elas pedem para o `itemService` buscar ou salvar. Em um sistema real com banco de dados, este seria o **único** arquivo que conversaria com o servidor (backend).
- **`src/utils/formatar.ts`**
  - **O que faz:** Funções utilitárias pequenas, como `formatarMoeda()`, que transforma números (`150`) em reais (`R$ 150,00`).

### C. Interface Visual e Navegação (O que aparece na tela)

- **`src/components/Cabecalho.tsx` e `StatusBadge.tsx`**
  - **O que fazem:** Pequenos blocos visuais reaproveitáveis (a barra superior fixa e a etiqueta colorida de _"Em tratamento"_ / _"Alta"_).
- **`src/pages/ListaPage.tsx`, `FormularioPage.tsx`, `DetalhesPage.tsx`**
  - **O que fazem:** As 3 telas completas do sistema.
- **`src/App.tsx`, `src/main.tsx` e `src/index.css`**
  - **`main.tsx`:** Ponto de partida que injeta o React no `index.html`.
  - **`App.tsx`:** O "controlador de tráfego" que lê a URL do navegador e escolhe qual página mostrar.
  - **`index.css`:** Todas as cores, fontes, tamanhos e estilos de botões, tabelas e formulários.

---

## 2. Como os Arquivos se Conectam (Fluxo de Dados)

Você pode acompanhar a conexão entre os arquivos olhando os `import` no topo de cada um:

```text
                 [ types/Item.ts ]  (1. Define o formato dos dados)
                    │         │
        ┌───────────┘         └───────────┐
        ▼                                 ▼
[ config/tema.ts ] ──────────► [ services/itemService.ts ]  (2. Guarda e altera os dados)
        │                                 │
        ▼                                 ▼
[ components/Cabecalho.tsx ]   [ pages/ListaPage.tsx      ] ◄── [ utils/formatar.ts ]
[ components/StatusBadge.tsx ] [ pages/FormularioPage.tsx ]
        │                      [ pages/DetalhesPage.tsx   ]
        └───────────┐         ┌───────────┘
                    ▼         ▼
                   [ App.tsx ]  (3. Conecta cada URL a uma Página)
                        │
                        ▼
                   [ main.tsx ] (4. Desenha tudo no Navegador)
```

---

## 3. Mapa das Páginas: Qual Arquivo Editar?

Olhe para o endereço (URL) no navegador para saber imediatamente qual arquivo controla aquela tela:

| Endereço (URL)           | O que aparece na tela                             | Arquivo responsável            |
| :----------------------- | :------------------------------------------------ | :----------------------------- |
| _Topo de todas as telas_ | Barra verde com título e botão `+ Novo Paciente`  | `src/components/Cabecalho.tsx` |
| `/`                      | Tabela inicial com barra de busca e lista de pets | `src/pages/ListaPage.tsx`      |
| `/novo` ou `/editar/1`   | Formulário para cadastrar ou editar um pet        | `src/pages/FormularioPage.tsx` |
| `/detalhes/1`            | Ficha completa do pet + **Histórico de Visitas**  | `src/pages/DetalhesPage.tsx`   |

---

## 4. Receitas Práticas: O que Mudar em Cada Caso

### Caso 1: Mudar textos, rótulos, espécies ou cor principal

Você **não** precisa editar as páginas! Abra apenas **`src/config/tema.ts`**:

- **Mudar o nome no topo do site:** Altere `nomeSistema`.
- **Mudar a cor verde do sistema:** Altere `corPrincipal` (ex: `'#7c3aed'` para roxo).
- **Adicionar novas espécies no `<select>`:** Adicione itens na lista `categorias` (ex: `['Cachorro', 'Gato', 'Ave', 'Roedor', 'Réptil']`).
- **Mudar o texto de status:** Altere `textoAtivo` e `textoInativo`.

---

### Caso 2: Mudar a Página Inicial (`src/pages/ListaPage.tsx`)

Abra **`src/pages/ListaPage.tsx`** quando quiser alterar a tabela de pacientes ou a busca:

- **Fazer a barra de busca pesquisar também pela espécie (`categoria`):**
  Procure `itensFiltrados` e altere para:
  ```ts
  const itensFiltrados = itens.filter(
    (item) =>
      item.nome.toLowerCase().includes(busca.toLowerCase()) ||
      item.categoria.toLowerCase().includes(busca.toLowerCase()),
  );
  ```
- **Adicionar ou remover colunas da tabela:**
  - Os títulos das colunas (`<th>`) ficam dentro de `<thead>`.
  - Os valores de cada linha (`<td>`) ficam dentro de `<tbody>`.
  - _Regra de ouro:_ Toda coluna `<th>` adicionada no `<thead>` precisa ter um `<td>` correspondente na mesma ordem dentro do `<tbody>`.

---

### Caso 3: Mudar a Página de Cadastro/Edição (`src/pages/FormularioPage.tsx`)

Abra **`src/pages/FormularioPage.tsx`** quando quiser alterar os campos que o usuário preenche ao criar/editar um pet:

1. **`interface DadosDoFormulario` e `formularioVazio`:** Guardam o estado do que está sendo digitado.
2. **`handleSubmit`:** Faz a validação (ex: impedir nome vazio ou valor negativo) e monta o objeto `paraSalvar`.
3. **`<form className="formulario">`:** Onde ficam os `<label>`, `<input>`, `<select>` e `<textarea>`. O atributo `name="..."` do input deve ter o mesmo nome da propriedade em `DadosDoFormulario`.

---

### Caso 4: Mudar a Página de Detalhes e Visitas (`src/pages/DetalhesPage.tsx`)

Abra **`src/pages/DetalhesPage.tsx`** quando quiser alterar a ficha do animal ou o histórico de visitas:

- **Dados principais do pet:** Ficam dentro da lista `<dl className="detalhes">`, onde `<dt>` é o título do campo e `<dd>` é o valor.
- **Tabela de Histórico de Visitas:** Fica logo abaixo de `<h2>Histórico de Visitas</h2>` e percorre `visitas.map((visita) => ...)`.
- **Formulário de Nova Visita:** Usa estados próprios (`data`, `motivo`, `veterinario`, `laudo`) e chama `adicionarVisita()` na função `handleAdicionarVisita`.

---

## 5. Checklist: Como Criar um Campo Novo no Pet (Ex: `tutor`)

Sempre que quiser adicionar uma **informação nova ao paciente** (por exemplo, `tutor` ou `idade`), siga estes 5 passos na ordem:

1. **`src/types/Item.ts`** — Adicione o campo na `interface Item`:
   ```ts
   export interface Item {
     id: string;
     nome: string;
     tutor: string; // <-- Novo campo
     // ...
   }
   ```
2. **`src/config/tema.ts`** — Adicione o campo nos animais de exemplo dentro de `exemplos`:
   ```ts
   {
     nome: 'Thor',
     tutor: 'Carlos Silva', // <-- Novo campo nos exemplos
     categoria: 'Cachorro',
     // ...
   }
   ```
3. **`src/pages/FormularioPage.tsx`** — Adicione o campo no formulário:
   - Inclua `tutor: string;` em `DadosDoFormulario` e `tutor: ''` em `formularioVazio`.
   - Em `carregarItem`, adicione `tutor: item.tutor`.
   - Em `handleSubmit` (`paraSalvar`), adicione `tutor: dados.tutor.trim()`.
   - No `<form>`, adicione o `<label>` com `<input type="text" name="tutor" value={dados.tutor} onChange={handleChange} />`.
4. **`src/pages/ListaPage.tsx`** — Se quiser mostrar na tabela inicial:
   - Adicione `<th>Tutor</th>` no `<thead>` e `<td>{item.tutor}</td>` no `<tbody>`.
5. **`src/pages/DetalhesPage.tsx`** — Para mostrar na tela de detalhes:
   - Adicione `<dt>Tutor</dt>` e `<dd>{item.tutor}</dd>` dentro de `<dl className="detalhes">`.

---

## 6. Checklist: Como Adicionar um Campo Novo nas Visitas (Ex: `laudo`)

Quando o campo pertence à **visita** (e não ao pet em si), você altera apenas 3 arquivos:

1. **`src/types/Item.ts`** — Adicione o campo na `interface Visita` (ex: `laudo: string;`).
2. **`src/config/tema.ts`** — Adicione o campo nas visitas de exemplo do `Thor` dentro de `visitas: [...]`.
3. **`src/pages/DetalhesPage.tsx`**:
   - Crie o estado: `const [laudo, setLaudo] = useState('');`
   - Envie o campo dentro de `handleAdicionarVisita` e limpe-o depois com `setLaudo('')`.
   - Adicione a coluna `<th>Laudo</th>` e `<td>{visita.laudo}</td>` na tabela de visitas.
   - Adicione o `<label>` com `<input value={laudo} onChange={(e) => setLaudo(e.target.value)} />` no formulário de visitas.
