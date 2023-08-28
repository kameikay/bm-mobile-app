import { Text } from "@components/Text";
import { Container } from "./styles";
import { ButtonProps } from "./types";
import { theme } from "@styles/theme/default";

export function Button({
  type = "contained",
  color = theme.colors.primary[400],
  children,
  onPress,
  disabled,
}: ButtonProps) {
  return (
    <Container onPress={onPress} type={type} color={color} disabled={disabled}>
      {type === "contained" ? (
        <Text
          color="#fff"
          weight="700"
          style={{
            textTransform: "uppercase",
          }}
        >
          {children}
        </Text>
      ) : (
        <Text
          color={
            color === "error"
              ? theme.colors.red[500]
              : theme.colors.primary[400]
          }
          weight="700"
          style={{
            textTransform: "uppercase",
          }}
        >
          {children}
        </Text>
      )}
    </Container>
  );
}
