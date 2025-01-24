import { FormEvent, HTMLAttributes, useState } from "react";
import {
  formatToNumber,
  formatToReais,
  inputFormatedToReais,
} from "../utils/format";
import { TransactionFilter } from "./card-transaction";
import close from "../assets/close-black.svg";

export interface TransactionData {
  typeTransaction: string;
  valueTransaction: number;
  date: string;
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onTransactionFilter: (transaction: TransactionFilter) => void;
  onClose: () => void;
}

export function ModalTransactionFilter({
  isOpen,
  onTransactionFilter,
  onClose,
  ...rest
}: Props) {
  const [typeTransaction, setTypeTransaction] = useState("");
  const [date, setDate] = useState("");
  const [minimumValue, setMinimumValue] = useState("");
  const [maximumValue, setMaximumValue] = useState("");

  const handleSubmitFilter = (event: FormEvent) => {
    event.preventDefault();
    onTransactionFilter({
      typeTransaction,
      date,
      minimumValue: formatToNumber(minimumValue) || "",
      maximumValue: formatToNumber(maximumValue) || "",
    });
  };

  const handleClear = () => {
    setTypeTransaction("");
    setDate("");
    setMinimumValue("");
    setMaximumValue("");
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center p-4 z-50 ${rest}`}
    >
      <div
        className="fixed h-screen w-full bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <button
          type="button"
          className="absolute top-3 right-3"
          onClick={onClose}
        >
          <img src={close} alt="Fechar" />
        </button>
        <div>
          <h2 className="text-xl font-bold">Filtrar por transações</h2>
          <form className="grid gap-2 mt-4" onSubmit={handleSubmitFilter}>
            <select
              name="tipo"
              id="tipo"
              value={typeTransaction}
              onChange={(e) => setTypeTransaction(e.target.value)}
              className="selectNewTransaction w-full h-12 pl-4 border-[1px] focus:border-my-green border-my-blue rounded-lg text-black appearance-none outline-none"
            >
              <option value="" hidden>
                Tipo da transação
              </option>
              <option value="">Todas as transações</option>
              <option value="cambio">Câmbio de Moeda</option>
              <option value="doc/ted">DOC/TED</option>
              <option value="emprestimo">Empréstimo e Financiamento</option>
              <option value="deposito">Depósito</option>
              <option value="debito">Débito</option>
              <option value="credito">Crédito</option>
            </select>

            <label htmlFor="transaction-date">Data da transação</label>
            <input
              type="date"
              name="transaction-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="py-3 w-full border-[1px] border-my-blue focus:border-my-green rounded-lg text-black text-center outline-none"
            />

            <div className="flex items-center justify-between gap-4">
              <div className="grid gap-2">
                <label htmlFor="value">Valor mínimo</label>
                <input
                  type="text"
                  name="value"
                  value={formatToReais(minimumValue)}
                  onChange={(e) => setMinimumValue(inputFormatedToReais(e))}
                  className="py-3 w-full border-[1px] border-my-blue focus:border-my-green rounded-lg text-black text-center outline-none"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="value">Valor máximo</label>
                <input
                  type="text"
                  name="value"
                  value={formatToReais(maximumValue)}
                  onChange={(e) => setMaximumValue(inputFormatedToReais(e))}
                  className="py-3 w-full border-[1px] border-my-blue focus:border-my-green rounded-lg text-black text-center outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="bg-my-gray hover:bg-black transition-all text-white py-3 rounded-lg mt-2"
                onClick={handleClear}
              >
                Limpar
              </button>
              <button
                type="submit"
                className="bg-my-blue hover:bg-black transition-all text-white py-3 rounded-lg mt-2"
              >
                Filtrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
