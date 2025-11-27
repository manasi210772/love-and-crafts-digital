import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
}

const SEO = ({
  title = 'Crafted with Love - Handmade Crafts & Workshops',
  description = 'Discover unique handmade treasures and join weekend workshops. Connecting hearts through handmade art.',
  keywords = 'handmade crafts, artisan products, craft workshops, handmade jewelry, pottery, candles, DIY workshops',
  image = '/og-image.jpg',
  url = 'https://craftedwithlove.com',
  type = 'website',
}: SEOProps) => {
  const fullTitle = title.includes('Crafted with Love') ? title : `${title} | Crafted with Love`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="Crafted with Love" />
    </Helmet>
  );
};

export default SEO;
