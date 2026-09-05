import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';

import {
  QrCode,
  ShieldCheck,
} from 'lucide-react';

import {
  QRCodeCanvas,
} from 'qrcode.react';

import {
  canGenerateQrCode,
} from '../utils/whatsapp.js';

const QRCodePanel = forwardRef(
  function QRCodePanel(
    {
      link,
      valid,
    },
    forwardedRef,
  ) {
    const canvasRef = useRef(null);

    const qrAvailable = useMemo(
      () =>
        Boolean(
          valid &&
          link &&
          canGenerateQrCode(link),
        ),
      [
        valid,
        link,
      ],
    );

    useImperativeHandle(
      forwardedRef,
      () => ({
        async download() {
          if (!qrAvailable) {
            return false;
          }

          const canvas =
            canvasRef.current;

          if (!canvas) {
            return false;
          }

          const blob =
            await new Promise(
              (resolve) => {
                canvas.toBlob(
                  resolve,
                  'image/png',
                  1,
                );
              },
            );

          if (!blob) {
            return false;
          }

          const objectUrl =
            URL.createObjectURL(blob);

          const linkElement =
            document.createElement('a');

          linkElement.href = objectUrl;

          linkElement.download =
            'link-whatsapp-qrcode.png';

          document.body.appendChild(
            linkElement,
          );

          linkElement.click();
          linkElement.remove();

          window.setTimeout(() => {
            URL.revokeObjectURL(
              objectUrl,
            );
          }, 0);

          return true;
        },
      }),
      [qrAvailable],
    );

    return (
      <section
        aria-labelledby="qr-heading"
        className="
          mt-5
          rounded-3xl
          border
          border-white/10
          bg-[#111318]
          p-5
        "
      >
        <div
          className="
            mb-5
            flex
            items-start
            gap-3
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#25D366]/10
              text-[#25D366]
            "
          >
            <QrCode
              size={21}
              aria-hidden="true"
            />
          </div>

          <div>
            <h2
              id="qr-heading"
              className="
                font-semibold
                text-white
              "
            >
              QR Code do WhatsApp
            </h2>

            <p
              className="
                mt-1
                text-sm
                leading-relaxed
                text-slate-400
              "
            >
              Ideal para cartões, panfletos,
              mesas, vitrines e materiais
              impressos.
            </p>
          </div>
        </div>

        <div
          className="
            flex
            min-h-[250px]
            items-center
            justify-center
            rounded-2xl
            border
            border-white/5
            bg-[#0b0d10]
            p-4
          "
        >
          {qrAvailable ? (
            <div
              className="
                rounded-2xl
                bg-white
                p-3
              "
            >
              <QRCodeCanvas
                ref={canvasRef}
                value={link}
                size={220}
                bgColor="#ffffff"
                fgColor="#101417"
                level="M"
                marginSize={4}
                title="QR Code do link para WhatsApp"
              />
            </div>
          ) : valid && link ? (
            <div
              className="
                max-w-sm
                text-center
              "
            >
              <QrCode
                size={34}
                className="
                  mx-auto
                  mb-3
                  text-slate-600
                "
              />

              <p
                className="
                  text-sm
                  font-medium
                  text-slate-300
                "
              >
                Mensagem grande demais para
                gerar um QR Code confiável.
              </p>

              <p
                className="
                  mt-2
                  text-xs
                  leading-relaxed
                  text-slate-500
                "
              >
                O link continua funcionando.
                Reduza a mensagem para gerar
                o QR Code.
              </p>
            </div>
          ) : (
            <div className="text-center">
              <QrCode
                size={40}
                className="
                  mx-auto
                  mb-3
                  text-slate-700
                "
              />

              <p
                className="
                  text-sm
                  text-slate-500
                "
              >
                Informe seu número para gerar
                o QR Code.
              </p>
            </div>
          )}
        </div>

        <div
          className="
            mt-4
            flex
            items-center
            justify-center
            gap-2
            text-xs
            text-slate-500
          "
        >
          <ShieldCheck
            size={14}
            aria-hidden="true"
          />

          Gerado diretamente no seu navegador
        </div>
      </section>
    );
  },
);

export default QRCodePanel;
