// =============================================================================
// SIDE-EFFECT IMPORTS - These ensure registerUniformComponent() calls execute
// =============================================================================
// Layout
import './layout/header/Header';
import './layout/header/NavigationLink';
import './layout/footer/Footer';
import './layout/footer/FooterNavLink';
import './layout/footer/FooterLinkGroup';
// Content
import './content/Section';
import './content/CTA';
import './content/RichText';
import './content/Text';
// Article
import './article/ArticleHeader';
import './article/ArticleContent';
import './article/ArticleTags';
import './article/ArticleAuthor';
// Cards
import './cards/Card';
import './cards/CardGrid';
// Media
import './media/Image';
import './media/ImageFeature';
import './media/ImageHero';
import './media/Video';
// Interactive
import './interactive/InteractiveImage';
import './interactive/Hotspot';
// Home
import './home/HeroBanner';
import './home/FeaturedCollections';
import './home/CollectionCard';
import './home/LifestyleGallery';
import './home/LifestyleGalleryItem';
import './home/TestimonialSection';
import './home/TestimonialCard';
import './home/CtaBanner';
import './home/CollaborationHero';
import './home/ColorChip';
// Products
import './products/ProductHero';
import './products/ProductCard';
import './products/ProductGrid';
import './products/ProductImageGallery';
import './products/ProductInfo';
import './products/RelatedProducts';
import './products/ProductHotspotCard';
// Shared
import './shared/PageHero';
import './shared/ContentBlock';

// =============================================================================
// TYPE EXPORTS - For external use
// =============================================================================

// === LAYOUT COMPONENTS ===
export { default as Header, type HeaderProps } from './layout/header/Header';
export { default as HeaderStatic, type HeaderStaticProps } from './layout/header/HeaderStatic';
export { default as NavigationLink, type NavigationLinkProps } from './layout/header/NavigationLink';
export { default as Footer, type FooterProps } from './layout/footer/Footer';
export { default as FooterStatic, type FooterStaticProps } from './layout/footer/FooterStatic';
export { default as FooterNavLink, type FooterNavLinkProps } from './layout/footer/FooterNavLink';
export { default as FooterLinkGroup, type FooterLinkGroupProps } from './layout/footer/FooterLinkGroup';

// === CONTENT COMPONENTS ===
export { default as Section, type SectionProps } from './content/Section';
export { default as CTA, type CTAProps } from './content/CTA';
export { default as RichText, type RichTextProps } from './content/RichText';
export { default as Text, type TextProps } from './content/Text';

// === ARTICLE COMPONENTS ===
export { default as ArticleHeader, type ArticleHeaderProps } from './article/ArticleHeader';
export { default as ArticleContent, type ArticleContentProps } from './article/ArticleContent';
export { default as ArticleTags, type ArticleTagsProps } from './article/ArticleTags';
export { default as ArticleAuthor, type ArticleAuthorProps } from './article/ArticleAuthor';

// === CARD COMPONENTS ===
export { default as Card, type CardProps } from './cards/Card';
export { default as CardGrid, type CardGridProps } from './cards/CardGrid';

// === MEDIA COMPONENTS ===
export { default as Image, type ImageProps } from './media/Image';
export { default as ImageFeature, type ImageFeatureProps } from './media/ImageFeature';
export { default as ImageHero, type ImageHeroProps } from './media/ImageHero';
export { default as Video, type VideoProps } from './media/Video';

// === INTERACTIVE COMPONENTS ===
export { default as InteractiveImage, type InteractiveImageProps } from './interactive/InteractiveImage';
export { default as Hotspot, type HotspotProps } from './interactive/Hotspot';

// === HOME COMPONENTS ===
export { default as HeroBanner, type HeroBannerProps } from './home/HeroBanner';
export { default as FeaturedCollections, type FeaturedCollectionsProps } from './home/FeaturedCollections';
export { default as CollectionCard, type CollectionCardProps } from './home/CollectionCard';
export { default as LifestyleGallery, type LifestyleGalleryProps } from './home/LifestyleGallery';
export { default as LifestyleGalleryItem, type LifestyleGalleryItemProps } from './home/LifestyleGalleryItem';
export { default as TestimonialSection, type TestimonialSectionProps } from './home/TestimonialSection';
export { default as TestimonialCard, type TestimonialCardProps } from './home/TestimonialCard';
export { default as CtaBanner, type CtaBannerProps } from './home/CtaBanner';
export { default as CollaborationHero, type CollaborationHeroProps } from './home/CollaborationHero';
export { default as ColorChip, type ColorChipProps } from './home/ColorChip';

// === PRODUCT COMPONENTS ===
export { default as ProductHero, type ProductHeroProps } from './products/ProductHero';
export { default as ProductCard, type ProductCardProps } from './products/ProductCard';
export { default as ProductGrid, type ProductGridProps } from './products/ProductGrid';
export { default as ProductHotspotCard, type ProductHotspotCardProps } from './products/ProductHotspotCard';
export { default as ProductImageGallery, type ProductImageGalleryProps } from './products/ProductImageGallery';
export { default as ProductInfo, type ProductInfoProps } from './products/ProductInfo';
export { default as RelatedProducts, type RelatedProductsProps } from './products/RelatedProducts';
// Static versions (for non-Uniform pages)
export { default as ProductImageGalleryStatic, type ProductImageGalleryStaticProps } from './products/ProductImageGalleryStatic';
export { default as ProductInfoStatic, type ProductInfoStaticProps } from './products/ProductInfoStatic';
export { default as RelatedProductsStatic, type RelatedProductsStaticProps } from './products/RelatedProductsStatic';

// === SHARED COMPONENTS ===
export { default as PageHero, type PageHeroProps } from './shared/PageHero';
export { default as ContentBlock, type ContentBlockProps } from './shared/ContentBlock';