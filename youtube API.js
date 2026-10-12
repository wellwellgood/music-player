const YOUTUBE_API_KEY = "AIzaSyBUx5URPZTIYPyUQ-88OaLx8cgTHmEdMhQ";

async function searchYouTube(query) {
  const params = new URLSearchParams({
    part: "snippet",
    type: "video",
    q: query,
    maxResults: "10",
    regionCode: "KR",
    relevanceLanguage: "ko",
    key: YOUTUBE_API_KEY,
  });

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?${params}`,
  );

  if (!response.ok) throw new Error("YouTube 검색에 실패했어요.");

  const data = await response.json();

  return data.items.map((item) => ({
    videoId: item.id.videoId,
    title: item.snippet.title,
    artist: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails.medium.url,
  }));
}
