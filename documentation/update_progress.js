
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Function to get all markdown files from REQ directories
function getMarkdownFiles(directoryPath) {
    const items = fs.readdirSync(directoryPath);
    return items
        .filter(item => item.startsWith('REQ_') && fs.statSync(path.join(directoryPath, item)).isDirectory())
        .map(reqDir => {
            const mdFile = path.join(directoryPath, reqDir, `${reqDir}.md`);
            return fs.existsSync(mdFile) ? mdFile : null;
        })
        .filter(file => file !== null);
}

// Function to extract frontmatter and h1 from markdown file
function processMarkdownFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data, content: markdownContent } = matter(content);

    // Extract first h1 heading
    const h1Match = markdownContent.match(/^#\s+(.+)$/m);
    const h1 = h1Match ? h1Match[1] : '';

    return {
        file: path.basename(filePath),
        done: data.done || false,
        title: h1
    };
}

// Main function
function main() {
    const directoryPath = __dirname;
    const markdownFiles = getMarkdownFiles(directoryPath);

    const results = markdownFiles.map(file => processMarkdownFile(file));


    // Calculate progress statistics
    const totalTasks = results.length;
    const completedTasks = results.filter(({ done }) => done).length;
    const progressPercentage = totalTasks > 0
        ? Math.round((completedTasks / totalTasks) * 100)
        : 0;

    // Generate progress.md content
    const progressContent = [
      '# Progress Report\n',
      `**Progress:** ${completedTasks}/${totalTasks} (${progressPercentage}%)\n\n`,
      ...results.map(({ file, done, title }) =>
          {
            return `- [${done ? 'x' : ' '}] [${file}] ${title}`
          }
      ),
      '---',
      ...results.map(({ file, done, title }) =>
        {
          return `[${file}]: https://github.com/louiscklaw/hko-mcp/blob/master/documentation/${file.replace('.md','')}/${file}`
        }
    ),
  ].join('\n');

    // Write to progress.md
    fs.writeFileSync(path.join(directoryPath, 'progress.md'), progressContent);
}

main();
console.log('done')
