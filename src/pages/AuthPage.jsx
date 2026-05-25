import { KeyRound, Mail, ShieldCheck, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useApp } from '../context/AppContext';

export function AuthPage() {
  const [mode, setMode] = useState('login');
  const [role, setRole] = useState('Farmer');
  const { notify } = useApp();
  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[.9fr_1.1fr]">
      <div>
        <p className="text-sm font-black uppercase tracking-wide text-leaf-600">Secure access</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950 dark:text-white">Welcome to your smart farming workspace</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400">Separate flows for login, registration, OTP verification, password reset, and role-based onboarding.</p>
      </div>
      <Card>
        <div className="mb-5 grid grid-cols-3 rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
          {['login', 'register', 'forgot'].map((item) => (
            <button key={item} onClick={() => setMode(item)} className={`rounded-lg px-3 py-2 text-sm font-bold capitalize ${mode === item ? 'bg-white shadow-sm dark:bg-slate-950' : ''}`}>
              {item === 'forgot' ? 'Reset' : item}
            </button>
          ))}
        </div>
        <div className="grid gap-4">
          {mode === 'register' && (
            <div>
              <label className="mb-2 block text-sm font-bold">Select role</label>
              <div className="grid gap-2 sm:grid-cols-3">
                {['Farmer', 'Agriculture Expert', 'Admin'].map((item) => (
                  <button key={item} onClick={() => setRole(item)} className={`rounded-lg border p-3 text-sm font-bold ${role === item ? 'border-leaf-600 bg-leaf-50 text-leaf-800 dark:bg-leaf-950' : 'border-slate-200 dark:border-white/10'}`}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
          <Field icon={Mail} label="Mobile number or email" type="text" />
          {mode !== 'forgot' && <Field icon={KeyRound} label="Password" type="password" />}
          <Field icon={ShieldCheck} label="OTP verification code" type="text" placeholder="Enter 6 digit OTP" />
          <Button onClick={() => notify('Authentication mock flow completed.')}>
            <UserPlus size={18} /> {mode === 'login' ? 'Login' : mode === 'register' ? 'Create account' : 'Send reset OTP'}
          </Button>
        </div>
      </Card>
    </section>
  );
}

function Field({ icon: Icon, label, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold">{label}</span>
      <span className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-3 dark:border-white/10 dark:bg-slate-950">
        <Icon size={18} className="text-leaf-600" />
        <input className="w-full bg-transparent outline-none" {...props} />
      </span>
    </label>
  );
}
