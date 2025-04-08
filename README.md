RedditPulse
A Reddit community engagement analytics dashboard built with Devvit to help moderators track metrics and qualify for Reddit Developer Funds.

Overview
RedditPulse provides subreddit moderators with real-time analytics, engagement tracking, and funding qualification tools. The dashboard helps communities understand their growth, track progress toward Reddit Developer Funds tiers, and create engaging content through interactive polls.

Unsupported image

Features
Analytics Dashboard
Track daily active users, qualified engagers, and engagement rates
View historical data with customizable time ranges (7/30/90 days)
Monitor key metrics that matter for Reddit Developer Funds qualification
Funding Progress Tracker
Track progress toward Reddit Developer Funds tiers
Visualize earnings potential based on engagement metrics
Monitor qualified engager counts against tier thresholds
Community Polls
Create interactive polls to drive community engagement
Schedule poll duration and track participation
Analyze voting patterns to understand community preferences
Automated Data Collection
Daily collection of subreddit engagement statistics
Historical data storage for trend analysis
Secure storage using Reddit's built-in data management
Installation
RedditPulse is a Devvit app that installs directly on your subreddit. To install:

Visit RedditPulse Installation Page (or find "RedditPulse" in the Reddit App Directory)
Authorize the app with your Reddit account
Select the subreddit where you want to install RedditPulse
Confirm the installation
Requirements:

You must be a moderator of the subreddit
Subreddit must meet Reddit's requirements for app installation
For funding qualification, subreddit should have at least 200 members
Development
RedditPulse is built with the Reddit Devvit platform:

Prerequisites
Node.js v22.2.0+
Devvit CLI
Setup
# Install Devvit CLI
npm install -g devvit
# Clone the repository
git clone https://github.com/yourusername/reddit-pulse.git
cd reddit-pulse
# Install dependencies
npm install
# Log in to Devvit
devvit login
# Upload the app
devvit upload
# Playtest on your subreddit
devvit playtest your-subreddit-name
Project Structure
reddit-pulse/
├── src/
│   ├── main.tsx                # App entry point
│   ├── components/             # UI components
│   │   ├── Dashboard.tsx
│   │   ├── EngagementChart.tsx
│   │   ├── FundingProgress.tsx
│   │   ├── PollCreator.tsx
│   │   └── StatsCards.tsx
│   ├── hooks/                  # Custom React hooks
│   │   └── useRedditData.ts
│   └── utils/                  # Utility functions
│       └── formatting.ts
├── devvit.yaml                 # Devvit configuration
├── package.json
└── tsconfig.json
Reddit Developer Funds
RedditPulse helps track progress toward qualifying for the Reddit Developer Funds 2025 program, which rewards developers for creating engaging apps. The funding tiers are:

Tier	Daily Qualified Engagers	Payout	Cumulative
1	500	$500	$500
2	1,000	$1,000	$1,500
3	10,000	$5,000	$6,500
4	50,000	$10,000	$16,500
5	250,000	$25,000	$41,500
6	1,000,000	$75,000	$116,500
Additionally, apps with 250 qualified installs receive a $1,000 payout.

Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
Project Link: https://github.com/ayish1998/reddit-pulse

Note: RedditPulse is not affiliated with Reddit, Inc. Reddit and the Reddit alien logo, Snoo, are registered trademarks of Reddit, Inc.
