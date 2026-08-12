import express from 'express';
import authRoutes from './routes/auth.routes.js';


const app = express();

app.use(express.json());

//Routes
app.use("/api/v1/auth", authRoutes);

//checking if server is reachable
app.get("/api/health", (req, res) =>{
    res.status(200).json({
        status: "ok",
        service: "tenantcart-backend"
    });
});

//404 fallback for wrong routes
app.use((req, res) => {
    res.status(404).json({error: "Route not found"});
});


export default app;
