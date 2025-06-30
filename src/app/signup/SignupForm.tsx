// Datei: app/signup/SignupForm.tsx
"use client";

import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material";

import { useState } from "react";
import { SIGN_UP } from "../../graphql/auth/auth";
// import { useSession } from "next-auth/react";
import getApolloClient from "../../lib/apolloClient";
import { useMutation } from "@apollo/client";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  onNext: () => void;
}

export default function SignupForm({ onNext }: Props) {
  // const { data: session } = useSession();
  const client = getApolloClient('');
  const [createUser, { loading }] = useMutation(SIGN_UP, { client });

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    geburtsdatum: "",
    rolle: "",
    organisation: "Omnixys",
    adressen: [{ strasse: "", plz: "", ort: "", land: "Deutschland" }],
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<{ name?: string; value: unknown }>,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (!name) return;

    if (
      ["strasse", "plz", "ort", "land"].includes(name) &&
      index !== undefined
    ) {
      const updatedAdressen = [...form.adressen];
      updatedAdressen[index] = { ...updatedAdressen[index], [name]: value };
      setForm((prev) => ({ ...prev, adressen: updatedAdressen }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };
  

  const handleAddAdresse = () => {
    setForm((prev) => ({
      ...prev,
      adressen: [
        ...prev.adressen,
        { strasse: "", plz: "", ort: "", land: "Deutschland" },
      ],
    }));
  };

  const handleRemoveAdresse = (index: number) => {
    setForm((prev) => ({
      ...prev,
      adressen: prev.adressen.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    if (form.password !== form.repeatPassword) {
      alert("Die Passwörter stimmen nicht überein.");
      return;
    }

    try {
      await createUser({
        variables: {
          input: {
            vorname: form.firstName,
            nachname: form.lastName,
            username: form.username || form.firstName.toLowerCase(),
            password: form.password,
            email: form.email,
            geburtsdatum: form.geburtsdatum,
            rolle: form.rolle,
            adressen: form.adressen,
            organisation: form.organisation,
          },
        },
      });
      onNext();
    } catch (error: any) {
      alert("Fehler bei der Registrierung: " + error.message);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6" textAlign="center">
        Willkommen
      </Typography>

      <TextField
        label="Vorname"
        name="firstName"
        fullWidth
        onChange={handleChange}
        value={form.firstName}
      />
      <TextField
        label="Nachname"
        name="lastName"
        fullWidth
        onChange={handleChange}
        value={form.lastName}
      />
      <TextField
        label="Benutzername"
        name="username"
        fullWidth
        onChange={handleChange}
        value={form.username}
      />
      <TextField
        label="E-Mail"
        name="email"
        type="email"
        fullWidth
        onChange={handleChange}
        value={form.email}
      />
      <TextField
        label="Geburtsdatum"
        name="geburtsdatum"
        type="date"
        fullWidth
        onChange={handleChange}
        value={form.geburtsdatum}
        InputLabelProps={{ shrink: true }}
      />
      <FormControl fullWidth>
        <InputLabel id="rolle-label">Rolle</InputLabel>
        <Select
          labelId="rolle-label"
          name="rolle"
          value={form.rolle}
          label="Rolle"
          onChange={handleChange}
        >
          <MenuItem value="BEWERBER">Bewerber</MenuItem>
          <MenuItem value="RECRUITER">Recruiter</MenuItem>
          <MenuItem value="ADMIN">Admin</MenuItem>
        </Select>
      </FormControl>

      <Typography variant="subtitle1">Adressen</Typography>
      {form.adressen.map((adresse, index) => (
        <Box
          key={index}
          display="flex"
          flexDirection="column"
          gap={1}
          border={1}
          borderRadius={2}
          p={2}
        >
          <TextField
            label="Straße"
            name="strasse"
            fullWidth
            onChange={(e) => handleChange(e, index)}
            value={adresse.strasse}
          />
          <TextField
            label="PLZ"
            name="plz"
            fullWidth
            onChange={(e) => handleChange(e, index)}
            value={adresse.plz}
          />
          <TextField
            label="Ort"
            name="ort"
            fullWidth
            onChange={(e) => handleChange(e, index)}
            value={adresse.ort}
          />
          <TextField
            label="Land"
            name="land"
            fullWidth
            onChange={(e) => handleChange(e, index)}
            value={adresse.land}
          />
          <Box display="flex" justifyContent="flex-end">
            <IconButton
              onClick={() => handleRemoveAdresse(index)}
              disabled={form.adressen.length === 1}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      ))}
      <Button startIcon={<AddIcon />} onClick={handleAddAdresse}>
        Adresse hinzufügen
      </Button>

      <TextField
        label="Passwort"
        name="password"
        type="password"
        fullWidth
        onChange={handleChange}
        value={form.password}
      />
      <TextField
        label="Passwort wiederholen"
        name="repeatPassword"
        type="password"
        fullWidth
        onChange={handleChange}
        value={form.repeatPassword}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
        disabled={loading}
      >
        Weiter
      </Button>
    </Box>
  );
}
