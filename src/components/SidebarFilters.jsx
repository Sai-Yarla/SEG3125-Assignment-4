import { useState } from 'react';
import { filterOptions } from '../data/products';

function FilterGroup({ title, options, selected, onToggle, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const activeCount = selected.length;

  return (
    <div className="filter-group">
      <button
        className="filter-group__trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {activeCount > 0 && (
            <span className="filter-group__count">{activeCount}</span>
          )}
          <svg
            className={`filter-group__chevron ${isOpen ? 'filter-group__chevron--open' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </button>
      <div
        className={`filter-group__content ${
          isOpen ? 'filter-group__content--expanded' : 'filter-group__content--collapsed'
        }`}
      >
        <div className="filter-group__options">
          {options.map((option) => (
            <label key={option} className="filter-checkbox">
              <span className="filter-checkbox__box">
                <input
                  type="checkbox"
                  className="filter-checkbox__input"
                  checked={selected.includes(option)}
                  onChange={() => onToggle(option)}
                />
                <span className="filter-checkbox__fill">
                  <svg
                    className="filter-checkbox__check"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              </span>
              <span className="filter-checkbox__label">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SidebarFilters({ filters, onFilterChange, onClear }) {
  const hasActiveFilters =
    filters.era.length > 0 ||
    filters.category.length > 0 ||
    filters.material.length > 0 ||
    filters.maxPrice < 2000;

  const fillPercent = (filters.maxPrice / 2000) * 100;

  return (
    <aside className="sidebar" id="sidebar-filters" aria-label="Filter products">
      <div className="sidebar__header">
        <h3 className="sidebar__title">Filter Exhibits</h3>
        {hasActiveFilters && (
          <button className="sidebar__clear" onClick={onClear} id="clear-filters-btn">
            Clear All
          </button>
        )}
      </div>

      <FilterGroup
        title="Era / Civilization"
        options={filterOptions.era}
        selected={filters.era}
        onToggle={(val) => onFilterChange('era', val)}
        defaultOpen={true}
      />

      <FilterGroup
        title="Item Category"
        options={filterOptions.category}
        selected={filters.category}
        onToggle={(val) => onFilterChange('category', val)}
        defaultOpen={true}
      />

      <FilterGroup
        title="Material"
        options={filterOptions.material}
        selected={filters.material}
        onToggle={(val) => onFilterChange('material', val)}
        defaultOpen={false}
      />

      {/* Price Range Slider */}
      <div className="filter-group" style={{ borderBottom: 'none' }}>
        <div className="filter-group__trigger" style={{ cursor: 'default' }}>
          <span>Price Range</span>
        </div>
        <div className="price-slider">
          <div className="price-slider__labels">
            <span>$0</span>
            <span>${filters.maxPrice.toLocaleString()}</span>
          </div>
          <input
            type="range"
            className="price-slider__input"
            min="50"
            max="2000"
            step="25"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange('maxPrice', Number(e.target.value))}
            aria-label="Maximum price"
            id="price-slider"
            style={{ '--fill-percent': `${fillPercent}%` }}
          />
        </div>
      </div>
    </aside>
  );
}
