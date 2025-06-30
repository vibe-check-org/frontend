"use client";
import { JSX, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  useTheme,
  Tabs,
  Tab,
  CircularProgress,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { AppProvider } from "@toolpad/core/AppProvider";
import {
  AuthProvider,
  AuthResponse,
  SupportedAuthProvider,
} from "@toolpad/core/SignInPage";
import { ENV } from "../../utils/env";
import { getLogger } from "../../utils/logger";
import Image from "next/image";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import KeyIcon from "@mui/icons-material/Key";

import CustomUsernameField from "./CustomUsernameField";
import CustomPasswordField from "./CustomPasswordField";
import CustomButton from "./CustomButton";
import SignUpLink from "./SignUpLink";
import ForgotPasswordLink from "./ForgotPasswordLink";

const { DEFAULT_ROUTE } = ENV;

const BRANDING = {
  logo: (
    <Image
      src="https://mui.com/static/logo.svg"
      alt="MUI logo"
      width={50}
      height={30}
    />
  ),
  title: "Vibe Check",
  tagline: "Zeig, wer du bist – nicht nur, was du gelernt hast",
};

const providers: {
  id: SupportedAuthProvider;
  name: string;
  icon?: JSX.Element;
}[] = [
  { id: "github", name: "GitHub", icon: <GitHubIcon /> },
  { id: "google", name: "Google", icon: <GoogleIcon /> },
  { id: "facebook", name: "Facebook", icon: <FacebookIcon /> },
  { id: "twitter", name: "Twitter", icon: <TwitterIcon /> },
  { id: "linkedin", name: "LinkedIn", icon: <LinkedInIcon /> },
  { id: "keycloak", name: "Keycloak", icon: <KeyIcon /> },
  { id: "credentials", name: "Username and Password" },
];

const handleLogin = async (
  provider: AuthProvider,
  formData?: FormData
): Promise<AuthResponse> => {
  const logger = getLogger("handleLogin");
  try {
    if (provider.id === "credentials") {
      const username = formData?.get("username")?.toString() ?? "";
      const password = formData?.get("password")?.toString() ?? "";

      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      if (!result)
        return { type: "CredentialsSignin", error: "Keine Antwort vom Server" };

      return {
        type: "CredentialsSignin",
        success: result.ok ? "Login erfolgreich" : undefined,
        error:
          result.error ?? (!result.ok ? "Ungültige Anmeldedaten." : undefined),
      };
    }

    if (provider.id === "keycloak") {
      const result = await signIn("keycloak", { callbackUrl: "/dashboard" });
      if (!result)
        return {
          type: "CredentialsSignin",
          error: "Keine Antwort vom Auth-Provider",
        };

      return {
        type: "CredentialsSignin",
        success: result.ok ? "Erfolgreich angemeldet" : undefined,
        error: result.error || 's',
      };
    }

    // Fallback: Simulation (z.B. für andere OAuth-Anbieter ohne Backend-Anbindung)
    alert(`Signing in with "${provider.name}"`);
    return {
      type: "CredentialsSignin",
      success: "Prüfe deine E-Mail für den Link",
      error: "", // optional
    };
  } catch (err) {
    logger.error(err);
    return { type: "CredentialsSignin", error: String(err) };
  }
};

export default function LoginPage() {
  const theme = useTheme();
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [providerLoading, setProviderLoading] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleCredentialsSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const provider = providers.find((p) => p.id === "credentials")!;
    const result = await handleLogin(provider, formData);
    setLoading(false);
    if (result.success) router.push(DEFAULT_ROUTE);
    else
      setError(
        result.error || "Ungültige Anmeldedaten. Bitte erneut versuchen."
      );
  };

  return (
    <AppProvider branding={BRANDING} theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Box sx={{ display: "flex", width: "100%", maxWidth: 1200, gap: 4 }}>
          <Paper elevation={8} sx={{ flex: 1, p: 4, borderRadius: 3 }}>
            <Box sx={{ mb: 2, textAlign: "center" }}>
              {BRANDING.logo}
              <Typography variant="h4" sx={{ mt: 1 }}>
                {BRANDING.title}
              </Typography>
              <Typography variant="subtitle1">{BRANDING.tagline}</Typography>
            </Box>

            <Tabs
              value={tabIndex}
              onChange={(_, val) => setTabIndex(val)}
              variant="fullWidth"
              sx={{ mb: 2 }}
            >
              <Tab label="Login" />
              <Tab label="Mit Anbieter anmelden" />
            </Tabs>

            {tabIndex === 0 && (
              <Box>
                <form onSubmit={handleCredentialsSubmit}>
                  <CustomUsernameField theme={theme} />
                  <CustomPasswordField theme={theme} />
                  <CustomButton loading={loading} theme={theme} />
                </form>
                {error && (
                  <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                  </Typography>
                )}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <SignUpLink theme={theme} />
                  <ForgotPasswordLink theme={theme} />
                </Box>
              </Box>
            )}

            {tabIndex === 1 && (
              <Box>
                <Typography variant="h5" align="center" sx={{ mb: 2 }}>
                  Anmelden mit
                </Typography>
                {providers
                  .filter((p) => p.id !== "credentials")
                  .map((provider) => (
                    <Button
                      key={provider.id}
                      variant="outlined"
                      startIcon={provider.icon}
                      fullWidth
                      onClick={async () => {
                        setProviderLoading(provider.id);
                        await handleLogin(provider);
                        setProviderLoading(null);
                      }}
                      sx={{
                        my: 1,
                        transition: "transform 0.3s",
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        "&:hover": {
                          transform: "scale(1.02)",
                          borderColor: theme.palette.secondary.main,
                          color: theme.palette.secondary.main,
                        },
                      }}
                    >
                      {providerLoading === provider.id ? (
                        <CircularProgress size={20} />
                      ) : (
                        provider.name
                      )}
                    </Button>
                  ))}
              </Box>
            )}
          </Paper>
        </Box>
      </Box>
    </AppProvider>
  );
}
