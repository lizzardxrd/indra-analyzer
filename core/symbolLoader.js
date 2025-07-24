const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const i18n = require('i18n');

class SymbolLoader {
  constructor() {
    this.platform = process.platform;
  }

  async getProcessExecutablePath(pid) {
    return new Promise((resolve, reject) => {
      let command;
      
      if (this.platform === 'win32') {
        command = `wmic process where processid=${pid} get executablepath /format:value`;
      } else {
        command = `readlink -f /proc/${pid}/exe`;
      }

      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(new Error(`${i18n.__('error')}: ${error.message}`));
          return;
        }

        let execPath;
        if (this.platform === 'win32') {
          const match = stdout.match(/ExecutablePath=(.+)/);
          execPath = match ? match[1].trim() : null;
        } else {
          execPath = stdout.trim();
        }

        if (!execPath || execPath === '') {
          reject(new Error(i18n.__('process_not_found')));
          return;
        }

        resolve(execPath);
      });
    });
  }

  async loadSymbols(executablePath) {
    return new Promise((resolve, reject) => {
      let command;

      if (this.platform === 'win32') {
        command = `dumpbin /exports "${executablePath}"`;
      } else {
        command = `nm -C "${executablePath}" 2>/dev/null | head -100`;
      }

      exec(command, (error, stdout, stderr) => {
        if (error) {
          if (this.platform !== 'win32') {
            const altCommand = `objdump -t "${executablePath}" 2>/dev/null | head -100`;
            exec(altCommand, (altError, altStdout, altStderr) => {
              if (altError) {
                resolve(['Sembol bilgisi alınamadı / Symbol information not available']);
                return;
              }
              const symbols = this.parseSymbols(altStdout, 'objdump');
              resolve(symbols);
            });
            return;
          }
          resolve(['Sembol bilgisi alınamadı / Symbol information not available']);
          return;
        }

        const symbols = this.parseSymbols(stdout, this.platform === 'win32' ? 'dumpbin' : 'nm');
        resolve(symbols);
      });
    });
  }

  parseSymbols(output, tool) {
    const lines = output.split('\\n');
    const symbols = [];

    if (tool === 'dumpbin') {
      let inExportSection = false;
      for (const line of lines) {
        if (line.includes('ordinal hint RVA      name')) {
          inExportSection = true;
          continue;
        }
        if (inExportSection && line.trim()) {
          const parts = line.trim().split(/\\s+/);
          if (parts.length >= 4) {
            symbols.push(parts[parts.length - 1]);
          }
        }
        if (symbols.length >= 100) break;
      }
    } else if (tool === 'nm') {
      for (const line of lines) {
        if (line.trim()) {
          const parts = line.trim().split(/\\s+/);
          if (parts.length >= 3) {
            symbols.push(parts[parts.length - 1]);
          }
        }
        if (symbols.length >= 100) break;
      }
    } else if (tool === 'objdump') {
      for (const line of lines) {
        if (line.includes('g') && line.includes('F')) {
          const parts = line.trim().split(/\\s+/);
          if (parts.length >= 6) {
            symbols.push(parts[parts.length - 1]);
          }
        }
        if (symbols.length >= 100) break;
      }
    }

    return symbols.length > 0 ? symbols : ['Sembol bulunamadı / No symbols found'];
  }

  async exportSymbols(symbols, filename) {
    const exportPath = path.join(__dirname, '..', 'export', filename);
    const content = symbols.join('\\n');
    
    return new Promise((resolve, reject) => {
      fs.writeFile(exportPath, content, 'utf8', (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(exportPath);
      });
    });
  }
}

module.exports = SymbolLoader;

