import { create } from 'zustand';

export interface ScanResult {
  id: string;
  imageUrl: string;
  diseaseName: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  treatment: TreatmentStep[];
  dealers: Dealer[];
  scannedAt: Date;
}

export interface TreatmentStep {
  day: number;
  title: string;
  description: string;
  action: string;
  completed: boolean;
}

export interface Dealer {
  id: string;
  name: string;
  address: string;
  distance: string;
  hasStock: boolean;
  lat: number;
  lng: number;
}

interface ScanStore {
  currentScan: ScanResult | null;
  scanHistory: ScanResult[];
  isScanning: boolean;
  uploadedImage: string | null;
  language: 'ENG' | 'HIN' | 'MAR';
  setUploadedImage: (image: string | null) => void;
  setIsScanning: (scanning: boolean) => void;
  setCurrentScan: (scan: ScanResult) => void;
  addToHistory: (scan: ScanResult) => void;
  clearCurrentScan: () => void;
  setLanguage: (lang: 'ENG' | 'HIN' | 'MAR') => void;
}

export const useScanStore = create<ScanStore>((set) => ({
  currentScan: null,
  scanHistory: [],
  isScanning: false,
  uploadedImage: null,
  language: 'ENG',
  setUploadedImage: (image) => set({ uploadedImage: image }),
  setIsScanning: (scanning) => set({ isScanning: scanning }),
  setCurrentScan: (scan) => set({ currentScan: scan }),
  addToHistory: (scan) => set((state) => ({ 
    scanHistory: [scan, ...state.scanHistory] 
  })),
  clearCurrentScan: () => set({ currentScan: null, uploadedImage: null }),
  setLanguage: (lang) => set({ language: lang }),
}));

// Mock data generator
const translations: Record<string, Record<string, string>> = {
  diseaseName: {
    ENG: "Late Blight (Phytophthora infestans)",
    HIN: "लेट ब्लाइट (Phytophthora infestans)",
    MAR: "लेट ब्लाइट (Phytophthora infestans)",
  },
  urgentTitle: { ENG: 'Urgent Treatment', HIN: 'तत्काल उपचार', MAR: 'तत्काळ उपचार' },
  urgentDesc: { ENG: 'Apply fungicide immediately to prevent spread', HIN: 'फैलाव टाळण्यासाठी त्वरित कवकराशक लावा', MAR: 'रुगण्याचा प्रसार थांबवण्यासाठी ताबडतोब कवकरासक लावा' },
  followUpTitle: { ENG: 'Follow-up Application', HIN: 'पुनरावृत्ती अर्ज', MAR: 'पालक अर्ज' },
  followUpDesc: { ENG: 'Second application for complete coverage', HIN: 'संपूर्ण कव्हरेजसाठी दुसरा अर्ज', MAR: 'पूर्ण कव्हरणासाठी दुसरा अर्ज' },
  preventionTitle: { ENG: 'Prevention Protocol', HIN: 'प्रतिबंधक प्रोटोकॉल', MAR: 'प्रतिबंध प्रोटोकॉल' },
  preventionDesc: { ENG: 'Preventive measures and monitoring', HIN: 'प्रतिबंधात्मक उपाय आणि निरीक्षण', MAR: 'प्रतिबंधक उपाय आणि निरीक्षण' },
};

export const generateMockScanResult = (imageUrl: string, lang: 'ENG' | 'HIN' | 'MAR' = 'ENG'): ScanResult => ({
  id: crypto.randomUUID(),
  imageUrl,
  diseaseName: translations.diseaseName[lang] ?? translations.diseaseName.ENG,
  confidence: 94.7,
  severity: 'high',
  treatment: [
    {
      day: 1,
      title: translations.urgentTitle[lang] ?? translations.urgentTitle.ENG,
      description: translations.urgentDesc[lang] ?? translations.urgentDesc.ENG,
      action: "Spray Mancozeb - 2g/L water",
      completed: false,
    },
    {
      day: 3,
      title: translations.followUpTitle[lang] ?? translations.followUpTitle.ENG,
      description: translations.followUpDesc[lang] ?? translations.followUpDesc.ENG,
      action: "Apply Chlorothalonil - 1.5g/L water",
      completed: false,
    },
    {
      day: 7,
      title: translations.preventionTitle[lang] ?? translations.preventionTitle.ENG,
      description: translations.preventionDesc[lang] ?? translations.preventionDesc.ENG,
      action: "Apply Copper Oxychloride - 3g/L water",
      completed: false,
    },
  ],
  dealers: [
    {
      id: "1",
      name: "Krishi Seva Kendra",
      address: "Main Road, Pune",
      distance: "2.3 km",
      hasStock: true,
      lat: 18.5204,
      lng: 73.8567,
    },
    {
      id: "2",
      name: "Agro Chemicals Hub",
      address: "Market Yard, Pune",
      distance: "4.1 km",
      hasStock: true,
      lat: 18.5314,
      lng: 73.8446,
    },
    {
      id: "3",
      name: "Farm Solutions Center",
      address: "Highway Road, Pune",
      distance: "5.8 km",
      hasStock: false,
      lat: 18.5074,
      lng: 73.8077,
    },
  ],
  scannedAt: new Date(),
});
