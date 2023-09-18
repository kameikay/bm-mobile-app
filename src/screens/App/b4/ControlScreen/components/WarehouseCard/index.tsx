import { theme } from "@styles/theme/default";
import { CardContainer } from "./styles";
import { Text } from "@components/Text";
import { useWarehouse } from "@store/useWarehouse";

interface WarehouseCardProps {
  id: string;
  name: string;
  location: string;
  updatedAt: string;
}

export default function WarehouseCard({
  id,
  name,
  location,
  updatedAt,
}: WarehouseCardProps) {
  const { setWarehouseId, setIsModalOpen } = useWarehouse();

  function handleEditWarehouse(id: string) {
    setWarehouseId(id);
    setIsModalOpen(true);
  }

  return (
    <CardContainer onPress={() => handleEditWarehouse(id)}>
      <Text weight="600" color={theme.colors.primary[600]}>
        {name}
      </Text>
      <Text color={theme.colors.gray[400]} style={{ marginTop: 8 }} size={14}>
        <Text size={14}>Localizado em: </Text>
        {location}
      </Text>
      <Text color={theme.colors.gray[400]} style={{ marginTop: 8 }} size={14}>
        <Text size={14}>Atualizado em:</Text> {updatedAt}
      </Text>
    </CardContainer>
  );
}
