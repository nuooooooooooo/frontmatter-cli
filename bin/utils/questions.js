// only shown on first use
const homescreenQuestions = [
  {
    type: "list",
    name: "chosenOption",
    message: "What do you want to do?",
    choices: ["Create blog post", "Settings"],
  },
];

const settingQuestions = [
  {
    type: "input",
    name: "author",
    message: "Author name: ",
    default() {
      return "James Smith";
    },
  },
  {
    type: "list",
    name: "frontmatterSettings",
    message: "Frontmatter variables: ",
    choices: ["Default (based on the Astro blog starter)", "Advanced"],
  },
  {
    type: "checkbox",
    name: "frontmatterElements",
    message: "Choose the elements you want in your frontmatter",
    choices: [
      { name: "title", checked: true, disabled: "compulsory" },
      { name: "author", checked: true },
      { name: "layout", checked: true },
      { name: "date", checked: true },
      { name: "description" },
      { name: "tags" },
      { name: "category" },
      { name: "slug" },
    ],
    when(answers) {
      if (answers.frontmatterSettings === "Advanced")
        return answers.frontmatterSettings;
    },
  },
  {
    type: "list",
    name: "saveLocation",
    message: "Choose where .md files should be saved from now on: ",
    choices: ["Current folder", "Custom filepath"],
  },
  {
    type: "input",
    name: "saveFilePath",
    message: "Custom save location: ",
    validate(value) {
      const regex =
        /(\/.*|[a-zA-Z]:\\(?:([^<>:"\/\\|?*]*[^<>:"\/\\|?*.]\\|..\\)*([^<>:"\/\\|?*]*[^<>:"\/\\|?*.]\\?|..\\))?)/;
      const pass = value.match(regex);
      if (pass) {
        return true;
      }

      return "Invalid file path, try again";
    },
    when(answers) {
        if (answers.saveLocation === "Custom filepath") {
            return answers.saveLocation;
        }
    }
  },
];

// shown when a user uses the cli
const createPostQuestions = [
  {
    type: "input",
    name: "postTitle",
    message: "Blog post name: ",
    validate(value) {
      const pass = value.match(/^[a-z0-9A-Z\s]*$/g);
      if (pass) {
        return true;
      }

      return "Try again, only letters and numbers are allowed";
    },
  },
];



module.exports.homescreenQuestions = homescreenQuestions;
module.exports.settingQuestions = settingQuestions;
module.exports.createPostQuestions = createPostQuestions;

