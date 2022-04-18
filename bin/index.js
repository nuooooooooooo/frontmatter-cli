#! /usr/bin/env node
const fs = require("fs");

let filePath = "./default-name.md";
let postTitle = "default name";

const inquirer = require("inquirer");

const questions = [
//   {
//     type: "input",
//     name: "author",
//     message: "Author name: ",
//     default() {
//       return "James Smith";
//     },
//   },
  {
    type: "input",
    name: "postTitle",
    message: "Blog post name: ",
    validate(value) {
      const pass = value.match(
        /^[a-z0-9A-Z\s]*$/g
      );
      if (pass) {
        return true;
      }

      return "Try again, only letters and numbers are allowed";
    },
  },
];


inquirer
  .prompt(questions[i])
  .then((answers) => {
    postTitle = answers.postTitle;
    filePath = `./${postTitle.split(" ").join("-")}.md`;
    postTitle = postTitle
      .split(" ")
      .filter((x) => x.length > 0)
      .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
      .join(" ");

    let frontMatter = `---
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
author: Your Name
tags: ['first','second']
description: This is my blogpost description
---
# ${postTitle}
`;

    fs.writeFile(filePath, frontMatter, { flag: "ax" }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
    console.log("created " + filePath);
  });
