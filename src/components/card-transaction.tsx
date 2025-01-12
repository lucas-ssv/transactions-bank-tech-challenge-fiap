import { formatDate, formatToReais } from "../utils/format";
import { useState } from "react";
import lapis from "../assets/lapis.svg";
import lixeira from "../assets/lixeira.svg";
import { ModalDeposito, TransactionData } from "./modal-deposito";
import { depositos } from "../dtos/Deposito";
import BoxInside from "../ui/BoxInside";

type Props = {
  depositos: depositos[];
  onRemoveTransaction: (transactionId: string) => void;
  onUpdateTransaction: (
    transactionId: string,
    transactionData: TransactionData
  ) => Promise<void>;
};

export default function CardTransaction({
  depositos,
  onRemoveTransaction,
  onUpdateTransaction,
}: Props) {
  const [openModalId, setOpenModalId] = useState<string | null>(null);

  return (
    <BoxInside title="Lista de transações">
      <div className="flex flex-col gap-4">
        {!depositos.length && (
          <h2 className="text-xl">
            Ainda <b>não há</b> registro de transações.
          </h2>
        )}
        {depositos.map((deposito) => (
          <div
            key={deposito.id}
            className="flex md:grid grid-cols-4 flex-col md:flex-row justify-between md:items-center gap-2 bg-white py-2 px-4 rounded-lg"
          >
            <ModalDeposito
              isOpen={openModalId === deposito.id}
              onClose={() => setOpenModalId(null)}
              deposito={deposito}
              onUpdateTransaction={onUpdateTransaction}
            />
            <div className="flex flex-1 flex-col">
              <small>Tipo</small>
              <strong className="first-letter:capitalize">
                {deposito.label}
              </strong>
            </div>
            <div className="flex flex-col">
              <small>Valor</small>
              <strong>{formatToReais(deposito.valor)}</strong>
            </div>
            <div className="flex flex-col">
              <small>Data da transação</small>
              <strong>{formatDate(deposito.data)}</strong>
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="bg-my-dark-green p-2 rounded-full cursor-pointer"
                onClick={() => setOpenModalId(deposito.id)}
              >
                <img src={lapis} alt="" />
              </button>
              <button
                type="button"
                className="bg-my-dark-green p-2 rounded-full cursor-pointer"
                onClick={() => onRemoveTransaction(deposito.id)}
              >
                <img src={lixeira} alt="" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </BoxInside>
  );
}
