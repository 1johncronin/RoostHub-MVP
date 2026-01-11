import { getAdminStats } from '@/app/actions/admin';
import { createClient } from '@/lib/supabase/server';
import { ShieldAlert, Users, Package, DollarSign, Trash2, CheckCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();
  const supabase = await createClient();

  const { data: latestListings } = await supabase
    .from('listings')
    .select('*, profiles(username)')
    .order('created_at', { ascending: false })
    .limit(10);

  return (
    <div className="container py-12 max-w-7xl min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl font-black italic uppercase font-space-grotesk text-primary tracking-tighter">Control Center</h1>
        <p className="text-muted-foreground font-medium">RoostHub Global Moderation & Analytics.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-card border-2 border-border p-8 rounded-3xl shadow-xl space-y-4">
            <div className="p-3 bg-primary/10 rounded-2xl w-fit">
                <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
                <div className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-1">Total Riders</div>
                <div className="text-4xl font-black italic font-space-grotesk">{stats.usersCount}</div>
            </div>
        </div>
        <div className="bg-card border-2 border-border p-8 rounded-3xl shadow-xl space-y-4">
            <div className="p-3 bg-amber-500/10 rounded-2xl w-fit">
                <Package className="h-6 w-6 text-amber-500" />
            </div>
            <div>
                <div className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-1">Active Listings</div>
                <div className="text-4xl font-black italic font-space-grotesk">{stats.listingsCount}</div>
            </div>
        </div>
        <div className="bg-card border-2 border-border p-8 rounded-3xl shadow-xl space-y-4">
            <div className="p-3 bg-green-500/10 rounded-2xl w-fit">
                <DollarSign className="h-6 w-6 text-green-500" />
            </div>
            <div>
                <div className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-1">Total Revenue</div>
                <div className="text-4xl font-black italic font-space-grotesk">${stats.revenue.toLocaleString()}</div>
            </div>
        </div>
      </div>

      {/* Moderation Queue */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black italic uppercase font-space-grotesk tracking-tight flex items-center gap-2">
                <ShieldAlert className="h-6 w-6 text-primary" /> Recent Listings
            </h2>
            <Link href="/admin/moderation" className="text-xs font-black uppercase italic text-primary hover:underline">View Full Queue</Link>
        </div>

        <div className="bg-card border-2 border-border rounded-[40px] overflow-hidden shadow-2xl">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-muted/50 border-b border-border">
                        <th className="p-6 text-xs font-black uppercase tracking-widest text-muted-foreground">Listing</th>
                        <th className="p-6 text-xs font-black uppercase tracking-widest text-muted-foreground">Seller</th>
                        <th className="p-6 text-xs font-black uppercase tracking-widest text-muted-foreground">Price</th>
                        <th className="p-6 text-xs font-black uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                    {latestListings?.map((l) => (
                        <tr key={l.id} className="hover:bg-muted/20 transition-colors group">
                            <td className="p-6">
                                <div className="font-bold text-sm uppercase italic">{l.title}</div>
                                <div className="text-[10px] text-muted-foreground uppercase font-medium">{l.type} • {new Date(l.created_at).toLocaleDateString()}</div>
                            </td>
                            <td className="p-6">
                                <div className="flex items-center gap-2">
                                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary italic">
                                        {l.profiles?.username?.[0].toUpperCase()}
                                    </div>
                                    <span className="text-xs font-bold font-mono">@{l.profiles?.username}</span>
                                </div>
                            </td>
                            <td className="p-6 text-sm font-black italic text-primary">${l.price.toLocaleString()}</td>
                            <td className="p-6 text-right space-x-2">
                                <Link href={`/listing/${l.id}`} className="inline-flex p-2 hover:bg-muted rounded-lg transition-colors">
                                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                </Link>
                                <button className="inline-flex p-2 hover:bg-red-500/10 rounded-lg transition-colors text-red-500">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}
