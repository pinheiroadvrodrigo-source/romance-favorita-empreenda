import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { supabase } from "@/integrations/supabase/client";
import { WHATSAPP_URL } from "@/lib/whatsapp";
import { usePageView } from "@/hooks/usePageView";

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  image_url: string | null;
  created_at: string;
}

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  usePageView(`/blog/${slug}`);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      setPost(data);
      setLoading(false);
    };
    fetch();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="section-padding min-h-screen">
          <div className="container-narrow text-center text-muted-foreground">Carregando...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header />
        <main className="section-padding min-h-screen">
          <div className="container-narrow text-center">
            <h1 className="text-2xl font-bold mb-4">Artigo não encontrado</h1>
            <Link to="/blog" className="text-primary hover:underline">← Voltar ao Blog</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="section-padding min-h-screen">
        <div className="container-narrow max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-1 text-primary hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" /> Voltar ao Blog
          </Link>

          <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {post.image_url && (
              <img src={post.image_url} alt={post.title} className="w-full h-64 md:h-96 object-cover rounded-xl mb-8" />
            )}
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">{post.title}</h1>
            <p className="text-muted-foreground text-sm mb-8">
              {new Date(post.created_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
            </p>

            <div className="prose prose-lg max-w-none text-foreground" dangerouslySetInnerHTML={{ __html: post.content }} />

            <div className="mt-10 p-6 bg-primary/10 rounded-xl text-center">
              <p className="font-bold text-lg mb-3">Gostou do conteúdo?</p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#20BD5A] transition-colors"
              >
                <MessageCircle className="w-5 h-5" /> Fale Conosco no WhatsApp
              </a>
            </div>
          </motion.article>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default BlogPostPage;
