import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import SubPageLayout from "@/components/Server/SubPageLayout";
import BlogDetailContent from "@/components/Client/BlogDetailContent";
import { BLOG_POSTS } from "@/utils/blogData";

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
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
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

  return (
    <SubPageLayout title="Blog & Bilgi Bankası">
      <BlogDetailContent post={post} relatedPosts={relatedPosts} />
    </SubPageLayout>
  );
}
