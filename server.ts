import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import bodyParser from "body-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(bodyParser.json());

  // Mock database for purchase intents
  const purchaseIntents: any[] = [];

  // API routes
  app.post("/api/purchase-intent", (req, res) => {
    const { productId, userId, email, name } = req.body;
    
    if (!productId || !userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const intent = {
      id: Math.random().toString(36).substr(2, 9),
      productId,
      userId,
      email,
      name,
      timestamp: new Date().toISOString(),
    };

    purchaseIntents.push(intent);
    console.log("New Purchase Intent:", intent);
    
    res.status(201).json({ success: true, intent });
  });

  app.get("/api/my-intents/:userId", (req, res) => {
    const userIntents = purchaseIntents.filter(i => i.userId === req.params.userId);
    res.json(userIntents);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
