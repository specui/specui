import { fetchStargazers } from './fetchStargazers';

export async function getStargazersWithCache(owner: string, repo: string): Promise<number> {
  const cacheKey = 'stargazers';
  const cachedData = sessionStorage.getItem(cacheKey);
  const cacheExpiry = sessionStorage.getItem(`${cacheKey}-expiry`);

  if (cachedData && cacheExpiry && Date.now() < parseInt(cacheExpiry, 10)) {
    return parseInt(cachedData, 10);
  }

  const stargazers = await fetchStargazers(owner, repo);

  sessionStorage.setItem(cacheKey, stargazers.toString());
  sessionStorage.setItem(`${cacheKey}-expiry`, (Date.now() + 15 * 60 * 1000).toString());

  return stargazers;
}
