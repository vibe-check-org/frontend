import { Theme } from "@mui/material";
import Link from "next/link";

export default function SignUpLink({ theme }: { theme: Theme }) {
  return (
    <Link
      href="/register"
      style={{
        textDecoration: "none",
        color: theme.palette.secondary.main,
        fontWeight: "bold",
      }}
    >
      Registrieren
    </Link>
  );
}
