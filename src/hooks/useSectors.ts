import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SECTORS, type Sector } from "@/config/event";

export const useSectors = () => {
  return useQuery({
    queryKey: ["sectors"],
    queryFn: async (): Promise<Sector[]> => {
      const { data, error } = await supabase
        .from("sectors")
        .select("*")
        .order("price", { ascending: false });

      if (error || !data || data.length === 0) {
        // Fallback to config if DB not available
        return SECTORS;
      }

      return data.map((s: any) => ({
        id: s.id,
        name: s.name,
        price: Number(s.price),
        description: s.description,
        badge: s.badge ?? undefined,
        available: s.available,
        maxPerOrder: s.max_per_order,
      }));
    },
    staleTime: 30_000,
  });
};
