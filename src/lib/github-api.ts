import { z } from "zod";

export const RepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  html_url: z.string().url(),
  homepage: z.string().url().nullable(),
  language: z.string().nullable(),
  stargazers_count: z.number().int().nonnegative(),
  fork: z.boolean(),
  topics: z.array(z.string()),
});

export type Repo = z.infer<typeof RepoSchema>;

const GITHUB_API_BASE = "https://api.github.com";

export const getGitHubToken = (): string | undefined => {
  return import.meta.env.VITE_GITHUB_TOKEN as string | undefined;
};

export const fetchGitHubRepos = async (username: string): Promise<Repo[]> => {
  const token = getGitHubToken();
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(
    `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=100`,
    { headers },
  );

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data = await response.json();
  return RepoSchema.array().parse(data);
};
