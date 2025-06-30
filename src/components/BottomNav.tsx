"use client";

import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InsightsIcon from "@mui/icons-material/Insights";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (pathname.startsWith("/dashboard")) setValue(0);
    else if (pathname.startsWith("/vibeprofil")) setValue(1);
    else if (pathname.startsWith("/profil")) setValue(2);
  }, [pathname]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (_event: any, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        router.push("/dashboard");
        break;
      case 1:
        router.push("/vibeprofil");
        break;
      case 2:
        router.push("/profil");
        break;
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        maxWidth: 600,
        margin: "0 auto",
      }}
    >
      <BottomNavigation showLabels value={value} onChange={handleChange}>
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Profil" icon={<InsightsIcon />} />
        <BottomNavigationAction label="Konto" icon={<AccountCircleIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
