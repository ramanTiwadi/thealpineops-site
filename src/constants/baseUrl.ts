const GITHUB_PAGES_REPO = "thealpineops-site";
const GITHUB_PAGES_HOST = "ramanTiwadi.github.io";

const isGithubPagesRepoHost =
  typeof window !== "undefined" &&
  window.location.hostname === GITHUB_PAGES_HOST;

const baseUrl = isGithubPagesRepoHost ? `/${GITHUB_PAGES_REPO}/` : "/";

export default baseUrl;
