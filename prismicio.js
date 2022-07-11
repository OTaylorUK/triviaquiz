import * as prismic from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";
import * as prismicNext from "@prismicio/next";

import { enableAutoPreviews } from '@prismicio/next'
import sm from './sm.json'

export const endpoint = sm.apiEndpoint



/**
 * The project's Prismic repository name.
 */
export const repositoryName = prismic.getRepositoryName(endpoint)

/**
 * The project's Prismic Link Resolver. This function determines the URL for a given Prismic document.
 *
 * @type {prismicH.LinkResolverFunction}
 */
export const linkResolver = (doc) => {
  switch (doc.type) {
    case 'homepage':
      return '/'
    case 'page':
      if(doc.uid === 'home'){
        return '/'
      }else{
        return `/${doc.uid}`
      }
    default:
      return null
  }
};

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config {prismicNext.CreateClientConfig} - A configuration object to
 */
export const createClient = (config = {}) => {
  const client = prismic.createClient(endpoint, {
    ...config,
  })

  enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  })
 

  return client;
};
