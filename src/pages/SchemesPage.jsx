import { MapPin, Phone, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { getSchemesAndExperts } from '../services/api';

export function SchemesPage() {
  const [data, setData] = useState(null);
  useEffect(() => { getSchemesAndExperts().then(setData); }, []);
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-wide text-leaf-600">Nearby Experts & Government Schemes</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950 dark:text-white">Find help around your farm</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_.9fr]">
        <Card>
          <h2 className="mb-4 text-xl font-black dark:text-white">Interactive map UI</h2>
          <div className="relative h-[420px] overflow-hidden rounded-lg bg-[linear-gradient(135deg,#dff3d9,#f5ead5)]">
            <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(#9bbf91_1px,transparent_1px),linear-gradient(90deg,#9bbf91_1px,transparent_1px)] [background-size:54px_54px]" />
            {[[28, 34], [62, 45], [47, 68]].map(([left, top], index) => (
              <span key={index} style={{ left: `${left}%`, top: `${top}%` }} className="absolute grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-leaf-600 text-white shadow-soft">
                <MapPin />
              </span>
            ))}
          </div>
        </Card>
        <div className="grid gap-4">
          {(data?.experts || []).map((expert) => (
            <Card key={expert.name}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black dark:text-white">{expert.name}</h2>
                  <p className="text-sm text-slate-500">{expert.type} · {expert.distance}</p>
                  <p className="mt-2 flex items-center gap-1 font-bold text-amber-600"><Star size={17} fill="currentColor" /> {expert.rating}</p>
                </div>
                <Button variant="secondary"><Phone size={17} /> Contact</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {(data?.schemes || []).map((scheme) => (
          <Card key={scheme.title}>
            <p className="text-sm font-black uppercase tracking-wide text-leaf-600">{scheme.status}</p>
            <h2 className="mt-2 text-xl font-black dark:text-white">{scheme.title}</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">{scheme.benefit}</p>
            <Button variant="secondary" className="mt-4 w-full">View subsidy details</Button>
          </Card>
        ))}
      </div>
    </section>
  );
}
