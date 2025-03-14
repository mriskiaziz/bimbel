import "./globals.css";
import { Poppins } from "next/font/google";
import { Provider } from "./provider";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Simulasi Ujian",
  description: "Simulasi Ujian CAT",
  keywords: "simulasi, ujian, cat, cpns, sbmptn",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-white text-black `}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
