import { type MDXRemoteSerializeResult } from "next-mdx-remote";

type Frontmatter = {
  title: string;
  date: string;
  description: string;
  slug: string;
};

type Post<TFrontmatter> = {
  serialized: MDXRemoteSerializeResult;
  frontmatter: TFrontmatter;
};

// ...

import { promises as fs } from "fs";
import { serialize } from "next-mdx-remote/serialize";

// ...
import { MdxContent } from "../../mdx-content";
import Link from "next/link";
async function getPost(filepath: string): Promise<Post<Frontmatter>> {
  // Read the file from the filesystem
  const raw = await fs.readFile(filepath, "utf-8");

  // Serialize the MDX content and parse the frontmatter
  const serialized = await serialize(raw, {
    parseFrontmatter: true,
  });

  // Typecast the frontmatter to the correct type
  const frontmatter = serialized.frontmatter as Frontmatter;

  // Return the serialized content and frontmatter
  return {
    frontmatter,
    serialized,
  };
}
async function getAllPosts() {
  const all = await fs.readdir("./content");
  const contents = [];
  for (const file of all) {
    const { serialized, frontmatter } = await getPost(`content/${file}`);
    contents.push({ serialized, frontmatter });
  }
  return contents;
}
export async function generateStaticParams() {
  const data = await getAllPosts();
  console.log("aqui");
  return data.map((post) => ({
    slug: post.frontmatter.slug,
  }));
}

export default async function Post({ params }) {
  console.log(params);
  const post = await getPost(`content/${params?.slug}.mdx`);
  const { date, title, description, slug } = post.frontmatter;
  return (
    <>
      <Link key={title} href={`blog/${slug}`}>
        <div className="w-full p-2 m-auto bg-blue-500 h-fit group-hover:animate-border group-focus:animate-border-fast mb-4">
          <h1 className="text-white">{title}</h1>
          <h1 className="text-white">{description}</h1>
          <p>Published {date}</p>
          <hr />
          <MdxContent source={post.serialized} />
        </div>
      </Link>
    </>
  );
}
