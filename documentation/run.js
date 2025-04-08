
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// 递归获取所有md文件
function getMdFiles(dir) {
  let results = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    // 跳过node_modules目录
    if (item === 'node_modules' || item === 'progress.md') continue;

    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      results = results.concat(getMdFiles(fullPath));
    } else if (path.extname(fullPath) === '.md') {
      results.push(fullPath);
    }
  }

  return results;
}

// 主函数
async function main() {
  // 获取所有md文件
  const mdFiles = getMdFiles(__dirname);

  // 存储结果
  let results = [];

  // 处理每个文件
  for (const file of mdFiles) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const { data } = matter(content);
      const done = data.done ?? false;

      // 获取相对路径，并确保使用正斜杠
      const relativePath = path.relative(__dirname, file).replace(/\\/g, '/');
      results.push(`${relativePath}: ${done}`);
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }

  // 按字母顺序排序
  results.sort();

  // 生成progress.md
  const progressContent = results.join('\n');
  fs.writeFileSync(path.join(__dirname, 'progress.md'), progressContent);
}

main().catch(console.error);
