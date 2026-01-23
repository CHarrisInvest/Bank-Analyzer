import { Helmet } from 'react-helmet-async';

/**
 * SEO Component
 * Provides per-page meta tags for better search engine optimization
 */
function SEO({
  title,
  description,
  canonical,
  type = 'website',
  image = 'https://banksift.org/og-image.png',
  schema,
  noindex = false,
}) {
  const siteName = 'BankSift';
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - Bank Investment Tools`;
  const defaultDescription = 'Sift through the noise. Screen and analyze publicly traded banks using comprehensive financial metrics from SEC filings.';
  const metaDescription = description || defaultDescription;
  const baseUrl = 'https://banksift.org';
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : undefined;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={image} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}

export default SEO;
