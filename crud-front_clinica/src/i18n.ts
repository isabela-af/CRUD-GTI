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
        inativo: 'Alta',
        voltar: 'Voltar',
        salvar: 'Salvar',
        cancelar: 'Cancelar',
        carregando: 'Carregando...',
        voltarParaLista: 'Voltar para a lista',
        historicoVisitas: 'Histórico de Visitas',
        nenhumaVisita: 'Nenhuma visita registrada para este pet.',
        colunaData: 'Data',
        colunaMotivo: 'Motivo / Procedimento',
        colunaVeterinario: 'Veterinário(a)',
        colunaLaudo: 'Laudo',
        campoNome: 'Nome do pet',
        campoValor: 'Valor da consulta',
        campoDescricao: 'Observações',
        registrarVisita: 'Registrar Visita Anterior',
        adicionarVisita: 'Adicionar Visita'
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
        inativo: 'Discharged',
        voltar: 'Back',
        salvar: 'Save',
        cancelar: 'Cancel',
        carregando: 'Loading...',
        voltarParaLista: 'Back to list',
        historicoVisitas: 'Visit History',
        nenhumaVisita: 'No visits registered for this pet.',
        colunaData: 'Date',
        colunaMotivo: 'Reason / Procedure',
        colunaVeterinario: 'Veterinarian',
        colunaLaudo: 'Report',
        campoNome: 'Pet Name',
        campoValor: 'Consultation Fee',
        campoDescricao: 'Notes',
        registrarVisita: 'Register Previous Visit',
        adicionarVisita: 'Add Visit'
      }
    }
  },
  lng: 'pt', // idioma inicial
  fallbackLng: 'pt',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
