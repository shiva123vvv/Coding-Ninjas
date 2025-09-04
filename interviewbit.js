// api/interviewbit.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  const username = req.query.username || "sivanesan-k_751";
  const profileUrl = `https://www.interviewbit.com/profile/${username}`;

  // Fetch profile page
  const response = await fetch(profileUrl);
  const html = await response.text();

  // Extract points and rank (simplified for demo)
  const pointsMatch = html.match(/Points:\s*([\d,]+)/);
  const rankMatch = html.match(/Rank:\s*([\d,]+)/);

  const points = pointsMatch ? pointsMatch[1] : "N/A";
  const rank = rankMatch ? rankMatch[1] : "N/A";

  // Modern SVG design
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="420" height="160" style="border-radius:16px">
    <defs>
      <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#1e3c72"/>
        <stop offset="100%" stop-color="#2a5298"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" rx="16" fill="url(#grad)" />
    <text x="20" y="40" fill="white" font-size="22" font-weight="bold">InterviewBit Stats</text>
    <text x="20" y="80" fill="#f1f1f1" font-size="16">👤 User: ${username}</text>
    <text x="20" y="110" fill="#ffdd57" font-size="16">⭐ Points: ${points}</text>
    <text x="20" y="140" fill="#00ffcc" font-size="16">🏆 Rank: ${rank}</text>
  </svg>
  `;

  res.setHeader("Content-Type", "image/svg+xml");
  res.status(200).send(svg);
}
