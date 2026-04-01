import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { supabase } from "@/integrations/supabase/client";
import { WHATSAPP_URL } from "@/lib/whatsapp";
import { usePageView } from "@/hooks/usePageView";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  image_url: string | null;
  created_at: string;
}

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  usePageView("/blog");

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, image_url, created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });
      setPosts(data || []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <>
      <Header />
      <main className="section-padding bg-muted min-h-screen">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-14"
          >
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">
              <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-muted-foreground">Dicas e conteúdos para empreendedoras.</p>
          </motion.div>

          {loading ? (
            <div className="text-center text-muted-foreground">Carregando...</div>
          ) : posts.length === 0 ? (
            <div className="text-center text-muted-foreground">Nenhum artigo publicado ainda.</div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {posts.map((p, i) => (
                <motion.article
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group"
                >
                  {p.image_url && (
                    <img src={p.image_url} alt={p.title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-6">
                    <Link to={`/blog/${p.slug}`}>
                      <h2 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                        <BookOpen className="w-5 h-5" /> {p.title}
                      </h2>
                    </Link>
                    {p.excerpt && <p className="text-muted-foreground text-sm mb-4">{p.excerpt}</p>}
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/blog/${p.slug}`}
                        className="text-primary text-sm font-semibold hover:underline"
                      >
                        Ler mais →
                      </Link>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-[#25D366] hover:underline"
                      >
                        <MessageCircle className="w-4 h-4" /> Fale Conosco
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default BlogPage;
