import { createCanvas, registerFont } from 'canvas';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Register Poppins font (you'll need to download and place the font file)
try {
    registerFont(path.join(__dirname, '../fonts/GoogleSans-Bold.ttf'), { family: 'GoogleSans', weight: 'bold' });
    registerFont(path.join(__dirname, '../fonts/GoogleSans-Regular.ttf'), { family: 'GoogleSans', weight: 'normal' });
} catch (error) {
    console.warn('GoogleSans font not found, will use system default');
}

/**
 * Controller to generate PNG wallpaper image with extensive customization
 * GET endpoint that returns a PNG image with calendar dots
 * 
 * Query Parameters:
 * - width: Image width (default: 1080)
 * - height: Image height (default: 2400)
 * - mode: 'month' or 'year' (default: 'month')
 * - timezone: Timezone offset in hours (default: 0, e.g., +5 for PKT)
 * - paddingtop: Top padding in pixels (default: 0)
 * - paddingbottom: Bottom padding in pixels (default: 0)
 * - paddingleft: Left padding in pixels (default: 0)
 * - paddingright: Right padding in pixels (default: 0)
 * - bgcolor: Background color in hex (default: #71717a)
 * - passedcolor: Color for passed days dots (default: #f97316)
 * - currentcolor: Color for current day dot (default: #fbbf24)
 * - futurecolor: Color for future days dots (default: #52525b)
 * - textcolor: Color for bottom text (default: #ffffff)
 * - cols: Number of columns (default: 15)
 * - dotradius: Dot radius multiplier (default: 1.0)
 */
export const getWallpaperImage = async (req, res) => {
    try {
        // Get dimensions from query params or use defaults
        const width = parseInt(req.query.width) || 1080;
        const height = parseInt(req.query.height) || 2400;
        const mode = req.query.mode || 'month'; // 'month' or 'year'

        // Timezone support (offset in hours)
        const timezoneOffset = parseFloat(req.query.timezone) || 0;

        // Padding customization
        const paddingTop = parseInt(req.query.paddingtop) || 0;
        const paddingBottom = parseInt(req.query.paddingbottom) || 0;
        const paddingLeft = parseInt(req.query.paddingleft) || 0;
        const paddingRight = parseInt(req.query.paddingright) || 0;

        // Color customization (add # if not present)
        const bgColor = '#' + (req.query.bgcolor || '71717a').replace('#', '');
        const passedColor = '#' + (req.query.passedcolor || 'f97316').replace('#', '');
        const currentColor = '#' + (req.query.currentcolor || 'fbbf24').replace('#', '');
        const futureColor = '#' + (req.query.futurecolor || '52525b').replace('#', '');
        const textColor = '#' + (req.query.textcolor || 'ffffff').replace('#', '');

        // Grid customization
        const cols = parseInt(req.query.cols) || 15;
        const dotRadiusMultiplier = parseFloat(req.query.dotradius) || 1.0;

        // Create canvas
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        // Calculate days with timezone adjustment
        const now = new Date();
        const localTime = new Date(now.getTime() + (timezoneOffset * 60 * 60 * 1000));

        let totalDays, daysPassed, title;

        if (mode === 'month') {
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
        const rows = Math.ceil(totalDays / cols);

        // Auto-layout: Calculate available space after padding
        const availableWidth = width - paddingLeft - paddingRight;
        const availableHeight = height - paddingTop - paddingBottom;

        // Reserve space for text at bottom (font size + spacing)
        const estimatedFontSize = Math.floor(width / 25);
        const textReservedSpace = estimatedFontSize * 3; // Font size + spacing above and below

        // Calculate maximum spacing that fits in both width and height
        const maxSpacingWidth = Math.floor(availableWidth / (cols + 1));
        const maxSpacingHeight = Math.floor((availableHeight - textReservedSpace) / (rows + 1));

        // Use the smaller of the two to ensure it fits in both dimensions
        const spacing = Math.min(maxSpacingWidth, maxSpacingHeight);

        // Calculate dot size based on spacing (with radius multiplier)
        const baseDotSize = Math.floor(spacing * 0.6); // 60% of spacing
        const dotSize = baseDotSize * dotRadiusMultiplier;

        // Calculate actual grid dimensions
        const gridWidth = cols * spacing;
        const gridHeight = rows * spacing;

        // Center the grid within available space
        const startX = paddingLeft + Math.floor((availableWidth - gridWidth) / 2);
        const startY = paddingTop + Math.floor((availableHeight - gridHeight - textReservedSpace) / 2);

        // Background
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, width, height);

        // Draw dots
        for (let i = 0; i < totalDays; i++) {
            const row = Math.floor(i / cols);
            const col = i % cols;
            const x = startX + col * spacing + spacing / 2;
            const y = startY + row * spacing + spacing / 2;

            ctx.beginPath();
            ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2);

            if (i < daysPassed - 1) {
                // Passed days
                ctx.fillStyle = passedColor;
            } else if (i === daysPassed - 1) {
                // Current day
                ctx.fillStyle = currentColor;
            } else {
                // Future days
                ctx.fillStyle = futureColor;
            }
            ctx.fill();
        }

        // Bottom text - Auto-positioned below grid with safe spacing
        const bottomY = startY + gridHeight + Math.floor(textReservedSpace / 2);

        // Set font for bottom text (Poppins)
        ctx.fillStyle = textColor;
        const fontSize = Math.floor(width / 25);
        ctx.font = `${fontSize}px GoogleSans, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Draw combined text: "Xd left • Y%"
        const bottomText = `${daysLeft}d left • ${percentComplete}%`;
        ctx.fillText(bottomText, width / 2, bottomY);

        // Convert canvas to PNG buffer
        const buffer = canvas.toBuffer('image/png');

        // Set response headers
        res.set({
            'Content-Type': 'image/png',
            'Content-Length': buffer.length,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        });
        // Send PNG image
        res.send(buffer);

    } catch (error) {
        console.error('Error generating wallpaper:', error);
        res.status(500).json({
            error: 'Failed to generate wallpaper',
            message: error.message
        });
    }
};
