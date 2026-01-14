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
 * Controller to generate Target Goal Wallpaper
 * GET endpoint that returns a PNG image with dots representing days from start of period to target date.
 */
export const getTargetWallpaperImage = async (req, res) => {
    try {
        // Get dimensions from query params or use defaults
        const width = parseInt(req.query.width) || 1080;
        const height = parseInt(req.query.height) || 2400;
        const mode = req.query.mode || 'month'; // 'month' or 'year' defines the START date

        // Target Params
        const targetDateStr = req.query.targetDate;
        const targetTitle = req.query.targetTitle;

        if (!targetDateStr || !targetTitle) {
            return res.status(400).json({ error: 'Target Date and Target Title are required for this endpoint.' });
        }

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
        // New Param: Color for the target date dot itself
        const targetColor = '#' + (req.query.targetcolor || 'ef4444').replace('#', '');

        // Grid customization
        const cols = parseInt(req.query.cols) || 15;
        const dotRadiusMultiplier = parseFloat(req.query.dotradius) || 1.0;

        // Create canvas
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        // Calculate days with timezone adjustment
        const now = new Date();
        const localTime = new Date(now.getTime() + (timezoneOffset * 60 * 60 * 1000));

        // Determine Start Date
        let startDate;
        if (mode === 'month') {
            startDate = new Date(localTime.getFullYear(), localTime.getMonth(), 1);
        } else {
            // Year or default
            startDate = new Date(localTime.getFullYear(), 0, 1);
        }

        // Parse Target Date
        const targetDate = new Date(targetDateStr);

        // Validate dates
        if (isNaN(targetDate.getTime())) {
            return res.status(400).json({ error: 'Invalid Target Date format' });
        }

        // Calculate total days (Start -> Target)
        const diffTime = targetDate - startDate;
        const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        if (totalDays <= 0) {
            return res.status(400).json({
                error: 'Target Date must be after the start of the current period (Year or Month start).'
            });
        }

        // Calculate days passed (Start -> Today)
        const diffPassed = localTime - startDate;
        let daysPassed = Math.floor(diffPassed / (1000 * 60 * 60 * 24)) + 1;

        // Calculate Days Left and Percentage for display
        // Days Left = Total (Goal) - Passed. 
        // If Passed > Total, it's 0 or negative.
        let daysLeft = totalDays - daysPassed;
        if (daysLeft < 0) daysLeft = 0;

        // Percentage
        let percentComplete = Math.floor((daysPassed / totalDays) * 100);
        if (percentComplete > 100) percentComplete = 100;
        if (daysPassed < 1) percentComplete = 0;

        // Clamp daysPassed for dot coloring
        if (daysPassed < 1) daysPassed = 1;


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

            // Logic for coloring
            // i is 0-indexed (0 = Day 1).
            // daysPassed is 1-indexed.

            // Check if this is the Target Date Dot (the very last dot)
            const isTargetDot = (i === totalDays - 1);

            if (isTargetDot) {
                // Highlight Target Dot
                ctx.fillStyle = targetColor;
            } else {
                if (i < daysPassed - 1) {
                    // Completely passed
                    ctx.fillStyle = passedColor;
                } else if (i === daysPassed - 1) {
                    // Current day
                    ctx.fillStyle = currentColor;
                } else {
                    // Future
                    ctx.fillStyle = futureColor;
                }
            }

            // Correction for Over-shot:
            if (daysPassed > totalDays && !isTargetDot) {
                // If we passed the target, everything except the target dot (which stays highlighted) is passed.
                ctx.fillStyle = passedColor;
            }

            ctx.fill();
        }

        // Set font for bottom text (Poppins/GoogleSans)
        ctx.fillStyle = textColor;
        const fontSize = Math.floor(width / 25);
        ctx.font = `${fontSize}px GoogleSans, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // 1. Draw "Days Left • %" immediately below grid (standard position)
        const infoY = startY + gridHeight + Math.floor(textReservedSpace / 2);
        const infoText = `${daysLeft}d left • ${percentComplete}%`;
        ctx.fillText(infoText, width / 2, infoY);

        // 2. Draw "Target Title" at the BOTTOM of the screen
        // Account for paddingBottom and some margin
        // We ensure it's at least below the info text
        const safeBottomY = height - paddingBottom - (fontSize * 1.5);
        const titleY = Math.max(safeBottomY, infoY + fontSize * 2);

        ctx.font = `${Math.floor(fontSize * 1.2)}px GoogleSans, sans-serif`; // Slightly larger for title
        ctx.fillText(targetTitle, width / 2, titleY);

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
        console.error('Error generating target wallpaper:', error);
        res.status(500).json({
            error: 'Failed to generate target wallpaper',
            message: error.message
        });
    }
};
