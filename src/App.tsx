import { motion, useAnimation, useInView } from "framer-motion";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
  IconButton,
} from "@mui/material";
import { Brain, BarChart3, Cpu, Globe2 } from "lucide-react";
import { Brightness4 } from "@mui/icons-material";
import { useColorMode } from "./main";
import ParticleBackground from "./components/ParticleBackground";
import { useRef, useEffect } from "react";

/** 🔹 Reusable Section Wrapper with scroll animation */
function AnimatedSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: "easeOut" },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const { toggleColorMode } = useColorMode();

  const services = [
    {
      icon: <BarChart3 size={36} color="#2563eb" />,
      title: "Data Analytics",
      desc: `End-to-end analytics that transform raw data into actionable insights for smarter business decisions.`,
    },
    {
      icon: <Brain size={36} color="#2563eb" />,
      title: "Artificial Intelligence",
      desc: `Implement machine learning, NLP, and AI-driven automation that streamline operations and accelerate innovation.`,
    },
    {
      icon: <Cpu size={36} color="#2563eb" />,
      title: "IT Consulting",
      desc: `Future-proof IT strategies, cloud transformation, and architecture optimization to enable secure scalability.`,
    },
    {
      icon: <Globe2 size={36} color="#2563eb" />,
      title: "Data Engineering",
      desc: `Build high-performance data pipelines and integrations that unify ecosystems for AI and analytics readiness.`,
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Header */}
      <AppBar position="sticky" color="inherit" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          <Typography variant="h6" color="primary" fontWeight="bold">
            North Data in Motion
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button href="#services" color="primary">
              Services
            </Button>
            <Button href="#about" color="primary">
              About
            </Button>
            <Button href="#contact" color="primary">
              Contact
            </Button>
            <IconButton onClick={toggleColorMode} color="primary">
              <Brightness4 />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          py: { xs: 8, md: 10 },
          px: { xs: 2, md: 6 },
          background: (theme) =>
            theme.palette.mode === "light"
              ? "linear-gradient(120deg, #f5f8ff 0%, #ffffff 100%)"
              : "linear-gradient(120deg, #0a0f1c 0%, #161b22 100%)",
        }}
      >
        <ParticleBackground />
        <Container maxWidth="lg">
          <AnimatedSection>
            <Grid container spacing={6} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                  Turning Data into{" "}
                  <Box component="span" sx={{ color: "primary.main" }}>
                    Actionable Intelligence
                  </Box>
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ mb: 3, maxWidth: 600 }}
                >
                  North Data in Motion empowers enterprises with data analytics,
                  AI, and engineering excellence — translating complexity into
                  clarity and competitive advantage.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  href="#contact"
                  sx={{
                    borderRadius: 2,
                    px: 4,
                    py: 1.25,
                    textTransform: "none",
                    fontWeight: 600,
                    boxShadow: "0 6px 18px rgba(37,99,235,0.3)",
                    "&:hover": {
                      boxShadow: "0 8px 24px rgba(37,99,235,0.4)",
                    },
                  }}
                >
                  Let’s Talk Data
                </Button>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Box
                    component="img"
                    src="https://img.freepik.com/free-vector/gradient-network-connection-background_23-2148874050.jpg"
                    alt="AI Data Visualization"
                    sx={{
                      width: "100%",
                      maxWidth: 460,
                      borderRadius: 3,
                      boxShadow:
                        "0 10px 30px rgba(0,0,0,0.08), 0 0 32px rgba(37,99,235,0.25)",
                    }}
                  />
                </motion.div>
              </Grid>
            </Grid>
          </AnimatedSection>
        </Container>
      </Box>

      <AnimatedDivider />

      {/* Services Section */}
      <Box
        id="services"
        sx={{
          py: { xs: 8, md: 10 },
          px: { xs: 2, md: 6 },
          bgcolor: "background.paper",
        }}
      >
        <Container maxWidth="lg">
          <AnimatedSection>
            <Typography
              variant="h4"
              align="center"
              fontWeight="bold"
              sx={{ mb: 6 }}
            >
              Our Expertise
            </Typography>

            <Grid container spacing={3} alignItems="stretch">
              {services.map((service, i) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i} sx={{ display: "flex" }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    style={{ width: "100%" }}
                  >
                    <Card
                      elevation={2}
                      sx={{
                        flex: 1,
                        height: "100%",
                        borderRadius: 3,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        p: 3,
                        textAlign: "center",
                        background: (theme) =>
                          theme.palette.mode === "light"
                            ? "#fff"
                            : "rgba(255,255,255,0.04)",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box sx={{ mb: 2 }}>{service.icon}</Box>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                          {service.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {service.desc}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

          </AnimatedSection>
        </Container>
      </Box>

      <AnimatedDivider />

      {/* About Section */}
      <Box id="about" sx={{ py: 10, bgcolor: "background.default" }}>
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <AnimatedSection>
            <Globe2 size={44} color="#2563eb" />
            <Typography variant="h4" fontWeight="bold" mt={2} mb={2}>
              About Us
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 700, mx: "auto", lineHeight: 1.7 }}
            >
              North Data in Motion combines innovation with intelligence —
              crafting secure, scalable, and AI-ready solutions that empower
              organizations to act on insight and shape the future with data.
            </Typography>
          </AnimatedSection>
        </Container>
      </Box>

      <AnimatedDivider />

      {/* Contact Section */}
      <Box id="contact" sx={{ py: 10 }}>
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <AnimatedSection>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Let’s Collaborate
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              paragraph
              sx={{ mb: 3 }}
            >
              Whether you’re scaling analytics, modernizing your data stack, or
              building intelligent AI systems — our experts can help you move
              forward confidently.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email:{" "}
              <a
                href="mailto:ceo@northdim.com"
                style={{ color: "#2563eb", textDecoration: "none" }}
              >
                ceo@northdim.com
              </a>
            </Typography>
          </AnimatedSection>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 3, textAlign: "center", color: "text.secondary", fontSize: 14 }}>
        © {new Date().getFullYear()} North Data in Motion. All rights reserved.
      </Box>
    </Box>
  );
}

/** ✨ Animated Gradient Divider */
function AnimatedDivider() {
  return (
    <Box
      sx={{
        height: 2,
        width: "80%",
        mx: "auto",
        my: 3,
        borderRadius: 2,
        background: "linear-gradient(90deg, #2563eb, #9333ea, #2563eb)",
        backgroundSize: "200% 100%",
        animation: "gradientMove 6s linear infinite",
        "@keyframes gradientMove": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      }}
    />
  );
}
