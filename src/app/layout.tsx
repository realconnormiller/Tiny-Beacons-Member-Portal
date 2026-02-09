import "./globals.css";
import { UserProvider } from "@/context/UserContext";

export const metadata = {
  title: "Tiny Beacons",
  description: "Tiny Beacons Member Portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
