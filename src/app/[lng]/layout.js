import "../../../public/assets/scss/app.scss";
import I18NextProvider from "@/helper/i18NextContext/I18NextProvider";
import TanstackWrapper from "@/layout/TanstackWrapper";
import { AuthProvider } from "@/contexts/AuthContext";
import { dir } from "i18next";

export async function generateMetadata() {
  // fetch data
  const settingData = await fetch(`${process.env.API_PROD_URL}/settings`)
    .then((res) => res.json())
    .catch((err) => console.log("err", err));
  return {
    metadataBase: new URL(process.env.API_PROD_URL),
    title: settingData?.values?.general?.site_title,
    description: settingData?.values?.general?.site_tagline,
    icons: {
      icon: settingData?.values?.general?.favicon_image?.original_url,
      link: {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Public+Sans&display=swap",
      },
    },
  };
}

export default async function RootLayout({ children, params }) {
  const { lng } = await params; // Await params to resolve the Promise
  return (
    <html lang={lng} dir={dir(lng)}>
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <I18NextProvider>
            <TanstackWrapper>{children}</TanstackWrapper>
          </I18NextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
