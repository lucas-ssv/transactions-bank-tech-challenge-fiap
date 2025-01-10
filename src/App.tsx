import CardTransaction from "./components/card-transaction";

export default function App() {
  return (
    <CardTransaction
      depositos={[
        {
          id: "1",
          idUser: 1,
          label: "Doc/ted",
          valor: 15000,
          data: "09/01/2025",
        },
      ]}
    />
  );
}
