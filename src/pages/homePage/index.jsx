import { MainPageLayout } from "./styles";

import ProjectDetails from "../../components/projectDetails";
import AboutUs from "../../components/aboutUs";

import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
      duration: 1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const HomePage = () => {
  return (
    <MainPageLayout>
      <motion.div
        className="container"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <h1 variants={item}>KenzieHub</h1>

        <img
          src="./images/ka-logo.jpg"
          alt="Kenzie Academy logo"
          width="250px"
          variants={item}
        />
      </motion.div>
      <motion.footer
        className="container"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <ProjectDetails variants={item} />
        <AboutUs variants={item} />
      </motion.footer>
    </MainPageLayout>
  );
};

export default HomePage;
