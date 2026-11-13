import { useTranslation } from 'react-i18next';
import type { StatusItem } from '../types/Item';
interface StatusBadgeProps {
 status: StatusItem;
}
export default function StatusBadge({ status }: StatusBadgeProps) {
 const { t } = useTranslation();
 const ativo = status === 'ativo';
 return (
 <span className={ativo ? 'badge badge-ativo' : 'badge badge-inativo'}>
 {ativo ? t('ativo') : t('inativo')}
 </span>
 );
}