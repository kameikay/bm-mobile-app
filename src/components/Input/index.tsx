import { TouchableOpacity } from "react-native";
import { Text } from "@components/Text";
import { Container, IconContainer, StyledInput } from "./styles";
import { InputProps } from "./types";
import { theme } from "@styles/theme/default";
import { useState } from "react";

export const Input: React.FC<InputProps> = ({
  label,
  icon: Icon,
  error,
  register,
  iconButtonFunction,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Container>
      <Text size={14} weight="600">
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
        style={{
          borderColor: isFocused
            ? theme.colors.primary[400]
            : theme.colors.neutral[400],
        }}
        {...register}
        {...props}
      />
      {Icon &&
        (iconButtonFunction ? (
          <TouchableOpacity onPress={() => iconButtonFunction()}>
            <IconContainer>
              <Icon />
            </IconContainer>
          </TouchableOpacity>
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
