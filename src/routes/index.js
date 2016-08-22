"use strict";
import Router from  "express";

const router = Router();

router.get("*", (req, resp) => {
    resp.send("Page not found");
});

export default router;
