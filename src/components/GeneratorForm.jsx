import {
  Check,
  Copy,
  Download,
  ExternalLink,
  Link2,
  MessageSquareText,
  Phone,
} from 'lucide-react';

import {
  copyToClipboard,
} from '../utils/clipboard.js';

import {
  DDI_OPTIONS,
  formatPhoneInput,
} from '../utils/whatsapp.js';

import AdSensePlaceholder from './AdSensePlaceholder.jsx';

export default function GeneratorForm({
  ddi,
  phone,
  message,

  generatedLink,
  validation,

  showAd,

  onDdiChange,
  onPhoneChange,
  onMessageChange,

  onRecord,
  onRevealAd,
  onDownloadQr,
  onNotify,
}) {
  const formattedPhone =
    formatPhoneInput(
      ddi,
      phone,
    );

  async function handleCopy() {
    if (!validation.valid) {
      onNotify({
        type: 'error',
        message:
          validation.message ||
          'Informe um número válido.',
      });

      return;
    }

    try {
      await copyToClipboard(
        generatedLink,
      );

      onRecord();
      onRevealAd();

      onNotify({
        type: 'success',
        message:
          'Link copiado com sucesso!',
      });
    } catch {
      onNotify({
        type: 'error',
        message:
          'Não foi possível copiar o link.',
      });
    }
  }

  function handleTest() {
    if (!validation.valid) {
      onNotify({
        type: 'error',
        message:
          validation.message ||
          'Informe um número válido.',
      });

      return;
    }

    const anchor =
      document.createElement('a');

    anchor.href = generatedLink;
    anchor.target = '_blank';
    anchor.rel =
      'noopener noreferrer';

    document.body.appendChild(
      anchor,
    );

    anchor.click();
    anchor.remove();

    onRecord();
  }

  async function handleDownloadQr() {
    if (!validation.valid) {
      onNotify({
        type: 'error',
        message:
          validation.message ||
          'Informe um número válido.',
      });

      return;
    }

    try {
      const downloaded =
        await onDownloadQr();

      if (!downloaded) {
        onNotify({
          type: 'error',
          message:
            'Reduza a mensagem para gerar um QR Code.',
        });

        return;
      }

      onRecord();

      onNotify({
        type: 'success',
        message:
          'QR Code baixado com sucesso!',
      });
    } catch {
      onNotify({
        type: 'error',
        message:
          'Não foi possível baixar o QR Code.',
      });
    }
  }

  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-lg
        shadow-slate-900/5
        sm:p-6
      "
    >
      <div
        className="
          mb-6
          flex
          items-start
          gap-3
        "
      >
        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-[#25D366]/10
            text-[#25D366]
          "
        >
          <Link2
            size={22}
            aria-hidden="true"
          />
        </div>

        <div>
          <h2
            className="
              text-lg
              font-bold
              text-slate-900
            "
          >
            Crie seu link agora
          </h2>

          <p
            className="
              mt-1
              text-sm
              leading-relaxed
              text-slate-600
            "
          >
            Informe o número e deixe sua
            mensagem pronta.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div
          className="
            grid
            grid-cols-[128px_1fr]
            gap-3
          "
        >
          <div>
            <label
              htmlFor="ddi"
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700
              "
            >
              DDI
            </label>

            <select
              id="ddi"
              value={ddi}
              onChange={(event) =>
                onDdiChange(
                  event.target.value,
                )
              }
              className="
                h-12
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                px-3
                text-sm
                text-slate-900
                outline-none
                transition
                focus:border-[#25D366]
                focus:ring-4
                focus:ring-[#25D366]/10
              "
            >
              {DDI_OPTIONS.map(
                (option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    +{option.value}
                  </option>
                ),
              )}
            </select>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700
              "
            >
              Número do celular
            </label>

            <div className="relative">
              <Phone
                size={17}
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  left-3.5
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder={
                  ddi === '55'
                    ? '(82) 99999-9999'
                    : 'Número'
                }
                value={formattedPhone}
                onChange={(event) =>
                  onPhoneChange(
                    event.target.value,
                  )
                }
                aria-invalid={
                  phone.length > 0 &&
                  !validation.valid
                }
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  pl-10
                  pr-3
                  text-base
                  text-slate-900
                  outline-none
                  transition
                  placeholder:text-slate-400
                  focus:border-[#25D366]
                  focus:ring-4
                  focus:ring-[#25D366]/10
                "
              />
            </div>
          </div>
        </div>

        <div>
          <div
            className="
              mb-2
              flex
              items-center
              justify-between
              gap-3
            "
          >
            <label
              htmlFor="message"
              className="
                text-sm
                font-medium
                text-slate-700
              "
            >
              Mensagem pronta
            </label>

            <span
              className="
                text-xs
                tabular-nums
                text-slate-400
              "
            >
              {message.length}/1000
            </span>
          </div>

          <div className="relative">
            <MessageSquareText
              size={18}
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-3.5
                top-3.5
                text-slate-400
              "
            />

            <textarea
              id="message"
              value={message}
              maxLength={1000}
              rows={5}
              placeholder="Olá! Gostaria de saber mais informações."
              onChange={(event) =>
                onMessageChange(
                  event.target.value,
                )
              }
              className="
                min-h-[130px]
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                py-3
                pl-11
                pr-3
                text-base
                leading-relaxed
                text-slate-900
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-[#25D366]
                focus:ring-4
                focus:ring-[#25D366]/10
              "
            />
          </div>
        </div>

        {generatedLink && (
          <div
            className="
              rounded-xl
              border
              border-emerald-100
              bg-emerald-50
              p-3
            "
          >
            <div
              className="
                mb-1
                flex
                items-center
                gap-1.5
                text-xs
                font-medium
                text-emerald-700
              "
            >
              <Check
                size={13}
                aria-hidden="true"
              />

              Link pronto
            </div>

            <p
              className="
                truncate
                text-xs
                text-slate-600
              "
              title={generatedLink}
            >
              {generatedLink}
            </p>
          </div>
        )}

        <div className="grid gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="
              flex
              min-h-14
              w-full
              items-center
              justify-center
              gap-2.5
              rounded-2xl
              bg-[#25D366]
              px-5
              text-base
              font-bold
              text-emerald-950
              shadow-lg
              shadow-[#25D366]/20
              transition
              hover:bg-[#20c65c]
              active:scale-[0.99]
            "
          >
            <Copy
              size={20}
              aria-hidden="true"
            />

            Copiar Link
          </button>

          <div
            className="
              grid
              grid-cols-2
              gap-3
            "
          >
            <button
              type="button"
              onClick={handleTest}
              className="
                flex
                min-h-12
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-3
                text-sm
                font-semibold
                text-slate-700
                transition
                hover:border-slate-300
                hover:bg-slate-100
              "
            >
              <ExternalLink
                size={17}
                aria-hidden="true"
              />

              Testar Link
            </button>

            <button
              type="button"
              onClick={handleDownloadQr}
              className="
                flex
                min-h-12
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-3
                text-sm
                font-semibold
                text-slate-700
                transition
                hover:border-slate-300
                hover:bg-slate-100
              "
            >
              <Download
                size={17}
                aria-hidden="true"
              />

              Baixar QR
            </button>
          </div>
        </div>

        <p
          className="
            text-center
            text-xs
            leading-relaxed
            text-slate-500
          "
        >
          Nenhum número ou mensagem é
          enviado para nossos servidores.
        </p>
      </div>

      {showAd && (
        <AdSensePlaceholder />
      )}
    </div>
  );
}
