import openi from "../openi"
import fs from 'fs';
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

let cache: Record<string, any> = {}

export default eventHandler(async (event) => {
  const query = getQuery(event) as any

  if (!config.cache_duration) {
    config.cache_duration = 3600000
    // 写入
    fs.writeFileSync('./config.json', JSON.stringify(config));
    console.log("[INFO] Set cache duration to 3600000");
  }

  if (cache[query.uuid]) {
    return { code: 1, url: cache[query.uuid] }
  }
  if (!query.uuid) {
    return { code: 0, message: "缺少 uuid 参数" }
  }
  const url = await openi.get_download_url(query.uuid)

  cache[query.uuid] = url
  setTimeout(() => {
    delete cache[query.uuid]
  },config.cache_duration)

  return {
    code: 1,
    url
  }
})
