import { Router } from "express";

const router = Router();

router.get("/me", (req, res) => {
  res.json({ id: "demo", name: "Demo User" });
});

export default router;


