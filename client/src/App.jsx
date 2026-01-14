import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, Download, RefreshCw } from "lucide-react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3000';

export default function App() {
  const canvasRef = useRef(null);

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

  }, [config]);

  // Handle input changes
  const handleChange = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  // Copy URL to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(wallpaperUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Download wallpaper from canvas
  const downloadWallpaper = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `calwall-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            CalWall Studio
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
            Create stunning calendar wallpapers with real-time customization
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Device Preview */}
          <div className="flex flex-col items-center justify-center">
            <Card className="w-full max-w-md bg-card/50 backdrop-blur-sm border-border/50 shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Live Preview</CardTitle>
                <CardDescription>Your wallpaper updates in real-time</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center p-8">
                {/* iOS Device Frame */}
                <div className="relative">
                  {/* iPhone Frame */}
                  <div className="relative bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-[3rem] p-3 shadow-2xl">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-zinc-900 rounded-b-3xl z-10" />

                    {/* Screen */}
                    <div className="relative bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19.5] w-64 shadow-inner flex items-center justify-center">
                      {/* Canvas Wallpaper */}
                      <canvas
                        ref={canvasRef}
                        className="max-w-full max-h-full object-cover"
                      />
                    </div>

                    {/* Side Buttons */}
                    <div className="absolute -left-1 top-24 w-1 h-8 bg-zinc-800 rounded-l" />
                    <div className="absolute -left-1 top-36 w-1 h-12 bg-zinc-800 rounded-l" />
                    <div className="absolute -left-1 top-52 w-1 h-12 bg-zinc-800 rounded-l" />
                    <div className="absolute -right-1 top-32 w-1 h-16 bg-zinc-800 rounded-r" />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-6 justify-center">
                    <Button
                      onClick={downloadWallpaper}
                      variant="default"
                      size="sm"
                      className="gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* URL Copy Section */}
            <Card className="w-full max-w-md mt-6 bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">API URL</CardTitle>
                <CardDescription>Use this URL to generate wallpaper from the server</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    value={wallpaperUrl}
                    readOnly
                    className="font-mono text-xs bg-muted/50"
                  />
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="icon"
                    className="shrink-0"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                {copied && (
                  <p className="text-xs text-green-500 mt-2 animate-in fade-in">
                    ✓ Copied to clipboard!
                  </p>
                )}
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
                    <TabsTrigger value="basic">Basic</TabsTrigger>
                    <TabsTrigger value="colors">Colors</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>

                  {/* Basic Settings */}
                  <TabsContent value="basic" className="space-y-6 mt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="width">Width (px)</Label>
                        <Input
                          id="width"
                          type="number"
                          value={config.width}
                          onChange={(e) => handleChange('width', parseInt(e.target.value) || 1080)}
                          className="bg-background/50"
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
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mode">Mode</Label>
                      <select
                        id="mode"
                        value={config.mode}
                        onChange={(e) => handleChange('mode', e.target.value)}
                        className="w-full px-3 py-2 bg-background/50 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="month">Month</option>
                        <option value="year">Year</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone Offset (hours)</Label>
                      <Input
                        id="timezone"
                        type="number"
                        value={config.timezone}
                        onChange={(e) => handleChange('timezone', parseFloat(e.target.value) || 0)}
                        className="bg-background/50"
                        step="0.5"
                      />
                      <p className="text-xs text-muted-foreground">e.g., +5 for PKT, -5 for EST</p>
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
                          className="bg-background/50"
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
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-12 bg-background/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Built with CalWall API</p>
          <p className="text-xs text-muted-foreground">Real-time wallpaper generation</p>
        </div>
      </footer>
    </main>
  );
}