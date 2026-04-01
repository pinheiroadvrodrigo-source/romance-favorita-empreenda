import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const AdminPostEditor = () => {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "new";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image_url: "",
    published: false,
  });

  useEffect(() => {
    if (!isNew && id) {
      supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .maybeSingle()
        .then(({ data }) => {
          if (data) {
            setForm({
              title: data.title,
              slug: data.slug,
              excerpt: data.excerpt || "",
              content: data.content,
              image_url: data.image_url || "",
              published: data.published,
            });
          }
        });
    }
  }, [id, isNew]);

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleTitleChange = (title: string) => {
    setForm((f) => ({ ...f, title, slug: isNew ? generateSlug(title) : f.slug }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      toast.error("Título e conteúdo são obrigatórios!");
      return;
    }
    setLoading(true);

    const payload = {
      title: form.title,
      slug: form.slug || generateSlug(form.title),
      excerpt: form.excerpt || null,
      content: form.content,
      image_url: form.image_url || null,
      published: form.published,
    };

    if (isNew) {
      const { error } = await supabase.from("blog_posts").insert(payload);
      if (error) {
        toast.error("Erro ao criar: " + error.message);
        setLoading(false);
        return;
      }
      toast.success("Artigo criado!");
    } else {
      const { error } = await supabase.from("blog_posts").update(payload).eq("id", id);
      if (error) {
        toast.error("Erro ao atualizar: " + error.message);
        setLoading(false);
        return;
      }
      toast.success("Artigo atualizado!");
    }

    setLoading(false);
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-4 py-3">
        <div className="container-narrow flex items-center gap-4">
          <Link to="/admin" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-display font-bold">
            {isNew ? "Novo Artigo" : "Editar Artigo"}
          </h1>
        </div>
      </header>

      <div className="container-narrow py-8 px-4 max-w-3xl">
        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-foreground/80 mb-1 block">Título</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="Título do artigo"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground/80 mb-1 block">Slug (URL)</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="titulo-do-artigo"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground/80 mb-1 block">Resumo</label>
            <input
              type="text"
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="Breve descrição do artigo"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground/80 mb-1 block">URL da Imagem</label>
            <input
              type="text"
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground/80 mb-1 block">Conteúdo (HTML)</label>
            <textarea
              required
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={15}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:ring-2 focus:ring-primary focus:outline-none font-mono text-sm"
              placeholder="<p>Conteúdo do artigo...</p>"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
              className="w-5 h-5 rounded border-border accent-primary"
            />
            <span className="text-sm font-medium">Publicar artigo</span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="btn-glow w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold disabled:opacity-50"
          >
            {loading ? "Salvando..." : isNew ? "Criar Artigo" : "Salvar Alterações"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPostEditor;
