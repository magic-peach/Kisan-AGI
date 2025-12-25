import { motion } from 'framer-motion';
import { Check, Clock, AlertTriangle, Beaker } from 'lucide-react';
import { TreatmentStep } from '@/store/scanStore';

interface TreatmentTimelineProps {
  steps: TreatmentStep[];
}

const TreatmentTimeline = ({ steps }: TreatmentTimelineProps) => {
  const getStepIcon = (day: number) => {
    switch (day) {
      case 1:
        return <AlertTriangle className="w-5 h-5" />;
      case 3:
        return <Beaker className="w-5 h-5" />;
      case 7:
        return <Clock className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getStepColor = (day: number) => {
    switch (day) {
      case 1:
        return 'from-destructive to-destructive/50';
      case 3:
        return 'from-amber-500 to-amber-500/50';
      case 7:
        return 'from-primary to-primary/50';
      default:
        return 'from-primary to-primary/50';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-orbitron text-lg font-semibold text-foreground flex items-center gap-2">
        <Clock className="w-5 h-5 text-primary" />
        7-Day Recovery Schedule
      </h3>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-destructive via-amber-500 to-primary" />
        
        <div className="space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.day}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15, duration: 0.4 }}
              className="relative flex gap-4"
            >
              {/* Timeline node */}
              <div className={`
                relative z-10 w-12 h-12 rounded-xl flex items-center justify-center
                bg-gradient-to-br ${getStepColor(step.day)}
                shadow-lg
              `}>
                {step.completed ? (
                  <Check className="w-5 h-5 text-primary-foreground" />
                ) : (
                  <span className="text-primary-foreground">{getStepIcon(step.day)}</span>
                )}
              </div>
              
              {/* Content card */}
              <div className="flex-1 glass-card p-4 hover:border-primary/30 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-orbitron text-sm font-semibold text-primary">
                    Day {step.day}
                  </span>
                  <span className={`
                    px-2 py-0.5 rounded-full text-xs font-medium
                    ${step.day === 1 
                      ? 'bg-destructive/20 text-destructive' 
                      : step.day === 3 
                        ? 'bg-amber-500/20 text-amber-500'
                        : 'bg-primary/20 text-primary'
                    }
                  `}>
                    {step.day === 1 ? 'Urgent' : step.day === 3 ? 'Follow-up' : 'Prevention'}
                  </span>
                </div>
                
                <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                
                <div className="flex items-center gap-2 p-3 rounded-lg bg-card/50 border border-border/50">
                  <Beaker className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground font-medium">{step.action}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TreatmentTimeline;
