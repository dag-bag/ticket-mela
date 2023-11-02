import QRCode from "react-qr-code";

export default function Id({ params }: any) {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <QRCode value={params.id} />
    </div>
  );
}
