import { type MDXRemoteSerializeResult } from "next-mdx-remote";

type Frontmatter = {
  title: string;
  date: string;
  description: string;
  slug: string;
  readTime: string;
  tags: { title: string; icon: string }[];
};

type Post<TFrontmatter> = {
  serialized: MDXRemoteSerializeResult;
  frontmatter: TFrontmatter;
};

// ...

import { promises as fs } from "fs";
import { serialize } from "next-mdx-remote/serialize";

// ...
import { MdxContent } from "./mdx-content";
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
export default async function Home() {
  // Get the serialized content and frontmatter
  const data = await getAllPosts();
  return (
    <>
      {data?.map((post) => {
        const { date, title, description, slug, readTime, tags } =
          post.frontmatter;
        return (
          <Link
            className="group relative flex h-fit w-full transition-transform duration-300 ease-in-out hover:scale-[1.02]"
            key={title}
            href={`post/${slug}`}
          >
            <article className="z-20 rounded-md border-l-zinc-500 w-full p-2 m-auto bg-slate-200 h-fit  hover:shadow-md">
              <h2 className="text-2xl font-bold leading-normal text-slate-800 dark:text-rose-50 sm:text-2xl">
                {title}
              </h2>
              <h3 className="text-slate-500 text-lg font-semibold">
                {description}
              </h3>
              <span className="font-light text-slate-500">
                Read time: {readTime}
              </span>
              <p className="font-light text-slate-500">Published at: {date}</p>
              <div className="flex mt-2 flex-row flex-wrap gap-1 text-sm ">
                {tags?.map((e) => {
                  return (
                    <span
                      key={e.title}
                      className=" w-fit whitespace-nowrap rounded px-2 py-1 bg-slate-700 text-slate-200 dark:bg-rose-50 dark:text-slate-700"
                    >
                      {e.title}
                    </span>
                  );
                })}
              </div>
            </article>
            <div className="absolute ml-[-5px] inset-0 z-10 my-auto h-[calc(100%_-_0.25rem)] w-4 rounded-l group-hover:animate-border group-focus:animate-border-fast bg-red-700 dark:bg-rose-50"></div>
          </Link>
        );
      })}
    </>
  );
}
