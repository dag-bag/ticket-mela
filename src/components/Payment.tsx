import Image from "next/image";
import Link from "next/link";
import QRCode from "react-qr-code";
import Logo from "@/components/SelfAdvertisement";

const PaymentPopup = (props: any) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="bg-white p-5 rounded-xl max-w-[430px] md:min-w-[430px] min-w-[320px] flex items-center flex-col">
        <Logo />
        <QRCode className="mx-auto" value={props.data.upi_intent.bhim_link} />
        <p className="text-sm text-center font-bold my-3">
          Pay with Apps{" "}
          <span className="text-sm hidden md:inline">
            ( Only works in mobile )
          </span>
        </p>

        <div className="grid grid-cols-1 gap-2 w-full ">
          <Button
            img="/paytm.png"
            title={"Paytm "}
            href={props.data.upi_intent.paytm_link}
          />
          <Button
            img="/Phonepe.png"
            title={"PhonePe "}
            href={props.data.upi_intent.phonepe_link}
          />
          <Button
            img="/gpay.png"
            title={"Gpay "}
            href={props.data.upi_intent.gpay_link}
          />
          <Button
            img="/BHIM.png"
            title={"Bhim Pay"}
            href={props.data.upi_intent.bhim_link}
          />
          <p className=" text-gray-700 text-sm italic font-semibold p-5">
            <span className=" font-extrabold">Important Note -</span> After
            payment, it may take up to 5 minutes for tickets to appear on
            WhatsApp message.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPopup;

const Button = ({ href, title, img }: any) => {
  return (
    <Link
      href={href}
      className=" bg-gray-100 border flex px-10 rounded-full itmes-center justify-center p-3 hover:bg-gray-200"
    >
      <Image src={img} alt={title} height={20} width={100} />
    </Link>
  );
};
