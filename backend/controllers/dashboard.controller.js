export const getDashboard = (req, res) => {
    try {
        res.json({ 
            message: `Welcome to the dashboard, ${req.user.role}!`, 
            user: req.user 
        });
    } catch (error) {
        console.error("Error fetching dashboard:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
