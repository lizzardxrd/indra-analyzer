const inquirer = require("inquirer");
const chalk = require("chalk");
const i18n = require("i18n");

class Menu {
  constructor() {
    this.currentLanguage = "en";
  }

  async selectLanguage() {
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "language",
        message: "Please select a language / Lütfen bir dil seçin:",
        choices: [
          { name: "English", value: "en" },
          { name: "Türkçe", value: "tr" },
        ],
      },
    ]);

    this.currentLanguage = answer.language;
    i18n.setLocale(answer.language);
    return answer.language;
  }

  async showMainMenu() {
    console.log(chalk.cyan(`\n${i18n.__("main_menu")}`));
    console.log(chalk.gray("─".repeat(40)));

    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: i18n.__("select_action"),
        choices: [
          { name: `🔍 ${i18n.__("process_details")}`, value: "analyze" },
          { name: `📊 ${i18n.__("symbol_analysis")}`, value: "symbols" },
          { name: `📄 ${i18n.__("export_report")}`, value: "export" },
          { name: `🌐 ${i18n.__("change_language")}`, value: "language" },
          { name: `❌ ${i18n.__("exit")}`, value: "exit" },
        ],
      },
    ]);

    return answer.action;
  }

  async getPID() {
    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "pid",
        message: i18n.__("enter_pid"),
        validate: (input) => {
          const pid = parseInt(input);
          if (isNaN(pid) || pid <= 0) {
            return i18n.__("invalid_pid");
          }
          return true;
        },
      },
    ]);

    return parseInt(answer.pid);
  }

  async showSymbolMenu() {
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: i18n.__("symbol_analysis"),
        choices: [
          { name: `📋 ${i18n.__("first_20_symbols")}`, value: "show" },
          { name: `💾 ${i18n.__("export_all_symbols")}`, value: "export" },
          { name: `↩️  ${i18n.__("back_to_main_menu")}`, value: "back" },
        ],
      },
    ]);

    return answer.action;
  }

  async confirmExport(filename) {
    const answer = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirm",
        message: `${i18n.__("export_confirm")} ${filename}?`,
        default: true,
      },
    ]);

    return answer.confirm;
  }

  showError(message) {
    console.log(chalk.red(`\n❌ ${i18n.__("error")}: ${message}`));
  }

  showSuccess(message) {
    console.log(chalk.green(`\n✅ ${message}`));
  }

  showInfo(message) {
    console.log(chalk.blue(`\nℹ️  ${message}`));
  }

  async pressAnyKey() {
    await inquirer.prompt([
      {
        type: "input",
        name: "continue",
        message: i18n.__("press_any_key"),
      },
    ]);
  }

  clearScreen() {
    console.clear();
  }
}

module.exports = Menu;


