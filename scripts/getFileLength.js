const got = require('got');

const getFileLength = async (filename) => {
  try {
    const result = await got.head(filename);
    const contentLength = result.headers['content-length'];
    return Number.parseInt(contentLength, 10);
  } catch (error) {
    console.log(error.toString());
    return 0;
  }
};

(async () => {
  const filename = '/podcasts/Cruze_Podcast009_140106.mp3';
  const fullPath = `https://f001.backblazeb2.com/file/djcruzemedia${filename}`;
  const fileLength = await getFileLength(fullPath);

  console.log(fullPath);
  console.log(`\tlength: ${fileLength}`);
})();
