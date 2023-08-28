import { useState } from "react";
import { FlatList, Modal, Platform } from "react-native";
import { ChevronDownIcon } from "@assets/icons/ChevronDownIcon";
import { XMarkIcon } from "@assets/icons/XMarkIcon";
import { Text } from "@components/Text";
import { theme } from "@styles/theme/default";
import {
  CloseModalContainer,
  Container,
  ModalContainer,
  OptionItem,
  SelectContainer,
} from "./styles";
import { SelectProps } from "./types";
import { Separator } from "@components/Separator";
import { CheckIcon } from "@assets/icons/CheckIcon";
import { Option } from "@customTypes/Option";

export function Select({ label, options, onChangeSelect, error }: SelectProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  function handleSelectOption(option: Option) {
    onChangeSelect(option.value);
    setSelectedOption(option);
    setIsModalOpen(false);
  }

  function isSelectedOption(option: Option) {
    if (!selectedOption) return false;

    return selectedOption.value === option.value;
  }

  return (
    <Container>
      <Text size={14} weight="600">
        {label}
      </Text>

      <SelectContainer error={!!error} onPress={() => setIsModalOpen(true)}>
        <Text
          color={
            selectedOption ? theme.colors.gray[900] : theme.colors.gray[400]
          }
          size={14}
          style={{
            width: "90%",
          }}
          ellipsizeMode="tail"
        >
          {selectedOption?.label || "Selecione uma opção"}
        </Text>
        <ChevronDownIcon
          color={theme.colors.gray[400]}
          height={16}
          width={16}
        />
      </SelectContainer>

      <Modal
        animationType="slide"
        visible={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        presentationStyle="pageSheet"
      >
        <ModalContainer>
          <CloseModalContainer onPress={() => setIsModalOpen(false)}>
            <XMarkIcon color={theme.colors.gray[400]} />
          </CloseModalContainer>

          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            ItemSeparatorComponent={Separator}
            renderItem={({ item }) => (
              <OptionItem
                onPress={() => handleSelectOption(item)}
                selected={isSelectedOption(item)}
              >
                <Text>{item.label}</Text>

                {isSelectedOption(item) && (
                  <CheckIcon
                    color={theme.colors.green[500]}
                    height={16}
                    width={16}
                  />
                )}
              </OptionItem>
            )}
            contentContainerStyle={{
              paddingBottom: Platform.OS === "android" ? 64 : 32,
            }}
          />
        </ModalContainer>
      </Modal>
    </Container>
  );
}
