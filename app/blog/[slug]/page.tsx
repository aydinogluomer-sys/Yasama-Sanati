import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import SubPageLayout from "@/components/Server/SubPageLayout";
import BlogDetailContent from "@/components/Client/BlogDetailContent";
import { BLOG_POSTS } from "@/utils/blogData";
import { ArticleSchema, BreadcrumbSchema } from "@/components/Server/StructuredData";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) {
    return {
      title: "Makale Bulunamadı | Yaşama Sanatı",
    };
  }
  return {
    title: `${post.title} | Yaşama Sanatı`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage.src }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Find related posts (same category, excluding this one)
  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.category === post.category && p.slug !== post.slug
  ).slice(0, 2);

  // Fallback to other posts if less than 2
  if (relatedPosts.length < 2) {
    const extraPosts = BLOG_POSTS.filter(
      (p) => p.slug !== post.slug && !relatedPosts.some((rp) => rp.slug === p.slug)
    ).slice(0, 2 - relatedPosts.length);
    relatedPosts.push(...extraPosts);
  }

  // Türkçe tarihi ("24 Mayıs 2026") ISO'ya çevir; çevrilemezse alan yayınlanmaz.
  const isoDate = toIsoDate(post.date);

  return (
    <>
      <ArticleSchema
        headline={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        datePublished={isoDate}
        image={post.coverImage.src}
      />
      <BreadcrumbSchema
        items={[
          { name: "Ana Sayfa", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <SubPageLayout title="Blog & Bilgi Bankası" hideHero>
        <BlogDetailContent post={post} relatedPosts={relatedPosts} />
      </SubPageLayout>
    </>
  );
}

const TR_MONTHS: Record<string, number> = {
  ocak: 0, şubat: 1, mart: 2, nisan: 3, mayıs: 4, haziran: 5,
  temmuz: 6, ağustos: 7, eylül: 8, ekim: 9, kasım: 10, aralık: 11,
};

function toIsoDate(value: string): string | undefined {
  const m = value.trim().toLowerCase().match(/^(\d{1,2})\s+(\S+)\s+(\d{4})$/);
  if (!m) return undefined;
  const month = TR_MONTHS[m[2]];
  if (month === undefined) return undefined;
  return new Date(Date.UTC(Number(m[3]), month, Number(m[1]))).toISOString().slice(0, 10);
}
