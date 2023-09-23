import { theme } from "@styles/theme/default";
import { CardContainer, InlineContainer } from "./styles";
import { Text } from "@components/Text";
import { ItemInput } from "@services/ItemInputService/types";
import { useItemInput } from "@store/useItemInput";
import dayjs from "@utils/dayjs";

export default function ItemInputCard({
  id,
  item_name,
  quantity,
  unit,
  warehouse_name,
  updated_at,
}: ItemInput) {
  const { setItemInputId, setIsItemInputModalOpen } = useItemInput();

  function handleEditItemInput(id: string) {
    setItemInputId(id);
    setIsItemInputModalOpen(true);
  }

  return (
    <CardContainer onPress={() => handleEditItemInput(id)}>
      <Text weight="600" color={theme.colors.primary[600]}>
        {item_name}
      </Text>

      <InlineContainer>
        <Text color={theme.colors.gray[500]} style={{ marginTop: 8 }} size={14}>
          <Text size={14}>Qntd.: </Text>
          {`${quantity} (${unit})`}
        </Text>

        <Text color={theme.colors.gray[500]} style={{ marginTop: 8 }} size={14}>
          <Text size={14}>Almox.: </Text>
          {warehouse_name}
        </Text>
      </InlineContainer>

      <Text color={theme.colors.gray[500]} style={{ marginTop: 8 }} size={14}>
        <Text size={14}>Atualizado em:</Text>{" "}
        {dayjs(updated_at).format("DD/MM/YYYY")}
      </Text>
    </CardContainer>
  );
}
