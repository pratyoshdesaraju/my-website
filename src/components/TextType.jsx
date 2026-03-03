import { useEffect, useState } from "react";
import "./TextType.css";

const TextType = ({
  text = [],
  typingSpeed = 100,
  deletingSpeed = 60,
  pauseDuration = 1500,
  className = "",
  isDark = false,
}) => {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = text[index % text.length];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(current.slice(0, displayed.length + 1));
        if (displayed.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        setDisplayed(current.slice(0, displayed.length - 1));
        if (displayed.length - 1 === 0) {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % text.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, index, text, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span
      className={`text-type ${className}`}
      style={{ color: isDark ? '#ffffff' : '#000000' }}
    >
      {displayed}
      <span className="text-type-cursor">|</span>
    </span>
  );
};

export default TextType;
