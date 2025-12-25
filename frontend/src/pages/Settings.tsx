import { motion } from 'framer-motion';
import { User, Bell, Globe, Shield, HelpCircle } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="font-orbitron text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </motion.div>

        <div className="space-y-6">
          {/* Profile Section */}
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h2 className="font-orbitron text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Profile
            </h2>
            
            <div className="flex items-center gap-4 p-4 rounded-xl bg-card/50">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center neon-border">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Guest User</h3>
                <p className="text-sm text-muted-foreground">guest@kisan-agi.com</p>
              </div>
              <Button variant="glass" className="ml-auto">
                Edit Profile
              </Button>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h2 className="font-orbitron text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notifications
            </h2>
            
            <div className="space-y-4">
              {[
                { label: 'Push Notifications', desc: 'Receive alerts for scan results' },
                { label: 'Email Updates', desc: 'Weekly crop health summaries' },
                { label: 'Treatment Reminders', desc: 'Get reminded about scheduled treatments' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-card/50">
                  <div>
                    <h4 className="font-medium text-foreground">{item.label}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Language */}
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <h2 className="font-orbitron text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Language
            </h2>
            
            <div className="grid grid-cols-3 gap-3">
              {[
                { code: 'ENG', label: 'English', active: true },
                { code: 'HIN', label: 'हिंदी', active: false },
                { code: 'MAR', label: 'मराठी', active: false },
              ].map((lang) => (
                <button
                  key={lang.code}
                  className={`
                    p-4 rounded-xl text-center transition-all
                    ${lang.active 
                      ? 'bg-primary/20 border border-primary/50 text-primary' 
                      : 'bg-card/50 border border-border hover:border-primary/30 text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  <span className="font-orbitron font-semibold block">{lang.code}</span>
                  <span className="text-xs">{lang.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Help */}
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <h2 className="font-orbitron text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              Help & Support
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-3">
              <Button variant="glass" className="justify-start h-auto p-4">
                <div className="text-left">
                  <span className="font-semibold block">Documentation</span>
                  <span className="text-xs text-muted-foreground">Learn how to use Kisan-AGI</span>
                </div>
              </Button>
              <Button variant="glass" className="justify-start h-auto p-4">
                <div className="text-left">
                  <span className="font-semibold block">Contact Support</span>
                  <span className="text-xs text-muted-foreground">Get help from our team</span>
                </div>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
