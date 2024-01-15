// CONSTANTS
const COMMITS_TO_REQUEST = 3;
const TRUNCATE_CHAR_THRESHOLD = 50;
const GITHUB_USERNAME = 'saphalpdyl';
const SORT_BY = 'pushed';

export const card = async (_,res) => {
  const repo_response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=${SORT_BY}&order=desc`);
  const json_response = await repo_response.json();
  const repo = json_response[0];

  const repo_last_updated = repo['updated_at'];
  const repo_full_name = repo['full_name'];
  const repo_name = repo['name'];
  const repo_size = repo['size'];

  const commits_response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repo_name}/commits?per_page=${COMMITS_TO_REQUEST}`);
  const commits = await commits_response.json();

  const createCommitText = (sha, commit_msg, commit_no) => {
    return `
        <text x="20" y="${130 + 24 * commit_no}" fill="#fff" font-size="12" font-family="Segoe UI,Verdana,sans-serif" font-weight="bold">
            ${sha} -
        </text>
        <text x="80" y="${130 + 24 * commit_no}" fill="#fff" font-size="12" font-family="Segoe UI,Verdana,sans-serif">
            ${commit_msg}
        </text>
    `;
  }
  
  const truncateString = (str, max_length) => str.length > max_length ? str.slice(0, max_length) + '...' : str;

  let commit_count = 0;
  let commit_text = "";
  for (const commit of commits) {
      const sha = commit.sha.substring(0,7);
      const desc = commit.commit.message;
      commit_text += createCommitText(sha,truncateString(desc,TRUNCATE_CHAR_THRESHOLD),commit_count)

      commit_count++;
  }

  // Getting currrent time to check if github is still caching images or not
  const currentDate = new Date();
  const currentTime = currentDate.getTime();

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('access-control-allow-origin','*')
  res.setHeader('Cache-Control','no-store')
  res.send(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="200">
        <rect width="600" height="200" style="fill:#212121;" stroke="#4CCF90" stroke-width="2" />
        <text fill="#ffffff" x="20" y="42" font-size="34" font-family="Segoe UI,Verdana,sans-serif" font-weight="bold">
            ${repo_name}
        </text>
        <text fill="#ffffff" x="235" y="43" fill-opacity="0.31" font-size="14" font-family="Segoe UI,Verdana,sans-serif" font-weight="100">
            ${repo_full_name}
        </text>

        <rect x="446" y="10" width="140" height="6.6" fill="#D6F57F"/>
        <rect x="487.562" y="23.2" width="98.4375" height="6.6" fill="#F5947F"/>
        <rect x="516" y="36.4" width="24.0625" height="6.6" fill="#28A5FF"/>
        <rect x="544.438" y="36.4" width="41.5625" height="6.6" fill="#28A5FF" fill-opacity="0.62"/>

        <text x="20" y="68" font-family="Segoe UI,Verdana,sans-serif" fill="#fff" font-size="16" font-weight="100" fill-opacity="0.31">
            Last updated on ${repo_last_updated}
        </text>
        <text x="20" y="104" fill="#4CCF90" font-size="14" font-family="Segoe UI,Verdana,sans-serif" font-weight="700" >
            Recent commits
        </text>

        ${commit_text}
        
        <text x="514" y="178" fill="#fff" fill-opacity="0.31" font-size="16" font-family="Segoe UI,Verdana,sans-serif" font-weight="bold">
            ${repo_size} Kb
        </text>
        <text x="0" y="7" fill="#fff" fill-opacity="0.1" font-size="7">
            ${currentTime}
        </text>
    </svg>
  `)
}
