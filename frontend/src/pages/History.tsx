import { motion } from 'framer-motion';
import { Clock, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useScanStore } from '@/store/scanStore';

const History = () => {
  const { scanHistory, setCurrentScan } = useScanStore();

  const handleViewResult = (scan: typeof scanHistory[0]) => {
    setCurrentScan(scan);
  };

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
            Scan History
          </h1>
          <p className="text-muted-foreground">
            View your previous crop diagnoses and treatment plans
          </p>
        </motion.div>

        {scanHistory.length === 0 ? (
          <motion.div
            className="glass-card p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-orbitron text-lg font-semibold text-foreground mb-2">
              No Scans Yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Start by scanning a leaf image to build your diagnosis history
            </p>
            <Link to="/dashboard">
              <Button variant="neon">Start Scanning</Button>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {scanHistory.map((scan, index) => (
              <motion.div
                key={scan.id}
                className="glass-card p-4 hover:border-primary/30 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={scan.imageUrl}
                      alt="Scanned leaf"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">
                      {scan.diseaseName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(scan.scannedAt).toLocaleDateString()} • {scan.confidence}% confidence
                    </p>
                    <span className={`
                      inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium
                      ${scan.severity === 'high' 
                        ? 'bg-destructive/20 text-destructive' 
                        : scan.severity === 'medium' 
                          ? 'bg-amber-500/20 text-amber-500'
                          : 'bg-primary/20 text-primary'
                      }
                    `}>
                      {scan.severity.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link to="/dashboard/results">
                      <Button
                        variant="glass"
                        size="sm"
                        onClick={() => handleViewResult(scan)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default History;
