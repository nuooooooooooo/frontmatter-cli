#! /usr/bin/env node
const fs = require("fs");

let filePath = "./default-name.md";
let postTitle = "default name";

const inquirer = require("inquirer");
const {
  settingQuestions,
  createPostQuestions,
  homescreenQuestions,
} = require("./utils/questions.js");

inquirer.prompt(homescreenQuestions).then((answers) => {
  if (answers.chosenOption === "Create blog post") {
    inquirer.prompt(createPostQuestions).then((answers) => {
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
          author: Manon Locht
          tags: ['first','second']
          description: This is my blogpost description
          ---
          # ${postTitle}
          This is where the content goes
          `;

      fs.writeFile(filePath, frontMatter, { flag: "ax" }, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
      console.log("created " + filePath);
    });
  } else {
    inquirer.prompt(settingQuestions).then((answers) => {
      console.log(JSON.stringify(answers, null, '  '));
    });
  }
});
