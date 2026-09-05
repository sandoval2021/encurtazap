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
        border-white/10
        bg-[#111318]
        shadow-2xl
        shadow-black/25
      "
    >
      <header
        className="
          flex
          items-center
          gap-3
          border-b
          border-white/5
          bg-[#202c33]
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
            text-[#07170d]
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
              text-white
            "
          >
            Preview da conversa
          </h2>

          <p className="text-xs text-slate-400">
            online
          </p>
        </div>

        <div
          aria-hidden="true"
          className="
            flex
            items-center
            gap-4
            text-slate-300
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
          bg-[#0b141a]
          p-4
        "
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      >
        <div
          className="
            ml-auto
            max-w-[88%]
            rounded-2xl
            rounded-br-md
            bg-[#005c4b]
            px-3.5
            py-2.5
            text-sm
            leading-relaxed
            text-white
            shadow-lg
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
              text-emerald-100/70
            "
          >
            agora ✓✓
          </div>
        </div>
      </div>
    </section>
  );
}
