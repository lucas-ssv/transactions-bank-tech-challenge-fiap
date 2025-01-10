import close from "../assets/close-black.svg";
import { useState } from "react";
import { formatToReais, inputFormatedToReais } from "../utils/format";
import { depositos } from "../dtos/Deposito";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  deposito: depositos;
}

export function ModalDeposito({ isOpen, onClose, deposito }: Props) {
  const [typeTransaction, setTypeTransaction] = useState(deposito.label);
  const [date, setDate] = useState(deposito.data);
  const [value, setValue] = useState(deposito.valor);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4">
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
          <h2 className="text-xl font-bold">Editar transação</h2>
          <form className="grid gap-2 mt-4" onSubmit={() => {}}>
            <select
              name="tipo"
              id="tipo"
              value={typeTransaction}
              onChange={(e) => setTypeTransaction(e.target.value)}
              className="selectNewTransaction w-full h-12 pl-4 border-[1px] focus:border-my-green border-my-blue rounded-lg text-black appearance-none outline-none"
            >
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

            <label htmlFor="value">Valor</label>
            <input
              type="text"
              name="value"
              value={formatToReais(value)}
              onChange={(e) => setValue(inputFormatedToReais(e))}
              className="py-3 w-full border-[1px] border-my-blue focus:border-my-green rounded-lg text-black text-center outline-none"
            />

            <button
              type="submit"
              className="bg-my-blue hover:bg-black transition-all text-white py-3 rounded-lg mt-2"
            >
              Editar transação
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
