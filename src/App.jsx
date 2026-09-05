import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Link2,
  MessageCircle,
  QrCode,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';

import SEOHead from './components/SEOHead.jsx';
import GeneratorForm from './components/GeneratorForm.jsx';
import WhatsAppPreview from './components/WhatsAppPreview.jsx';
import QRCodePanel from './components/QRCodePanel.jsx';
import History from './components/History.jsx';
import Toast from './components/Toast.jsx';

import {
  useWhatsAppGenerator,
} from './hooks/useWhatsAppGenerator.js';

import {
  copyToClipboard,
} from './utils/clipboard.js';

export default function App() {
  const {
    ddi,
    phone,
    message,

    generatedLink,
    validation,
    history,

    setDdi,
    setPhone,
    setMessage,

    recordCurrentLink,
    clearHistory,
  } = useWhatsAppGenerator();

  const qrCodeRef = useRef(null);

  const toastTimerRef =
    useRef(null);

  const [toast, setToast] =
    useState(null);

  const [showAd, setShowAd] =
    useState(false);

  const notify = useCallback(
    ({
      type = 'success',
      message: toastMessage,
    }) => {
      if (toastTimerRef.current) {
        window.clearTimeout(
          toastTimerRef.current,
        );
      }

      setToast({
        type,
        message: toastMessage,
      });

      toastTimerRef.current =
        window.setTimeout(() => {
          setToast(null);
        }, 3200);
    },
    [],
  );

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(
          toastTimerRef.current,
        );
      }
    };
  }, []);

  async function handleDownloadQr() {
    if (!qrCodeRef.current) {
      return false;
    }

    return qrCodeRef.current.download();
  }

  async function handleHistoryCopy(item) {
    try {
      await copyToClipboard(item.url);

      notify({
        type: 'success',
        message:
          'Link copiado novamente!',
      });
    } catch {
      notify({
        type: 'error',
        message:
          'Não foi possível copiar o link.',
      });
    }
  }

  function handleClearHistory() {
    clearHistory();

    notify({
      type: 'success',
      message:
        'Histórico removido.',
    });
  }

  return (
    <>
      <SEOHead />

      <Toast
        toast={toast}
        onClose={() =>
          setToast(null)
        }
      />

      <header
        className="
          fixed
          inset-x-0
          top-0
          z-50
          border-b
          border-white/[0.06]
          bg-[#090b0f]/90
          backdrop-blur-xl
        "
      >
        <div
          className="
            mx-auto
            flex
            h-16
            max-w-7xl
            items-center
            justify-between
            px-4
            sm:px-6
          "
        >
          <a
            href="/"
            aria-label="Página inicial"
            className="
              flex
              items-center
              gap-2.5
            "
          >
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-[#25D366]
                text-[#06140b]
              "
            >
              <MessageCircle
                size={20}
                strokeWidth={2.4}
                aria-hidden="true"
              />
            </div>

            <span
              className="
                text-sm
                font-bold
                tracking-tight
                text-white
                sm:text-base
              "
            >
              EncurtaZap
            </span>
          </a>

          <a
            href="#como-funciona"
            className="
              rounded-xl
              px-3
              py-2
              text-sm
              font-medium
              text-slate-400
              transition
              hover:bg-white/5
              hover:text-white
            "
          >
            Como funciona
          </a>
        </div>
      </header>

      <main
        className="
          mx-auto
          max-w-7xl
          px-4
          pb-16
          pt-24
          sm:px-6
          sm:pt-28
        "
      >
        <section
          aria-labelledby="main-heading"
        >
          <div
            className="
              mx-auto
              mb-8
              max-w-3xl
              text-center
              lg:mb-10
            "
          >
            <div
              className="
                mb-4
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#25D366]/20
                bg-[#25D366]/5
                px-3
                py-1.5
                text-xs
                font-semibold
                text-[#25D366]
              "
            >
              <Sparkles
                size={14}
                aria-hidden="true"
              />

              Grátis • Sem cadastro
            </div>

            <h1
              id="main-heading"
              className="
                text-balance
                text-3xl
                font-black
                tracking-tight
                text-white
                sm:text-4xl
                lg:text-5xl
              "
            >
              Gerador de Link para{' '}
              <span className="text-[#25D366]">
                WhatsApp
              </span>
            </h1>

            <p
              className="
                mx-auto
                mt-4
                max-w-2xl
                text-base
                leading-relaxed
                text-slate-400
                sm:text-lg
              "
            >
              Crie seu link de WhatsApp com
              mensagem pronta e QR Code em
              poucos segundos. Copie, teste e
              compartilhe onde quiser.
            </p>
          </div>

          <div
            className="
              grid
              items-start
              gap-6
              lg:grid-cols-[minmax(0,1fr)_420px]
            "
          >
            <div>
              <GeneratorForm
                ddi={ddi}
                phone={phone}
                message={message}
                generatedLink={
                  generatedLink
                }
                validation={
                  validation
                }
                showAd={showAd}
                onDdiChange={setDdi}
                onPhoneChange={
                  setPhone
                }
                onMessageChange={
                  setMessage
                }
                onRecord={
                  recordCurrentLink
                }
                onRevealAd={() =>
                  setShowAd(true)
                }
                onDownloadQr={
                  handleDownloadQr
                }
                onNotify={
                  notify
                }
              />

              <History
                items={history}
                onCopy={
                  handleHistoryCopy
                }
                onClear={
                  handleClearHistory
                }
              />
            </div>

            <aside
              className="
                lg:sticky
                lg:top-24
              "
            >
              <WhatsAppPreview
                message={message}
              />

              <QRCodePanel
                ref={qrCodeRef}
                link={generatedLink}
                valid={
                  validation.valid
                }
              />
            </aside>
          </div>
        </section>

        <article
          id="como-funciona"
          className="
            mx-auto
            mt-20
            max-w-4xl
          "
        >
          <header className="mb-12">
            <p
              className="
                mb-3
                text-sm
                font-bold
                uppercase
                tracking-[0.16em]
                text-[#25D366]
              "
            >
              Link para WhatsApp
            </p>

            <h2
              className="
                text-2xl
                font-black
                tracking-tight
                text-white
                sm:text-3xl
              "
            >
              Facilite o primeiro contato
              com seus clientes
            </h2>

            <p
              className="
                mt-4
                text-base
                leading-8
                text-slate-400
              "
            >
              Um link direto para WhatsApp
              reduz etapas entre o interesse
              do visitante e o início da
              conversa. Em vez de pedir que
              uma pessoa copie um número,
              abra o aplicativo, salve um
              contato e depois escreva uma
              mensagem, você pode levá-la
              diretamente para a conversa
              usando um endereço no padrão
              wa.me.
            </p>
          </header>

          <section
            className="
              grid
              gap-4
              md:grid-cols-3
            "
          >
            <div
              className="
                rounded-3xl
                border
                border-white/10
                bg-[#111318]
                p-5
              "
            >
              <div
                className="
                  mb-4
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#25D366]/10
                  text-[#25D366]
                "
              >
                <Zap
                  size={20}
                  aria-hidden="true"
                />
              </div>

              <h3
                className="
                  font-bold
                  text-white
                "
              >
                Menos atrito
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-slate-400
                "
              >
                Um único clique pode abrir a
                conversa com o número e a
                mensagem já preparados.
              </p>
            </div>

            <div
              className="
                rounded-3xl
                border
                border-white/10
                bg-[#111318]
                p-5
              "
            >
              <div
                className="
                  mb-4
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#25D366]/10
                  text-[#25D366]
                "
              >
                <Link2
                  size={20}
                  aria-hidden="true"
                />
              </div>

              <h3
                className="
                  font-bold
                  text-white
                "
              >
                Fácil de compartilhar
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-slate-400
                "
              >
                Use seu link no Instagram,
                site, assinatura de e-mail,
                redes sociais e campanhas.
              </p>
            </div>

            <div
              className="
                rounded-3xl
                border
                border-white/10
                bg-[#111318]
                p-5
              "
            >
              <div
                className="
                  mb-4
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#25D366]/10
                  text-[#25D366]
                "
              >
                <QrCode
                  size={20}
                  aria-hidden="true"
                />
              </div>

              <h3
                className="
                  font-bold
                  text-white
                "
              >
                Online e offline
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-slate-400
                "
              >
                Transforme o link em QR Code
                para cardápios, vitrines,
                cartões e materiais
                impressos.
              </p>
            </div>
          </section>

          <section className="mt-16">
            <h2
              className="
                text-2xl
                font-black
                tracking-tight
                text-white
              "
            >
              Como usar um link do WhatsApp
              no seu negócio?
            </h2>

            <div
              className="
                mt-6
                space-y-7
              "
            >
              <div>
                <h3
                  className="
                    text-lg
                    font-bold
                    text-slate-100
                  "
                >
                  Instagram e redes sociais
                </h3>

                <p
                  className="
                    mt-2
                    leading-7
                    text-slate-400
                  "
                >
                  Coloque seu link de
                  WhatsApp na bio, em uma
                  página de links ou em
                  campanhas. Uma mensagem
                  pronta como “Olá, vim pelo
                  Instagram e gostaria de
                  saber mais” também ajuda a
                  identificar de onde surgiu
                  o contato.
                </p>
              </div>

              <div>
                <h3
                  className="
                    text-lg
                    font-bold
                    text-slate-100
                  "
                >
                  Sites e páginas de venda
                </h3>

                <p
                  className="
                    mt-2
                    leading-7
                    text-slate-400
                  "
                >
                  Botões de atendimento por
                  WhatsApp funcionam
                  especialmente bem quando
                  aparecem próximos de
                  produtos, serviços, preços
                  ou chamadas para ação. O
                  objetivo é permitir que o
                  visitante tire dúvidas sem
                  precisar procurar seu
                  número manualmente.
                </p>
              </div>

              <div>
                <h3
                  className="
                    text-lg
                    font-bold
                    text-slate-100
                  "
                >
                  QR Code para atendimento
                </h3>

                <p
                  className="
                    mt-2
                    leading-7
                    text-slate-400
                  "
                >
                  O QR Code permite levar
                  materiais físicos para uma
                  conversa digital. Ele pode
                  ser usado em balcões,
                  embalagens, cartões,
                  panfletos, cardápios,
                  eventos e vitrines.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-16">
            <div
              className="
                rounded-3xl
                border
                border-[#25D366]/15
                bg-[#25D366]/[0.04]
                p-6
                sm:p-8
              "
            >
              <div
                className="
                  flex
                  items-start
                  gap-4
                "
              >
                <ShieldCheck
                  size={25}
                  className="
                    mt-1
                    shrink-0
                    text-[#25D366]
                  "
                  aria-hidden="true"
                />

                <div>
                  <h2
                    className="
                      text-xl
                      font-black
                      text-white
                    "
                  >
                    Privacidade por padrão
                  </h2>

                  <p
                    className="
                      mt-3
                      leading-7
                      text-slate-400
                    "
                  >
                    Este gerador funciona
                    diretamente no navegador.
                    O número e a mensagem são
                    utilizados localmente
                    para montar o endereço
                    wa.me. O histórico de até
                    cinco links também é
                    mantido somente no
                    armazenamento local do
                    navegador e pode ser
                    apagado pelo próprio
                    usuário.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section
            id="faq"
            className="mt-16"
          >
            <h2
              className="
                text-2xl
                font-black
                tracking-tight
                text-white
              "
            >
              Perguntas frequentes sobre
              links para WhatsApp
            </h2>

            <div
              className="
                mt-7
                divide-y
                divide-white/[0.07]
                border-y
                border-white/[0.07]
              "
            >
              <div className="py-6">
                <h3
                  className="
                    text-lg
                    font-bold
                    text-white
                  "
                >
                  Como criar um link de
                  WhatsApp?
                </h3>

                <p
                  className="
                    mt-3
                    leading-7
                    text-slate-400
                  "
                >
                  Escolha o DDI do país,
                  informe o número com DDD e
                  escreva a mensagem que
                  deseja deixar pronta. O
                  gerador cria
                  automaticamente um link
                  wa.me que pode ser
                  copiado, testado ou
                  transformado em QR Code.
                </p>
              </div>

              <div className="py-6">
                <h3
                  className="
                    text-lg
                    font-bold
                    text-white
                  "
                >
                  O gerador de link do
                  WhatsApp é gratuito?
                </h3>

                <p
                  className="
                    mt-3
                    leading-7
                    text-slate-400
                  "
                >
                  Sim. Você pode criar,
                  copiar e testar seus links
                  para WhatsApp
                  gratuitamente, sem
                  cadastro. Os dados
                  informados permanecem no
                  seu navegador.
                </p>
              </div>

              <div className="py-6">
                <h3
                  className="
                    text-lg
                    font-bold
                    text-white
                  "
                >
                  Como fazer um link com
                  mensagem pronta?
                </h3>

                <p
                  className="
                    mt-3
                    leading-7
                    text-slate-400
                  "
                >
                  Informe o número do
                  WhatsApp e escreva a
                  mensagem no campo de
                  texto. A mensagem será
                  codificada
                  automaticamente e
                  adicionada ao link para
                  aparecer pronta quando o
                  usuário abrir a conversa.
                </p>
              </div>
            </div>
          </section>
        </article>
      </main>

      <footer
        className="
          border-t
          border-white/[0.06]
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            items-center
            justify-between
            gap-3
            px-4
            py-8
            text-center
            text-xs
            text-slate-600
            sm:flex-row
            sm:px-6
            sm:text-left
          "
        >
          <p>
            Gerador de Link para WhatsApp
          </p>

          <p>
            Ferramenta independente. WhatsApp
            é uma marca de seus respectivos
            proprietários.
          </p>
        </div>
      </footer>
    </>
  );
}
