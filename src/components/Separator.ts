import styled from "styled-components/native";

export const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray["400"]};
  opacity: 0.25;
`;
