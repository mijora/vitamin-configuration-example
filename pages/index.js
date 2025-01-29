import Head from "next/head";
import { useEffect, useRef } from "react";

export default function Home() {
  const iframeRef = useRef(null);

  useEffect(() => {
    window.addEventListener(
      "message",
      function (e) {
        console.log("Message from iframe:", e.data);
      },
      false
    );
  }, []);

  const getConfiguration = (type) => {
    iframeRef.current.contentWindow.postMessage(
      {
        from: "parent",
        task: `get_configuration_${type}`,
      },
      "*"
    );
  };

  return (
    <>
      <Head>
        <title>Simple HTML App</title>
        <meta charSet="utf-8" />
      </Head>

      <iframe
        ref={iframeRef}
        src="/index.html"
        style={{
          width: "100%",
          height: "600px",
          border: "none",
          overflow: "hidden",
        }}
      />

      <button onClick={() => getConfiguration("sku")}>Get SKU</button>
      <button onClick={() => getConfiguration("pdf")}>Get PDF</button>
      <button onClick={() => getConfiguration("price")}>Get Price</button>
    </>
  );
}
