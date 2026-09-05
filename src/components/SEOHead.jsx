import { Helmet } from 'react-helmet-async';

const DEFAULT_TITLE =
  'Gerador de Link para WhatsApp Grátis | Link + QR Code';

const DEFAULT_DESCRIPTION =
  'Crie gratuitamente seu link para WhatsApp com mensagem pronta e QR Code. Gere links wa.me em segundos para Instagram, redes sociais e seu negócio.';

const FAQ_ITEMS = [
  {
    question:
      'Como criar um link de WhatsApp?',

    answer:
      'Escolha o DDI do país, informe o número com DDD e escreva a mensagem que deseja deixar pronta. O gerador cria automaticamente um link wa.me que pode ser copiado, testado ou transformado em QR Code.',
  },

  {
    question:
      'O gerador de link do WhatsApp é gratuito?',

    answer:
      'Sim. Você pode criar, copiar e testar seus links para WhatsApp gratuitamente, sem cadastro. Os dados informados permanecem no seu navegador.',
  },

  {
    question:
      'Como fazer um link com mensagem pronta?',

    answer:
      'Informe o número do WhatsApp e escreva a mensagem no campo de texto. A mensagem será codificada automaticamente e adicionada ao link para aparecer pronta quando o usuário abrir a conversa.',
  },
];

export default function SEOHead({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
}) {
  const configuredSiteUrl =
    import.meta.env.VITE_SITE_URL
      ?.trim()
      .replace(/\/+$/, '');

  const runtimeOrigin =
    typeof window !== 'undefined'
      ? window.location.origin
      : '';

  const pathname =
    typeof window !== 'undefined'
      ? window.location.pathname
      : '/';

  const siteUrl =
    configuredSiteUrl ||
    runtimeOrigin;

  const canonicalUrl = siteUrl
    ? `${siteUrl}${pathname}`
    : undefined;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',

    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,

      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <Helmet>
      <html lang="pt-BR" />

      <title>{title}</title>

      <meta
        name="description"
        content={description}
      />

      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />

      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="og:locale"
        content="pt_BR"
      />

      <meta
        property="og:title"
        content={title}
      />

      <meta
        property="og:description"
        content={description}
      />

      {canonicalUrl && (
        <>
          <link
            rel="canonical"
            href={canonicalUrl}
          />

          <meta
            property="og:url"
            content={canonicalUrl}
          />
        </>
      )}

      <meta
        name="twitter:card"
        content="summary"
      />

      <meta
        name="twitter:title"
        content={title}
      />

      <meta
        name="twitter:description"
        content={description}
      />

      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
}
