import { AccountCircle } from "@mui/icons-material";
import { InputAdornment, TextField, Theme } from "@mui/material";

export default function CustomUsernameField({ theme }: { theme: Theme }) {
  return (
    <TextField
      label="Username"
      name="username"
      type="text"
      size="small"
      required
      fullWidth
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AccountCircle
              fontSize="inherit"
              style={{ color: theme.palette.secondary.main }}
            />
          </InputAdornment>
        ),
        style: { backgroundColor: theme.palette.background.default },
      }}
      sx={{
        my: 1,
        transition: "transform 0.3s",
        "&:hover": { transform: "scale(1.02)" },
      }}
    />
  );
}
