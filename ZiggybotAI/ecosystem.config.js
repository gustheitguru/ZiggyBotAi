module.exports = {
    apps: [
      {
        name: 'ZiggyBotAI',
        script: 'npm',
        cwd: '/home/ubuntu/ZiggyBotAI/ZiggybotAI',
        args: 'run dev -- --host',
        env: {
          NODE_ENV: 'development',
        },
      },
    ],
  };