import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, Download, RefreshCw, Moon, Sun, ChevronLeft, ChevronRight, Heart, Battery, Wifi, Signal, Flashlight, Camera } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";


const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

// Theme presets
// const THEMES = [
//   {
//     name: "Tech Blue",
//     colors: {
//       bgcolor: '0f172a',
//       passedcolor: '3b82f6',
//       currentcolor: '60a5fa', // Blue-400
//       futurecolor: '1e293b',
//       textcolor: 'e2e8f0'
//     }
//   },
//   {
//     name: "Cyberpunk Violet",
//     colors: {
//       bgcolor: '111827',
//       passedcolor: '6366f1',
//       currentcolor: 'a78bfa', // Violet-400
//       futurecolor: '1f2937',
//       textcolor: 'f3f4f6'
//     }
//   },
//   {
//     name: "Healthcare Green",
//     colors: {
//       bgcolor: '14181c',
//       passedcolor: '10b981',
//       currentcolor: '34d399', // Emerald-400
//       futurecolor: '1f2937',
//       textcolor: 'd1fae5'
//     }
//   },
//   {
//     name: "Industrial Steel",
//     colors: {
//       bgcolor: '1e293b',
//       passedcolor: '64748b',
//       currentcolor: 'cbd5e1', // Slate-300
//       futurecolor: '334155',
//       textcolor: 'f1f5f9'
//     }
//   },
//   {
//     name: "Finance Navy",
//     colors: {
//       bgcolor: '0c1222',
//       passedcolor: '2563eb',
//       currentcolor: '60a5fa', // Blue-400
//       futurecolor: '1e2939',
//       textcolor: 'dbeafe'
//     }
//   },
//   {
//     name: "Legal Ivory",
//     colors: {
//       bgcolor: 'fafaf9',
//       passedcolor: '57534e',
//       currentcolor: 'a8a29e', // Stone-400
//       futurecolor: 'e7e5e4',
//       textcolor: '1c1917'
//     }
//   },
//   {
//     name: "Construction Amber",
//     colors: {
//       bgcolor: 'fafaf9',
//       passedcolor: 'a16207',
//       currentcolor: 'facc15', // Yellow-400
//       futurecolor: 'f5f5f4',
//       textcolor: '422006'
//     }
//   },
//   {
//     name: "Wine & Hospitality",
//     colors: {
//       bgcolor: '1c0f13',
//       passedcolor: '9f1239',
//       currentcolor: 'fb7185', // Rose-400
//       futurecolor: '2d1619',
//       textcolor: 'ffe4e6'
//     }
//   },
//   {
//     name: "Ocean Maritime",
//     colors: {
//       bgcolor: '0f1419',
//       passedcolor: '0891b2',
//       currentcolor: '22d3ee', // Cyan-400
//       futurecolor: '1e2832',
//       textcolor: 'cffafe'
//     }
//   },
//   {
//     name: "Banking Emerald",
//     colors: {
//       bgcolor: '0c1713',
//       passedcolor: '059669',
//       currentcolor: '34d399', // Emerald-400
//       futurecolor: '1a2c23',
//       textcolor: 'd1fae5'
//     }
//   },
//   {
//     name: "Aviation Indigo",
//     colors: {
//       bgcolor: '1e1b4b',
//       passedcolor: '6366f1',
//       currentcolor: 'a5b4fc', // Indigo-300
//       futurecolor: '312e81',
//       textcolor: 'e0e7ff'
//     }
//   },
//   {
//     name: "Fashion Rose",
//     colors: {
//       bgcolor: '1f1315',
//       passedcolor: 'e11d48',
//       currentcolor: 'fb7185', // Rose-400
//       futurecolor: '3a1f24',
//       textcolor: 'ffe4e6'
//     }
//   },
//   {
//     name: "Café Espresso",
//     colors: {
//       bgcolor: '1c1410',
//       passedcolor: '92400e',
//       currentcolor: 'fbbf24', // Amber-400
//       futurecolor: '322218',
//       textcolor: 'fef3c7'
//     }
//   },
//   {
//     name: "Automotive Steel",
//     colors: {
//       bgcolor: '18181b',
//       passedcolor: '52525b',
//       currentcolor: 'a1a1aa', // Zinc-400
//       futurecolor: '27272a',
//       textcolor: 'fafafa'
//     }
//   },
//   {
//     name: "Medical White",
//     colors: {
//       bgcolor: 'ffffff',
//       passedcolor: '475569',
//       currentcolor: '3b82f6', // Blue-500 (Prominent override)
//       futurecolor: 'f1f5f9',
//       textcolor: '0f172a'
//     }
//   },
//   {
//     name: "Battlefield Orange",
//     colors: {
//       bgcolor: '1c1510',
//       passedcolor: 'd97706',
//       currentcolor: 'fbbf24', // Amber-400
//       futurecolor: '312318',
//       textcolor: 'fef3c7'
//     }
//   },
//   {
//     name: "Gaming Violet",
//     colors: {
//       bgcolor: '1e1329',
//       passedcolor: '7c3aed',
//       currentcolor: 'a78bfa', // Violet-400
//       futurecolor: '2e1f40',
//       textcolor: 'ede9fe'
//     }
//   },
//   {
//     name: "Cloud Computing",
//     colors: {
//       bgcolor: 'f0f9ff',
//       passedcolor: '0284c7',
//       currentcolor: '38bdf8', // Sky-400
//       futurecolor: 'e0f2fe',
//       textcolor: '0c4a6e'
//     }
//   },
//   {
//     name: "Luxury Gold",
//     colors: {
//       bgcolor: '18130c',
//       passedcolor: 'ca8a04',
//       currentcolor: 'facc15', // Yellow-400
//       futurecolor: '2a2313',
//       textcolor: 'fef9c3'
//     }
//   },
//   {
//     name: "Emergency Red",
//     colors: {
//       bgcolor: '1a0a0a',
//       passedcolor: 'b91c1c',
//       currentcolor: 'ef4444', // Red-500
//       futurecolor: '2d1414',
//       textcolor: 'fef2f2'
//     }
//   }
// ];
const THEMES = [
  {
    name: "CalWall Default",
    emoji: "🛠️",
    colors: {
      bgcolor: '131314', // Zinc-900
      passedcolor: '555555', // Zinc-400
      currentcolor: 'd87943', // Amber-400
      futurecolor: '888888', // Zinc-800
      textcolor: 'd87943',
      targetcolor: 'ef4444' // Primary
    }
  },
  {
    name: "Tech Blue",
    emoji: "💻",
    colors: {
      bgcolor: '0a0e1a',
      passedcolor: '4f7cff',
      currentcolor: '7c9eff',
      futurecolor: '1a1f2e',
      textcolor: 'e8f0ff'
    }
  },
  {
    name: "Cyberpunk Violet",
    emoji: "🌆",
    colors: {
      bgcolor: '0d0a1f',
      passedcolor: '8b5cf6',
      currentcolor: 'a78bfa',
      futurecolor: '1e1733',
      textcolor: 'f3e8ff'
    }
  },
  {
    name: "Healthcare Green",
    emoji: "🏥",
    colors: {
      bgcolor: '0a1613',
      passedcolor: '14e8a6',
      currentcolor: '5eead4',
      futurecolor: '1a2c27',
      textcolor: 'ccfbf1'
    }
  },
  {
    name: "Industrial Steel",
    emoji: "🏗️",
    colors: {
      bgcolor: '12151a',
      passedcolor: '94a3b8',
      currentcolor: 'cbd5e1',
      futurecolor: '1e2329',
      textcolor: 'f1f5f9'
    }
  },
  {
    name: "Finance Navy",
    emoji: "💼",
    colors: {
      bgcolor: '070d1a',
      passedcolor: '3b82f6',
      currentcolor: '60a5fa',
      futurecolor: '151d2e',
      textcolor: 'dbeafe'
    }
  },
  {
    name: "Legal Ivory",
    emoji: "⚖️",
    colors: {
      bgcolor: 'fefdfb',
      passedcolor: '78716c',
      currentcolor: 'a8a29e',
      futurecolor: 'f5f3f0',
      textcolor: '292524'
    }
  },
  {
    name: "Construction Amber",
    emoji: "🏗️",
    colors: {
      bgcolor: 'fffbf5',
      passedcolor: 'f59e0b',
      currentcolor: 'fbbf24',
      futurecolor: 'fef3e2',
      textcolor: '78350f'
    }
  },
  {
    name: "Wine & Hospitality",
    emoji: "🍷",
    colors: {
      bgcolor: '1a0b0f',
      passedcolor: 'fb7185',
      currentcolor: 'fda4af',
      futurecolor: '2e1519',
      textcolor: 'ffe4e6'
    }
  },
  {
    name: "Ocean Maritime",
    emoji: "⚓",
    colors: {
      bgcolor: '0a1419',
      passedcolor: '22d3ee',
      currentcolor: '67e8f9',
      futurecolor: '1a2832',
      textcolor: 'cffafe'
    }
  },
  {
    name: "Banking Emerald",
    emoji: "🏦",
    colors: {
      bgcolor: '091713',
      passedcolor: '10b981',
      currentcolor: '34d399',
      futurecolor: '1a2c23',
      textcolor: 'd1fae5'
    }
  },
  {
    name: "Aviation Indigo",
    emoji: "✈️",
    colors: {
      bgcolor: '151333',
      passedcolor: '818cf8',
      currentcolor: 'a5b4fc',
      futurecolor: '2a2557',
      textcolor: 'e0e7ff'
    }
  },
  {
    name: "Fashion Rose",
    emoji: "👗",
    colors: {
      bgcolor: '1f0f16',
      passedcolor: 'f43f5e',
      currentcolor: 'fb7185',
      futurecolor: '3d1e29',
      textcolor: 'ffe4e6'
    }
  },
  {
    name: "Café Espresso",
    emoji: "☕",
    colors: {
      bgcolor: '1a1108',
      passedcolor: 'ea862d',
      currentcolor: 'fb923c',
      futurecolor: '332212',
      textcolor: 'ffedd5'
    }
  },
  {
    name: "Automotive Steel",
    emoji: "🚗",
    colors: {
      bgcolor: '0f1114',
      passedcolor: '71717a',
      currentcolor: 'a1a1aa',
      futurecolor: '1f2225',
      textcolor: 'fafafa'
    }
  },
  {
    name: "Medical White",
    emoji: "🏥",
    colors: {
      bgcolor: 'ffffff',
      passedcolor: '64748b',
      currentcolor: '94a3b8',
      futurecolor: 'f1f5f9',
      textcolor: '1e293b'
    }
  },
  {
    name: "Battlefield Orange",
    emoji: "🎖️",
    colors: {
      bgcolor: '1c140a',
      passedcolor: 'ff8a3d',
      currentcolor: 'ffb347',
      futurecolor: '33250f',
      textcolor: 'fff7ed'
    }
  },
  {
    name: "Gaming Violet",
    emoji: "🎮",
    colors: {
      bgcolor: '1a0f2e',
      passedcolor: '9333ea',
      currentcolor: 'a855f7',
      futurecolor: '2e1a4d',
      textcolor: 'f3e8ff'
    }
  },
  {
    name: "Cloud Computing",
    emoji: "☁️",
    colors: {
      bgcolor: 'f5fbff',
      passedcolor: '0ea5e9',
      currentcolor: '38bdf8',
      futurecolor: 'e0f2fe',
      textcolor: '075985'
    }
  },
  {
    name: "Luxury Gold",
    emoji: "💎",
    colors: {
      bgcolor: '1a1408',
      passedcolor: 'fbbf24',
      currentcolor: 'fcd34d',
      futurecolor: '332612',
      textcolor: 'fef9c3'
    }
  },
  {
    name: "Emergency Red",
    emoji: "🚨",
    colors: {
      bgcolor: '1a0808',
      passedcolor: 'ef4444',
      currentcolor: 'f87171',
      futurecolor: '2e1414',
      textcolor: 'fee2e2'
    }
  }
];
// iOS Device Presets
const IOS_DEVICES = [
  { name: "iPhone 16 Pro Max", width: 1320, height: 2868 },
  { name: "iPhone 16 Pro", width: 1206, height: 2622 },
  { name: "iPhone 16 Plus", width: 1290, height: 2796 },
  { name: "iPhone 16", width: 1179, height: 2556 },
  { name: "iPhone 15 Pro Max", width: 1290, height: 2796 },
  { name: "iPhone 15 Pro", width: 1179, height: 2556 },
  { name: "iPhone 15 Plus", width: 1290, height: 2796 },
  { name: "iPhone 15", width: 1179, height: 2556 },
  { name: "iPhone 14 Pro Max", width: 1290, height: 2796 },
  { name: "iPhone 14 Pro", width: 1179, height: 2556 },
  { name: "iPhone 14 Plus", width: 1284, height: 2778 },
  { name: "iPhone 14", width: 1170, height: 2532 },
  { name: "iPhone 13 Pro Max", width: 1284, height: 2778 },
  { name: "iPhone 13 Pro", width: 1170, height: 2532 },
  { name: "iPhone 13", width: 1170, height: 2532 },
  { name: "iPhone 13 mini", width: 1080, height: 2340 },
  { name: "iPhone 12 Pro Max", width: 1284, height: 2778 },
  { name: "iPhone 12 Pro", width: 1170, height: 2532 },
  { name: "iPhone 12", width: 1170, height: 2532 },
  { name: "iPhone 12 mini", width: 1080, height: 2340 },
  { name: "iPhone 11 Pro Max", width: 1242, height: 2688 },
  { name: "iPhone 11 Pro", width: 1125, height: 2436 },
  { name: "iPhone 11", width: 828, height: 1792 },
  { name: "iPhone XS Max", width: 1242, height: 2688 },
  { name: "iPhone XS", width: 1125, height: 2436 },
  { name: "iPhone XR", width: 828, height: 1792 },
  { name: "iPhone X", width: 1125, height: 2436 },
  { name: "iPhone 8 Plus", width: 1080, height: 1920 },
  { name: "iPhone 8", width: 750, height: 1334 },
  { name: "iPhone SE (3rd gen)", width: 750, height: 1334 },
  { name: "iPhone SE (2nd gen)", width: 750, height: 1334 },
];

// Android Device Presets
const ANDROID_DEVICES = [
  { name: "Samsung Galaxy S24 Ultra", width: 1440, height: 3120 },
  { name: "Samsung Galaxy S24+", width: 1440, height: 3120 },
  { name: "Samsung Galaxy S24", width: 1080, height: 2340 },

  { name: "Samsung Galaxy S23 Ultra", width: 1440, height: 3088 },
  { name: "Samsung Galaxy S23+", width: 1080, height: 2340 },
  { name: "Samsung Galaxy S23", width: 1080, height: 2340 },

  { name: "Samsung Galaxy S22 Ultra", width: 1440, height: 3088 },
  { name: "Samsung Galaxy S22+", width: 1080, height: 2340 },
  { name: "Samsung Galaxy S22", width: 1080, height: 2340 },

  { name: "Samsung Galaxy S21 Ultra", width: 1440, height: 3200 },
  { name: "Samsung Galaxy S21+", width: 1080, height: 2400 },
  { name: "Samsung Galaxy S21", width: 1080, height: 2400 },

  { name: "Samsung Galaxy Z Fold 5", width: 1812, height: 2176 },
  { name: "Samsung Galaxy Z Flip 5", width: 1080, height: 2640 },
  { name: "Samsung Galaxy Z Fold 4", width: 1812, height: 2176 },
  { name: "Samsung Galaxy Z Flip 4", width: 1080, height: 2640 },

  { name: "Google Pixel 8 Pro", width: 1344, height: 2992 },
  { name: "Google Pixel 8", width: 1080, height: 2400 },
  { name: "Google Pixel 7 Pro", width: 1440, height: 3120 },
  { name: "Google Pixel 7", width: 1080, height: 2400 },
  { name: "Google Pixel 6 Pro", width: 1440, height: 3120 },
  { name: "Google Pixel 6", width: 1080, height: 2400 },

  { name: "OnePlus 12", width: 1440, height: 3168 },
  { name: "OnePlus 11", width: 1440, height: 3216 },
  { name: "OnePlus 10 Pro", width: 1440, height: 3216 },
  { name: "OnePlus 9 Pro", width: 1440, height: 3216 },

  { name: "Xiaomi 14 Pro", width: 1440, height: 3200 },
  { name: "Xiaomi 13 Pro", width: 1440, height: 3200 },
  { name: "Xiaomi 12 Pro", width: 1440, height: 3200 },

  { name: "Oppo Find X6 Pro", width: 1440, height: 3216 },
  { name: "Oppo Find X5 Pro", width: 1440, height: 3216 },

  { name: "Vivo X100 Pro", width: 1260, height: 2800 },
  { name: "Vivo X90 Pro", width: 1260, height: 2800 },

  { name: "Motorola Edge 40 Pro", width: 1080, height: 2400 },
  { name: "Motorola Edge 30 Pro", width: 1080, height: 2400 },

  { name: "Sony Xperia 1 V", width: 1644, height: 3840 },
  { name: "Sony Xperia 5 V", width: 1080, height: 2520 },

  { name: "Asus ROG Phone 7", width: 1080, height: 2448 },
  { name: "Asus Zenfone 10", width: 1080, height: 2400 },

  { name: "Nothing Phone (2)", width: 1080, height: 2400 },
  { name: "Nothing Phone (1)", width: 1080, height: 2400 }
];


// Common Timezones
const TIMEZONES = [
  { name: "UTC-12:00 (Baker Island)", offset: -12 },
  { name: "UTC-11:00 (American Samoa)", offset: -11 },
  { name: "UTC-10:00 (Hawaii)", offset: -10 },
  { name: "UTC-09:00 (Alaska)", offset: -9 },
  { name: "UTC-08:00 (Pacific Time)", offset: -8 },
  { name: "UTC-07:00 (Mountain Time)", offset: -7 },
  { name: "UTC-06:00 (Central Time)", offset: -6 },
  { name: "UTC-05:00 (Eastern Time)", offset: -5 },
  { name: "UTC-04:00 (Atlantic Time)", offset: -4 },
  { name: "UTC-03:00 (Buenos Aires)", offset: -3 },
  { name: "UTC-02:00 (Mid-Atlantic)", offset: -2 },
  { name: "UTC-01:00 (Azores)", offset: -1 },
  { name: "UTC+00:00 (London, UTC)", offset: 0 },
  { name: "UTC+01:00 (Paris, Berlin)", offset: 1 },
  { name: "UTC+02:00 (Cairo, Athens)", offset: 2 },
  { name: "UTC+03:00 (Moscow, Istanbul)", offset: 3 },
  { name: "UTC+04:00 (Dubai)", offset: 4 },
  { name: "UTC+05:00 (Pakistan)", offset: 5 },
  { name: "UTC+05:30 (India)", offset: 5.5 },
  { name: "UTC+06:00 (Bangladesh)", offset: 6 },
  { name: "UTC+07:00 (Bangkok)", offset: 7 },
  { name: "UTC+08:00 (Singapore, Beijing)", offset: 8 },
  { name: "UTC+09:00 (Tokyo, Seoul)", offset: 9 },
  { name: "UTC+10:00 (Sydney)", offset: 10 },
  { name: "UTC+11:00 (Solomon Islands)", offset: 11 },
  { name: "UTC+12:00 (Fiji, New Zealand)", offset: 12 },
  { name: "UTC+13:00 (Tonga)", offset: 13 },
  { name: "UTC+14:00 (Line Islands)", offset: 14 },
];

export default function App() {
  const canvasRef = useRef(null);
  const deviceSearchRef = useRef(null);


  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if user has a preference saved
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return JSON.parse(saved);
    // Otherwise check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // State for wallpaper customization
  // Default Config
  const defaultConfig = {
    width: 1080,
    height: 2400,
    mode: 'month',
    timezone: 5,
    paddingtop: 0,
    paddingbottom: 0,
    paddingleft: 0,
    paddingright: 0,
    bgcolor: '131314', // Zinc-900
    passedcolor: '555555', // Zinc-400
    currentcolor: 'd87943', // Amber-400
    futurecolor: '888888', // Zinc-800
    textcolor: 'd87943',
    targetcolor: 'ef4444', // Primary
    cols: 15,
    dotradius: 1.0,
    useTarget: false,
    targetDate: '',
    targetTitle: '',
    targetShape: 'circle'
  };

  // State for wallpaper customization ( Persisted )
  const [config, setConfig] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('calwallConfig');
      if (saved) {
        try {
          // Merge with default to ensure new fields (like targetShape) exist if loading old config
          return { ...defaultConfig, ...JSON.parse(saved) };
        } catch (e) {
          console.error('Failed to parse saved config', e);
        }
      }
    }
    return defaultConfig;
  });

  const [wallpaperUrl, setWallpaperUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carouselApi, setCarouselApi] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const [selectedDevice, setSelectedDevice] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedDevice') || '';
    }
    return '';
  });

  const [selectedTheme, setSelectedTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedTheme') || '';
    }
    return '';
  });
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewSrc, setPreviewSrc] = useState('');

  // Platform selection state (iOS or Android)
  const [selectedPlatform, setSelectedPlatform] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedPlatform') || 'ios';
    }
    return 'ios';
  });

  // Device search state
  const [deviceSearchQuery, setDeviceSearchQuery] = useState('');
  const [showDeviceDropdown, setShowDeviceDropdown] = useState(false);


  // Track carousel changes
  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      setCurrentStep(carouselApi.selectedScrollSnap());
    };

    carouselApi.on('select', onSelect);
    onSelect(); // Set initial value

    return () => {
      carouselApi.off('select', onSelect);
    };
  }, [carouselApi]);

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  // Persist User Configuration
  useEffect(() => {
    localStorage.setItem('calwallConfig', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('selectedDevice', selectedDevice);
  }, [selectedDevice]);

  useEffect(() => {
    localStorage.setItem('selectedTheme', selectedTheme);
  }, [selectedTheme]);

  useEffect(() => {
    localStorage.setItem('selectedPlatform', selectedPlatform);
  }, [selectedPlatform]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (deviceSearchRef.current && !deviceSearchRef.current.contains(event.target)) {
        setShowDeviceDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);


  // Handle device selection (works for both iOS and Android)
  const handleDeviceChange = (deviceIndex) => {
    setSelectedDevice(deviceIndex);
    if (deviceIndex === '') return;

    const deviceList = selectedPlatform === 'ios' ? IOS_DEVICES : ANDROID_DEVICES;
    const device = deviceList[parseInt(deviceIndex)];

    if (device) {
      // Calculate responsive padding using iPhone 11 as reference (Height: 1792, Top: 450, Bottom: 100)
      const refHeight = 1792;
      const refTop = selectedPlatform === 'ios' ? 450 : 150; // Android uses less top padding
      const refBottom = 100;

      const paddingTop = Math.round((device.height / refHeight) * refTop);
      const paddingBottom = Math.round((device.height / refHeight) * refBottom);

      setConfig(prev => ({
        ...prev,
        width: device.width,
        height: device.height,
        // If in month mode, preserve the user's manual padding or existing padding
        // Otherwise (Year mode), apply the preset's padding to clear the clock (approx 450px)
        paddingtop: prev.mode === 'month' ? prev.paddingtop : paddingTop,
        paddingbottom: paddingBottom
      }));
      toast.success(`Applied ${device.name} preset`);
    }
  };

  // Get current device list and filter based on search
  const currentDeviceList = selectedPlatform === 'ios' ? IOS_DEVICES : ANDROID_DEVICES;
  const filteredDevices = deviceSearchQuery.trim()
    ? currentDeviceList.filter(device =>
      device.name.toLowerCase().includes(deviceSearchQuery.toLowerCase())
    )
    : [];


  // Base API URL
  const API_BASE = SERVER_URL;

  // Generate wallpaper URL (only for copying/downloading)
  const generateApiUrl = () => {
    const params = new URLSearchParams();
    Object.entries(config).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params.append(key, value);
      }
    });
    const endpoint = config.useTarget ? 'getTargetCalWall' : 'getCalWall';
    return `${API_BASE}/api/wallpaper/${endpoint}?${params.toString()}`;
  };

  // Update URL when config changes
  useEffect(() => {
    setWallpaperUrl(generateApiUrl());
  }, [config]);

  // Draw wallpaper on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set canvas size
    const displayWidth = 288; // iPhone display width in the UI
    const displayHeight = displayWidth * (config.height / config.width);
    canvas.width = config.width;
    canvas.height = config.height;
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    // Calculate days with timezone adjustment
    const now = new Date();
    const localTime = new Date(now.getTime() + (config.timezone * 60 * 60 * 1000));

    let totalDays, daysPassed, title;

    if (config.useTarget && config.targetDate) {
      let startDate;
      if (config.mode === 'month') {
        startDate = new Date(localTime.getFullYear(), localTime.getMonth(), 1);
      } else {
        startDate = new Date(localTime.getFullYear(), 0, 1);
      }

      const targetDate = new Date(config.targetDate);
      if (!isNaN(targetDate.getTime())) {
        const diffTime = targetDate - startDate;
        totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        const diffPassed = localTime - startDate;
        daysPassed = Math.floor(diffPassed / (1000 * 60 * 60 * 24)) + 1;

        if (daysPassed < 1) daysPassed = 1;
        title = config.targetTitle || 'Target Goal';
      } else {
        totalDays = 30; // Fallback
        daysPassed = 1;
        title = 'Invalid Date';
      }
    } else if (config.mode === 'month') {
      const nextMonth = new Date(localTime.getFullYear(), localTime.getMonth() + 1, 1);
      const thisMonth = new Date(localTime.getFullYear(), localTime.getMonth(), 1);
      totalDays = Math.floor((nextMonth - thisMonth) / (1000 * 60 * 60 * 24));
      daysPassed = localTime.getDate();
      title = localTime.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } else {
      const isLeapYear = (localTime.getFullYear() % 4 === 0 &&
        (localTime.getFullYear() % 100 !== 0 || localTime.getFullYear() % 400 === 0));
      totalDays = isLeapYear ? 366 : 365;

      const startOfYear = new Date(localTime.getFullYear(), 0, 1);
      daysPassed = Math.ceil((localTime - startOfYear) / (1000 * 60 * 60 * 24)) + 1;
      title = `Year ${localTime.getFullYear()}`;
    }

    // Calculate days left
    const daysLeft = totalDays - daysPassed;
    const percentComplete = Math.floor((daysPassed / totalDays) * 100);

    // Grid layout
    const rows = Math.ceil(totalDays / config.cols);

    // Auto-layout: Calculate available space after padding
    const availableWidth = config.width - config.paddingleft - config.paddingright;
    const availableHeight = config.height - config.paddingtop - config.paddingbottom;

    // Reserve space for text at bottom (font size + spacing)
    const estimatedFontSize = Math.floor(config.width / 25);
    const textReservedSpace = estimatedFontSize * 3; // Font size + spacing above and below

    // Calculate maximum spacing that fits in both width and height
    const maxSpacingWidth = Math.floor(availableWidth / (config.cols + 1));
    const maxSpacingHeight = Math.floor((availableHeight - textReservedSpace) / (rows + 1));

    // Use the smaller of the two to ensure it fits in both dimensions
    const spacing = Math.min(maxSpacingWidth, maxSpacingHeight);

    // Calculate dot size based on spacing (with radius multiplier)
    const baseDotSize = Math.floor(spacing * 0.6); // 60% of spacing
    const dotSize = baseDotSize * config.dotradius;

    // Calculate actual grid dimensions
    const gridWidth = config.cols * spacing;
    const gridHeight = rows * spacing;

    // Center the grid within available space
    const startX = config.paddingleft + Math.floor((availableWidth - gridWidth) / 2);
    const startY = config.paddingtop + Math.floor((availableHeight - gridHeight - textReservedSpace) / 2);

    // Background
    ctx.fillStyle = `#${config.bgcolor}`;
    ctx.fillRect(0, 0, config.width, config.height);

    // Draw Shape Helper
    const drawShape = (ctx, x, y, size, shape, color) => {
      ctx.fillStyle = color;
      ctx.beginPath();

      switch (shape) {
        case 'square':
          ctx.rect(x - size / 2, y - size / 2, size, size);
          break;
        case 'diamond':
          ctx.moveTo(x, y - size / 2);
          ctx.lineTo(x + size / 2, y);
          ctx.lineTo(x, y + size / 2);
          ctx.lineTo(x - size / 2, y);
          ctx.closePath();
          break;
        case 'star':
          const spikes = 5;
          const outerRadius = size / 2;
          const innerRadius = size / 4;
          let rot = Math.PI / 2 * 3;
          let cx = x;
          let cy = y;
          let step = Math.PI / spikes;

          ctx.moveTo(cx, cy - outerRadius);
          for (let i = 0; i < spikes; i++) {
            cx = x + Math.cos(rot) * outerRadius;
            cy = y + Math.sin(rot) * outerRadius;
            ctx.lineTo(cx, cy);
            rot += step;

            cx = x + Math.cos(rot) * innerRadius;
            cy = y + Math.sin(rot) * innerRadius;
            ctx.lineTo(cx, cy);
            rot += step;
          }
          ctx.lineTo(x, y - outerRadius);
          ctx.closePath();
          break;
        case 'circle':
        default:
          ctx.arc(x, y, size / 2, 0, Math.PI * 2);
          break;
      }
      ctx.fill();
    };

    // Draw dots
    for (let i = 0; i < totalDays; i++) {
      const row = Math.floor(i / config.cols);
      const col = i % config.cols;
      const x = startX + col * spacing + spacing / 2;
      const y = startY + row * spacing + spacing / 2;

      const isTargetDot = config.useTarget && (i === totalDays - 1);
      let dotColor;

      if (isTargetDot) {
        dotColor = `#${config.targetcolor}`;
      } else {
        if (i < daysPassed - 1) {
          // Passed days
          dotColor = `#${config.passedcolor}`;
        } else if (i === daysPassed - 1) {
          // Current day
          dotColor = `#${config.currentcolor}`;
        } else {
          // Future days
          dotColor = `#${config.futurecolor}`;
        }
      }

      if (daysPassed > totalDays && !isTargetDot) {
        dotColor = `#${config.passedcolor}`;
      }

      // Draw Dot or Shape
      if (isTargetDot) {
        // Target Shape Logic
        drawShape(ctx, x, y, dotSize * 1.2, config.targetShape, dotColor);
      } else {
        // Standard Circle
        drawShape(ctx, x, y, dotSize, 'circle', dotColor);
      }
    }

    // Set font for bottom text
    ctx.fillStyle = `#${config.textcolor}`;
    const fontSize = Math.floor(config.width / 25);
    ctx.font = `${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 1. Draw "Days Left • %" immediately below grid (standard position)
    // Always show this info, even in Target Mode
    const bottomY = startY + gridHeight + Math.floor(textReservedSpace / 2);
    const infoText = `${daysLeft}d left • ${percentComplete}%`;
    ctx.fillText(infoText, config.width / 2, bottomY);

    // 2. Draw Target Title if in Target Mode
    if (config.useTarget && config.targetTitle) {
      const safeBottomY = config.height - config.paddingbottom - (fontSize * 1.5);
      const titleY = Math.max(safeBottomY, bottomY + fontSize * 2);
      ctx.font = `${Math.floor(fontSize * 1.2)}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
      ctx.fillText(config.targetTitle, config.width / 2, titleY);
    }

    setPreviewSrc(canvas.toDataURL());

  }, [config]);

  // Handle input changes with validation
  const handleChange = (key, value) => {
    // Validation rules
    switch (key) {
      case 'width':
        const width = parseInt(value);
        if (isNaN(width) || width <= 0) {
          toast.error('Width must be greater than 0');
          return;
        }
        break;

      case 'height':
        const height = parseInt(value);
        if (isNaN(height) || height <= 0) {
          toast.error('Height must be greater than 0');
          return;
        }
        break;

      case 'cols':
        const cols = parseInt(value);
        if (isNaN(cols) || cols < 1) {
          toast.error('Columns must be at least 1');
          return;
        }
        if (cols > 15) {
          toast.error('Columns cannot exceed 15');
          return;
        }
        break;

      case 'timezone':
        const tz = parseFloat(value);
        if (isNaN(tz) || tz < -12 || tz > 14) {
          toast.error('Timezone must be between -12 and +14');
          return;
        }
        break;

      case 'dotradius':
        const radius = parseFloat(value);
        if (isNaN(radius) || radius < 0.1) {
          toast.error('Dot size must be at least 0.1');
          return;
        }
        if (radius > 5) {
          toast.error('Dot size cannot exceed 5');
          return;
        }
        break;

      case 'paddingtop':
      case 'paddingbottom':
      case 'paddingleft':
      case 'paddingright':
        const padding = parseInt(value);
        if (isNaN(padding) || padding < 0) {
          toast.error('Padding must be 0 or greater');
          return;
        }
        if (padding > 2000) {
          toast.error('Padding cannot exceed 2000 pixels');
          return;
        }
        break;

      case 'bgcolor':
      case 'passedcolor':
      case 'currentcolor':
      case 'futurecolor':
      case 'textcolor':
      case 'targetcolor':
        // Validate hex color (without #)
        const hexPattern = /^[0-9A-Fa-f]{6}$/;
        if (!hexPattern.test(value)) {
          toast.error('Color must be a valid 6-digit hex code (e.g., ff0000)');
          return;
        }
        break;

      case 'mode':
        // If switching mode while a device is selected, adjust padding
        if (selectedDevice !== '') {
          const device = IOS_DEVICES[parseInt(selectedDevice)];
          if (device) {
            const refHeight = 1792;
            // If switching to Month, use smaller top padding (e.g. 150)
            // If switching to Year, restore larger top padding (e.g. 450)
            const refTop = value === 'month' ? 150 : 450;
            const newPaddingTop = Math.round((device.height / refHeight) * refTop);

            setConfig(prev => ({ ...prev, [key]: value, paddingtop: newPaddingTop }));
            return;
          }
        }
        break;
    }

    setConfig(prev => ({ ...prev, [key]: value }));
  };

  // Handle theme selection
  const applyTheme = (themeIndex) => {
    setSelectedTheme(themeIndex);
    if (themeIndex === '') return; // "Select a theme" option
    const theme = THEMES[parseInt(themeIndex)];
    if (theme) {
      setConfig(prev => ({
        ...prev,
        ...theme.colors
      }));
      toast.success(`Applied ${theme.name} theme`);
    }
  };

  // Copy URL to clipboard
  // Copy URL to clipboard
  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(wallpaperUrl);
        toast.success('URL copied to clipboard!');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        throw new Error('Clipboard API unavailable');
      }
    } catch (err) {
      // Fallback for non-secure contexts (mobile dev)
      try {
        const textArea = document.createElement("textarea");
        textArea.value = wallpaperUrl;

        // Ensure it's not visible but part of DOM
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);

        textArea.focus();
        textArea.select();

        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);

        if (successful) {
          toast.success('URL copied to clipboard!');
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } else {
          toast.error('Press Long on URL to copy manually');
        }
      } catch (fallbackErr) {
        toast.error('Press Long on URL to copy manually');
      }
    }
  };

  // Download wallpaper from canvas
  const downloadWallpaper = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      toast.error('Canvas not ready');
      return;
    }

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `calwall-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success('Wallpaper downloaded successfully!');
    }, 'image/png');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 h-12 sm:h-14 md:h-16 flex items-center justify-between">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-primary tracking-tight">
            CalWall
          </h1>
          <Button
            onClick={toggleDarkMode}
            variant="outline"
            size="icon"
            className="shrink-0 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            )}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-6 md:py-12">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Side - Device Preview (Hidden on Mobile) */}
          <div className="hidden lg:flex flex-col items-center justify-center">
            <Card className="w-full max-w-md bg-card/50 backdrop-blur-sm border-border/50 shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Live Preview</CardTitle>
                <CardDescription>Your wallpaper updates in real-time</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center p-8 space-y-4">
                {/* Device Frame */}
                <div className="relative">
                  {/* Phone Frame */}
                  <div className="relative bg-gradient-to-br from-muted to-muted-foreground/20 rounded-[3rem] p-3 shadow-2xl">
                    {/* Notch (only show for modern devices) */}
                    {selectedPlatform === 'ios' && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-muted-foreground/30 rounded-b-3xl z-10" />
                    )}

                    {/* Screen - Dynamic aspect ratio based on selected device */}
                    <div
                      className="relative bg-white dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden w-64 shadow-inner flex items-center justify-center group"
                      style={{
                        aspectRatio: `${config.width} / ${config.height}`
                      }}
                    >
                      {/* Canvas Wallpaper */}
                      <canvas
                        ref={canvasRef}
                        className="max-w-full max-h-full object-cover"
                      />

                      {/* iOS Lock Screen Overlay (Desktop Preview - Small Scale) */}
                      <div className="absolute inset-0 pointer-events-none z-20 flex flex-col text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {/* Status Bar */}
                        <div className="pt-3 px-5 flex justify-between items-center">
                          <span className="text-[10px] font-semibold tracking-wide ml-1">9:41</span>
                          <div className="flex items-center gap-1 mr-1">
                            <Signal className="w-3 h-3 fill-current" />
                            <Wifi className="w-3 h-3" />
                            <Battery className="w-3.5 h-3.5 fill-current" />
                          </div>
                        </div>

                        {/* Clock & Date */}
                        <div className="mt-12 flex flex-col items-center drop-shadow-md">
                          <span className="text-[10px] font-medium opacity-90">Monday, January 14</span>
                          <span className="text-6xl font-bold tracking-tighter leading-none font-sans">9:41</span>
                        </div>

                        <div className="flex-1" />

                        {/* Bottom Buttons */}
                        <div className="px-6 mb-4 flex justify-between items-end w-full">
                          <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                            <Flashlight className="w-4 h-4 text-white fill-white/20" />
                          </div>
                          <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                            <Camera className="w-4 h-4 text-white fill-white/20" />
                          </div>
                        </div>

                        {/* Home Bar */}
                        <div className="w-full flex justify-center pb-2">
                          <div className="w-24 h-1 bg-white rounded-full opacity-60" />
                        </div>
                      </div>
                    </div>

                    {/* Side Buttons */}
                    <div className="absolute -left-1 top-24 w-1 h-8 bg-muted-foreground/40 rounded-l" />
                    <div className="absolute -left-1 top-36 w-1 h-12 bg-muted-foreground/40 rounded-l" />
                    <div className="absolute -left-1 top-52 w-1 h-12 bg-muted-foreground/40 rounded-l" />
                    <div className="absolute -right-1 top-32 w-1 h-16 bg-muted-foreground/40 rounded-r" />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-6 justify-center">
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="default"
                          size="sm"
                          className="gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Set Wallpaper
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[90vw] sm:max-w-xl md:max-w-2xl max-h-[85vh] flex flex-col p-0 gap-0" showCloseButton={false}>
                        <DialogHeader className="shrink-0 border-b border-border bg-muted/30 px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-5 relative">
                          {/* Close Button - Inside header */}
                          <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute right-2 top-2 sm:right-3 sm:top-3 md:right-4 md:top-4 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full hover:bg-muted transition-colors flex items-center justify-center group"
                            aria-label="Close"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-muted-foreground group-hover:text-foreground transition-colors sm:w-5 sm:h-5"
                            >
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </button>

                          <DialogTitle className="text-base sm:text-lg md:text-xl font-bold flex items-center gap-2 pr-8 sm:pr-10">
                            <Download className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                            Set Up Your Dynamic Wallpaper
                          </DialogTitle>
                          <DialogDescription className="text-xs sm:text-sm mt-1">
                            Follow these steps to automatically update your {selectedPlatform === 'ios' ? 'iPhone' : 'Android'} wallpaper
                          </DialogDescription>
                        </DialogHeader>

                        <div className="flex-1 overflow-y-auto px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4">
                          <Carousel setApi={setCarouselApi} className="w-full">
                            <CarouselContent>
                              {/* Step 1: Configuration */}
                              <CarouselItem>
                                <Card className="border-0 shadow-none">
                                  <CardHeader className="p-1.5 sm:p-2 md:p-3 pb-1 sm:pb-1.5">
                                    <CardTitle className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm md:text-base">
                                      <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary text-primary-foreground text-[9px] sm:text-[10px] font-bold">1</span>
                                      Configuration
                                    </CardTitle>
                                    <CardDescription className="text-[9px] sm:text-[10px]">Review your settings</CardDescription>
                                  </CardHeader>
                                  <CardContent className="space-y-1.5 sm:space-y-2 md:space-y-2.5 p-1.5 sm:p-2 md:p-3 pt-0">
                                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2 p-2 sm:p-2.5 md:p-3 bg-muted rounded-lg text-xs sm:text-sm">
                                      <div>
                                        <Label className="text-muted-foreground text-xs">Style</Label>
                                        <p className="font-semibold capitalize">{config.mode}</p>
                                      </div>
                                      <div>
                                        <Label className="text-muted-foreground text-xs">Size</Label>
                                        <p className="font-semibold">{config.width}×{config.height}</p>
                                      </div>
                                      <div>
                                        <Label className="text-muted-foreground text-xs">Cols</Label>
                                        <p className="font-semibold">{config.cols}</p>
                                      </div>
                                      <div>
                                        <Label className="text-muted-foreground text-xs">UTC</Label>
                                        <p className="font-semibold">{config.timezone > 0 ? '+' : ''}{config.timezone}</p>
                                      </div>
                                    </div>

                                    <div className="space-y-0.5 sm:space-y-1">
                                      <Label className="text-muted-foreground text-[9px] sm:text-xs">Colors</Label>
                                      <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2 p-1.5 sm:p-2 bg-muted rounded-lg">
                                        <div className="flex items-center gap-1.5">
                                          <div className="w-5 h-5 rounded border border-border" style={{ backgroundColor: `#${config.bgcolor}` }} />
                                          <span className="text-[10px]">BG</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                          <div className="w-5 h-5 rounded border border-border" style={{ backgroundColor: `#${config.passedcolor}` }} />
                                          <span className="text-[10px]">Pass</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                          <div className="w-5 h-5 rounded border border-border" style={{ backgroundColor: `#${config.currentcolor}` }} />
                                          <span className="text-[10px]">Now</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                          <div className="w-5 h-5 rounded border border-border" style={{ backgroundColor: `#${config.futurecolor}` }} />
                                          <span className="text-[10px]">Next</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                          <div className="w-5 h-5 rounded border border-border" style={{ backgroundColor: `#${config.textcolor}` }} />
                                          <span className="text-[10px]">Text</span>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="p-2 sm:p-2.5 md:p-3 bg-primary/10 border border-primary/20 rounded-lg">
                                      <p className="text-[9px] sm:text-xs text-foreground">
                                        Updates based on your {config.mode === 'month' ? 'monthly' : 'yearly'} progress.
                                      </p>
                                    </div>
                                  </CardContent>
                                </Card>
                              </CarouselItem>

                              {/* Step 2: Platform-Specific Automation */}
                              <CarouselItem>
                                <Card className="border-0 shadow-none">
                                  <CardHeader className="p-1.5 sm:p-2 md:p-3 pb-1 sm:pb-1.5">
                                    <CardTitle className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm md:text-base">
                                      <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary text-primary-foreground text-[9px] sm:text-[10px] font-bold">2</span>
                                      {selectedPlatform === 'ios' ? 'iPhone Automation' : 'Install MacroDroid'}
                                    </CardTitle>
                                    <CardDescription className="text-[9px] sm:text-[10px]">
                                      {selectedPlatform === 'ios' ? 'Set up automatic updates' : 'Download automation app'}
                                    </CardDescription>
                                  </CardHeader>
                                  <CardContent className="space-y-1.5 sm:space-y-2 md:space-y-2.5 p-1.5 sm:p-2 md:p-3 pt-0">
                                    {selectedPlatform === 'ios' ? (
                                      <ol className="space-y-1 sm:space-y-1.5 md:space-y-2">
                                        <li className="flex gap-1.5 sm:gap-2">
                                          <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary/20 text-primary text-[9px] sm:text-xs font-bold shrink-0">1</span>
                                          <div>
                                            <p className="font-semibold text-[10px] sm:text-xs md:text-sm">Open Shortcuts App</p>
                                            <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground">Find app on iPhone</p>
                                          </div>
                                        </li>
                                        <li className="flex gap-2">
                                          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-bold shrink-0">2</span>
                                          <div>
                                            <p className="font-semibold text-sm">Create Automation</p>
                                            <p className="text-xs text-muted-foreground">"Automation" → "+" → "Personal Automation"</p>
                                          </div>
                                        </li>
                                        <li className="flex gap-2">
                                          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-bold shrink-0">3</span>
                                          <div>
                                            <p className="font-semibold text-sm">Select "Time of Day"</p>
                                            <p className="text-xs text-muted-foreground">Pick a time (e.g. 12:00 AM)</p>
                                          </div>
                                        </li>
                                        <li className="flex gap-2">
                                          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-bold shrink-0">4</span>
                                          <div>
                                            <p className="font-semibold text-sm">Run Immediately</p>
                                            <p className="text-xs text-muted-foreground">Toggle ON "Run Immediately"</p>
                                          </div>
                                        </li>
                                        <li className="flex gap-2">
                                          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-bold shrink-0">5</span>
                                          <div>
                                            <p className="font-semibold text-sm">New Shortcut</p>
                                            <p className="text-xs text-muted-foreground">Tap "New Blank Automation"</p>
                                          </div>
                                        </li>
                                      </ol>
                                    ) : (
                                      <div className="space-y-3">
                                        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                                          <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-2">Install MacroDroid</p>
                                          <p className="text-xs text-muted-foreground mb-3">Install MacroDroid from Google Play Store to automate wallpaper updates</p>
                                          <Button
                                            onClick={() => window.open('https://play.google.com/store/apps/details?id=com.arlosoft.macrodroid', '_blank')}
                                            variant="default"
                                            size="sm"
                                            className="w-full gap-2"
                                          >
                                            <Download className="w-3 h-3" />
                                            Open Play Store
                                          </Button>
                                        </div>
                                        <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                                          <p className="text-xs">
                                            <strong>Note:</strong> After installing, return here to continue setup
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>
                              </CarouselItem>

                              {/* Step 3: Copy URL */}
                              <CarouselItem>
                                <Card className="border-0 shadow-none">
                                  <CardHeader className="p-1.5 sm:p-2 md:p-3 pb-1 sm:pb-1.5">
                                    <CardTitle className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm md:text-base">
                                      <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary text-primary-foreground text-[9px] sm:text-[10px] font-bold">3</span>
                                      Copy URL
                                    </CardTitle>
                                    <CardDescription className="text-[9px] sm:text-[10px]">Generated from your settings</CardDescription>
                                  </CardHeader>
                                  <CardContent className="space-y-1.5 sm:space-y-2 md:space-y-2.5 p-1.5 sm:p-2 md:p-3 pt-0">
                                    <div className="space-y-2">
                                      <Label className="text-xs">Wallpaper URL</Label>
                                      <div className="flex gap-2">
                                        <Input
                                          value={wallpaperUrl}
                                          readOnly
                                          className="font-mono text-[10px] h-8"
                                        />
                                        <Button
                                          onClick={copyToClipboard}
                                          variant="outline"
                                          size="icon"
                                          className="shrink-0 h-8 w-8"
                                        >
                                          {copied ? (
                                            <Check className="w-3 h-3 text-green-500" />
                                          ) : (
                                            <Copy className="w-3 h-3" />
                                          )}
                                        </Button>
                                      </div>
                                    </div>

                                    <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                                      <p className="text-xs">
                                        <strong>Tip:</strong> Copy this URL now for the next step!
                                      </p>
                                    </div>
                                  </CardContent>
                                </Card>
                              </CarouselItem>

                              {/* Step 4 (Android Only): Setup Macro */}
                              {selectedPlatform === 'android' && (
                                <CarouselItem>
                                  <Card className="border-0 shadow-none">
                                    <CardHeader className="p-1.5 sm:p-2 md:p-3 pb-1 sm:pb-1.5">
                                      <CardTitle className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm md:text-base">
                                        <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary text-primary-foreground text-[9px] sm:text-[10px] font-bold">4</span>
                                        Setup Macro
                                      </CardTitle>
                                      <CardDescription className="text-[9px] sm:text-[10px]">Configure MacroDroid automation</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-1.5 sm:space-y-2 md:space-y-2.5 p-1.5 sm:p-2 md:p-3 pt-0">
                                      <ol className="space-y-1 sm:space-y-1.5 md:space-y-2">
                                        <li className="flex gap-2">
                                          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-bold shrink-0">1</span>
                                          <div>
                                            <p className="font-semibold text-sm">Add Macro</p>
                                            <p className="text-xs text-muted-foreground">Open MacroDroid and tap "+" to add a new macro</p>
                                          </div>
                                        </li>
                                        <li className="flex gap-2">
                                          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-bold shrink-0">2</span>
                                          <div>
                                            <p className="font-semibold text-sm">Add Trigger</p>
                                            <p className="text-xs text-muted-foreground">Search "Day/Time" → Set time to 00:01:00 and check all days</p>
                                          </div>
                                        </li>
                                        <li className="flex gap-2">
                                          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-bold shrink-0">3</span>
                                          <div>
                                            <p className="font-semibold text-sm">Add Action</p>
                                            <p className="text-xs text-muted-foreground">Search "HTTP Request" → Set method to GET</p>
                                          </div>
                                        </li>
                                        <li className="flex gap-2">
                                          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-bold shrink-0">4</span>
                                          <div>
                                            <p className="font-semibold text-sm">Configure Request</p>
                                            <p className="text-xs text-muted-foreground">Paste URL (from Step 3) → Check "Block next actions until complete"</p>
                                          </div>
                                        </li>
                                        <li className="flex gap-2">
                                          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-bold shrink-0">5</span>
                                          <div>
                                            <p className="font-semibold text-sm">Save to File</p>
                                            <p className="text-xs text-muted-foreground">Enable "Save HTTP request to file" → Select Downloads → Name: wallpaper.png</p>
                                          </div>
                                        </li>
                                        <li className="flex gap-2">
                                          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-bold shrink-0">6</span>
                                          <div>
                                            <p className="font-semibold text-sm">Test Macro</p>
                                            <p className="text-xs text-muted-foreground">Save macro and test it to ensure it downloads the wallpaper</p>
                                          </div>
                                        </li>
                                      </ol>
                                    </CardContent>
                                  </Card>
                                </CarouselItem>
                              )}

                              {/* Step 4/5: Configure Shortcut/Wallpaper */}
                              <CarouselItem>
                                <Card className="border-0 shadow-none">
                                  <CardHeader className="p-1.5 sm:p-2 md:p-3 pb-1 sm:pb-1.5">
                                    <CardTitle className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm md:text-base">
                                      <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary text-primary-foreground text-[9px] sm:text-[10px] font-bold">
                                        {selectedPlatform === 'ios' ? '4' : '5'}
                                      </span>
                                      {selectedPlatform === 'ios' ? 'Configure Shortcut' : 'Set Wallpaper'}
                                    </CardTitle>
                                    <CardDescription className="text-[9px] sm:text-[10px]">
                                      {selectedPlatform === 'ios' ? 'Add actions to download wallpaper' : 'Apply the downloaded wallpaper'}
                                    </CardDescription>
                                  </CardHeader>
                                  <CardContent className="space-y-1.5 sm:space-y-2 md:space-y-2.5 p-1.5 sm:p-2 md:p-3 pt-0">
                                    {selectedPlatform === 'ios' ? (
                                      <>
                                        <ol className="space-y-1 sm:space-y-1.5 md:space-y-2">
                                          <li className="flex gap-2">
                                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-bold shrink-0">1</span>
                                            <div>
                                              <p className="font-semibold text-sm">Add "Get Contents of URL"</p>
                                              <p className="text-xs text-muted-foreground">Search and add action</p>
                                            </div>
                                          </li>
                                          <li className="flex gap-2">
                                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-bold shrink-0">2</span>
                                            <div>
                                              <p className="font-semibold text-sm">Paste Your URL</p>
                                              <p className="text-xs text-muted-foreground">Paste URL from previous step</p>
                                            </div>
                                          </li>
                                          <li className="flex gap-2">
                                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-bold shrink-0">3</span>
                                            <div>
                                              <p className="font-semibold text-sm">Add "Set Wallpaper"</p>
                                              <p className="text-xs text-muted-foreground">Search and add action</p>
                                            </div>
                                          </li>
                                          <li className="flex gap-2">
                                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-bold shrink-0">4</span>
                                            <div>
                                              <p className="font-semibold text-sm">Disable Options</p>
                                              <p className="text-xs text-muted-foreground">Turn OFF "Crop" and "Preview"</p>
                                            </div>
                                          </li>
                                          <li className="flex gap-2">
                                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-bold shrink-0">5</span>
                                            <div>
                                              <p className="font-semibold text-sm">Test It!</p>
                                              <p className="text-xs text-muted-foreground">Tap "Run" to test</p>
                                            </div>
                                          </li>
                                        </ol>

                                        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                                          <p className="text-xs text-green-700 dark:text-green-400">
                                            <strong>Success!</strong> Wallpaper will update daily. Enjoy! 🎉
                                          </p>
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <ol className="space-y-2">
                                          <li className="flex gap-2">
                                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-bold shrink-0">1</span>
                                            <div>
                                              <p className="font-semibold text-sm">Open Settings</p>
                                              <p className="text-xs text-muted-foreground">Go to device Settings → Display → Wallpaper</p>
                                            </div>
                                          </li>
                                          <li className="flex gap-2">
                                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-bold shrink-0">2</span>
                                            <div>
                                              <p className="font-semibold text-sm">Select File</p>
                                              <p className="text-xs text-muted-foreground">Choose "My Photos" or "Gallery" → Navigate to Downloads</p>
                                            </div>
                                          </li>
                                          <li className="flex gap-2">
                                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-bold shrink-0">3</span>
                                            <div>
                                              <p className="font-semibold text-sm">Apply Wallpaper</p>
                                              <p className="text-xs text-muted-foreground">Select wallpaper.png → Set as Home screen or Lock screen</p>
                                            </div>
                                          </li>
                                        </ol>

                                        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                                          <p className="text-xs text-green-700 dark:text-green-400">
                                            <strong>Done!</strong> Your wallpaper will auto-update daily at 00:01. Enjoy! 🎉
                                          </p>
                                        </div>
                                      </>
                                    )}
                                  </CardContent>
                                </Card>
                              </CarouselItem>
                            </CarouselContent>

                            {/* Carousel Navigation - Dots and Buttons */}
                            <div className="flex items-center justify-between mt-2 sm:mt-3 md:mt-4 pt-2 sm:pt-3 md:pt-4 border-t border-border shrink-0 px-2 sm:px-3 md:px-4 pb-2 sm:pb-3 md:pb-4">
                              <CarouselPrevious className="static translate-y-0 h-8 w-8 sm:h-9 sm:w-9" />
                              <div className="flex gap-1.5 sm:gap-2">
                                {Array.from({ length: selectedPlatform === 'ios' ? 4 : 5 }, (_, index) => (
                                  <button
                                    key={index}
                                    onClick={() => carouselApi?.scrollTo(index)}
                                    className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all ${currentStep === index
                                      ? 'bg-primary scale-110'
                                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                                      }`}
                                    aria-label={`Go to step ${index + 1}`}
                                  />
                                ))}
                              </div>
                              {(selectedPlatform === 'ios' && currentStep === 3) || (selectedPlatform === 'android' && currentStep === 4) ? (
                                <Button size="sm" onClick={() => setIsModalOpen(false)} className="h-8 sm:h-9 text-xs sm:text-sm">
                                  Finish
                                </Button>
                              ) : (
                                <CarouselNext className="static translate-y-0 h-8 w-8 sm:h-9 sm:w-9" />
                              )}
                            </div>
                          </Carousel>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Customization Options */}
          <div>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-xl">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl md:text-2xl">Customize</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Adjust settings to create your perfect wallpaper</CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6">
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 h-8 sm:h-9 md:h-10">
                    <TabsTrigger value="basic" className="data-[state=active]:!bg-primary data-[state=active]:!text-primary-foreground text-xs sm:text-sm">Basic</TabsTrigger>
                    <TabsTrigger value="colors" className="data-[state=active]:!bg-primary data-[state=active]:!text-primary-foreground text-xs sm:text-sm">Colors</TabsTrigger>
                    <TabsTrigger value="advanced" className="data-[state=active]:!bg-primary data-[state=active]:!text-primary-foreground text-xs sm:text-sm">Advanced</TabsTrigger>
                  </TabsList>

                  {/* Basic Settings */}
                  <TabsContent value="basic" className="space-y-3 sm:space-y-4 md:space-y-6 mt-3 sm:mt-4 md:mt-6">
                    {/* Theme Selector */}
                    <div className="space-y-1.5 sm:space-y-2 pb-3 sm:pb-4 border-b border-border">
                      <Label htmlFor="theme" className="text-xs sm:text-sm">Quick Theme Presets</Label>
                      <select
                        id="theme"
                        onChange={(e) => applyTheme(e.target.value)}
                        className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-background border border-input rounded-md text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                        value={selectedTheme}
                      >
                        <option value="">Select a theme...</option>
                        {THEMES.map((theme, index) => (
                          <option key={index} value={index}>
                            {theme.name}
                          </option>
                        ))}
                      </select>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">
                        Choose a preset theme or customize colors manually below
                      </p>
                    </div>

                    {/* Device Selector */}
                    <div className="space-y-2 sm:space-y-3 pb-3 sm:pb-4 border-b border-border">
                      <Label className="text-xs sm:text-sm">Device Presets</Label>

                      {/* Platform Tabs */}
                      <div className="flex gap-1.5 sm:gap-2 p-0.5 sm:p-1 bg-muted rounded-lg">
                        <button
                          onClick={() => {
                            setSelectedPlatform('ios');
                            setSelectedDevice('');
                            setDeviceSearchQuery('');
                            setShowDeviceDropdown(false);
                          }}
                          className={`flex-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${selectedPlatform === 'ios'
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                          iOS
                        </button>
                        <button
                          onClick={() => {
                            setSelectedPlatform('android');
                            setSelectedDevice('');
                            setDeviceSearchQuery('');
                            setShowDeviceDropdown(false);
                          }}
                          className={`flex-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${selectedPlatform === 'android'
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                          Android
                        </button>
                      </div>

                      {/* Searchable Device Input (Mobile-Friendly) */}
                      <div ref={deviceSearchRef} className="relative space-y-2">
                        <div className="relative">
                          <Input
                            type="text"
                            placeholder={`Search ${selectedPlatform === 'ios' ? 'iPhone' : 'Android'} devices...`}
                            value={deviceSearchQuery}
                            onChange={(e) => {
                              const value = e.target.value;
                              setDeviceSearchQuery(value);
                              setShowDeviceDropdown(value.trim().length > 0);
                            }}
                            onFocus={() => {
                              if (deviceSearchQuery.trim().length > 0) {
                                setShowDeviceDropdown(true);
                              }
                            }}
                            className="bg-background/50 text-xs sm:text-sm pr-8 sm:pr-10 h-8 sm:h-9 md:h-10"
                          />

                          {/* Clear Button */}
                          {deviceSearchQuery && (
                            <button
                              onClick={() => {
                                setDeviceSearchQuery('');
                                setShowDeviceDropdown(false);
                                setSelectedDevice('');
                              }}
                              className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 p-0.5 sm:p-1 hover:bg-muted rounded-full transition-colors"
                              aria-label="Clear search"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-4 sm:h-4">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          )}

                          {/* Custom Dropdown - Only shows when typing */}
                          {showDeviceDropdown && filteredDevices.length > 0 && (
                            <div className="absolute z-50 w-full mt-1 bg-background border border-input rounded-md shadow-lg max-h-60 overflow-auto">
                              {filteredDevices.map((device, index) => {
                                const deviceIndex = currentDeviceList.indexOf(device);
                                return (
                                  <button
                                    key={index}
                                    onClick={() => {
                                      handleDeviceChange(deviceIndex.toString());
                                      setDeviceSearchQuery(device.name);
                                      setShowDeviceDropdown(false);
                                    }}
                                    className="w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-muted transition-colors border-b border-border last:border-b-0"
                                  >
                                    <div className="font-medium">{device.name}</div>
                                    <div className="text-[10px] sm:text-xs text-muted-foreground">
                                      {device.width} × {device.height}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          )}

                          {/* No results message */}
                          {showDeviceDropdown && deviceSearchQuery.trim() && filteredDevices.length === 0 && (
                            <div className="absolute z-50 w-full mt-1 bg-background border border-input rounded-md shadow-lg p-3">
                              <p className="text-xs sm:text-sm text-muted-foreground text-center">
                                No devices found matching "{deviceSearchQuery}"
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Help Text */}
                        <p className="text-[10px] sm:text-xs text-muted-foreground">
                          {selectedPlatform === 'ios'
                            ? 'Type to search for your iPhone model, or use custom dimensions below'
                            : 'Type to search for your Android device, or use custom dimensions below'
                          }
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                      <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                        <Label htmlFor="width" className="text-xs sm:text-sm">Width (px)</Label>
                        <Input
                          id="width"
                          type="number"
                          value={config.width}
                          onChange={(e) => handleChange('width', parseInt(e.target.value) || 1080)}
                          className="bg-background/50 text-xs sm:text-sm h-8 sm:h-9 md:h-10"
                          disabled={selectedDevice !== ''}
                        />
                      </div>
                      <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                        <Label htmlFor="height" className="text-xs sm:text-sm">Height (px)</Label>
                        <Input
                          id="height"
                          type="number"
                          value={config.height}
                          onChange={(e) => handleChange('height', parseInt(e.target.value) || 2400)}
                          className="bg-background/50 text-xs sm:text-sm h-8 sm:h-9 md:h-10"
                          disabled={selectedDevice !== ''}
                        />
                      </div>
                    </div>

                    <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                      <Label htmlFor="mode" className="text-xs sm:text-sm">Mode</Label>
                      <select
                        id="mode"
                        value={config.mode}
                        onChange={(e) => handleChange('mode', e.target.value)}
                        className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-background border border-input rounded-md text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                      >
                        <option value="month">Month</option>
                        <option value="year">Year</option>
                      </select>
                    </div>

                    <div className="space-y-2 sm:space-y-3 md:space-y-4 pt-3 sm:pt-4 border-t border-border">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <input
                          type="checkbox"
                          id="useTarget"
                          checked={config.useTarget}
                          onChange={(e) => handleChange('useTarget', e.target.checked)}
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-primary text-primary focus:ring-primary"
                        />
                        <Label htmlFor="useTarget" className="font-semibold cursor-pointer select-none text-xs sm:text-sm">Target Goal Mode</Label>
                      </div>

                      {config.useTarget && (
                        <div className="space-y-2 sm:space-y-3 md:space-y-4 pl-3 sm:pl-4 border-l-2 border-primary/20 animate-in fade-in slide-in-from-top-2 duration-300">
                          <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                            <Label htmlFor="targetDate" className="text-xs sm:text-sm">Target Date</Label>
                            <Input
                              id="targetDate"
                              type="date"
                              value={config.targetDate}
                              onChange={(e) => handleChange('targetDate', e.target.value)}
                              className="bg-background/50 text-xs sm:text-sm h-8 sm:h-9 md:h-10"
                            />
                          </div>
                          <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                            <Label htmlFor="targetTitle" className="text-xs sm:text-sm">Goal Title</Label>
                            <Input
                              id="targetTitle"
                              type="text"
                              placeholder="e.g. Marathon Day"
                              value={config.targetTitle}
                              onChange={(e) => handleChange('targetTitle', e.target.value)}
                              className="bg-background/50 text-xs sm:text-sm h-8 sm:h-9 md:h-10"
                            />
                            <p className="text-[9px] sm:text-[10px] text-muted-foreground">Displayed at the bottom of wallpaper</p>
                          </div>

                          <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                            <Label htmlFor="targetShape" className="text-xs sm:text-sm">Target Dot Shape</Label>
                            <select
                              id="targetShape"
                              value={config.targetShape}
                              onChange={(e) => handleChange('targetShape', e.target.value)}
                              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-background border border-input rounded-md text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                            >
                              <option value="circle">Circle (Default)</option>
                              <option value="square">Square</option>
                              <option value="diamond">Diamond</option>
                              <option value="star">Star</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                      <Label htmlFor="timezone" className="text-xs sm:text-sm">Timezone</Label>
                      <select
                        id="timezone"
                        value={config.timezone}
                        onChange={(e) => handleChange('timezone', parseFloat(e.target.value))}
                        className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-background border border-input rounded-md text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                      >
                        {TIMEZONES.map((tz, index) => (
                          <option key={index} value={tz.offset}>
                            {tz.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                      <Label htmlFor="cols" className="text-xs sm:text-sm">Columns</Label>
                      <Input
                        id="cols"
                        type="number"
                        value={config.cols}
                        onChange={(e) => handleChange('cols', parseInt(e.target.value) || 15)}
                        className="bg-background/50 text-xs sm:text-sm h-8 sm:h-9 md:h-10"
                        min="1"
                        max="30"
                      />
                    </div>

                    <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                      <Label htmlFor="dotradius" className="text-xs sm:text-sm">Dot Size</Label>
                      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                        <Input
                          id="dotradius"
                          type="range"
                          value={config.dotradius}
                          onChange={(e) => handleChange('dotradius', parseFloat(e.target.value))}
                          className="bg-primary"
                          min="0.5"
                          max="2.0"
                          step="0.1"
                        />
                        <span className="text-xs sm:text-sm text-muted-foreground min-w-8 sm:min-w-10 md:min-w-12">{config.dotradius}x</span>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Color Settings */}
                  <TabsContent value="colors" className="space-y-2 sm:space-y-3 md:space-y-4 mt-3 sm:mt-4 md:mt-6">
                    <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
                      <div className="space-y-1 sm:space-y-1.5">
                        <Label htmlFor="bgcolor" className="text-xs sm:text-sm">Background Color</Label>
                        <div className="flex gap-1.5 sm:gap-2">
                          <div className="relative flex-1">
                            <Input
                              id="bgcolor"
                              type="text"
                              value={config.bgcolor}
                              onChange={(e) => handleChange('bgcolor', e.target.value.replace('#', ''))}
                              className="bg-background/50 pl-8 sm:pl-10 md:pl-12 text-xs sm:text-sm h-8 sm:h-9 md:h-10"
                              placeholder="71717a"
                            />
                            <div
                              className="absolute left-2 sm:left-2.5 md:left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded border border-border"
                              style={{ backgroundColor: `#${config.bgcolor}` }}
                            />
                          </div>
                          <input
                            type="color"
                            value={`#${config.bgcolor}`}
                            onChange={(e) => handleChange('bgcolor', e.target.value.replace('#', ''))}
                            className="w-8 h-8 sm:w-10 sm:h-9 md:w-12 md:h-10 rounded border border-input cursor-pointer"
                          />
                        </div>
                      </div>

                      <div className="space-y-1 sm:space-y-1.5">
                        <Label htmlFor="passedcolor" className="text-xs sm:text-sm">Passed Days Color</Label>
                        <div className="flex gap-1.5 sm:gap-2">
                          <div className="relative flex-1">
                            <Input
                              id="passedcolor"
                              type="text"
                              value={config.passedcolor}
                              onChange={(e) => handleChange('passedcolor', e.target.value.replace('#', ''))}
                              className="bg-background/50 pl-8 sm:pl-10 md:pl-12 text-xs sm:text-sm h-8 sm:h-9 md:h-10"
                              placeholder="f97316"
                            />
                            <div
                              className="absolute left-2 sm:left-2.5 md:left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded border border-border"
                              style={{ backgroundColor: `#${config.passedcolor}` }}
                            />
                          </div>
                          <input
                            type="color"
                            value={`#${config.passedcolor}`}
                            onChange={(e) => handleChange('passedcolor', e.target.value.replace('#', ''))}
                            className="w-8 h-8 sm:w-10 sm:h-9 md:w-12 md:h-10 rounded border border-input cursor-pointer"
                          />
                        </div>
                      </div>

                      <div className="space-y-1 sm:space-y-1.5">
                        <Label htmlFor="currentcolor" className="text-xs sm:text-sm">Current Day Color</Label>
                        <div className="flex gap-1.5 sm:gap-2">
                          <div className="relative flex-1">
                            <Input
                              id="currentcolor"
                              type="text"
                              value={config.currentcolor}
                              onChange={(e) => handleChange('currentcolor', e.target.value.replace('#', ''))}
                              className="bg-background/50 pl-8 sm:pl-10 md:pl-12 text-xs sm:text-sm h-8 sm:h-9 md:h-10"
                              placeholder="fbbf24"
                            />
                            <div
                              className="absolute left-2 sm:left-2.5 md:left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded border border-border"
                              style={{ backgroundColor: `#${config.currentcolor}` }}
                            />
                          </div>
                          <input
                            type="color"
                            value={`#${config.currentcolor}`}
                            onChange={(e) => handleChange('currentcolor', e.target.value.replace('#', ''))}
                            className="w-8 h-8 sm:w-10 sm:h-9 md:w-12 md:h-10 rounded border border-input cursor-pointer"
                          />
                        </div>
                      </div>

                      <div className="space-y-1 sm:space-y-1.5">
                        <Label htmlFor="futurecolor" className="text-xs sm:text-sm">Future Days Color</Label>
                        <div className="flex gap-1.5 sm:gap-2">
                          <div className="relative flex-1">
                            <Input
                              id="futurecolor"
                              type="text"
                              value={config.futurecolor}
                              onChange={(e) => handleChange('futurecolor', e.target.value.replace('#', ''))}
                              className="bg-background/50 pl-8 sm:pl-10 md:pl-12 text-xs sm:text-sm h-8 sm:h-9 md:h-10"
                              placeholder="52525b"
                            />
                            <div
                              className="absolute left-2 sm:left-2.5 md:left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded border border-border"
                              style={{ backgroundColor: `#${config.futurecolor}` }}
                            />
                          </div>
                          <input
                            type="color"
                            value={`#${config.futurecolor}`}
                            onChange={(e) => handleChange('futurecolor', e.target.value.replace('#', ''))}
                            className="w-8 h-8 sm:w-10 sm:h-9 md:w-12 md:h-10 rounded border border-input cursor-pointer"
                          />
                        </div>
                      </div>

                      {config.useTarget && (
                        <div className="space-y-1 sm:space-y-1.5 animate-in fade-in slide-in-from-top-2">
                          <Label htmlFor="targetcolor" className="text-xs sm:text-sm">Target Date Color</Label>
                          <div className="flex gap-1.5 sm:gap-2">
                            <div className="relative flex-1">
                              <Input
                                id="targetcolor"
                                type="text"
                                value={config.targetcolor}
                                onChange={(e) => handleChange('targetcolor', e.target.value.replace('#', ''))}
                                className="bg-background/50 pl-8 sm:pl-10 md:pl-12 text-xs sm:text-sm h-8 sm:h-9 md:h-10"
                                placeholder="ef4444"
                              />
                              <div
                                className="absolute left-2 sm:left-2.5 md:left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded border border-border"
                                style={{ backgroundColor: `#${config.targetcolor}` }}
                              />
                            </div>
                            <input
                              type="color"
                              value={`#${config.targetcolor}`}
                              onChange={(e) => handleChange('targetcolor', e.target.value.replace('#', ''))}
                              className="w-8 h-8 sm:w-10 sm:h-9 md:w-12 md:h-10 rounded border border-input cursor-pointer"
                            />
                          </div>
                        </div>
                      )}

                      <div className="space-y-1 sm:space-y-1.5">
                        <Label htmlFor="textcolor" className="text-xs sm:text-sm">Text Color</Label>
                        <div className="flex gap-1.5 sm:gap-2">
                          <div className="relative flex-1">
                            <Input
                              id="textcolor"
                              type="text"
                              value={config.textcolor}
                              onChange={(e) => handleChange('textcolor', e.target.value.replace('#', ''))}
                              className="bg-background/50 pl-8 sm:pl-10 md:pl-12 text-xs sm:text-sm h-8 sm:h-9 md:h-10"
                              placeholder="ffffff"
                            />
                            <div
                              className="absolute left-2 sm:left-2.5 md:left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded border border-border"
                              style={{ backgroundColor: `#${config.textcolor}` }}
                            />
                          </div>
                          <input
                            type="color"
                            value={`#${config.textcolor}`}
                            onChange={(e) => handleChange('textcolor', e.target.value.replace('#', ''))}
                            className="w-8 h-8 sm:w-10 sm:h-9 md:w-12 md:h-10 rounded border border-input cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Advanced Settings */}
                  <TabsContent value="advanced" className="space-y-3 sm:space-y-4 md:space-y-6 mt-3 sm:mt-4 md:mt-6">
                    <div className="space-y-2 sm:space-y-3 md:space-y-4">
                      <h3 className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Padding (pixels)
                      </h3>
                      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                        <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                          <Label htmlFor="paddingtop" className="text-xs sm:text-sm">Top</Label>
                          <Input
                            id="paddingtop"
                            type="number"
                            value={config.paddingtop}
                            onChange={(e) => handleChange('paddingtop', parseInt(e.target.value) || 0)}
                            className="bg-background/50 text-xs sm:text-sm h-8 sm:h-9 md:h-10"
                          />
                        </div>
                        <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                          <Label htmlFor="paddingbottom" className="text-xs sm:text-sm">Bottom</Label>
                          <Input
                            id="paddingbottom"
                            type="number"
                            value={config.paddingbottom}
                            onChange={(e) => handleChange('paddingbottom', parseInt(e.target.value) || 0)}
                            className="bg-background/50 text-xs sm:text-sm h-8 sm:h-9 md:h-10"
                          />
                        </div>
                        <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                          <Label htmlFor="paddingleft" className="text-xs sm:text-sm">Left</Label>
                          <Input
                            id="paddingleft"
                            type="number"
                            value={config.paddingleft}
                            onChange={(e) => handleChange('paddingleft', parseInt(e.target.value) || 0)}
                            className="bg-background/50 text-xs sm:text-sm h-8 sm:h-9 md:h-10"
                          />
                        </div>
                        <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                          <Label htmlFor="paddingright" className="text-xs sm:text-sm">Right</Label>
                          <Input
                            id="paddingright"
                            type="number"
                            value={config.paddingright}
                            onChange={(e) => handleChange('paddingright', parseInt(e.target.value) || 0)}
                            className="bg-background/50 text-xs sm:text-sm h-8 sm:h-9 md:h-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 sm:pt-4 border-t border-border">
                      <Button
                        onClick={() => setConfig({
                          width: 1080,
                          height: 2400,
                          mode: 'month',
                          timezone: 5,
                          paddingtop: 400,
                          paddingbottom: 100,
                          paddingleft: 0,
                          paddingright: 0,
                          bgcolor: '71717a',
                          passedcolor: 'f97316',
                          currentcolor: 'fbbf24',
                          futurecolor: '52525b',
                          textcolor: 'ffffff',
                          cols: 15,
                          dotradius: 1.0
                        })}
                        variant="outline"
                        className="w-full text-xs sm:text-sm h-8 sm:h-9 md:h-10"
                      >
                        Reset to Defaults
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Button
              className="w-full mt-4 sm:mt-6 lg:hidden shadow-lg shadow-primary/20 text-xs sm:text-sm h-9 sm:h-10 md:h-11"
              size="lg"
              onClick={() => setIsModalOpen(true)}
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              Set Wallpaper
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 py-4 sm:py-6 md:py-8 mt-6 sm:mt-8 md:mt-12 bg-background/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground flex items-center justify-center gap-0.5 sm:gap-1">
            Made by <a
              className="text-primary underline decoration-primary font-medium hover:text-primary/80 transition-colors"
              href="https://github.com/abdullahshafiq-20"
              target="_blank"
              rel="noopener noreferrer"
            >
              Abdullah
            </a>
            <span> with  </span>
            <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-primary fill-primary inline-block ml-0.5 sm:ml-1" />
          </p>
        </div>
      </footer>

      {/* Mobile Floating Preview */}
      <div className="fixed bottom-6 left-6 z-50 lg:hidden flex flex-col items-center gap-2">
        <span className="bg-background/80 backdrop-blur text-foreground text-[10px] px-2 py-1 rounded-full shadow-sm border border-primary animate-bounce">
          Tap to Expand
        </span>
        <div
          onClick={() => setIsPreviewOpen(true)}
          className="w-16 h-28 sm:w-20 sm:h-40 bg-gradient-to-br from-muted to-muted-foreground/20 border-4 border-muted rounded-[1.2rem] sm:rounded-[1.5rem] shadow-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform hover:shadow-primary/20 hover:border-muted-foreground/50 flex items-center justify-center relative"
        >
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-6 sm:w-8 h-1 bg-muted-foreground/30 rounded-full z-10" />
          {previewSrc ? (
            <img
              src={previewSrc}
              alt="Preview"
              className="w-full h-full object-cover rounded-[1rem] sm:rounded-[1.2rem]"
            />
          ) : (
            <span className="text-[10px] text-muted-foreground font-medium">Preview</span>
          )}
        </div>
      </div>

      {/* Mobile Preview Modal */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-[100vw] h-[100vh] flex flex-col items-center justify-center p-0 bg-background/80 border-none backdrop-blur-sm">
          <div className="absolute top-12 left-0 right-0 z-50 flex justify-center pointer-events-none">
            <span className="bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full shadow-lg border border-primary animate-in fade-in zoom-in duration-500">
              Tap screen to close
            </span>
          </div>
          <div className="relative w-full h-full flex items-center justify-center p-8 sm:p-12" onClick={() => setIsPreviewOpen(false)}>
            <div className="relative max-h-[85vh] max-w-[85vw] aspect-[9/19.5] rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden shadow-2xl bg-gradient-to-br from-muted to-muted-foreground/20 p-2 sm:p-3">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-6 sm:h-7 bg-muted-foreground/30 rounded-b-2xl sm:rounded-b-3xl z-10" />
              <div className="relative w-full h-full rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-background">
                {previewSrc && (
                  <img
                    src={previewSrc}
                    alt="Full Preview"
                    className="w-full h-full object-cover"
                  />
                )}

                {/* iOS Lock Screen Overlay (Mobile Modal) */}
                <div className="absolute inset-0 pointer-events-none z-20 flex flex-col text-white">
                  {/* Status Bar */}
                  <div className="pt-3 sm:pt-4 px-6 sm:px-8 flex justify-between items-center">
                    <span className="text-sm font-semibold tracking-wide ml-2">9:41</span>
                    <div className="flex items-center gap-1.5 mr-2">
                      <Signal className="w-4 h-4 fill-current" />
                      <Wifi className="w-4 h-4" />
                      <Battery className="w-5 h-5 fill-current" />
                    </div>
                  </div>

                  {/* Clock & Date */}
                  <div className="mt-12 sm:mt-16 flex flex-col items-center drop-shadow-lg text-center">
                    <span className="text-base sm:text-lg font-medium opacity-90">Monday, January 14</span>
                    <span className="text-7xl sm:text-8xl font-bold tracking-tighter leading-none font-sans">9:41</span>
                  </div>

                  <div className="flex-1" />

                  {/* Bottom Buttons */}
                  <div className="px-8 sm:px-10 mb-8 sm:mb-10 flex justify-between items-end w-full">
                    <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/50 transition-colors">
                      <Flashlight className="w-6 h-6 text-white fill-white/20" />
                    </div>
                    <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/50 transition-colors">
                      <Camera className="w-6 h-6 text-white fill-white/20" />
                    </div>
                  </div>

                  {/* Home Bar */}
                  <div className="w-full flex justify-center pb-3">
                    <div className="w-32 h-1 bg-white rounded-full opacity-60 shadow-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Toast Notifications */}
      <Toaster />
    </main>
  );
}