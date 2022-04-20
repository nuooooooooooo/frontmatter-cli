let filePath = "./default-name.md";
let postTitle = "default name";
let author = "default name"

// change this into function
// parameters > post title from user input and author name from json
const defaultFrontMatter = (postTitle, author) => {return `---
setup: |
import xxx from '../../layouts/xxx.astro'
import xxx from '../../components/xxx.astro'
title: ${postTitle}
date: ${new Date().toLocaleDateString("en-us", {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
})}
author: ${author}
tags: ['first','second']
description: This is my blogpost description
---
# ${postTitle}
This is where the content goes
`;}


// change this into function that functions similarly to above, except it also only extracts those options selected by the user
const customFrontMatter = {
    postTitle: `title: ${postTitle}`,
    author: `author: ${author}`,
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
    slug:  `slug: `, 
}

module.exports.defaultFrontMatter = defaultFrontMatter;
module.exports.customFrontMatter = customFrontMatter