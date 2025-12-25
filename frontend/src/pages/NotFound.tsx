import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="absolute inset-0 glow-gradient opacity-30" />
      
      <motion.div
        className="text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-primary/10 flex items-center justify-center neon-border">
          <AlertTriangle className="w-12 h-12 text-primary" />
        </div>
        
        <h1 className="font-orbitron text-6xl md:text-8xl font-bold neon-text mb-4">
          404
        </h1>
        
        <h2 className="font-orbitron text-xl md:text-2xl font-semibold text-foreground mb-4">
          Page Not Found
        </h2>
        
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved to a different location.
        </p>
        
        <Link to="/">
          <Button variant="neon" size="lg" className="group">
            <Home className="w-5 h-5 mr-2" />
            Return Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
