import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { HeaderStatic } from "@/components/layout/header/HeaderStatic";
import FooterStatic from "@/components/layout/footer/FooterStatic";
import { ProductImageGalleryStatic } from "@/components/products/ProductImageGalleryStatic";
import { ProductInfoStatic } from "@/components/products/ProductInfoStatic";
import { RelatedProductsStatic } from "@/components/products/RelatedProductsStatic";
import {
  getProductBySlug,
  getRelatedProducts,
  getAllProductSlugs,
  type Product,
} from "@/lib/products-data";

interface ProductDetailPageProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailPage({
  product,
  relatedProducts,
}: ProductDetailPageProps) {
  // Gallery images (for demo, using variations)
  const galleryImages = [
    product.image,
    product.hoverImage || product.image,
    product.image,
    product.hoverImage || product.image,
  ];

  return (
    <>
      <Head>
        <title>{`${product.name} | Arinn Furniture`}</title>
        <meta name="description" content={product.description} />
      </Head>

      <HeaderStatic />

      <main className="bg-[#FAF9F7]">
        {/* Product Detail Section */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <ProductImageGalleryStatic
              images={galleryImages}
              productName={product.name}
            />
            <ProductInfoStatic product={product} />
          </div>
        </div>

        {/* Related Products */}
        <RelatedProductsStatic products={relatedProducts} />
      </main>

      <FooterStatic />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllProductSlugs();

  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ProductDetailPageProps> = async ({
  params,
}) => {
  const slug = params?.slug as string;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      notFound: true,
    };
  }

  const relatedProducts = getRelatedProducts(product, 4);

  return {
    props: {
      product,
      relatedProducts,
    },
  };
};
