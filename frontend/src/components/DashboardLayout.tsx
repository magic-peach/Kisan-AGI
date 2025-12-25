import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Scan, History, Settings, Leaf } from 'lucide-react';
import Navbar from '@/components/Navbar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const navItems = [
  { icon: Home, label: 'Home', path: '/dashboard' },
  { icon: Scan, label: 'Scan', path: '/dashboard' },
  { icon: History, label: 'History', path: '/dashboard/history' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 min-h-[calc(100vh-4rem)] bg-sidebar border-r border-sidebar-border">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center neon-border">
                <Leaf className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-orbitron font-semibold text-foreground">Dashboard</h2>
                <p className="text-xs text-muted-foreground">Crop Health Monitor</p>
              </div>
            </div>
            
            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || 
                  (item.path === '/dashboard' && location.pathname === '/dashboard/results');
                
                return (
                  <Link key={item.path + item.label} to={item.path}>
                    <motion.div
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                        ${isActive 
                          ? 'bg-primary/10 text-primary border border-primary/30' 
                          : 'text-muted-foreground hover:bg-sidebar-accent hover:text-foreground'
                        }
                      `}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </nav>
          </div>
          
          {/* Sidebar footer */}
          <div className="mt-auto p-6">
            <div className="glass-card-glow p-4">
              <h4 className="font-orbitron text-sm font-semibold text-foreground mb-2">
                Need Help?
              </h4>
              <p className="text-xs text-muted-foreground mb-3">
                Contact our support team for assistance with diagnosis.
              </p>
              <Link 
                to="#" 
                className="text-xs text-primary font-medium hover:underline"
              >
                Get Support →
              </Link>
            </div>
          </div>
        </aside>
        
        {/* Mobile bottom navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-border/50">
          <div className="flex items-center justify-around py-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path ||
                (item.path === '/dashboard' && location.pathname === '/dashboard/results');
              
              return (
                <Link key={item.path + item.label} to={item.path}>
                  <motion.div
                    className={`
                      flex flex-col items-center gap-1 px-4 py-2 rounded-xl
                      ${isActive ? 'text-primary' : 'text-muted-foreground'}
                    `}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-xs font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </nav>
        
        {/* Main content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)] pb-20 lg:pb-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
