import { User, Bell, Shield, Globe, CreditCard, Save } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useToast } from '../components/Toast';

export default function Settings() {
  const { showToast } = useToast();
  const [activeNav, setActiveNav] = useState('Profile');
  const [preferences, setPreferences] = useState([
    { label: 'Dark Mode', desc: 'Use dark theme across the application', active: false },
    { label: 'Desktop Notifications', desc: 'Receive alerts even when the tab is closed', active: true },
    { label: 'Auto-save Processes', desc: 'Automatically save changes every 30 seconds', active: true },
  ]);

  const handleSave = () => {
    showToast('Settings saved successfully', 'success');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-primary font-headline">Settings</h2>
        <p className="text-on-surface-variant mt-1">Manage your account and application preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Settings Navigation */}
        <div className="md:col-span-4 space-y-1">
          {[
            { icon: User, label: 'Profile' },
            { icon: Bell, label: 'Notifications' },
            { icon: Shield, label: 'Security' },
            { icon: Globe, label: 'Integrations' },
            { icon: CreditCard, label: 'Billing' },
          ].map((item) => (
            <button 
              key={item.label}
              onClick={() => {
                setActiveNav(item.label);
                showToast(`Navigated to ${item.label} settings`, 'info');
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeNav === item.label ? 'bg-primary text-white shadow-md' : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="md:col-span-8 space-y-8">
          {activeNav === 'Profile' && (
            <>
              <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-xl shadow-sm border border-outline-variant/10">
                <h3 className="text-lg font-bold text-on-surface mb-6">Public Profile</h3>
                
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-primary/20">
                      <img 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxN_ncDV2npajKBaQ7O8ckxe2G0etIe1znfjhLKC9_uepnesTjgJ7FAwUUxI47ROj8O0bOO25aqFAtTJrDMM-4iHD00r6pgn5X3HeBXF2f5OstI0v60slg9jRd-w7NjoDJH4jsJraCCgeOtfyDKzwzEcROjMysAAzyFDvxUFCK2t0fl157grG_Y9BHjJW9-gckrn_I4niwU-1-LXH0BQrxk1Wi72vFg08uCI9zdLVUQX9BtH48gZxM0TrCIVIrLvtkUBTlfXDA6jc" 
                        alt="Profile"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => showToast('Profile photo upload started', 'info')}
                        className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:opacity-90 transition-all"
                      >
                        Change Photo
                      </button>
                      <button 
                        onClick={() => showToast('Profile photo removed', 'error')}
                        className="px-4 py-2 bg-surface-container-high text-on-surface text-xs font-bold rounded-lg hover:bg-surface-container-highest transition-all"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Full Name</label>
                      <input type="text" defaultValue="Alex Mercer" className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Email Address</label>
                      <input type="email" defaultValue="alex.mercer@automationhub.io" className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Bio</label>
                    <textarea rows={3} defaultValue="Operations Manager focused on scaling enterprise automation workflows." className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 resize-none" />
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-xl shadow-sm border border-outline-variant/10">
                <h3 className="text-lg font-bold text-on-surface mb-6">System Preferences</h3>
                <div className="space-y-4">
                  {preferences.map((pref, idx) => (
                    <div key={pref.label} className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm font-bold text-on-surface">{pref.label}</p>
                        <p className="text-xs text-on-surface-variant">{pref.desc}</p>
                      </div>
                      <button 
                        onClick={() => {
                          const newPrefs = [...preferences];
                          newPrefs[idx].active = !newPrefs[idx].active;
                          setPreferences(newPrefs);
                          showToast(`${pref.label} ${newPrefs[idx].active ? 'enabled' : 'disabled'}`, 'info');
                        }}
                        className={`w-10 h-5 rounded-full relative transition-colors ${pref.active ? 'bg-primary' : 'bg-slate-200'}`}
                      >
                        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${pref.active ? 'right-1' : 'left-1'}`}></div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeNav !== 'Profile' && (
            <div className="bg-surface-container-lowest p-12 rounded-xl shadow-sm border border-outline-variant/10 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <Settings size={32} />
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-2">{activeNav} Settings</h3>
              <p className="text-on-surface-variant max-w-xs mx-auto">This section is currently being optimized for your account. Please check back shortly.</p>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button className="px-6 py-3 text-sm font-bold text-on-surface-variant hover:text-on-surface transition-colors">Cancel</button>
            <button 
              onClick={handleSave}
              className="px-8 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 flex items-center gap-2 hover:opacity-90 transition-all"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
