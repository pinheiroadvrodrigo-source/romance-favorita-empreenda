/** Prefixa caminhos locais ("/blog/x.jpg") com o base do site (necessário no GitHub Pages). */
export const assetUrl = (url?: string | null) => {
  if (!url) return url ?? "";
  if (/^(https?:)?\/\//.test(url) || url.startsWith("data:")) return url;
  return import.meta.env.BASE_URL.replace(/\/$/, "") + (url.startsWith("/") ? url : `/${url}`);
};
