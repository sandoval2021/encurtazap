import { Megaphone } from 'lucide-react';

export default function AdSensePlaceholder() {
  return (
    <aside
      aria-label="Publicidade"
      className="
        animate-fade-in-up
        mt-5
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-white/[0.025]
        p-4
      "
    >
      <div
        className="
          mb-3
          flex
          items-center
          gap-2
          text-[11px]
          font-semibold
          uppercase
          tracking-[0.14em]
          text-slate-500
        "
      >
        <Megaphone
          size={14}
          aria-hidden="true"
        />

        Publicidade
      </div>

      <div
        className="
          flex
          min-h-24
          items-center
          justify-center
          rounded-xl
          border
          border-dashed
          border-white/10
          bg-black/20
          px-4
          text-center
          text-sm
          text-slate-500
        "
      >
        Espaço reservado para Google AdSense
      </div>
    </aside>
  );
}
