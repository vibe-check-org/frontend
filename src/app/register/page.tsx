"use client";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { REGISTER_MUTATION } from "../../graphql/auth/auth2";
import { useSession } from "next-auth/react";
import getApolloClient from "../../lib/apolloClient";

const schema = z.object({
  vorname: z.string().min(1, "Vorname ist erforderlich"),
  nachname: z.string().min(1, "Nachname ist erforderlich"),
  email: z.string().email("Ungültige E-Mail"),
  password: z.string().min(6, "Mind. 6 Zeichen"),
});

export default function RegisterPage() {
  const theme = useTheme();
  const router = useRouter();
  // const { data: session } = useSession();
  const client = getApolloClient("session?.access_token");
  const [registerUser, { loading }] = useMutation(REGISTER_MUTATION, {client});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data: any) => {
    try {
      await registerUser({ variables: { input: data } });
      router.push("/login");
    } catch (error) {
      console.error(error);
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
          VibeCheck Registrierung
        </Typography>
        <Typography
          variant="subtitle1"
          color={theme.palette.secondary.main}
          gutterBottom
          textAlign="center"
        >
          Erstelle dein Skill-Profil
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("vorname")}
            label="Vorname"
            fullWidth
            margin="normal"
            error={!!errors.vorname}
            helperText={errors.vorname?.message}
          />
          <TextField
            {...register("nachname")}
            label="Nachname"
            fullWidth
            margin="normal"
            error={!!errors.nachname}
            helperText={errors.nachname?.message}
          />
          <TextField
            {...register("email")}
            label="E-Mail"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            {...register("password")}
            type="password"
            label="Passwort"
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
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
              "Registrieren"
            )}
          </Button>
        </form>
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Schon registriert?{" "}
            <a
              href="/login"
              style={{
                color: theme.palette.secondary.main,
                textDecoration: "underline",
              }}
            >
              Zur Anmeldung
            </a>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
