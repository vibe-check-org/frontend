import { Theme } from "@mui/material";
import Link from "next/link";

export default function ForgotPasswordLink({ theme }: { theme: Theme }) {
  return (
    <Link
      href="/forgot-password"
      style={{
        textDecoration: "none",
        color: theme.palette.secondary.main,
        fontWeight: "bold",
      }}
    >
      Passwort vergessen?
    </Link>
  );
}
