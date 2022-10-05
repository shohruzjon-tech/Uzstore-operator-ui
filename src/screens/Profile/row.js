import { Text } from "react-native";
import { DataTable } from "react-native-paper";
import format from "date-fns/format";
import { uz } from "date-fns/locale";

const getStatus = (val) => {
  switch (val) {
    case "accepted":
      return { color: "blue", label: "Qabul qilindi" };
    case 2:
      return { color: "orange", label: "Tekshiruvda" };
    case 3:
      return { color: "green", label: "To'landi" };
    case 4:
      return { color: "red", label: "Bekor qilindi" };
    default:
      return { color: "blue", label: "Qabul qilindi" };
  }
};

const RowComponent = ({
  _id,
  createdAt,
  status,
  amount,
  card,
  message,
  balance,
}) => {
  const statusVal = getStatus(status);

  return (
    <>
      <DataTable.Row>
        <DataTable.Cell style={{ width: 150 }}>{_id}</DataTable.Cell>
        <DataTable.Cell style={{ width: 250 }}>
          {format(new Date(createdAt), "dd - MMMM, yyyy HH:mm", { locale: uz })}
        </DataTable.Cell>
        <DataTable.Cell style={{ width: 200 }}>
          <Text style={{ color: "#d23f57" }}>{card}</Text>
        </DataTable.Cell>
        <DataTable.Cell style={{ width: 150 }}>
          {parseInt(amount)
            ?.toString()
            ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          so'm
        </DataTable.Cell>
        <DataTable.Cell style={{ width: 250 }}>
          {balance?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} so'm
        </DataTable.Cell>
        <DataTable.Cell style={{ width: 100 }}>
          <Text style={{ color: statusVal?.color }}>{statusVal?.label}</Text>
        </DataTable.Cell>
        <DataTable.Cell style={{ width: 200 }}>{message}</DataTable.Cell>
      </DataTable.Row>
    </>
  );
};

export default RowComponent;
