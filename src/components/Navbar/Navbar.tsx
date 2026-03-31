import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import navItemsData from "../../data/navItems.json";

type NavItem = {
  to: string;
  label: string;
  end?: boolean;
  iconPath: string;
};

const navItems = navItemsData as NavItem[];

const getMobileVisibleCount = (width: number) => (width <= 420 ? 3 : 4);

type NavbarProps = {
  collapsed: boolean;
  onToggleCollapse: () => void;
};

const Navbar = ({ collapsed, onToggleCollapse }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileVisibleCount, setMobileVisibleCount] = useState(() =>
    typeof window === "undefined" ? 4 : getMobileVisibleCount(window.innerWidth),
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleResize = () => {
      setMobileVisibleCount(getMobileVisibleCount(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleMobileItems = navItems.slice(0, mobileVisibleCount);
  const showMobileMenuToggle = navItems.length > mobileVisibleCount;

  return (
    <>
      <nav
        className={`nav ${collapsed ? "navCollapsed" : ""}`}
        aria-label="Primary"
      >
        <div className="desktopNav">
          <div className="desktopLinks">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `desktopLink ${isActive ? "activeLink" : ""}`
                }
                title={item.label}
              >
                <span className="navIcon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                    <path d={item.iconPath} />
                  </svg>
                </span>
                <span className="desktopLinkLabel">{item.label}</span>
              </NavLink>
            ))}
          </div>

          <div className="desktopBottom">
            <button
              type="button"
              className="collapseBtn"
              onClick={onToggleCollapse}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-pressed={collapsed}
            >
              <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                <path d="M14.7 6.3a1 1 0 0 1 0 1.4L10.4 12l4.3 4.3a1 1 0 1 1-1.4 1.4l-5-5a1 1 0 0 1 0-1.4l5-5a1 1 0 0 1 1.4 0z" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div
        className="mobileBottomNav"
        role="navigation"
        aria-label="Mobile primary"
      >
        {visibleMobileItems.map((item) => (
          <NavLink
            key={`mobile-${item.to}`}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `mobileLink ${isActive ? "activeLink" : ""}`
            }
            title={item.label}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="navIcon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                <path d={item.iconPath} />
              </svg>
            </span>
            <span className="mobileLabel">{item.label}</span>
          </NavLink>
        ))}

        {showMobileMenuToggle && (
          <button
            type="button"
            className={`mobileMenuToggle ${mobileMenuOpen ? "mobileMenuToggleOpen" : ""}`}
            aria-label="Open full mobile menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobileNavPanel"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        )}
      </div>

      <button
        type="button"
        className={`mobileNavBackdrop ${mobileMenuOpen ? "mobileNavBackdropVisible" : ""}`}
        aria-label="Close mobile menu panel"
        onClick={() => setMobileMenuOpen(false)}
      />

      <aside
        id="mobileNavPanel"
        className={`mobileNavPanel ${mobileMenuOpen ? "mobileNavPanelOpen" : ""}`}
        aria-label="All mobile menu items"
      >
        <div className="mobileNavPanelHeader">
          <span>Menu</span>
          <button
            type="button"
            className="mobilePanelCloseBtn"
            aria-label="Close mobile menu"
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
              <path d="M18.7 6.7a1 1 0 0 0-1.4-1.4L12 10.6 6.7 5.3a1 1 0 0 0-1.4 1.4l5.3 5.3-5.3 5.3a1 1 0 0 0 1.4 1.4l5.3-5.3 5.3 5.3a1 1 0 0 0 1.4-1.4L13.4 12l5.3-5.3z" />
            </svg>
          </button>
        </div>

        <div className="mobileNavPanelLinks">
          {navItems.map((item) => (
            <NavLink
              key={`mobile-panel-${item.to}`}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `mobilePanelLink ${isActive ? "activeLink" : ""}`
              }
              title={item.label}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="navIcon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                  <path d={item.iconPath} />
                </svg>
              </span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </aside>
    </>
  );
};

export default Navbar;
