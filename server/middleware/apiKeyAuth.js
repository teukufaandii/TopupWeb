const API_KEY = process.env.API_KEY;

const apiKeyAuth = (req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    const apiKey = req.headers["x-api-key"];
    if (apiKey && apiKey === API_KEY) {
      next();
    } else {
      res.status(401).json({ error: "Unauthorized: Invalid API Key" });
    }
  } else if (process.env.NODE_ENV === "development") {
    next();
  } else {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default apiKeyAuth;
