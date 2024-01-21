**`🔴 DEPRECATED `**
**`🟡 ARCHIVED`**

Please be informed that this project is now deprecated and no longer actively maintained. I've rolled out a new and improved [Version 2](https://github.com/saphalpdyl/Recent-repo-2), reimagined in TypeScript, and it's currently hosted on Vercel.

For the latest and greatest, head over to [Version 2](https://github.com/saphalpdyl/Recent-repo-2). This older version won't be receiving any further updates or support. However, the GCF will keep on running for history purpose. 😆

# Dynamic GitHub Activity SVG Card

This GCP Cloud Function renders a dynamic SVG card that displays information about your most recently updated GitHub repository, including:

- Repository name
- Full name
- Last updated date
- Recent commits (up to 3)
- Repository size

Designed to be easily embedded within your GitHub-flavored README.md files for a visual showcase of your activity!

## Usage
1. Deploy the function:
- Follow GCP's instructions to deploy the function, ensuring it's publicly accessible.
- Note the function's URL for embedding.

2. Embed in README.md:
- Add the following Markdown code to your README.md file, replacing {function_url} with the actual URL:
```markdown
![GitHub Recent Repo Card](https://{function_url})
```
## Customization

- Edit the CONSTANTS section within the code to adjust:
- `COMMITS_TO_REQUEST`: Number of commits to display
- `TRUNCATE_CHAR_THRESHOLD`: Maximum length of commit messages
- `GITHUB_USERNAME`: Your GitHub username

## Additional Notes

- Caching is worked around, but the card stills takes ~1 minute to update in the README.md file.
- The SVG card is designed with a width of 600px and a height of 200px.
- The function uses the GitHub public API to retrieve repository data.
