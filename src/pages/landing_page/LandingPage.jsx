import React from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  Toolbar,
} from "@mui/material";
import { ArrowRight, PieChart, TrendingUp, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <PieChart className="w-8 h-8" />,
      title: "Expense Analytics",
      description:
        "Visualize your spending patterns with intuitive charts and graphs",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Budget Tracking",
      description:
        "Set and monitor budgets to reach your financial goals faster",
    },
    {
      icon: <Wallet className="w-8 h-8" />,
      title: "Smart Savings",
      description: "Intelligent suggestions to help you save more effectively",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.900" }}>
      {/* Header */}
      <AppBar
        position="fixed"
        sx={{ bgcolor: "grey.900", borderBottom: 1, borderColor: "grey.800" }}
      >
        <Toolbar>
          <Container
            maxWidth="lg"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              FlowTrack
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="text"
                onClick={() => navigate("/login")}
                sx={{ color: "white" }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate("/signup")}
                sx={{ bgcolor: "primary.main" }}
              >
                Sign Up
              </Button>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box component="main" sx={{ pt: 8 }}>
        {/* Hero Section */}
        <Box sx={{ bgcolor: "grey.900", py: 12 }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.75rem" },
                  fontWeight: "bold",
                  mb: 3,
                }}
              >
                Track Your Finances with
                <Box component="span" sx={{ color: "primary.main" }}>
                  {" "}
                  Precision
                </Box>
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "grey.400",
                  mb: 4,
                  maxWidth: "xl",
                  mx: "auto",
                }}
              >
                Take control of your financial future with FlowTrack. Smart
                tracking, intuitive analytics, and personalized insights all in
                one place.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/signup")}
                sx={{ height: 48, px: 4 }}
                endIcon={<ArrowRight />}
              >
                Get Started
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Features Section */}
        <Box sx={{ bgcolor: "grey.800", py: 12 }}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Paper
                    sx={{
                      bgcolor: "grey.700",
                      p: 3,
                      borderRadius: 2,
                      height: "100%",
                    }}
                  >
                    <Box sx={{ color: "primary.main", mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" sx={{ color: "white", mb: 2 }}>
                      {feature.title}
                    </Typography>
                    <Typography sx={{ color: "grey.400" }}>
                      {feature.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Stats Section */}
        <Box sx={{ bgcolor: "grey.900", py: 12 }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} textAlign="center">
              <Grid item xs={12} md={4}>
                <Typography variant="h3" sx={{ color: "white", mb: 1 }}>
                  50K+
                </Typography>
                <Typography sx={{ color: "grey.400" }}>Active Users</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h3" sx={{ color: "white", mb: 1 }}>
                  $2M+
                </Typography>
                <Typography sx={{ color: "grey.400" }}>
                  Tracked Monthly
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h3" sx={{ color: "white", mb: 1 }}>
                  98%
                </Typography>
                <Typography sx={{ color: "grey.400" }}>
                  User Satisfaction
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          bgcolor: "grey.900",
          borderTop: 1,
          borderColor: "grey.800",
          py: 3,
        }}
      >
        <Container maxWidth="lg">
          <Typography align="center" sx={{ color: "grey.400" }}>
            © 2025 FlowTrack. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
