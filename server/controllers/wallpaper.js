import { createCanvas } from 'canvas';

/**
 * Controller to generate PNG wallpaper image
 * GET endpoint that returns a PNG image with calendar dots
 */
export const getWallpaperImage = async (req, res) => {
    try {
        // Get dimensions from query params or use defaults
        const width = parseInt(req.query.width) || 1080;
        const height = parseInt(req.query.height) || 2400;
        const mode = req.query.mode || 'month'; // 'month' or 'year'

        // Create canvas
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        // Calculate days
        const now = new Date();
        let totalDays, daysPassed, title;

        if (mode === 'month') {
            const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
            const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            totalDays = Math.floor((nextMonth - thisMonth) / (1000 * 60 * 60 * 24));
            daysPassed = now.getDate();
            title = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        } else {
            const isLeapYear = (now.getFullYear() % 4 === 0 &&
                (now.getFullYear() % 100 !== 0 || now.getFullYear() % 400 === 0));
            totalDays = isLeapYear ? 366 : 365;

            const startOfYear = new Date(now.getFullYear(), 0, 1);
            daysPassed = Math.ceil((now - startOfYear) / (1000 * 60 * 60 * 24)) + 1;
            title = `Year ${now.getFullYear()}`;
        }

        // Calculate days left
        const daysLeft = totalDays - daysPassed;
        const percentComplete = Math.floor((daysPassed / totalDays) * 100);

        // Grid layout - 15 columns as specified
        const cols = 15;
        const rows = Math.ceil(totalDays / cols);

        // Dot sizing - responsive to width
        const dotSize = Math.floor(width / 27);
        const spacing = Math.floor(width / (cols + 2));

        // Center the grid
        const gridWidth = cols * spacing;
        const gridHeight = rows * spacing;
        const startX = Math.floor((width - gridWidth) / 2);
        const startY = Math.floor((height - gridHeight) / 2);

        // Background - Zinc color (#71717a)
        ctx.fillStyle = '#71717a';
        ctx.fillRect(0, 0, width, height);

        // Draw dots
        for (let i = 0; i < totalDays; i++) {
            const row = Math.floor(i / cols);
            const col = i % cols;
            const x = startX + col * spacing + spacing / 2;
            const y = startY + row * spacing + spacing / 2;

            ctx.beginPath();
            ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2);

            if (i < daysPassed) {
                // Passed days - Orange (#f97316)
                ctx.fillStyle = '#f97316';
            } else {
                // Future days - darker zinc
                ctx.fillStyle = '#52525b';
            }
            ctx.fill();
        }

        // Bottom text - Days left and percentage
        const bottomY = startY + gridHeight + Math.floor(height * 0.08);

        // Set font for bottom text
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${Math.floor(width / 25)}px Arial, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Draw days left
        ctx.fillText(`${daysLeft}d left`, width / 2, bottomY);

        // Draw percentage complete
        // ctx.fillText(`${percentComplete}% complete`, width / 2, bottomY + Math.floor(width / 20));

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
