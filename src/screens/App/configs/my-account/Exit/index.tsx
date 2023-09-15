import { Container, ExitContainer } from "./styles";
import { Button } from "@components/Button";
import { useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";
import { theme } from "@styles/theme/default";
import { Text } from "@components/Text";

export default function ExitScreen() {
  const { logout } = useContext(AuthContext);

  return (
    <Container>
      <ExitContainer>
        <Text
          style={{
            textAlign: "center",
          }}
        >
          Tem certeza que deseja sair? Você precisará fazer login novamente.
        </Text>
        <Button color={theme.colors.red[400]} onPress={logout}>
          Sair
        </Button>
      </ExitContainer>
    </Container>
  );
}
