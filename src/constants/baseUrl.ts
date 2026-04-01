const GITHUB_PAGES_REPO = "thealpineops-site";

const isGithubPagesHost =
  typeof window !== "undefined" &&
  window.location.hostname.endsWith(".github.io");

const isGithubPagesRepoPath =
  typeof window !== "undefined" &&
  (window.location.pathname === `/${GITHUB_PAGES_REPO}` ||
    window.location.pathname.startsWith(`/${GITHUB_PAGES_REPO}/`));

const baseUrl =
  isGithubPagesHost && isGithubPagesRepoPath ? `/${GITHUB_PAGES_REPO}/` : "/";

export default baseUrl;
