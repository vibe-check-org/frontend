"use client";
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  CircularProgress,
  TextField,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const theme = useTheme();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent) =>
    event.preventDefault();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.ok) {
      router.push("/dashboard");
    } else {
      setError("Ungültige Anmeldedaten. Bitte versuche es erneut.");
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box width="100%" p={4} borderRadius={4} boxShadow={3} bgcolor="white">
        <Typography
          variant="h4"
          fontWeight="bold"
          color={theme.palette.primary.main}
          gutterBottom
          textAlign="center"
        >
          VibeCheck Login
        </Typography>
        <Typography
          variant="subtitle1"
          color={theme.palette.secondary.main}
          gutterBottom
          textAlign="center"
        >
          Bitte melde dich mit deinen Zugangsdaten an
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            fullWidth
            margin="normal"
            required
            InputProps={{
              style: { backgroundColor: theme.palette.background.paper },
            }}
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel htmlFor="password">Passwort</InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Passwort"
              required
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 2,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.getContrastText(theme.palette.primary.main),
              "&:hover": {
                backgroundColor: theme.palette.info.main,
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Anmelden"
            )}
          </Button>
        </form>
        {error && (
          <Typography variant="body2" color="error" mt={2}>
            {error}
          </Typography>
        )}
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Noch kein Konto?{" "}
            <a
              href="/register"
              style={{
                color: theme.palette.secondary.main,
                textDecoration: "underline",
              }}
            >
              Jetzt registrieren
            </a>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
