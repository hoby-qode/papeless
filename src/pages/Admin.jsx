import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Dashboard from "../features/admin/Dashboard";

// Encode en base64 (pour chaînes ASCII simples)
const encode = (str) => btoa(str);

const Admin = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const encodedUsername = encode("admin");
  const encodedPassword = encode("1234");

  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    if (token === `${encodedUsername}:${encodedPassword}`) {
      setAuthenticated(true);
    } else {
      setOpen(true);
    }
  }, []);

  const handleLogin = () => {
    if (
      encode(username) === encodedUsername &&
      encode(password) === encodedPassword
    ) {
      localStorage.setItem(
        "admin-token",
        `${encodedUsername}:${encodedPassword}`
      );
      setAuthenticated(true);
      setOpen(false);
    } else {
      alert("Nom ou mot de passe incorrect");
    }
  };

  return (
    <>
      <Dialog open={open}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Connexion Admin</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin}>Se connecter</Button>
          </div>
        </DialogContent>
      </Dialog>

      {authenticated && <Dashboard />}
    </>
  );
};

export default Admin;
