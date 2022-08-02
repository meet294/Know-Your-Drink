import classes from "./Card.module.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const Card = (props) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const movieAnimations = {
    hidden: { opacity: 0, y: 200 },
    visible: { opacity: 1, y: 0 },
    tap: { scale: 0.9 },
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      rel="noopener noreferrer"
      variants={movieAnimations}
      ref={ref}
      initial="hidden"
      animate={controls}
      whileTap="tap"
      transition={{
        duration: 0.2,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className={`${classes.card} ${props.className}`}
    >
      {props.children}
    </motion.div>
  );
};

export default Card;
