export async function fetchStargazers(owner: string, repo: string): Promise<number> {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
  if (!response.ok) {
    throw new Error('Failed to fetch stargazers');
  }
  const data = await response.json();
  return data.stargazers_count;
}
