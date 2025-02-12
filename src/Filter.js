import React from "react";

function Filter({
  setFilterParam,
  setThemeFilter,
  uniqueThemes,
  themeCounts, // Use passed down themeCounts
  regionsCount,
  filterParam,
  themeFilter,
}) {
  return (
    <div className="filter">
      {/* Region filter */}
      <div className="select">
        <select
          value={filterParam}
          onChange={(e) => setFilterParam(e.target.value)}
        >
          <option value="All">Filter By Region</option>
          {regionsCount.map((regionObj) => (
            <option key={regionObj.region} value={regionObj.region}>
              {regionObj.region} ({regionObj.count})
            </option>
          ))}
        </select>
      </div>

      {/* Theme filter */}
      <div className="select">
        <select
          value={themeFilter}
          onChange={(e) => setThemeFilter(e.target.value)}
        >
          <option value="All">Filter By Theme</option>
          {uniqueThemes
            .map((theme) => ({
              theme,
              count: themeCounts[theme] || 0, // Default count to 0 if theme doesn't exist
            }))
            .sort((a, b) => b.count - a.count) // Sort themes by count descending
            .map(({ theme, count }) => (
              <option key={theme} value={theme}>
                {theme} ({count})
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}

export { Filter };
