import {
  MoreVertical,
  Phone,
  Video,
} from 'lucide-react';

export default function WhatsAppPreview({
  message,
}) {
  const previewMessage =
    message ||
    'Sua mensagem aparecerá aqui em tempo real.';

  return (
    <section
      aria-labelledby="preview-heading"
      className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-lg
        shadow-slate-900/5
      "
    >
      <header
        className="
          flex
          items-center
          gap-3
          border-b
          border-slate-200
          bg-slate-50
          px-4
          py-3
        "
      >
        <div
          aria-hidden="true"
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#25D366]
            font-bold
            text-emerald-950
          "
        >
          W
        </div>

        <div className="min-w-0 flex-1">
          <h2
            id="preview-heading"
            className="
              truncate
              text-sm
              font-semibold
              text-slate-900
            "
          >
            Preview da conversa
          </h2>

          <p className="text-xs text-slate-500">
            online
          </p>
        </div>

        <div
          aria-hidden="true"
          className="
            flex
            items-center
            gap-4
            text-slate-500
          "
        >
          <Video size={18} />
          <Phone size={17} />
          <MoreVertical size={18} />
        </div>
      </header>

      <div
        className="
          flex
          min-h-[280px]
          items-end
          bg-[#efeae2]
          p-4
        "
        style={{
          backgroundImage:
            'radial-gradient(rgba(15,23,42,0.04) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      >
        <div
          className="
            ml-auto
            max-w-[88%]
            rounded-2xl
            rounded-br-md
            bg-[#d9fdd3]
            px-3.5
            py-2.5
            text-sm
            leading-relaxed
            text-slate-900
            shadow-sm
          "
        >
          <p
            className="
              whitespace-pre-wrap
              break-words
            "
          >
            {previewMessage}
          </p>

          <div
            className="
              mt-1
              flex
              justify-end
              text-[10px]
              text-slate-500
            "
          >
            agora ✓✓
          </div>
        </div>
      </div>
    </section>
  );
}
