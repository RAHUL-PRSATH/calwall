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

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if user has a preference saved
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return JSON.parse(saved);
    // Otherwise check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // State for wallpaper customization
  const [config, setConfig] = useState({
    width: 1080,
    height: 2400,
    mode: 'month',
    timezone: 5,
    paddingtop: 0,
    paddingbottom: 0,
    paddingleft: 0,
    paddingright: 0,
    bgcolor: '71717a',
    passedcolor: 'f97316',
    currentcolor: 'fbbf24',
    futurecolor: '52525b',
    textcolor: 'ffffff',
    cols: 15,
    dotradius: 1.0
  });

  const [wallpaperUrl, setWallpaperUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carouselApi, setCarouselApi] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewSrc, setPreviewSrc] = useState('');

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

  // Handle device selection
  const handleDeviceChange = (deviceIndex) => {
    setSelectedDevice(deviceIndex);
    if (deviceIndex === '') return;
    const device = IOS_DEVICES[parseInt(deviceIndex)];
    if (device) {
      setConfig(prev => ({
        ...prev,
        width: device.width,
        height: device.height
      }));
      toast.success(`Applied ${device.name} dimensions (${device.width}×${device.height})`);
    }
  };

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
    return `${API_BASE}/api/wallpaper/getCalWall?${params.toString()}`;
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

    if (config.mode === 'month') {
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

    // Draw dots
    for (let i = 0; i < totalDays; i++) {
      const row = Math.floor(i / config.cols);
      const col = i % config.cols;
      const x = startX + col * spacing + spacing / 2;
      const y = startY + row * spacing + spacing / 2;

      ctx.beginPath();
      ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2);

      if (i < daysPassed - 1) {
        // Passed days
        ctx.fillStyle = `#${config.passedcolor}`;
      } else if (i === daysPassed - 1) {
        // Current day
        ctx.fillStyle = `#${config.currentcolor}`;
      } else {
        // Future days
        ctx.fillStyle = `#${config.futurecolor}`;
      }
      ctx.fill();
    }

    // Bottom text - Auto-positioned below grid with safe spacing
    const bottomY = startY + gridHeight + Math.floor(textReservedSpace / 2);

    // Set font for bottom text
    ctx.fillStyle = `#${config.textcolor}`;
    const fontSize = Math.floor(config.width / 25);
    ctx.font = `${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw combined text: "Xd left • Y%"
    const bottomText = `${daysLeft}d left • ${percentComplete}%`;
    ctx.fillText(bottomText, config.width / 2, bottomY);

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
        // Validate hex color (without #)
        const hexPattern = /^[0-9A-Fa-f]{6}$/;
        if (!hexPattern.test(value)) {
          toast.error('Color must be a valid 6-digit hex code (e.g., ff0000)');
          return;
        }
        break;
    }

    setConfig(prev => ({ ...prev, [key]: value }));
  };

  // Handle theme selection
  const applyTheme = (themeIndex) => {
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary tracking-tight">
            CalWall
          </h1>
          <Button
            onClick={toggleDarkMode}
            variant="outline"
            size="icon"
            className="shrink-0"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-primary" />
            ) : (
              <Moon className="w-5 h-5 text-primary" />
            )}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Side - Device Preview (Hidden on Mobile) */}
          <div className="hidden lg:flex flex-col items-center justify-center">
            <Card className="w-full max-w-md bg-card/50 backdrop-blur-sm border-border/50 shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Live Preview</CardTitle>
                <CardDescription>Your wallpaper updates in real-time</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center p-8">
                {/* iOS Device Frame */}
                <div className="relative">
                  {/* iPhone Frame */}
                  <div className="relative bg-gradient-to-br from-muted to-muted-foreground/20 rounded-[3rem] p-3 shadow-2xl">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-muted-foreground/30 rounded-b-3xl z-10" />

                    {/* Screen */}
                    <div className="relative bg-white dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden aspect-[9/19.5] w-64 shadow-inner flex items-center justify-center group">
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
                        <div className="mt-8 flex flex-col items-center drop-shadow-md">
                          <span className="text-[10px] font-medium opacity-90">Monday, January 14</span>
                          <span className="text-5xl font-bold tracking-tighter leading-none font-sans">9:41</span>
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
                      <DialogContent className="max-w-[85vw] sm:max-w-2xl md:max-w-3xl max-h-[85vh] flex flex-col p-3 sm:p-6">
                        <DialogHeader className="shrink-0">
                          <DialogTitle className="text-xl sm:text-2xl">Set Up Your Dynamic Wallpaper</DialogTitle>
                          <DialogDescription className="text-sm">
                            Follow these steps to automatically update your iPhone wallpaper
                          </DialogDescription>
                        </DialogHeader>

                        <div className="flex-1 overflow-y-auto px-1">
                          <Carousel setApi={setCarouselApi} className="w-full">
                            <CarouselContent>
                              {/* Step 1: Configuration */}
                              <CarouselItem>
                                <Card className="border-0 shadow-none">
                                  <CardHeader className="p-4 pb-2">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">1</span>
                                      Configuration
                                    </CardTitle>
                                    <CardDescription className="text-xs">Review your settings</CardDescription>
                                  </CardHeader>
                                  <CardContent className="space-y-3 p-4 pt-0">
                                    <div className="grid grid-cols-2 gap-2 p-3 bg-muted rounded-lg text-sm">
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

                                    <div className="space-y-1">
                                      <Label className="text-muted-foreground text-xs">Colors</Label>
                                      <div className="flex flex-wrap gap-2 p-2 bg-muted rounded-lg">
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

                                    <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                                      <p className="text-xs text-foreground">
                                        Updates based on your {config.mode === 'month' ? 'monthly' : 'yearly'} progress.
                                      </p>
                                    </div>
                                  </CardContent>
                                </Card>
                              </CarouselItem>

                              {/* Step 2: Shortcuts Setup */}
                              <CarouselItem>
                                <Card className="border-0 shadow-none">
                                  <CardHeader className="p-4 pb-2">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">2</span>
                                      iPhone Automation
                                    </CardTitle>
                                    <CardDescription className="text-xs">Set up automatic updates</CardDescription>
                                  </CardHeader>
                                  <CardContent className="space-y-3 p-4 pt-0">
                                    <ol className="space-y-2">
                                      <li className="flex gap-2">
                                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-bold shrink-0">1</span>
                                        <div>
                                          <p className="font-semibold text-sm">Open Shortcuts App</p>
                                          <p className="text-xs text-muted-foreground">Find app on iPhone</p>
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
                                  </CardContent>
                                </Card>
                              </CarouselItem>

                              {/* Step 3: Copy URL */}
                              <CarouselItem>
                                <Card className="border-0 shadow-none">
                                  <CardHeader className="p-4 pb-2">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">3</span>
                                      Copy URL
                                    </CardTitle>
                                    <CardDescription className="text-xs">Generated from your settings</CardDescription>
                                  </CardHeader>
                                  <CardContent className="space-y-3 p-4 pt-0">
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

                              {/* Step 4: Configure Shortcut */}
                              <CarouselItem>
                                <Card className="border-0 shadow-none">
                                  <CardHeader className="p-4 pb-2">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">4</span>
                                      Configure Shortcut
                                    </CardTitle>
                                    <CardDescription className="text-xs">Add actions to download wallpaper</CardDescription>
                                  </CardHeader>
                                  <CardContent className="space-y-3 p-4 pt-0">
                                    <ol className="space-y-2">
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
                                  </CardContent>
                                </Card>
                              </CarouselItem>
                            </CarouselContent>

                            <div className="flex items-center justify-between mt-6 shrink-0">
                              <CarouselPrevious className="static translate-y-0" />
                              <div className="flex gap-2">
                                {[0, 1, 2, 3].map((index) => (
                                  <button
                                    key={index}
                                    onClick={() => carouselApi?.scrollTo(index)}
                                    className={`w-2 h-2 rounded-full transition-colors ${currentStep === index
                                      ? 'bg-primary'
                                      : 'bg-muted-foreground/30'
                                      }`}
                                    aria-label={`Go to step ${index + 1}`}
                                  />
                                ))}
                              </div>
                              {currentStep === 3 ? (
                                <Button size="sm" onClick={() => setIsModalOpen(false)}>
                                  Finish
                                </Button>
                              ) : (
                                <CarouselNext className="static translate-y-0" />
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
              <CardHeader>
                <CardTitle className="text-2xl">Customize</CardTitle>
                <CardDescription>Adjust settings to create your perfect wallpaper</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic" className="data-[state=active]:!bg-primary data-[state=active]:!text-primary-foreground">Basic</TabsTrigger>
                    <TabsTrigger value="colors" className="data-[state=active]:!bg-primary data-[state=active]:!text-primary-foreground">Colors</TabsTrigger>
                    <TabsTrigger value="advanced" className="data-[state=active]:!bg-primary data-[state=active]:!text-primary-foreground">Advanced</TabsTrigger>
                  </TabsList>

                  {/* Basic Settings */}
                  <TabsContent value="basic" className="space-y-6 mt-6">
                    {/* Theme Selector */}
                    <div className="space-y-2 pb-4 border-b border-border">
                      <Label htmlFor="theme">Quick Theme Presets</Label>
                      <select
                        id="theme"
                        onChange={(e) => applyTheme(e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                        defaultValue=""
                      >
                        <option value="">Select a theme...</option>
                        {THEMES.map((theme, index) => (
                          <option key={index} value={index}>
                            {theme.name}
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-muted-foreground">
                        Choose a preset theme or customize colors manually below
                      </p>
                    </div>

                    {/* iOS Device Selector */}
                    <div className="space-y-2 pb-4 border-b border-border">
                      <Label htmlFor="device">iOS Device Presets</Label>
                      <select
                        id="device"
                        onChange={(e) => handleDeviceChange(e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                        defaultValue=""
                      >
                        <option value="">Select a device...</option>
                        {IOS_DEVICES.map((device, index) => (
                          <option key={index} value={index}>
                            {device.name} ({device.width}×{device.height})
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-muted-foreground">
                        Automatically sets width and height for the selected iPhone model
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="width">Width (px)</Label>
                        <Input
                          id="width"
                          type="number"
                          value={config.width}
                          onChange={(e) => handleChange('width', parseInt(e.target.value) || 1080)}
                          className="bg-background/50"
                          disabled={selectedDevice !== ''}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="height">Height (px)</Label>
                        <Input
                          id="height"
                          type="number"
                          value={config.height}
                          onChange={(e) => handleChange('height', parseInt(e.target.value) || 2400)}
                          className="bg-background/50"
                          disabled={selectedDevice !== ''}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mode">Mode</Label>
                      <select
                        id="mode"
                        value={config.mode}
                        onChange={(e) => handleChange('mode', e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                      >
                        <option value="month">Month</option>
                        <option value="year">Year</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <select
                        id="timezone"
                        value={config.timezone}
                        onChange={(e) => handleChange('timezone', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                      >
                        {TIMEZONES.map((tz, index) => (
                          <option key={index} value={tz.offset}>
                            {tz.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cols">Columns</Label>
                      <Input
                        id="cols"
                        type="number"
                        value={config.cols}
                        onChange={(e) => handleChange('cols', parseInt(e.target.value) || 15)}
                        className="bg-background/50"
                        min="1"
                        max="30"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dotradius">Dot Size</Label>
                      <div className="flex items-center gap-4">
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
                        <span className="text-sm text-muted-foreground min-w-12">{config.dotradius}x</span>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Color Settings */}
                  <TabsContent value="colors" className="space-y-6 mt-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="bgcolor">Background Color</Label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Input
                              id="bgcolor"
                              type="text"
                              value={config.bgcolor}
                              onChange={(e) => handleChange('bgcolor', e.target.value.replace('#', ''))}
                              className="bg-background/50 pl-12"
                              placeholder="71717a"
                            />
                            <div
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded border border-border"
                              style={{ backgroundColor: `#${config.bgcolor}` }}
                            />
                          </div>
                          <input
                            type="color"
                            value={`#${config.bgcolor}`}
                            onChange={(e) => handleChange('bgcolor', e.target.value.replace('#', ''))}
                            className="w-12 h-10 rounded border border-input cursor-pointer"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="passedcolor">Passed Days Color</Label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Input
                              id="passedcolor"
                              type="text"
                              value={config.passedcolor}
                              onChange={(e) => handleChange('passedcolor', e.target.value.replace('#', ''))}
                              className="bg-background/50 pl-12"
                              placeholder="f97316"
                            />
                            <div
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded border border-border"
                              style={{ backgroundColor: `#${config.passedcolor}` }}
                            />
                          </div>
                          <input
                            type="color"
                            value={`#${config.passedcolor}`}
                            onChange={(e) => handleChange('passedcolor', e.target.value.replace('#', ''))}
                            className="w-12 h-10 rounded border border-input cursor-pointer"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="currentcolor">Current Day Color</Label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Input
                              id="currentcolor"
                              type="text"
                              value={config.currentcolor}
                              onChange={(e) => handleChange('currentcolor', e.target.value.replace('#', ''))}
                              className="bg-background/50 pl-12"
                              placeholder="fbbf24"
                            />
                            <div
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded border border-border"
                              style={{ backgroundColor: `#${config.currentcolor}` }}
                            />
                          </div>
                          <input
                            type="color"
                            value={`#${config.currentcolor}`}
                            onChange={(e) => handleChange('currentcolor', e.target.value.replace('#', ''))}
                            className="w-12 h-10 rounded border border-input cursor-pointer"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="futurecolor">Future Days Color</Label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Input
                              id="futurecolor"
                              type="text"
                              value={config.futurecolor}
                              onChange={(e) => handleChange('futurecolor', e.target.value.replace('#', ''))}
                              className="bg-background/50 pl-12"
                              placeholder="52525b"
                            />
                            <div
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded border border-border"
                              style={{ backgroundColor: `#${config.futurecolor}` }}
                            />
                          </div>
                          <input
                            type="color"
                            value={`#${config.futurecolor}`}
                            onChange={(e) => handleChange('futurecolor', e.target.value.replace('#', ''))}
                            className="w-12 h-10 rounded border border-input cursor-pointer"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="textcolor">Text Color</Label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Input
                              id="textcolor"
                              type="text"
                              value={config.textcolor}
                              onChange={(e) => handleChange('textcolor', e.target.value.replace('#', ''))}
                              className="bg-background/50 pl-12"
                              placeholder="ffffff"
                            />
                            <div
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded border border-border"
                              style={{ backgroundColor: `#${config.textcolor}` }}
                            />
                          </div>
                          <input
                            type="color"
                            value={`#${config.textcolor}`}
                            onChange={(e) => handleChange('textcolor', e.target.value.replace('#', ''))}
                            className="w-12 h-10 rounded border border-input cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Advanced Settings */}
                  <TabsContent value="advanced" className="space-y-6 mt-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Padding (pixels)
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="paddingtop">Top</Label>
                          <Input
                            id="paddingtop"
                            type="number"
                            value={config.paddingtop}
                            onChange={(e) => handleChange('paddingtop', parseInt(e.target.value) || 0)}
                            className="bg-background/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="paddingbottom">Bottom</Label>
                          <Input
                            id="paddingbottom"
                            type="number"
                            value={config.paddingbottom}
                            onChange={(e) => handleChange('paddingbottom', parseInt(e.target.value) || 0)}
                            className="bg-background/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="paddingleft">Left</Label>
                          <Input
                            id="paddingleft"
                            type="number"
                            value={config.paddingleft}
                            onChange={(e) => handleChange('paddingleft', parseInt(e.target.value) || 0)}
                            className="bg-background/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="paddingright">Right</Label>
                          <Input
                            id="paddingright"
                            type="number"
                            value={config.paddingright}
                            onChange={(e) => handleChange('paddingright', parseInt(e.target.value) || 0)}
                            className="bg-background/50"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
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
                        className="w-full"
                      >
                        Reset to Defaults
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Button
              className="w-full mt-6 lg:hidden shadow-lg shadow-primary/20"
              size="lg"
              onClick={() => setIsModalOpen(true)}
            >
              <Download className="w-4 h-4 mr-2" />
              Set Wallpaper
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-12 bg-background/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            Made by <span className="text-primary underline decoration-primary font-medium">Abdullah</span>
            <Heart className="w-4 h-4 text-primary fill-primary inline-block ml-1" />
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