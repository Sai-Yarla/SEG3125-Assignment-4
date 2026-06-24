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
    filters.origin.length > 0 ||
    filters.condition.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 2000;

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

      <FilterGroup
        title="Origin"
        options={filterOptions.origin}
        selected={filters.origin}
        onToggle={(val) => onFilterChange('origin', val)}
        defaultOpen={false}
      />

      <FilterGroup
        title="Condition"
        options={filterOptions.condition}
        selected={filters.condition}
        onToggle={(val) => onFilterChange('condition', val)}
        defaultOpen={false}
      />

      {/* Price Range Slider */}
      <div className="filter-group" style={{ borderBottom: 'none' }}>
        <div className="filter-group__trigger" style={{ cursor: 'default' }}>
          <span>Price Range</span>
        </div>
        <div className="price-slider">
          <div className="price-slider__labels">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
          <div className="price-slider__dual-container">
            <div className="price-slider__track">
              <div 
                className="price-slider__fill" 
                style={{ 
                  left: `${(filters.priceRange[0] / 2000) * 100}%`, 
                  right: `${100 - (filters.priceRange[1] / 2000) * 100}%` 
                }} 
              />
            </div>
            <input
              type="range"
              className="price-slider__input"
              min="0"
              max="2000"
              step="25"
              value={filters.priceRange[0]}
              onChange={(e) => {
                const val = Math.min(Number(e.target.value), filters.priceRange[1] - 25);
                onFilterChange('priceRange', [val, filters.priceRange[1]]);
              }}
              aria-label="Minimum price"
            />
            <input
              type="range"
              className="price-slider__input"
              min="0"
              max="2000"
              step="25"
              value={filters.priceRange[1]}
              onChange={(e) => {
                const val = Math.max(Number(e.target.value), filters.priceRange[0] + 25);
                onFilterChange('priceRange', [filters.priceRange[0], val]);
              }}
              aria-label="Maximum price"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
