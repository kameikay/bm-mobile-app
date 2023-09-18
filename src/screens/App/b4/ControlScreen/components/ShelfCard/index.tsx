import { theme } from "@styles/theme/default";
import { CardBody, CardContainer } from "./styles";
import { Text } from "@components/Text";
import useWarehouseForm from "../../hooks/useWarehouseForm";

interface ShelfCardProps {
  id: string;
  shelf_number: number;
  row_count: number;
  column_count: number;
}

export default function ShelfCard({
  id,
  shelf_number,
  row_count,
  column_count,
}: ShelfCardProps) {
  const { handleEditShelf } = useWarehouseForm();

  return (
    <CardContainer onPress={() => handleEditShelf(id)}>
      <Text weight="600" color={theme.colors.primary[600]}>
        Estante nº {shelf_number}
      </Text>
      <CardBody>
        <Text color={theme.colors.gray[400]} style={{ marginTop: 8 }} size={14}>
          Nº de fileiras: {row_count}
        </Text>
        <Text color={theme.colors.gray[400]} style={{ marginTop: 8 }} size={14}>
          |
        </Text>
        <Text color={theme.colors.gray[400]} style={{ marginTop: 8 }} size={14}>
          Nº de colunas: {column_count}
        </Text>
      </CardBody>
    </CardContainer>
  );
}
