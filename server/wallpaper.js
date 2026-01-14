#!/usr/bin/env node
/**
 * Real-time SVG Wallpaper Generator - Days Passed Tracker
 * Generates mobile wallpaper showing days passed in current month/year
 * 
 * Usage: node wallpaper.js [month|year]
 */

const fs = require('fs');

function generateSVGWallpaper(mode = 'month') {
    const now = new Date();

    // Mobile wallpaper dimensions
    const width = 1080;
    const height = 2400;

    let totalDays, daysPassed, title;

    if (mode === 'month') {
        // Days in current month
        const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        totalDays = Math.floor((nextMonth - thisMonth) / (1000 * 60 * 60 * 24));
        daysPassed = now.getDate();
        title = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } else {
        // Days in current year
        const isLeapYear = (now.getFullYear() % 4 === 0 &&
            (now.getFullYear() % 100 !== 0 || now.getFullYear() % 400 === 0));
        totalDays = isLeapYear ? 366 : 365;

        const startOfYear = new Date(now.getFullYear(), 0, 1);
        daysPassed = Math.ceil((now - startOfYear) / (1000 * 60 * 60 * 24)) + 1;
        title = `Year ${now.getFullYear()}`;
    }

    // Calculate grid layout
    const cols = 10;
    const rows = Math.ceil(totalDays / cols);

    // Dot sizing
    const dotSize = 20;
    const spacing = 30;

    // Center the grid
    const gridWidth = cols * spacing;
    const gridHeight = rows * spacing;
    const startX = Math.floor((width - gridWidth) / 2);
    const startY = Math.floor((height - gridHeight) / 2) - 100;

    // Build SVG
    let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0f0f1e;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bgGradient)"/>
  
  <!-- Title -->
  <text x="${width / 2}" y="${startY - 150}" font-family="Arial, sans-serif" 
        font-size="48" fill="#ffffff" text-anchor="middle" font-weight="bold">
    ${title}
  </text>
  
  <!-- Progress text -->
  <text x="${width / 2}" y="${startY - 80}" font-family="Arial, sans-serif" 
        font-size="32" fill="#888888" text-anchor="middle">
    Day ${daysPassed} of ${totalDays}
  </text>
  
  <!-- Percentage -->
  <text x="${width / 2}" y="${startY - 30}" font-family="Arial, sans-serif" 
        font-size="28" fill="#4CAF50" text-anchor="middle">
    ${((daysPassed / totalDays) * 100).toFixed(1)}% Complete
  </text>
  
  <!-- Dots -->
`;

    // Generate dots
    for (let i = 0; i < totalDays; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const x = startX + col * spacing + spacing / 2;
        const y = startY + row * spacing + spacing / 2;

        let color, opacity;
        if (i < daysPassed) {
            // Passed days - filled
            color = '#4CAF50';
            opacity = 1.0;
        } else {
            // Future days - subtle outline
            color = '#333333';
            opacity = 0.5;
        }

        svg += `  <circle cx="${x}" cy="${y}" r="${dotSize / 2}" fill="${color}" opacity="${opacity}"/>\n`;
    }

    // Footer with update time
    const timestamp = now.toISOString().replace('T', ' ').substring(0, 19);
    svg += `
  <!-- Footer -->
  <text x="${width / 2}" y="${height - 100}" font-family="Arial, sans-serif" 
        font-size="20" fill="#666666" text-anchor="middle">
    Updated: ${timestamp}
  </text>
</svg>`;

    return svg;
}

function saveWallpaper(filename, mode) {
    const svgContent = generateSVGWallpaper(mode);
    fs.writeFileSync(filename, svgContent, 'utf8');
    console.log(`Wallpaper saved to ${filename}`);
}

// Main execution
if (require.main === module) {
    const mode = process.argv[2] || 'both';

    if (mode === 'both') {
        saveWallpaper('wallpaper_month.svg', 'month');
        saveWallpaper('wallpaper_year.svg', 'year');
        console.log('\nGenerated wallpapers:');
        console.log('- wallpaper_month.svg (current month progress)');
        console.log('- wallpaper_year.svg (current year progress)');
    } else if (mode === 'month' || mode === 'year') {
        saveWallpaper(`wallpaper_${mode}.svg`, mode);
    } else {
        console.log('Usage: node wallpaper.js [month|year|both]');
        process.exit(1);
    }

    console.log('\nRun this script daily to update the wallpapers!');
}

module.exports = { generateSVGWallpaper, saveWallpaper };