import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Image, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScanStore, ScanResult } from '@/store/scanStore';
import { diagnoseImage, getDealers } from '@/services/api';

interface FileUploadProps {
  onFileSelect?: (file: File) => void;
}

const FileUploadBtn = ({ onFileSelect }: FileUploadProps) => {
  const navigate = useNavigate();
  const {
    uploadedImage,
    setUploadedImage,
    isScanning,
    setIsScanning,
    setCurrentScan,
    addToHistory
  } = useScanStore();
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const result = reader.result as string;
        setPreview(result);
        setUploadedImage(result);
        onFileSelect?.(file);

        // --- START DIAGNOSIS FLOW ---
        setIsScanning(true);

        try {
          console.log("🚀 Starting diagnosis...");

          // 1. Call Diagnose API
          const diagnosis = await diagnoseImage(file);
          console.log("✅ Diagnosis received:", diagnosis);

          // 2. Get User Location (or default to Mumbai)
          let lat = 19.0760;
          let lng = 72.8777;

          try {
            const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
            });
            lat = pos.coords.latitude;
            lng = pos.coords.longitude;
            console.log("📍 Location acquired:", lat, lng);
          } catch (e) {
            console.warn("⚠️ Location access denied/timeout. Using default.");
          }

          // 3. Fetch Dealers based on recommendation
          console.log("🏪 Fetching dealers for:", diagnosis.recommended_product);
          const dealersData = await getDealers(lat, lng, diagnosis.recommended_product);

          // 4. Map Data to Store Format
          const scanResult: ScanResult = {
            id: crypto.randomUUID(),
            imageUrl: result,
            diseaseName: diagnosis.disease_name,
            confidence: diagnosis.confidence_score,
            severity: diagnosis.confidence_score > 80 ? 'high' : 'medium',
            treatment: diagnosis.timeline.map((step, index) => ({
              day: parseInt(step.day.replace(/\D/g, '')) || (index * 5 + 1),
              title: step.title,
              description: step.detail,
              action: step.detail,
              completed: false
            })),
            dealers: dealersData.map((d: any) => ({
              id: d._id || d.google_place_id,
              name: d.name,
              address: d.address,
              distance: "Calculating...",
              hasStock: d.stock.includes(diagnosis.recommended_product),
              lat: d.location.coordinates[1],
              lng: d.location.coordinates[0]
            })),
            scannedAt: new Date()
          };

          // 5. Update Store & Navigate
          setCurrentScan(scanResult);
          addToHistory(scanResult);
          setIsScanning(false);
          navigate('/results');

        } catch (error) {
          console.error("❌ Scan failed:", error);
          setIsScanning(false);
          alert("Diagnosis failed. Please check the console for details.");
        }
      };
      reader.readAsDataURL(file);
    }
  }, [onFileSelect, setUploadedImage, setIsScanning, setCurrentScan, addToHistory, navigate]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    disabled: isScanning,
  });

  const clearImage = () => {
    setPreview(null);
    setUploadedImage(null);
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!preview ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div
              {...getRootProps()}
              className={`
                relative overflow-hidden cursor-pointer
                border-2 border-dashed rounded-2xl p-12
                transition-all duration-300
                ${isDragActive
                  ? 'border-primary bg-primary/10 shadow-neon'
                  : 'border-border hover:border-primary/50 hover:bg-card/50'
                }
                ${isScanning ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <input {...getInputProps()} />

              {/* Animated background gradient */}
              <div className="absolute inset-0 glow-gradient opacity-50" />

              <div className="relative flex flex-col items-center gap-6">
                <motion.div
                  className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center neon-border"
                  animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Upload className="w-10 h-10 text-primary" />
                </motion.div>

                <div className="text-center">
                  <h3 className="text-xl font-orbitron font-semibold text-foreground mb-2">
                    {isDragActive ? 'Drop your image here' : 'Drag & Drop Leaf Image'}
                  </h3>
                  <p className="text-muted-foreground">
                    or <span className="text-primary font-medium">click to browse</span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Supports: JPG, PNG, WEBP
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative rounded-2xl overflow-hidden glass-card-glow"
          >
            <img
              src={preview}
              alt="Uploaded leaf"
              className="w-full h-64 object-cover"
            />

            {/* Scanning overlay */}
            {isScanning && (
              <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center gap-4">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                      className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
                      animate={{ y: [0, 256, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                    <p className="mt-4 font-orbitron text-primary">Analyzing...</p>
                  </div>
                </div>
              </div>
            )}

            {!isScanning && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 bg-background/80 hover:bg-destructive hover:text-destructive-foreground"
                onClick={clearImage}
              >
                <X className="w-5 h-5" />
              </Button>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent">
              <div className="flex items-center gap-2 text-primary">
                <Image className="w-4 h-4" />
                <span className="text-sm font-medium">Image uploaded successfully</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUploadBtn;
