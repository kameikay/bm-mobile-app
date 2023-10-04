import { useEffect, useState } from "react";
import { Modal } from "react-native";
import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";
import { Text } from "@components/Text";
import { XMarkIcon } from "@assets/icons/XMarkIcon";
import { theme } from "@styles/theme/default";
import { ModalContainer, TouchableOpacityContainer } from "./styles";

interface IQRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (id: string) => void;
}

export default function QRCodeModal({
  isOpen,
  onClose,
  onScan,
}: IQRCodeModalProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }: BarCodeScannerResult) => {
    onScan(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Modal
      animationType="slide"
      visible={isOpen}
      onRequestClose={onClose}
      presentationStyle="fullScreen"
    >
      <ModalContainer>
        <TouchableOpacityContainer onPress={() => onClose()}>
          <XMarkIcon color={theme.colors.gray[400]} />
        </TouchableOpacityContainer>

        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          type="back"
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99,
          }}
        />
      </ModalContainer>
    </Modal>
  );
}
