import { motion } from 'framer-motion';

export function Card({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35 }}
      className={`rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-slate-900 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function StatCard({ icon: Icon, label, value }) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <span className="rounded-lg bg-leaf-100 p-3 text-leaf-700 dark:bg-white/10 dark:text-leaf-200">
          <Icon size={22} />
        </span>
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
          <p className="text-2xl font-bold text-slate-950 dark:text-white">{value}</p>
        </div>
      </div>
    </Card>
  );
}
