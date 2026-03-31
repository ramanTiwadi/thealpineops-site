const ThemeToggle = () => {
  const toggleTheme = () => {
    const html = document.documentElement;
    html.dataset.theme = html.dataset.theme === "light" ? "dark" : "light";
  };

  return <button onClick={toggleTheme}>Toggle Theme</button>;
};

export default ThemeToggle;
