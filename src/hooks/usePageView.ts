import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const trackPageView = async (page: string) => {
  try {
    await supabase.from("page_views").insert({
      page,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent || null,
    });
  } catch (e) {
    // silent fail
  }
};

export const usePageView = (page: string) => {
  useEffect(() => {
    trackPageView(page);
  }, [page]);
};
