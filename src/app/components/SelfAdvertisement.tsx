import Image from "next/image";
import Link from "next/link";
const SelfAdvertisement = () => {
  return (
    <div>
      <Link href={"https://www.sasahyog.com"}>
        <div className="flex items-center rounded-xl mb-2">
          <Image width={70} height={20} src={"/logo.png"} alt="company_name" />
          <p className="font-medium text-sm md:text-md">
            <span className="text-[12px]">Powered by</span> <br />
            <b>Sasahyog Technologies</b>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default SelfAdvertisement;
