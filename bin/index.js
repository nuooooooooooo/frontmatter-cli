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

const {
  defaultFrontMatter, 
  buildFrontMatter
} = require("./utils/frontmatter")

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

      fs.writeFile(filePath, buildFrontMatter(["author", "layout", "date"],"test",postTitle), { flag: "ax" }, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("created " + filePath);
        }
      });
    });
  } else {
    inquirer.prompt(settingQuestions).then((answers) => {
      //buildFrontMatter(answers.frontmatterElements, answers.author)
      const settings = JSON.stringify(answers, null, '  ');
      console.log(settings)
    });
  }
});
