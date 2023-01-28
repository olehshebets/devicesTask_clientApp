import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <h1>
      <Link href="/">
        <Image width={120} height={26} src="/NinjaOneLogo.png" alt="Logo" />
      </Link>
    </h1>
  );
};

export default Logo;
