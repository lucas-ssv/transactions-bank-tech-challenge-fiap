import { ReactNode } from "react";
import { ModalTransactionFilter } from "../components/modal-transaction-filter";
import filterImg from "../assets/filter.svg";
import "./BoxInside.css";
import { TransactionFilter } from "../components/card-transaction";

interface Props {
  children: ReactNode;
  title: string;
  hasFilter?: boolean;
  isModalFilterOpen?: boolean;
  onModalFilter?: (value: boolean) => void;
  onTransactionFilter?: (transaction: TransactionFilter) => void;
}

export default function BoxInside({
  title,
  hasFilter = false,
  isModalFilterOpen,
  onModalFilter,
  onTransactionFilter,
  children,
}: Props) {
  return (
    <div className="box-inside relative bg-my-gray-box text-black max-w-5xl w-full rounded-lg mx-auto px-8 md:px-8 pt-8 md:pt-8 pb-16 overflow-hidden">
      <div className="flex items-center justify-between relative">
        <h2 className="text-2xl font-bold z-10 text-black">{title}</h2>
        {hasFilter && onModalFilter && onTransactionFilter && (
          <>
            <ModalTransactionFilter
              isOpen={isModalFilterOpen || false}
              onTransactionFilter={onTransactionFilter}
              onClose={() => onModalFilter(false)}
            />
            <button
              type="button"
              className="bg-my-dark-green p-2 rounded-full cursor-pointer"
              title="Filtrar por transações"
              onClick={() => onModalFilter(true)}
            >
              <img
                src={filterImg}
                alt="Funil que simboliza os filtros de busca"
                width={22}
                height={22}
              />
            </button>
          </>
        )}
      </div>
      <div className="flex flex-col gap-8 justify-between z-10 relative mt-8">
        {children}
      </div>
    </div>
  );
}
