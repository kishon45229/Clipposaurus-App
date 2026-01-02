import React from "react";

export const useGitHubStars = () => {
  const [stars, setStars] = React.useState<number>(0);

  React.useEffect(() => {
    fetch("https://api.github.com/repos/kishon45229/Clipposaurus")
      .then((res) => res.json())
      .then((data) => setStars(data.stargazers_count || 0))
      .catch(() => setStars(0));
  }, []);

  return stars;
};
