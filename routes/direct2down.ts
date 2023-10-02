import openi from "../openi"

export default eventHandler(async (event) => {
  const query = getQuery(event) as any
  if (!query.uuid) {
    return { code: 0, message: "缺少 uuid 参数" }
  }
  return {
    code: 1,
    url: await openi.get_download_url(query.uuid)
  }
})
