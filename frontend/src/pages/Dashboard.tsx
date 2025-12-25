import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mic, Activity, Leaf, TrendingUp, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/DashboardLayout';
import FileUploadBtn from '@/components/FileUploadBtn';
import { useScanStore, generateMockScanResult } from '@/store/scanStore';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const { uploadedImage, isScanning, setIsScanning, setCurrentScan, addToHistory, language } = useScanStore();

  const handleSubmit = async () => {
    if (!uploadedImage) {
      toast({
        title: "No image uploaded",
        description: "Please upload a leaf image to analyze",
        variant: "destructive",
      });
      return;
    }
    // Basic validation: check if image likely contains plant (green pixel heuristic)
    setIsScanning(true);

    const isPlant = await (async () => {
      try {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        const loaded = new Promise<void>((res, rej) => {
          img.onload = () => res();
          img.onerror = () => rej();
        });
        img.src = uploadedImage as string;
        await loaded;

        const canvas = document.createElement('canvas');
        const max = 300;
        const w = img.width;
        const h = img.height;
        const scale = Math.max(1, Math.max(w / max, h / max));
        canvas.width = Math.round(w / scale);
        canvas.height = Math.round(h / scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) return false;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let greenCount = 0;
        let total = 0;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          total++;
          // simple green detection using RGB comparisons
          if (g > 80 && g > r + 15 && g > b + 15) greenCount++;
        }
        const ratio = greenCount / total;
        return ratio > 0.02; // if >2% of pixels are strongly green
      } catch (e) {
        return false;
      }
    })();

    if (!isPlant) {
      setIsScanning(false);
      toast({
        title: "Invalid Image",
        description: "Uploaded image doesn't look like a crop leaf. Please upload a clear leaf image.",
        variant: "destructive",
      });
      return;
    }

    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));

    const result = generateMockScanResult(uploadedImage, language);
    setCurrentScan(result);
    addToHistory(result);
    setIsScanning(false);

    toast({
      title: "Analysis Complete",
      description: "Disease detected. Viewing results...",
    });

    navigate('/dashboard/results');
  };

  const handleVoiceCommand = () => {
    toast({
      title: "Voice Assistant",
      description: "Voice commands coming soon...",
    });
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
            Crop Health Scanner
          </h1>
          <p className="text-muted-foreground">
            Upload a leaf image to detect diseases and get treatment recommendations
          </p>
        </motion.div>

        {/* Health Status Gauge */}
        <motion.div
          className="glass-card-glow p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-orbitron text-lg font-semibold text-foreground flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Crop Health Status
            </h2>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-500 text-sm font-medium">
              Awaiting Scan
            </span>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Scans Today', value: '0', icon: Leaf, color: 'text-primary' },
              { label: 'Health Score', value: '--', icon: TrendingUp, color: 'text-muted-foreground' },
              { label: 'Alerts', value: '0', icon: AlertCircle, color: 'text-amber-500' },
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 rounded-xl bg-card/50">
                <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                <div className="font-orbitron text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upload Zone */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <FileUploadBtn />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Button
            variant="neon"
            size="xl"
            className="flex-1 h-16 text-lg"
            onClick={handleSubmit}
            disabled={isScanning || !uploadedImage}
          >
            {isScanning ? (
              <>
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Analyzing...
              </>
            ) : (
              'Submit & Analyze'
            )}
          </Button>
          
          <Button
            variant="glass"
            size="xl"
            className="sm:w-16 h-16"
            onClick={handleVoiceCommand}
          >
            <Mic className="w-6 h-6" />
          </Button>
        </motion.div>

        {/* Quick Tips */}
        <motion.div
          className="mt-8 glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <h3 className="font-orbitron text-sm font-semibold text-foreground mb-4">
            Tips for Best Results
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Capture clear, well-lit images of affected leaves
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Include both healthy and diseased parts if visible
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Avoid blurry or dark images for accurate diagnosis
            </li>
          </ul>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
