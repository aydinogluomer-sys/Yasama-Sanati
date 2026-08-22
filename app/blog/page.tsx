import React from "react";
import heroImage from "@/public/SideBar/blog.jpg";
import SubPageLayout from "@/components/Server/SubPageLayout";
import BlogPageContent from "@/components/Client/BlogPageContent";
import { BLOG_POSTS } from "@/utils/blogData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Bilgi Bankası | Yaşama Sanatı",
  description: "Bütünsel sağlık, kadim öğretiler, nefes pratikleri, meridyen terapisi, reiki ve zihinsel dönüşüm üzerine bilimsel ve ruhsal makaleler.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <SubPageLayout
      heroImage={heroImage}
      title="Blog & Bilgi Bankası"
      description="Bütünsel sağlık, kadim öğretiler, nefes pratikleri ve zihinsel dönüşüm üzerine makaleler"
    >
      <BlogPageContent posts={BLOG_POSTS} />
    </SubPageLayout>
  );
}
