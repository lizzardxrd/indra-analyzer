const i18n = require("i18n");
const path = require("path");
const fs = require("fs");

process.setMaxListeners(0); 

const { showTitle } = require("./utils/ascii");
const Menu = require("./ui/menu");
const Analyzer = require("./core/analyzer");
const SymbolLoader = require("./core/symbolLoader");

i18n.configure({
  locales: ["en", "tr"],
  directory: path.join(__dirname, "lang"),
  defaultLocale: "en",
  cookie: "lang",
  objectNotation: true,
});

const menu = new Menu();
const analyzer = new Analyzer();
const symbolLoader = new SymbolLoader();

async function main() {
  menu.clearScreen();
  showTitle("Indra Analyzer", async () => {
    await menu.selectLanguage();
    await runMainMenu();
  });
}

async function runMainMenu() {
  while (true) {
    menu.clearScreen();
    const choice = await menu.showMainMenu();

    switch (choice) {
      case "analyze":
        await analyzeProcess();
        break;
      case "symbols":
        await analyzeSymbols();
        break;
      case "export":
        await exportAllData();
        break;
      case "language":
        await menu.selectLanguage();
        break;
      case "exit":
        console.log(i18n.__("goodbye"));
        process.exit(0);
    }
    await menu.pressAnyKey();
  }
}

async function analyzeProcess() {
  try {
    const pid = await menu.getPID();
    const details = await analyzer.getProcessDetails(pid);
    const executablePath = await symbolLoader.getProcessExecutablePath(pid);

    console.log(`\n${i18n.__("process_details")}:`);
    console.log(`--------------------`);
    console.log(`${i18n.__("memory_usage")}: ${details.memory} MB`);
    console.log(`${i18n.__("cpu_usage")}: ${details.cpu}%`);
    console.log(`${i18n.__("start_time")}: ${details.startTime}`);
    console.log(`${i18n.__("executable_path")}: ${executablePath}`);

  } catch (error) {
    menu.showError(error.message);
  }
}

async function analyzeSymbols() {
  try {
    const pid = await menu.getPID();
    const executablePath = await symbolLoader.getProcessExecutablePath(pid);
    const symbols = await symbolLoader.loadSymbols(executablePath);

    const choice = await menu.showSymbolMenu();

    if (choice === "show") {
      console.log(`\n${i18n.__("first_20_symbols")}:`);
      console.log(`--------------------`);
      symbols.slice(0, 20).forEach(s => console.log(s));
    } else if (choice === "export") {
      const timestamp = new Date().toISOString().replace(/[:.-]/g, "_");
      const filename = `symbols_${pid}_${timestamp}.txt`;
      const exportedPath = await symbolLoader.exportSymbols(symbols, filename);
      menu.showSuccess(`${i18n.__("all_symbols_exported_to")}${exportedPath}`);
    }
  } catch (error) {
    menu.showError(error.message);
  }
}

async function exportAllData() {
  try {
    const pid = await menu.getPID();
    const details = await analyzer.getProcessDetails(pid);
    const executablePath = await symbolLoader.getProcessExecutablePath(pid);
    const symbols = await symbolLoader.loadSymbols(executablePath);

    const timestamp = new Date().toISOString().replace(/[:.-]/g, "_");
    const filename = `report_${pid}_${timestamp}.txt`;
    const exportDir = path.join(__dirname, "export");

    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir);
    }

    const reportContent = `
${i18n.__("process_details")}:
--------------------
${i18n.__("memory_usage")}: ${details.memory} MB
${i18n.__("cpu_usage")}: ${details.cpu}%
${i18n.__("start_time")}: ${details.startTime}
${i18n.__("executable_path")}: ${executablePath}

${i18n.__("symbol_analysis")}:
--------------------
${symbols.join("\n")}
    `;

    const exportPath = path.join(exportDir, filename);
    fs.writeFileSync(exportPath, reportContent, "utf8");
    menu.showSuccess(`${i18n.__("report_exported")}${exportPath}`);

  } catch (error) {
    menu.showError(error.message);
  }
}

main();


