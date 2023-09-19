import { theme } from "@styles/theme/default";
import { CardContainer, InlineContainer } from "./styles";
import { Text } from "@components/Text";
import { Item } from "@services/ItemService/types";
import { useItem } from "@store/useItem";

export default function ItemCard({
  id,
  item_name,
  warehouse_name,
  shelf_number,
  row_number,
  row_name,
  column_number,
  column_name,
  quantity_available,
  unit,
}: Item) {
  const { setItemId, setIsItemModalOpen } = useItem();

  function handleEditItem(id: string) {
    setItemId(id);
    setIsItemModalOpen(true);
  }

  return (
    <CardContainer onPress={() => handleEditItem(id)}>
      <Text weight="600" color={theme.colors.primary[600]}>
        {item_name}
      </Text>
      <InlineContainer>
        <Text color={theme.colors.gray[500]} style={{ marginTop: 8 }} size={14}>
          <Text size={14}>Almox.: </Text>
          {warehouse_name}
        </Text>

        <Text color={theme.colors.gray[500]} style={{ marginTop: 8 }} size={14}>
          <Text size={14}>Qntd.: </Text>
          {`${quantity_available} (${unit})`}
        </Text>
      </InlineContainer>

      <Text color={theme.colors.gray[500]} style={{ marginTop: 8 }} size={14}>
        <Text size={14}>Estante:</Text> {shelf_number}
      </Text>

      <Text color={theme.colors.gray[500]} style={{ marginTop: 8 }} size={14}>
        <Text size={14}>Fileira:</Text>{" "}
        {row_name ? `${row_number} (${row_name})` : row_number}
      </Text>
      <Text color={theme.colors.gray[500]} style={{ marginTop: 8 }} size={14}>
        <Text size={14}>Coluna:</Text>{" "}
        {column_name ? `${column_number} (${column_name})` : column_number}
      </Text>
    </CardContainer>
  );
}
