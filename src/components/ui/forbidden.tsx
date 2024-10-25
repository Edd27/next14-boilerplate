import { ShieldBanIcon } from "lucide-react";

export default function Forbidden() {
  return (
    <div className="mx-auto my-auto flex w-fit select-none flex-col items-center justify-center gap-3 text-center">
      <ShieldBanIcon className="h-28 w-28 opacity-70" />
      <h2 className="text-3xl font-bold text-destructive">No autorizado</h2>
      <p className="max-w-lg text-pretty text-lg font-semibold text-current opacity-70">
        No tienes permisos para realizar esta acción. Por favor contacta a tu
        administrador.
      </p>
    </div>
  );
}
