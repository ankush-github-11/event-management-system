const hasProtocol = (url: string) => /^https?:\/\//i.test(url);

const normalizeBaseUrl = (url: string) => {
  const trimmedUrl = url.trim().replace(/\/$/, "");
  if (hasProtocol(trimmedUrl)) {
    return trimmedUrl;
  }

  const protocol =
    trimmedUrl.startsWith("localhost") || trimmedUrl.startsWith("127.0.0.1")
      ? "http"
      : "https";

  return `${protocol}://${trimmedUrl}`;
};

export const getBaseUrl = () => {
  const envUrl =
    process.env.NEXT_PUBLIC_BASE_URL?.trim() ||
    process.env.VERCEL_URL?.trim() ||
    "http://localhost:3000";

  return normalizeBaseUrl(envUrl);
};
