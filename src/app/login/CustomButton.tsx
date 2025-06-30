import { Button } from "@mui/material";
import { Props } from "./CustomPasswordField";

export default function CustomButton({ loading = false, theme }: Props) {
  return (
    <Button
      type="submit"
      variant="contained"
      fullWidth
      sx={{
        my: 2,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.background.default,
        transition: "background-color 0.3s, transform 0.3s",
        "&:hover": {
          backgroundColor: theme.palette.secondary.main,
          transform: "scale(1.03)",
        },
      }}
    >
      {loading ? <span className="spinner" /> : "Log In"}
    </Button>
  );
}
