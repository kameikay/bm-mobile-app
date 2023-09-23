import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Platform,
  SafeAreaView,
  View,
} from "react-native";
import { XMarkIcon } from "@assets/icons/XMarkIcon";
import { Text } from "@components/Text";
import { theme } from "@styles/theme/default";
import {
  CloseModalContainer,
  Container,
  ModalContainer,
  OptionItem,
  SearchContainer,
} from "./styles";
import { Separator } from "@components/Separator";
import { CheckIcon } from "@assets/icons/CheckIcon";
import { Option } from "@customTypes/Option";
import { Input } from "@components/Input";
import { InputSearchProps } from "./types";
import { MagnifyingClassIcon } from "@assets/icons/MagnifyingClassIcon";

export function ModalSearchBar({
  label,
  options,
  onChangeSelect,
  error,
  disabled,
  value,
  searchText,
  setSearchText,
  isLoading,
}: InputSearchProps) {
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

  const filteredOptions = useMemo(() => {
    if (!options) return [];

    return options.filter((option) =>
      option.label.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [options, searchText]);

  useEffect(() => {
    const option = options?.find((option) => option.label === value);
    if (option) {
      setSelectedOption(option);
      onChangeSelect(option.value);
      setSearchText(option.label);
    }
  }, [value, options]);

  return (
    <Container>
      <Text size={14} weight="400">
        {label}
      </Text>

      <SearchContainer error={!!error} onPress={() => setIsModalOpen(true)}>
        <Text
          color={
            selectedOption ? theme.colors.gray[900] : theme.colors.gray[400]
          }
          size={14}
          ellipsizeMode="tail"
          disabled={disabled}
        >
          {selectedOption?.label || ""}
        </Text>
      </SearchContainer>

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

      <Modal
        animationType="slide"
        visible={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={{ flex: 1 }}>
          <CloseModalContainer onPress={() => setIsModalOpen(false)}>
            <XMarkIcon color={theme.colors.gray[400]} />
          </CloseModalContainer>

          <ModalContainer>
            <Input
              label={label}
              onChangeText={setSearchText}
              icon={MagnifyingClassIcon}
            />

            {isLoading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator
                  size="large"
                  color={theme.colors.primary[500]}
                />
              </View>
            ) : (
              <FlatList
                data={filteredOptions}
                keyExtractor={(item) => item.value}
                ItemSeparatorComponent={Separator}
                contentContainerStyle={{
                  paddingBottom: Platform.OS === "android" ? 64 : 32,
                }}
                showsVerticalScrollIndicator={false}
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
              />
            )}
          </ModalContainer>
        </SafeAreaView>
      </Modal>
    </Container>
  );
}
