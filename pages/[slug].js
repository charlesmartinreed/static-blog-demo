import React from "react";
import fs from "fs";

// Next.js gives us two new functions for static site generation

// TEMPLATE
const Post = ({ slug }) => {
  return <div>the slug for this page is: {slug}</div>;
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
  return {
    // anything inside of props obj is passed to the component
    props: {
      slug,
    },
  };
};

export default Post;
