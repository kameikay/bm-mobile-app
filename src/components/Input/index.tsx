import { TouchableOpacity } from "react-native";
import { Text } from "@components/Text";
import { Container, IconContainer, StyledInput } from "./styles";
import { InputProps } from "./types";
import { theme } from "@styles/theme/default";
import { useState } from "react";

export const Input: React.FC<InputProps> = ({
  label,
  labelWeight = "regular",
  icon: Icon,
  error,
  iconButtonFunction,
  disabled,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Container>
      <Text size={14} weight={labelWeight === "bold" ? "600" : "400"}>
        {label}
      </Text>
      <StyledInput
        error={!!error}
        placeholderTextColor={theme.colors.gray[400]}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        isFocused={isFocused}
        disabled={disabled}
        editable={!disabled}
        {...props}
      />
      {Icon &&
        (iconButtonFunction ? (
          <IconContainer>
            <TouchableOpacity onPress={() => iconButtonFunction()}>
              <Icon />
            </TouchableOpacity>
          </IconContainer>
        ) : (
          <IconContainer>
            <Icon />
          </IconContainer>
        ))}
      {!!error && (
        <Text
          size={10}
          style={{
            marginLeft: 2,
          }}
          color={theme.colors.red[500]}
        >
          {error}
        </Text>
      )}
    </Container>
  );
};
