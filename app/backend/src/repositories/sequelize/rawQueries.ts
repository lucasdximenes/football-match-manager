const homeTeamsLeaderBoardQuery = `
SELECT
  t.team_name AS name,
  SUM(
    IF(
      m.home_team_goals > m.away_team_goals,
      3,
      IF(m.home_team_goals = m.away_team_goals, 1, 0)
    )
  ) AS totalPoints,
  COUNT(m.id) AS totalGames,
  SUM(m.home_team_goals > m.away_team_goals) AS totalVictories,
  SUM(m.home_team_goals = m.away_team_goals) AS totalDraws,
  SUM(m.home_team_goals < m.away_team_goals) AS totalLosses,
  SUM(m.home_team_goals) AS goalsFavor,
  SUM(m.away_team_goals) AS goalsOwn,
  SUM(m.home_team_goals - m.away_team_goals) AS goalsBalance,
  ROUND(
    SUM(
      IF(
        m.home_team_goals > m.away_team_goals,
        3,
        IF(m.home_team_goals = m.away_team_goals, 1, 0)
      )
    ) / (COUNT(m.id) * 3) * 100,
    2
  ) AS efficiency
FROM
  matches m
  JOIN teams t ON t.id = m.home_team_id
WHERE
  m.in_progress = 0
GROUP BY
  t.team_name
ORDER BY
  totalPoints DESC,
  totalVictories DESC,
  goalsBalance DESC,
  goalsFavor DESC,
  goalsOwn ASC;
`;

const awayTeamsLeaderBoardQuery = `
SELECT
  t.team_name AS name,
  SUM(
    IF(
      m.home_team_goals < m.away_team_goals,
      3,
      IF(m.home_team_goals = m.away_team_goals, 1, 0)
    )
  ) AS totalPoints,
  COUNT(m.id) AS totalGames,
  SUM(m.home_team_goals < m.away_team_goals) AS totalVictories,
  SUM(m.home_team_goals = m.away_team_goals) AS totalDraws,
  SUM(m.home_team_goals > m.away_team_goals) AS totalLosses,
  SUM(m.away_team_goals) AS goalsFavor,
  SUM(m.home_team_goals) AS goalsOwn,
  SUM(m.away_team_goals - m.home_team_goals) AS goalsBalance,
  ROUND(
    SUM(
      IF(
        m.home_team_goals < m.away_team_goals,
        3,
        IF(m.home_team_goals = m.away_team_goals, 1, 0)
      )
    ) / (COUNT(m.id) * 3) * 100,
    2
  ) AS efficiency
FROM
  matches m
  JOIN teams t ON t.id = m.away_team_id
WHERE
  m.in_progress = 0
GROUP BY
  t.team_name
ORDER BY
  totalPoints DESC,
  totalVictories DESC,
  goalsBalance DESC,
  goalsFavor DESC,
  goalsOwn ASC;
`;

const teamsLeaderBoardQuery = `
SELECT
  t.team_name AS name,
  SUM(
    IF(
      (
        m.home_team_id = t.id
        AND m.home_team_goals > m.away_team_goals
      )
      OR (
        m.away_team_id = t.id
        AND m.away_team_goals > m.home_team_goals
      ),
      3,
      IF(m.home_team_goals = m.away_team_goals, 1, 0)
    )
  ) AS totalPoints,
  COUNT(m.id) AS totalGames,
  SUM(
    IF(
      (
        m.home_team_id = t.id
        AND m.home_team_goals > m.away_team_goals
      )
      OR (
        m.away_team_id = t.id
        AND m.away_team_goals > m.home_team_goals
      ),
      1,
      0
    )
  ) AS totalVictories,
  SUM(IF(m.home_team_goals = m.away_team_goals, 1, 0)) AS totalDraws,
  SUM(
    IF(
      (
        m.home_team_id = t.id
        AND m.home_team_goals < m.away_team_goals
      )
      OR (
        m.away_team_id = t.id
        AND m.away_team_goals < m.home_team_goals
      ),
      1,
      0
    )
  ) AS totalLosses,
  SUM(
    IF(
      m.home_team_id = t.id,
      m.home_team_goals,
      m.away_team_goals
    )
  ) AS goalsFavor,
  SUM(
    IF(
      m.home_team_id = t.id,
      m.away_team_goals,
      m.home_team_goals
    )
  ) AS goalsOwn,
  SUM(
    IF(
      m.home_team_id = t.id,
      m.home_team_goals,
      m.away_team_goals
    )
  ) - SUM(
    IF(
      m.home_team_id = t.id,
      m.away_team_goals,
      m.home_team_goals
    )
  ) AS goalsBalance,
  ROUND(
    SUM(
      IF(
        (
          m.home_team_id = t.id
          AND m.home_team_goals > m.away_team_goals
        )
        OR (
          m.away_team_id = t.id
          AND m.away_team_goals > m.home_team_goals
        ),
        3,
        IF(m.home_team_goals = m.away_team_goals, 1, 0)
      )
    ) / (COUNT(m.id) * 3) * 100,
    2
  ) AS efficiency
FROM
  matches m
  JOIN teams t ON t.id IN (m.home_team_id, m.away_team_id)
WHERE
  m.in_progress = 0
GROUP BY
  t.team_name
ORDER BY
  totalPoints DESC,
  totalVictories DESC,
  goalsBalance DESC,
  goalsFavor DESC,
  goalsOwn ASC;
`;

export {
  homeTeamsLeaderBoardQuery,
  awayTeamsLeaderBoardQuery,
  teamsLeaderBoardQuery,
};
