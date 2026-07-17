const { execSync } = require("child_process");
const { copyFileSync, existsSync, readdirSync, writeFileSync, mkdirSync } = require("fs");
const { join } = require("path");

const rootDir = join(__dirname, "..");
const vencordDir = join(rootDir, "vencord");
const staticDistDir = join(rootDir, "static", "dist");

console.log("=== Custom Vencord Build Utility ===");

// 1. Install dependencies in vencord if not done
if (!existsSync(join(vencordDir, "node_modules"))) {
    console.log("Installing Vencord dependencies (this may take a moment)...");
    try {
        execSync("pnpm install", { cwd: vencordDir, stdio: "inherit" });
    } catch (e) {
        console.error("Failed to run pnpm install, trying npm install...", e);
        execSync("npm install", { cwd: vencordDir, stdio: "inherit" });
    }
}

// 2. Build Vencord
console.log("Compiling Vencord...");
execSync("pnpm build", { cwd: vencordDir, stdio: "inherit" });

// 3. Copy compiled files to Vesktop's static/dist
console.log("Bundling Vencord into Vesktop static assets...");
if (!existsSync(staticDistDir)) {
    mkdirSync(staticDistDir, { recursive: true });
}

const distFiles = readdirSync(join(vencordDir, "dist"));
for (const file of distFiles) {
    copyFileSync(join(vencordDir, "dist", file), join(staticDistDir, file));
}

// 4. Ensure package.json exists in static/dist
writeFileSync(join(staticDistDir, "package.json"), "{}");

console.log("\nSuccess! Custom Vencord has been bundled into Vesktop!");
console.log("You can now run 'pnpm package' to generate a new installer.");
