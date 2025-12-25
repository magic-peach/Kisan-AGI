import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Scan, Calendar, MapPin, Leaf, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SplineHero from '@/components/SplineHero';
import Navbar from '@/components/Navbar';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <SplineHero />
        
        <div className="relative z-10 container mx-auto px-4 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-6">
                AI-Powered Crop Intelligence
              </span>
            </motion.div>
            
            <motion.h1
              className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              The{' '}
              <span className="neon-text">Autonomous</span>
              <br />
              Agronomist
            </motion.h1>
            
            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Advanced AI diagnosis for crop diseases. Get instant analysis, 
              personalized 7-day recovery plans, and connect with local dealers 
              for verified treatments.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link to="/dashboard">
                <Button variant="neon" size="xl" className="group">
                  Launch Dashboard
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="cyber" size="xl">
                Watch Demo
              </Button>
            </motion.div>
            
            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-4 md:gap-8 mt-16 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {[
                { value: '50+', label: 'Diseases Detected' },
                { value: '95%', label: 'Accuracy Rate' },
                { value: '10K+', label: 'Farmers Helped' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-orbitron text-2xl md:text-3xl font-bold neon-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-1">
            <motion.div
              className="w-1.5 h-3 rounded-full bg-primary"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>
      
      {/* Features Grid */}
      <section className="py-24 relative">
        <div className="absolute inset-0 glow-gradient opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-foreground mb-4">
              Intelligent <span className="neon-text">Features</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Advanced technology designed for modern agriculture
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Scan,
                title: 'Vision Diagnosis',
                description: 'Upload a leaf image and get instant AI-powered disease detection with confidence scores.',
                gradient: 'from-primary/20 to-primary/5',
              },
              {
                icon: Calendar,
                title: '7-Day Recovery Plan',
                description: 'Receive step-by-step treatment schedules tailored to your crops specific condition.',
                gradient: 'from-amber-500/20 to-amber-500/5',
              },
              {
                icon: MapPin,
                title: 'Local Maps Connectivity',
                description: 'Find verified nearby dealers with real-time stock information for treatments.',
                gradient: 'from-blue-500/20 to-blue-500/5',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="glass-card-glow p-8 group hover:scale-[1.02] transition-transform duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-orbitron text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How it works */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It <span className="neon-text">Works</span>
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', icon: Leaf, title: 'Capture', desc: 'Take a photo of the affected leaf' },
              { step: '02', icon: Zap, title: 'Analyze', desc: 'AI processes and identifies the disease' },
              { step: '03', icon: Shield, title: 'Diagnose', desc: 'Receive detailed diagnosis and plan' },
              { step: '04', icon: MapPin, title: 'Connect', desc: 'Find local dealers for treatment' },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative inline-block mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h4 className="font-orbitron font-semibold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
                
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 glow-gradient" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to <span className="neon-text">Protect</span> Your Crops?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of farmers using AI-powered diagnostics to improve crop health and yield.
            </p>
            <Link to="/dashboard">
              <Button variant="neon" size="xl" className="group">
                Start Free Scan
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-orbitron font-bold text-xl neon-text">Kisan-AGI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Kisan-AGI. Empowering farmers with AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
