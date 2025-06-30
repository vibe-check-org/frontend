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
  SelectChangeEvent,
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
  const client = getApolloClient("");
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

  // Für TextField, TextArea etc.
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  

  // Für Select
  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    if (!name) return;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChangeWithIndex = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = [...prev.adressen];
      updated[index] = { ...updated[index], [name]: value };
      return { ...prev, adressen: updated };
    });
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        onChange={handleInputChange}
        value={form.firstName}
      />
      <TextField
        label="Nachname"
        name="lastName"
        fullWidth
        onChange={handleInputChange}
        value={form.lastName}
      />
      <TextField
        label="Benutzername"
        name="username"
        fullWidth
        onChange={handleInputChange}
        value={form.username}
      />
      <TextField
        label="E-Mail"
        name="email"
        type="email"
        fullWidth
        onChange={handleInputChange}
        value={form.email}
      />
      <TextField
        label="Geburtsdatum"
        name="geburtsdatum"
        type="date"
        fullWidth
        onChange={handleInputChange}
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
          onChange={handleSelectChange}
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
            onChange={(e) => handleInputChangeWithIndex(e, index)}

            value={adresse.strasse}
          />
          <TextField
            label="PLZ"
            name="plz"
            fullWidth
            onChange={(e) => handleInputChangeWithIndex(e, index)}

            value={adresse.plz}
          />
          <TextField
            label="Ort"
            name="ort"
            fullWidth
            onChange={(e) => handleInputChangeWithIndex(e, index)}

            value={adresse.ort}
          />
          <TextField
            label="Land"
            name="land"
            fullWidth
            onChange={(e) => handleInputChangeWithIndex(e, index)}

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
        onChange={handleInputChange}
        value={form.password}
      />
      <TextField
        label="Passwort wiederholen"
        name="repeatPassword"
        type="password"
        fullWidth
        onChange={handleInputChange}
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
