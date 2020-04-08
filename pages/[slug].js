import React from "react";
import fs from "fs";
import path from "path";

// Next.js gives us two new functions for static site generation

// TEMPLATE
const Post = ({ slug, contents }) => {
  return (
    <div>
      <h1>{slug}</h1>
      <pre>{contents}</pre>
    </div>
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
  const contents = fs.readFileSync(path.join("posts", slug + ".md")).toString();

  return {
    // anything inside of props obj is passed to the component
    // objects need to be serialized or serializable... strings, objects, etc.
    props: {
      slug,
      contents,
    },
  };
};

export default Post;
