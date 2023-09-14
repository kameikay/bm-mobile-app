import { Platform } from "react-native";
import { Container, ExitContainer } from "./styles";
import { Button } from "@components/Button";
import { useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";

export default function ExitScreen() {
  const { logout } = useContext(AuthContext);

  return (
    <Container>
      <ExitContainer
        behavior={Platform.OS === "android" ? "height" : "padding"}
      >
        <Button onPress={logout}>Sair</Button>
      </ExitContainer>
    </Container>
  );
}
