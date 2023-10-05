import openi from "../openi"

export default eventHandler(async () => {
  const repos_info = await openi.get_repo_info()
  // console.log(repo_info);
  let files: Record<string,any> = {}
  for (const repo in repos_info) {
    const repo_info = repos_info[repo]
    if(repo_info.count <=0) {
      console.log("[WARN] No files in repo", repo);
      
      continue;
    }
    files[repo] = repo_info.data[0].attachments.map(item => ({
      name: item.name,
      uuid: item.uuid,
    }))
  }
  return files
})
