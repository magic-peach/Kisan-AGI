import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, ArrowLeft, Share2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/DashboardLayout';
import TreatmentTimeline from '@/components/TreatmentTimeline';
import DealerMap from '@/components/DealerMap';
import { useScanStore } from '@/store/scanStore';

const Results = () => {
  const navigate = useNavigate();
  const { currentScan, clearCurrentScan } = useScanStore();

  useEffect(() => {
    if (!currentScan) {
      navigate('/dashboard');
    }
  }, [currentScan, navigate]);

  if (!currentScan) {
    return null;
  }

  const handleNewScan = () => {
    clearCurrentScan();
    navigate('/dashboard');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'medium':
        return 'bg-amber-500/20 text-amber-500 border-amber-500/30';
      case 'low':
        return 'bg-primary/20 text-primary border-primary/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <Button
              variant="ghost"
              size="sm"
              className="mb-2 -ml-2"
              onClick={handleNewScan}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              New Scan
            </Button>
            <h1 className="font-orbitron text-2xl lg:text-3xl font-bold text-foreground">
              Analysis Results
            </h1>
          </div>
          
          <div className="flex gap-2">
            <Button variant="glass" size="sm">
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
            <Button variant="glass" size="sm">
              <Download className="w-4 h-4 mr-1" />
              Download
            </Button>
          </div>
        </motion.div>

        {/* Diagnosis Panel */}
        <motion.div
          className="glass-card-glow p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Image thumbnail */}
            <div className="lg:w-48 flex-shrink-0">
              <div className="relative rounded-xl overflow-hidden aspect-square">
                <img 
                  src={currentScan.imageUrl} 
                  alt="Scanned leaf" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border-2 border-primary/30 rounded-xl" />
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Scanned {new Date(currentScan.scannedAt).toLocaleDateString()}
              </p>
            </div>
            
            {/* Diagnosis info */}
            <div className="flex-1">
              <div className={`
                inline-flex items-center gap-2 px-4 py-2 rounded-xl border mb-4
                ${getSeverityColor(currentScan.severity)}
              `}>
                <AlertTriangle className="w-5 h-5" />
                <span className="font-semibold">Disease Detected</span>
              </div>
              
              <h2 className="font-orbitron text-xl lg:text-2xl font-bold text-foreground mb-2">
                {currentScan.diseaseName}
              </h2>
              
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Confidence: <span className="text-foreground font-semibold">{currentScan.confidence}%</span>
                  </span>
                </div>
                <div className={`
                  px-3 py-1 rounded-full text-xs font-medium
                  ${getSeverityColor(currentScan.severity)}
                `}>
                  {currentScan.severity.toUpperCase()} SEVERITY
                </div>
              </div>
              
              <p className="text-muted-foreground">
                This fungal disease affects crops during humid conditions. Immediate treatment 
                is recommended to prevent spread to healthy plants. Follow the 7-day recovery 
                schedule below for best results.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Treatment Timeline */}
        <motion.div
          className="glass-card p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <TreatmentTimeline steps={currentScan.treatment} />
        </motion.div>

        {/* Dealer Map */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <DealerMap dealers={currentScan.dealers} />
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Results;
