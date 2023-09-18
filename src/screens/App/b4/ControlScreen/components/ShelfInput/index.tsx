import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Container, IconsContainer } from "./styles";
import { DetermineFieldType, IShelfInputProps } from "./types";
import { Column, Row } from "@services/WarehouseService/types";
import { Input } from "@components/Input";
import { PencilSquareIcon } from "@assets/icons/PencilSquareIcon";
import { TrashIcon } from "@assets/icons/TrashIcon";
import { CheckIcon } from "@assets/icons/CheckIcon";
import capitalizeString from "@utils/capitalizeString";

export default function ShelfInput({
  type,
  field,
  fieldToEdit,
  setFieldToEdit,
  onEdit,
  onDelete,
}: IShelfInputProps) {
  const [fieldName, setFieldName] = useState<string>("");

  const currentField: DetermineFieldType<typeof type> = field;
  const fieldTypeName = type === "row" ? "fileira" : "coluna";
  const fieldTypeNumber =
    type === "row"
      ? (currentField as Row).row_number
      : (currentField as Column).column_number;

  useEffect(() => {
    setFieldName(
      type === "row"
        ? (currentField as Row)?.row_name
        : (currentField as Column)?.column_name
    );
  }, []);

  return (
    <Container>
      <View style={{ width: "90%" }}>
        <Input
          label={`Nome da ${fieldTypeName} ${fieldTypeNumber}`}
          placeholder={`Nome da ${fieldTypeName}`}
          defaultValue={`${capitalizeString(fieldTypeName)} ${fieldTypeNumber}`}
          value={fieldName}
          onChangeText={(text) => setFieldName(text)}
          disabled={fieldToEdit !== fieldTypeNumber}
        />
      </View>

      <IconsContainer>
        {fieldToEdit === fieldTypeNumber ? (
          <TouchableOpacity onPress={() => onEdit(currentField.id, fieldName)}>
            <CheckIcon height={20} width={20} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setFieldToEdit(fieldTypeNumber)}>
            <PencilSquareIcon height={20} width={20} />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => onDelete(currentField.id)}>
          <TrashIcon height={20} width={20} />
        </TouchableOpacity>
      </IconsContainer>
    </Container>
  );
}
