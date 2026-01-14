import { createCanvas, registerFont } from 'canvas';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Register Poppins font
try {
    registerFont(path.join(__dirname, '../fonts/GoogleSans-Bold.ttf'), { family: 'GoogleSans', weight: 'bold' });
    registerFont(path.join(__dirname, '../fonts/GoogleSans-Regular.ttf'), { family: 'GoogleSans', weight: 'normal' });
} catch (error) {
    console.warn('GoogleSans font not found, will use system default');
}

/**
 * Helper to draw different shapes
 */
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
            // Simple 5-point star
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

/**
 * Controller to generate Target Goal Wallpaper
 */
export const getTargetWallpaperImage = async (req, res) => {
    try {
        // Dimensions
        const width = parseInt(req.query.width) || 1080;
        const height = parseInt(req.query.height) || 2400;
        const mode = req.query.mode || 'month';

        // Target Params
        const targetDateStr = req.query.targetDate;
        const targetTitle = req.query.targetTitle;

        if (!targetDateStr || !targetTitle) {
            return res.status(400).json({ error: 'Target Date and Target Title are required for this endpoint.' });
        }

        // Timezone
        const timezoneOffset = parseFloat(req.query.timezone) || 0;

        // Padding
        const paddingTop = parseInt(req.query.paddingtop) || 0;
        const paddingBottom = parseInt(req.query.paddingbottom) || 0;
        const paddingLeft = parseInt(req.query.paddingleft) || 0;
        const paddingRight = parseInt(req.query.paddingright) || 0;

        // Colors
        const bgColor = '#' + (req.query.bgcolor || '71717a').replace('#', '');
        const passedColor = '#' + (req.query.passedcolor || 'f97316').replace('#', '');
        const currentColor = '#' + (req.query.currentcolor || 'fbbf24').replace('#', '');
        const futureColor = '#' + (req.query.futurecolor || '52525b').replace('#', '');
        const textColor = '#' + (req.query.textcolor || 'ffffff').replace('#', '');
        const targetColor = '#' + (req.query.targetcolor || 'ef4444').replace('#', '');

        // Grid & Shape
        const cols = parseInt(req.query.cols) || 15;
        const dotRadiusMultiplier = parseFloat(req.query.dotradius) || 1.0;
        const targetShape = req.query.targetShape || 'circle'; // circle, square, diamond, star

        // Create canvas
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        // Date Logic
        const now = new Date();
        const localTime = new Date(now.getTime() + (timezoneOffset * 60 * 60 * 1000));

        // Start Date
        let startDate;
        if (mode === 'month') {
            startDate = new Date(localTime.getFullYear(), localTime.getMonth(), 1);
        } else {
            startDate = new Date(localTime.getFullYear(), 0, 1);
        }

        // Target Date
        const targetDate = new Date(targetDateStr);
        if (isNaN(targetDate.getTime())) {
            return res.status(400).json({ error: 'Invalid Target Date format' });
        }

        // Calculations
        const diffTime = targetDate - startDate;
        const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        if (totalDays <= 0) {
            return res.status(400).json({
                error: 'Target Date must be after the start of the current period (Year or Month start).'
            });
        }

        const diffPassed = localTime - startDate;
        let daysPassed = Math.floor(diffPassed / (1000 * 60 * 60 * 24)) + 1;

        let daysLeft = totalDays - daysPassed;
        if (daysLeft < 0) daysLeft = 0;

        let percentComplete = Math.floor((daysPassed / totalDays) * 100);
        if (percentComplete > 100) percentComplete = 100;
        if (daysPassed < 1) percentComplete = 0;

        if (daysPassed < 1) daysPassed = 1;

        // Layout
        const rows = Math.ceil(totalDays / cols);
        const availableWidth = width - paddingLeft - paddingRight;
        const availableHeight = height - paddingTop - paddingBottom;

        const estimatedFontSize = Math.floor(width / 25);
        const textReservedSpace = estimatedFontSize * 3;

        const maxSpacingWidth = Math.floor(availableWidth / (cols + 1));
        const maxSpacingHeight = Math.floor((availableHeight - textReservedSpace) / (rows + 1));
        const spacing = Math.min(maxSpacingWidth, maxSpacingHeight);

        const baseDotSize = Math.floor(spacing * 0.6);
        const dotSize = baseDotSize * dotRadiusMultiplier;

        const gridWidth = cols * spacing;
        const gridHeight = rows * spacing;

        const startX = paddingLeft + Math.floor((availableWidth - gridWidth) / 2);
        const startY = paddingTop + Math.floor((availableHeight - gridHeight - textReservedSpace) / 2);

        // Draw Background
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, width, height);

        // Draw Dots
        for (let i = 0; i < totalDays; i++) {
            const row = Math.floor(i / cols);
            const col = i % cols;
            const x = startX + col * spacing + spacing / 2;
            const y = startY + row * spacing + spacing / 2;

            const isTargetDot = (i === totalDays - 1);

            let color;
            if (isTargetDot) {
                color = targetColor;
            } else {
                if (i < daysPassed - 1) {
                    color = passedColor;
                } else if (i === daysPassed - 1) {
                    color = currentColor;
                } else {
                    color = futureColor;
                }
            }

            if (daysPassed > totalDays && !isTargetDot) {
                color = passedColor;
            }

            // Draw based on shape
            // Regular dots are always circles (unless specified otherwise? Requirement says "add target shape", presumably FOR the target dot)
            // Let's assume regular dots are circles, target dot can be shaped.
            if (isTargetDot) {
                // Draw customized target shape, maybe slightly larger?
                // Let's keep size consistent for now or slightly larger for emphasis
                drawShape(ctx, x, y, dotSize * 1.2, targetShape, color);
            } else {
                drawShape(ctx, x, y, dotSize, 'circle', color);
            }
        }

        // Draw Text
        ctx.fillStyle = textColor;
        const fontSize = Math.floor(width / 25);
        ctx.font = `${fontSize}px GoogleSans, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Info Text
        const infoY = startY + gridHeight + Math.floor(textReservedSpace / 2);
        const infoText = `${daysLeft}d left • ${percentComplete}%`;
        ctx.fillText(infoText, width / 2, infoY);

        // Title Text
        const safeBottomY = height - paddingBottom - (fontSize * 1.5);
        const titleY = Math.max(safeBottomY, infoY + fontSize * 2);

        ctx.font = `${Math.floor(fontSize * 1.2)}px GoogleSans, sans-serif`;
        ctx.fillText(targetTitle, width / 2, titleY);

        // Response
        const buffer = canvas.toBuffer('image/png');
        res.set({
            'Content-Type': 'image/png',
            'Content-Length': buffer.length,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        });
        res.send(buffer);

    } catch (error) {
        console.error('Error generating target wallpaper:', error);
        res.status(500).json({
            error: 'Failed to generate target wallpaper',
            message: error.message
        });
    }
};
