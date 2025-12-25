import { useState } from 'react';
import { useScanStore } from '@/store/scanStore';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const languages = [
  { code: 'ENG', label: 'English' },
  { code: 'HIN', label: 'हिंदी' },
  { code: 'MAR', label: 'मराठी' },
];

const Navbar = () => {
  const { language, setLanguage } = useScanStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center neon-border"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-primary font-orbitron font-bold text-sm">K</span>
            </motion.div>
            <span className="font-orbitron font-bold text-xl neon-text">
              Kisan-AGI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/" active={isActive('/')}>Home</NavLink>
            <NavLink to="/dashboard" active={isActive('/dashboard')}>Dashboard</NavLink>
            <NavLink to="/dashboard/results" active={isActive('/dashboard/results')}>Results</NavLink>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="hidden sm:flex items-center gap-1 text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                >
                  <span className="font-mono text-sm">{language}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="glass-card border-border/50">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as any)}
                    className={`cursor-pointer ${language === lang.code ? 'text-primary' : ''}`}
                  >
                    <span className="font-mono mr-2">{lang.code}</span>
                    <span className="text-muted-foreground">{lang.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile Icon */}
            <Button 
              variant="ghost" 
              size="icon"
              className="hidden sm:flex hover:bg-secondary/50 hover:text-primary"
            >
              <User className="w-5 h-5" />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden py-4 border-t border-border/50"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex flex-col gap-2">
              <MobileNavLink to="/" onClick={() => setMobileMenuOpen(false)}>Home</MobileNavLink>
              <MobileNavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</MobileNavLink>
              <MobileNavLink to="/dashboard/results" onClick={() => setMobileMenuOpen(false)}>Results</MobileNavLink>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

const NavLink = ({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) => (
  <Link to={to}>
    <motion.span
      className={`relative text-sm font-medium transition-colors ${
        active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
      }`}
      whileHover={{ scale: 1.05 }}
    >
      {children}
      {active && (
        <motion.div
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
          layoutId="navbar-indicator"
        />
      )}
    </motion.span>
  </Link>
);

const MobileNavLink = ({ to, onClick, children }: { to: string; onClick: () => void; children: React.ReactNode }) => (
  <Link 
    to={to} 
    onClick={onClick}
    className="px-4 py-2 text-muted-foreground hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors"
  >
    {children}
  </Link>
);

export default Navbar;
