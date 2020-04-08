import React from "react";

import fs from "fs";
import path from "path";

import matter from "gray-matter";
import marked from "marked";

import Head from "next/head";

// Next.js gives us two new functions for static site generation

// TEMPLATE
const Post = ({ slug, htmlString, data }) => {
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta title="description" content={data.description} />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: htmlString }} />
    </>
  );
};

// NEXT.js - get files, or 'posts' and create paths

export const getStaticPaths = async () => {
  const files = fs.readdirSync("posts"); // returns arr of strings, file names in the folder
  console.log("files:", files);

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));
  console.log("paths:", paths);

  // object has paths prop array and fallback prop
  return {
    // these are the paths we're pulling our posts from
    paths,
    fallback: false,
  };
};

// NEXT.js - grab content of the posts themselves from created paths
export const getStaticProps = async ({ params: { slug } }) => {
  // read the markdown

  // using path.join to build the path correctly regardless of which OS you're using
  const markdownAndMetadata = fs
    .readFileSync(path.join("posts", slug + ".md"))
    .toString();

  // gray-matter handles front-matter or metadata and body seperately
  const parsedMarkdown = matter(markdownAndMetadata);

  const htmlString = marked(parsedMarkdown.content);

  return {
    // anything inside of props obj is passed to the component
    // objects need to be serialized or serializable... strings, objects, etc.
    props: {
      slug,
      htmlString,
      data: parsedMarkdown.data,
    },
  };
};

export default Post;
