import React from 'react';

function Filter({
  setFilterParam,
  setThemeFilter,
  uniqueThemes,
  themeCounts,
  regionsCount,
  filterParam,
  themeFilter,
}) {
  return (
    <div className="filter">
      {/* Region filter */}
      <div className="select">
        <select
          value={filterParam} // Bind the value to the current state of filterParam
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
          value={themeFilter} // Bind the value to the current state of themeFilter
          onChange={(e) => setThemeFilter(e.target.value)}
        >
          <option value="All">Filter By Theme</option>
          {uniqueThemes.map((theme) => (
            <option key={theme} value={theme}>
              {theme} ({themeCounts[theme]})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export { Filter };
