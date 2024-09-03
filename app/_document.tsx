// File: app/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Add Stripe pricing table script here */}
          <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
        </Head>
        <body>
          <stripe-pricing-table 
            pricing-table-id="prctbl_1PsgkG2N40sxeNMw0U1PqEAt" 
            publishable-key="pk_live_51Ppomv2N40sxeNMwkup684j2XYjsl873FLPdoehqq8nI658jLcg0QDDPiDbWbbJxGuPFd8fklHfxtrsVcfK4XiBy007sz17u9r">
          </stripe-pricing-table>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument