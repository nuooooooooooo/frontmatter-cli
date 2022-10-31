const buildFrontMatter = (
  frontMatterElements,
  authorName = "Wes Bos",
  postTitle = "My blogpost"
) => {
  const frontmatter = {
    author: `author: ${authorName}`,
    layout: `setup: |
    import xxx from '../../layouts/xxx.astro'
    import xxx from '../../components/xxx.astro'`,
    date: `date: ${new Date().toLocaleDateString("en-us", {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`,
    description: `description: `,
    tags: `tags: `,
    category: `category: `,
    slug: `slug: ${postTitle.split(" ").join("-").toLowerCase()}`,
  };

  let frontmatterStr = `---\ntitle: ${postTitle}\n`;

  frontMatterElements.forEach((element) => {
    return (frontmatterStr += frontmatter[element] + "\n");
  });

  frontmatterStr += `---\n# ${postTitle}`;
  console.log(frontmatterStr);
  return frontmatterStr;
};

module.exports.buildFrontMatter = buildFrontMatter;
