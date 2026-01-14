import express, { Router } from 'express'
import { getWallpaperImage } from '../controllers/wallpaper.js';
const wallpaperRoute = express.Router();

wallpaperRoute.get('/getCalWall', getWallpaperImage)

export default wallpaperRoute