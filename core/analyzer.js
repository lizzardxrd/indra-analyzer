const pidusage = require("pidusage");
const { exec } = require("child_process");
const i18n = require("i18n");

class Analyzer {
  async getProcessDetails(pid) {
    try {
      const stats = await pidusage(pid);
      const startTime = new Date(stats.elapsed);

      return {
        memory: (stats.memory / 1024 / 1024).toFixed(2), 
        cpu: stats.cpu.toFixed(2),
        startTime: startTime.toLocaleString(),
        executablePath: "N/A", 
      };
    } catch (error) {
      if (error.message.includes("No matching pid found")) {
        throw new Error(i18n.__("process_not_found"));
      }
      throw new Error(`${i18n.__("error")}: ${error.message}`);
    }
  }

  async exportReport(pid, details, symbols, filename) {
    const reportContent = `
${i18n.__("process_details")}:
--------------------
${i18n.__("memory_usage")}: ${details.memory} MB
${i18n.__("cpu_usage")}: ${details.cpu}%
${i18n.__("start_time")}: ${details.startTime}
${i18n.__("executable_path")}: ${details.executablePath}

${i18n.__("symbol_analysis")}:
--------------------
${symbols.join("\n")}
    `;

    return reportContent;
  }
}

module.exports = Analyzer;


