'use client'
import React, { useState, MouseEvent } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Theme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export interface Props {
  theme: Theme;
  loading?: boolean;
}

export default function CustomPasswordField({ theme }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event: MouseEvent) => event.preventDefault();

  return (
    <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
      <InputLabel size="small" htmlFor="outlined-adornment-password">
        Passwort
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        name="password"
        size="small"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              size="small"
              sx={{
                transition: "transform 0.3s",
                "&:hover": { transform: "rotate(20deg)" },
              }}
            >
              {showPassword ? (
                <VisibilityOff
                  fontSize="inherit"
                  style={{ color: theme.palette.secondary.main }}
                />
              ) : (
                <Visibility
                  fontSize="inherit"
                  style={{ color: theme.palette.secondary.main }}
                />
              )}
            </IconButton>
          </InputAdornment>
        }
        label="Passwort"
      />
    </FormControl>
  );
}
