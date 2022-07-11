
import React from "react";
import Head from "next/head";

interface SeoProps {
    title: string,
    description: string,
    ogImage: {
      url?: string
    },
}


const Seo = ({title, description, ogImage}:SeoProps): JSX.Element => {
 
    return (
        <>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content={`@VirtualJungleUK`} />
            <meta name="twitter:creator" content={`@VirtualJungleUK`} />
            <meta property="og:url" content={'https://www.ollie-taylor.uk/'} />
            <meta name="og:title" content={title} />
            <meta name="og:description" content={description} />
            <meta property="og:image" content={ogImage?.url} />
            <meta property="og:type" content="article" />
            <meta name="description" content={description} />

            
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />

            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
            <link rel="manifest" href="/site.webmanifest"/>
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
            <meta name="msapplication-TileColor" content="#da532c"/>
            <meta name="theme-color" content="#ffffff"/>

        </Head>
        </>
    );
};

export default Seo;