import { truncateString } from "./utils.js";

const createCommitsSVGFromList = (commit_list, truncate_char_threshold) => {

  let commit_count = 0;
  let commit_text = "";
  for (const commit of commit_list) {
      const sha = commit.sha.substring(0,7);
      const desc = commit.commit.message;
      commit_text += createCommitText(sha,truncateString(desc,truncate_char_threshold),commit_count)

      commit_count++;
  }
  
  return commit_text;
}

const createCommitText = (sha, commit_msg, commit_no) => {
  return `
      <text x="20" y="${130 + 24 * commit_no}" fill="#fff" font-size="12" font-family="Segoe UI,Verdana,sans-serif" font-weight="bold">
          ${sha} -
      </text>
      <text x="80" y="${130 + 24 * commit_no}" fill="#fff" font-size="12" font-family="Segoe UI,Verdana,sans-serif">
          ${
              commit_msg.replace(/&/g, '&amp;')
                      .replace(/"/g, '&quot;')
                      .replace(/'/g, '&apos;')
                      .replace(/>/g, '&gt;')
                      .replace(/</g, '&lt;')
          }
      </text>
  `;
}

export default createCommitsSVGFromList;
