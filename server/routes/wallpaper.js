import express, { Router } from 'express'
import { getWallpaperImage } from '../controllers/wallpaper.js';
import { getTargetWallpaperImage } from '../controllers/target_wallpaper.js';
const wallpaperRoute = express.Router();

wallpaperRoute.get('/getCalWall', getWallpaperImage);
wallpaperRoute.get('/getTargetCalWall', getTargetWallpaperImage);

export default wallpaperRoute