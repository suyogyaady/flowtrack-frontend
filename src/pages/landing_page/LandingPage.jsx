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
      title: "Finance Management",
      description: "Manage your expense and income with intuitive features",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Financial Reports",
      description:
        "Visualize your expense & income patterns and track your progress",
    },
    {
      icon: <Wallet className="w-8 h-8" />,
      title: "Analytics and Insights",
      description:
        "Project your financial status and review it in a meaningfull way",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.900" }}>
      {/* Header */}
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "grey.900",
          borderBottom: 1,
          borderColor: "grey.800",
        }}
      >
        <Toolbar>
          <Container
            maxWidth="lg"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 1,
            }}
          >
            <Box
              component="img"
              src="/assets/images/LogoTextLight.png"
              alt="FlowTrack Logo"
              sx={{ height: 35 }}
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="text"
                onClick={() => navigate("/login")}
                sx={{
                  color: "white",
                  "&:hover": {
                    color: "#4CAF50",
                  },
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate("/signup")}
                sx={{
                  bgcolor: "#4CAF50",
                  "&:hover": {
                    bgcolor: "#45a049",
                  },
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box component="main" sx={{ pt: 10 }}>
        {/* Hero Section */}
        <Box sx={{ bgcolor: "grey.900", py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <Box
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.75rem" },
                  fontWeight: "bold",
                  mb: 3,
                  lineHeight: 1.2,
                }}
              >
                Track Your Finances with
                <Box component="span" sx={{ color: "#4CAF50" }}>
                  {" "}
                  Flowtrack
                </Box>
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "grey.400",
                  mb: 4,
                  maxWidth: "800px",
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
                sx={{
                  height: 48,
                  px: 4,
                  bgcolor: "#4CAF50",
                  "&:hover": {
                    bgcolor: "#45a049",
                  },
                }}
                endIcon={<ArrowRight />}
              >
                Get Started
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Features Section */}
        <Box sx={{ bgcolor: "grey.800", py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="stretch">
              {features.map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Paper
                    sx={{
                      bgcolor: "grey.700",
                      p: 4,
                      borderRadius: 2,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Box sx={{ color: "#4CAF50" }}>{feature.icon}</Box>
                    <Typography
                      variant="h5"
                      sx={{
                        color: "white",
                        fontWeight: "500",
                      }}
                    >
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
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          bgcolor: "grey.900",
          borderTop: 1,
          borderColor: "grey.800",
          py: 3,
          mt: "auto",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            align="center"
            sx={{
              color: "grey.400",
              fontSize: "0.875rem",
            }}
          >
            © 2025 FlowTrack.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
