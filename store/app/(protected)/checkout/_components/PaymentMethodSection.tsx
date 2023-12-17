import {
  Accordion,
  AccordionItem,
  Radio,
  RadioGroup,
  Spacer,
} from "@nextui-org/react";
import Link from "next/link";

import PaymentCardForm from "../../account/_components/PaymentCardForm";

type Props = {
  userId: string;
  paymentCards: { id: string; CardNumber: string; HolderName: string | null }[];
  PaymentMethod: string;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
};

const PaymentMethodSection = ({
  userId,
  paymentCards,
  PaymentMethod,
  setPaymentMethod,
}: Props) => {
  return (
    <>
      <h1 className="text-xl font-bold tracking-wider mt-5">Payment method</h1>
      <Link className="text-sm underline" href={{ pathname: "/account" }}>
        Manage your payment cards
      </Link>
      <Spacer y={2} />
      <RadioGroup value={PaymentMethod} onValueChange={setPaymentMethod}>
        <Accordion isCompact>
          <AccordionItem
            key="1"
            aria-label="Credit / Debit card"
            title="Credit / Debit card"
          >
            {paymentCards.length == 0 ? (
              <PaymentCardForm userId={userId} />
            ) : (
              <div className="flex flex-col gap-2">
                {paymentCards.map((card) => (
                  <Radio key={card.id} value={card.id}>
                    <p>
                      {card?.CardNumber} - {card?.HolderName}
                    </p>
                  </Radio>
                ))}
              </div>
            )}
          </AccordionItem>
        </Accordion>
        <Radio value="paypal">
          <p>Paypal</p>
        </Radio>
        <Radio value="COD">
          <p>Cash on delivery</p>
        </Radio>
      </RadioGroup>
    </>
  );
};

export default PaymentMethodSection;
