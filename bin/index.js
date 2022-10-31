#! /usr/bin/env node
const fs = require("fs");
const path = require("path");

let filePath = "./default-name.md";
let settingsFile = path.join(__dirname, "utils", "settings.json");

const inquirer = require("inquirer");
const {
  settingQuestions,
  createPostQuestions,
  homescreenQuestions,
} = require("./utils/questions.js");

const { buildFrontMatter } = require("./utils/frontmatter");

inquirer.prompt(homescreenQuestions).then((answers) => {
  if (answers.chosenOption === "Create blog post") {
    inquirer.prompt(createPostQuestions).then((answers) => {
      let postTitle = answers.postTitle;
      filePath = `/${postTitle.split(" ").join("-")}.md`;
      postTitle = postTitle
        .split(" ")
        .filter((x) => x.length > 0)
        .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
        .join(" ");

      // read from json using fetch and use data as buildfrontmatter arguments
      fs.readFile(settingsFile,(err,data) => {
        if (err) throw err;
        let metadata = JSON.parse(data);
        filePath = metadata.saveFilePath + filePath;
        fs.writeFile(
          filePath,
          buildFrontMatter(metadata.frontmatterElements, metadata.author, postTitle),
          { flag: "ax" },
          (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log("created " + filePath);
            }
          }
        );
      } )  
    });
  } else {
    inquirer.prompt(settingQuestions).then((answers) => {
      // savelocation should be changed into . if currentfolder
      if (answers.saveLocation === "Current folder") {
        answers.saveFilePath = ".";
      }

      // should save frontMatterElements with values author + layout + date if default was selected
      if (answers.frontmatterSettings.includes("Default")) {
        answers.frontmatterElements = ["author", "layout", "date"];
      }
      const settings = JSON.stringify(answers, null, "  ");
   
      fs.writeFile(settingsFile, settings, { flag: "w" }, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Settings saved!");
        }
      });
    });
  }
});
