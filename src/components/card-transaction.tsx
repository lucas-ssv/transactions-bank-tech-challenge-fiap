import { formatDate, formatToReais } from "../utils/format";
import { useEffect, useRef, useState } from "react";
import lapis from "../assets/lapis.svg";
import lixeira from "../assets/lixeira.svg";
import { ModalDeposito, TransactionData } from "./modal-deposito";
import { depositos } from "../dtos/Deposito";
import BoxInside from "../ui/BoxInside";
import Cookies from "js-cookie";
import { User } from "../dtos/User";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  depositos: depositos[];
  onRemoveTransaction: (transactionId: string) => void;
  onUpdateTransaction: (
    transactionId: string,
    transactionData: TransactionData
  ) => Promise<void>;
};

export type TransactionFilter = {
  typeTransaction: string;
  date: string;
  minimumValue: string | number;
  maximumValue: string | number;
};

export default function CardTransaction({
  depositos,
  onRemoveTransaction,
  onUpdateTransaction,
}: Props) {
  const storageUser = Cookies.get("user");
  const user: User = storageUser ? JSON.parse(storageUser) : null;
  const [transactions, setTransactions] = useState<depositos[]>(depositos);
  const [openModalId, setOpenModalId] = useState<string | null>(null);
  const [isModalFilterOpen, setIsModalFilterOpen] = useState(false);

  const [visibleCount, setVisibleCount] = useState(4);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const visibleItems = transactions.slice(0, visibleCount);

  const handleTransactionsFilter = async (transaction: TransactionFilter) => {
    try {
      const response = await fetch(
        `http://localhost:3001/depositos?idUser=${user.id}&label=${transaction.typeTransaction}&data=${transaction.date}&valor_gte=${transaction.minimumValue}&valor_lte=${transaction.maximumValue}`
      );
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      toast.error(error);
    } finally {
      setIsModalFilterOpen(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 4, transactions.length));
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [transactions]);

  return (
    <BoxInside
      title="Lista de transações"
      onModalFilter={setIsModalFilterOpen}
      isModalFilterOpen={isModalFilterOpen}
      onTransactionFilter={handleTransactionsFilter}
      hasFilter
    >
      <div className="flex flex-col gap-4">
        {!transactions.length && (
          <h2 className="text-xl">
            Ainda <b>não há</b> registro de transações.
          </h2>
        )}
        {visibleItems.map((deposito) => (
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
        {visibleCount < transactions.length && (
          <div ref={observerRef} className="h-36 bg-transparent"></div>
        )}
      </div>
      <Toaster />
    </BoxInside>
  );
}
