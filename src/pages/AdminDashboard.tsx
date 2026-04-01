import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LogOut, Plus, Eye, FileText, Users, BarChart3, Pencil, Trash2 } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  created_at: string;
}

interface Analytics {
  total_views: number;
  today_views: number;
  top_pages: { page: string; count: number }[];
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>({ total_views: 0, today_views: 0, top_pages: [] });
  const [tab, setTab] = useState<"posts" | "registrations" | "analytics">("posts");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/admin/login");
      return;
    }
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin");
    if (!roles || roles.length === 0) {
      navigate("/admin/login");
    }
  };

  const fetchData = async () => {
    // Posts
    const { data: postsData } = await supabase
      .from("blog_posts")
      .select("id, title, slug, published, created_at")
      .order("created_at", { ascending: false });
    setPosts(postsData || []);

    // Registrations
    const { data: regsData } = await supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });
    setRegistrations(regsData || []);

    // Analytics
    const { data: allViews } = await supabase.from("page_views").select("id", { count: "exact" });
    const today = new Date().toISOString().split("T")[0];
    const { data: todayViews } = await supabase
      .from("page_views")
      .select("id", { count: "exact" })
      .gte("created_at", today);

    const { data: pageData } = await supabase.from("page_views").select("page");
    const pageCounts: Record<string, number> = {};
    (pageData || []).forEach((v: any) => {
      pageCounts[v.page] = (pageCounts[v.page] || 0) + 1;
    });
    const top_pages = Object.entries(pageCounts)
      .map(([page, count]) => ({ page, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    setAnalytics({
      total_views: allViews?.length || 0,
      today_views: todayViews?.length || 0,
      top_pages,
    });

    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const deletePost = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    toast.success("Post excluído!");
    fetchData();
  };

  const togglePublish = async (id: string, current: boolean) => {
    await supabase.from("blog_posts").update({ published: !current }).eq("id", id);
    toast.success(current ? "Post despublicado" : "Post publicado!");
    fetchData();
  };

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3">
        <div className="container-narrow flex items-center justify-between">
          <Link to="/" className="text-xl font-display font-bold">
            <span className="gradient-text">Romance</span> Admin
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </header>

      <div className="container-narrow py-8 px-4">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-xl p-4 shadow-sm">
            <FileText className="w-6 h-6 text-primary mb-2" />
            <p className="text-2xl font-bold">{posts.length}</p>
            <p className="text-xs text-muted-foreground">Artigos</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-sm">
            <Users className="w-6 h-6 text-primary mb-2" />
            <p className="text-2xl font-bold">{registrations.length}</p>
            <p className="text-xs text-muted-foreground">Cadastros</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-sm">
            <Eye className="w-6 h-6 text-primary mb-2" />
            <p className="text-2xl font-bold">{analytics.total_views}</p>
            <p className="text-xs text-muted-foreground">Visualizações</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-sm">
            <BarChart3 className="w-6 h-6 text-primary mb-2" />
            <p className="text-2xl font-bold">{analytics.today_views}</p>
            <p className="text-xs text-muted-foreground">Hoje</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["posts", "registrations", "analytics"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === t ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "posts" ? "Artigos" : t === "registrations" ? "Cadastros" : "Analytics"}
            </button>
          ))}
        </div>

        {/* Posts Tab */}
        {tab === "posts" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Artigos do Blog</h2>
              <Link
                to="/admin/posts/new"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold"
              >
                <Plus className="w-4 h-4" /> Novo Artigo
              </Link>
            </div>
            <div className="bg-card rounded-xl shadow-sm overflow-hidden">
              {posts.length === 0 ? (
                <p className="p-6 text-center text-muted-foreground">Nenhum artigo ainda.</p>
              ) : (
                <div className="divide-y divide-border">
                  {posts.map((p) => (
                    <div key={p.id} className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">{p.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(p.created_at).toLocaleDateString("pt-BR")} •{" "}
                          <span className={p.published ? "text-green-500" : "text-yellow-500"}>
                            {p.published ? "Publicado" : "Rascunho"}
                          </span>
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => togglePublish(p.id, p.published)}
                          className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
                          title={p.published ? "Despublicar" : "Publicar"}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <Link
                          to={`/admin/posts/${p.id}`}
                          className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => deletePost(p.id)}
                          className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Registrations Tab */}
        {tab === "registrations" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Cadastros</h2>
            <div className="bg-card rounded-xl shadow-sm overflow-x-auto">
              {registrations.length === 0 ? (
                <p className="p-6 text-center text-muted-foreground">Nenhum cadastro.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="p-4 font-medium">Nome</th>
                      <th className="p-4 font-medium">CPF</th>
                      <th className="p-4 font-medium">Data Nasc.</th>
                      <th className="p-4 font-medium">Data Cadastro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((r: any) => (
                      <tr key={r.id} className="border-b border-border">
                        <td className="p-4">{r.nome}</td>
                        <td className="p-4">{r.cpf}</td>
                        <td className="p-4">{new Date(r.data_nascimento).toLocaleDateString("pt-BR")}</td>
                        <td className="p-4">{new Date(r.created_at).toLocaleDateString("pt-BR")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {tab === "analytics" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Analytics</h2>
            <div className="bg-card rounded-xl shadow-sm p-6">
              <h3 className="font-semibold mb-4">Páginas Mais Visitadas</h3>
              {analytics.top_pages.length === 0 ? (
                <p className="text-muted-foreground">Sem dados ainda.</p>
              ) : (
                <div className="space-y-3">
                  {analytics.top_pages.map((p) => (
                    <div key={p.page} className="flex items-center justify-between">
                      <span className="text-sm">{p.page}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(p.count / analytics.total_views) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-10 text-right">{p.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
