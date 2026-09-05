import {
  Clock3,
  Copy,
  History as HistoryIcon,
  Trash2,
} from 'lucide-react';

import {
  formatPhoneInput,
} from '../utils/whatsapp.js';

export default function History({
  items,
  onCopy,
  onClear,
}) {
  if (!items.length) {
    return (
      <section
        aria-labelledby="history-heading"
        className="
          mt-8
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-slate-100
              text-slate-500
            "
          >
            <HistoryIcon
              size={20}
              aria-hidden="true"
            />
          </div>

          <div>
            <h2
              id="history-heading"
              className="
                font-semibold
                text-slate-900
              "
            >
              Meus Links Recentes
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              Seus últimos 5 links aparecerão
              aqui.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="history-heading"
      className="
        mt-8
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
        sm:p-5
      "
    >
      <div
        className="
          mb-4
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <div
          className="
            flex
            items-center
            gap-2.5
          "
        >
          <HistoryIcon
            size={19}
            className="text-[#25D366]"
            aria-hidden="true"
          />

          <h2
            id="history-heading"
            className="
              font-semibold
              text-slate-900
            "
          >
            Meus Links Recentes
          </h2>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="
            flex
            items-center
            gap-1.5
            rounded-lg
            px-2.5
            py-2
            text-xs
            font-medium
            text-slate-500
            transition
            hover:bg-red-50
            hover:text-red-500
          "
        >
          <Trash2
            size={14}
            aria-hidden="true"
          />

          Limpar
        </button>
      </div>

      <ul className="space-y-2">
        {items.map((item) => {
          const phoneLabel =
            `+${item.ddi} ${formatPhoneInput(
              item.ddi,
              item.phone,
            )}`;

          return (
            <li
              key={item.id}
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                p-3
              "
            >
              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#25D366]/10
                  text-[#25D366]
                "
              >
                <Clock3
                  size={17}
                  aria-hidden="true"
                />
              </div>

              <div
                className="
                  min-w-0
                  flex-1
                "
              >
                <p
                  className="
                    truncate
                    text-sm
                    font-semibold
                    text-slate-900
                  "
                >
                  {phoneLabel}
                </p>

                <p
                  className="
                    mt-0.5
                    truncate
                    text-xs
                    text-slate-500
                  "
                >
                  {item.message ||
                    'Sem mensagem pronta'}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  onCopy(item)
                }
                aria-label={`Copiar link de ${phoneLabel}`}
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  text-slate-600
                  transition
                  hover:border-[#25D366]/40
                  hover:bg-[#25D366]/10
                  hover:text-[#25D366]
                "
              >
                <Copy
                  size={17}
                  aria-hidden="true"
                />
              </button>
            </li>
          );
        })}
      </ul>

      <p
        className="
          mt-4
          text-center
          text-xs
          text-slate-500
        "
      >
        Histórico salvo somente neste
        navegador.
      </p>
    </section>
  );
}
