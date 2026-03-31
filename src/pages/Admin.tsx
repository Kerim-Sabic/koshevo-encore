import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { LogIn, Save, LogOut, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface SectorRow {
  id: string;
  name: string;
  price: number;
  description: string;
  badge: string | null;
  available: boolean;
  max_per_order: number;
  updated_at: string;
}

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [sectors, setSectors] = useState<SectorRow[]>([]);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        const { data } = await supabase.from("user_roles").select("role").eq("user_id", u.id).eq("role", "admin");
        setIsAdmin(!!data && data.length > 0);
        if (data && data.length > 0) await loadSectors();
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    supabase.auth.getSession();
    return () => subscription.unsubscribe();
  }, []);

  const loadSectors = async () => {
    const { data } = await supabase.from("sectors").select("*").order("price", { ascending: false });
    if (data) setSectors(data as SectorRow[]);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) toast.error(error.message);
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
  };

  const updateSector = async (sector: SectorRow) => {
    setSaving(sector.id);
    const { error } = await supabase
      .from("sectors")
      .update({
        price: sector.price,
        description: sector.description,
        badge: sector.badge,
        available: sector.available,
        max_per_order: sector.max_per_order,
      })
      .eq("id", sector.id);

    if (error) toast.error("Failed to update: " + error.message);
    else toast.success(`${sector.name} updated`);
    setSaving(null);
  };

  const updateField = (id: string, field: keyof SectorRow, value: any) => {
    setSectors((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-2xl p-8 w-full max-w-sm"
        >
          <h1 className="text-2xl font-display font-bold text-foreground mb-1">Admin Login</h1>
          <p className="text-xs text-muted-foreground font-body mb-6">Sign in to manage ticket pricing</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
              required
            />
            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm uppercase tracking-wider hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {authLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="glass-panel rounded-2xl p-8 text-center max-w-sm">
          <AlertCircle className="w-10 h-10 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-display font-bold text-foreground mb-2">Access Denied</h2>
          <p className="text-sm text-muted-foreground font-body mb-4">Your account does not have admin privileges.</p>
          <button onClick={handleLogout} className="text-sm text-primary font-body hover:underline">Sign out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Admin Panel</h1>
            <p className="text-sm text-muted-foreground font-body">Manage ticket sectors and pricing</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-body font-semibold uppercase tracking-wider border border-border text-muted-foreground hover:text-foreground transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <div className="space-y-4">
          {sectors.map((sector) => (
            <motion.div
              key={sector.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-display font-semibold text-foreground">{sector.name}</h3>
                <label className="flex items-center gap-2 text-sm font-body text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={sector.available}
                    onChange={(e) => updateField(sector.id, "available", e.target.checked)}
                    className="rounded border-border bg-secondary accent-primary"
                  />
                  Available
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="text-xs text-muted-foreground font-body mb-1 block">Price (KM)</label>
                  <input
                    type="number"
                    value={sector.price}
                    onChange={(e) => updateField(sector.id, "price", parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm font-body focus:outline-none focus:border-primary/50"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground font-body mb-1 block">Max per Order</label>
                  <input
                    type="number"
                    value={sector.max_per_order}
                    onChange={(e) => updateField(sector.id, "max_per_order", parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm font-body focus:outline-none focus:border-primary/50"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground font-body mb-1 block">Badge</label>
                  <input
                    type="text"
                    value={sector.badge || ""}
                    onChange={(e) => updateField(sector.id, "badge", e.target.value || null)}
                    placeholder="e.g. Premium"
                    className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm font-body placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-xs text-muted-foreground font-body mb-1 block">Description</label>
                <textarea
                  value={sector.description}
                  onChange={(e) => updateField(sector.id, "description", e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm font-body resize-none focus:outline-none focus:border-primary/50"
                />
              </div>

              <button
                onClick={() => updateSector(sector)}
                disabled={saving === sector.id}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-body font-semibold uppercase tracking-wider hover:opacity-90 transition-all disabled:opacity-50"
              >
                {saving === sector.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                Save Changes
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
