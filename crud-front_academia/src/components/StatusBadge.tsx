import { tema } from '../config/tema';
import type { StatusItem } from '../types/Item';
interface StatusBadgeProps {
status: StatusItem;
}
export default function StatusBadge({ status }: StatusBadgeProps) {
const ativo = status === 'ativo';
return (
<span className={ativo ? 'badge badge-ativo' : 'badge badge-inativo'}>
{ativo ? tema.textoAtivo : tema.textoInativo}
</span>
);
}