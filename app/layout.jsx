import "@styles/global.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export const metaData = {
  title: "Prompts Genie",
  description: "Discover and Spread AI prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className={`${inter.className}`}>
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
