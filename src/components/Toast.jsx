import {
  CheckCircle2,
  CircleAlert,
  X,
} from 'lucide-react';

export default function Toast({
  toast,
  onClose,
}) {
  if (!toast) {
    return null;
  }

  const isError =
    toast.type === 'error';

  return (
    <div
      role={isError ? 'alert' : 'status'}
      aria-live="polite"
      className="
        animate-toast-in
        fixed
        left-1/2
        top-20
        z-[100]
        flex
        w-[calc(100%-2rem)]
        max-w-md
        -translate-x-1/2
        items-center
        gap-3
        rounded-2xl
        border
        border-slate-200
        bg-white
        px-4
        py-3
        shadow-xl
        shadow-slate-900/10
      "
    >
      {isError ? (
        <CircleAlert
          className="shrink-0 text-red-500"
          size={21}
          aria-hidden="true"
        />
      ) : (
        <CheckCircle2
          className="shrink-0 text-[#25D366]"
          size={21}
          aria-hidden="true"
        />
      )}

      <p
        className="
          flex-1
          text-sm
          font-medium
          text-slate-900
        "
      >
        {toast.message}
      </p>

      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar aviso"
        className="
          rounded-lg
          p-1.5
          text-slate-500
          transition
          hover:bg-slate-100
          hover:text-slate-900
        "
      >
        <X
          size={17}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
