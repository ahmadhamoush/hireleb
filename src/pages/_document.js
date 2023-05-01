import { Html, Head, Main, NextScript } from 'next/document'
import loader from "../loader";
import Loader from '@/components/Loader';
export default function Document() {
  return (
    <Html lang="en">
       <style>
                        {loader}
                    </style>
      <Head />
      <body>
        <Loader />  
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
