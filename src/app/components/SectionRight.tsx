// 'use client';

// import React from 'react';
// import { motion, useAnimation } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import styles from './SectionRight.module.css';

// const images = [
//   { id: '01', text1: 'Indian Penal Code', text2: '1860' },
//   { id: '02', text1: 'Another Title', text2: 'Another Subtitle' },
//   { id: '03', text1: 'Yet Another Title', text2: 'Subtitle' },
//   { id: '04', text1: 'Title Four', text2: 'Subtitle Four' },
//   { id: '05', text1: 'Title Five', text2: 'Subtitle Five' },
// ];

// const SectionRightImage: React.FC = () => {
//   const controls = useAnimation();
//   const { ref, inView } = useInView({
//     triggerOnce: false,
//     threshold: 0.1,
//   });

//   React.useEffect(() => {
//     if (inView) {
//       controls.start('visible');
//     } else {
//       controls.start('hidden');
//     }
//   }, [controls, inView]);

//   return (
//     <div className={styles.sectionContainerRightImage} ref={ref}>
//       <div className={styles.scrollingContainer}>
//         <div className={styles.imageContainer}>
//           {images.map((image, index) => (
//             <motion.div
//               className={styles.photoContainerRightImage}
//               key={index}
//               initial={{ x: '100%' }}
//               animate={{ x: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 * index }}
//             >
//               <img src={`./first.png`} alt="Image Description" className={styles.photoRightImage} />
//               <span className={styles.topLeftTextRightImage}>{image.id}</span>
//               <div className={styles.bottomLeftContainerRightImage}>
//                 <span className={styles.ipcTextRightImage}>{image.text1}<br />{image.text2}</span>
//                 <motion.button
//                   className={styles.aboutUsButtonRightImage}
//                   whileHover={{ backgroundColor: 'black', color: 'white' }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Basic WorkFlow 🠖
//                 </motion.button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//       <div className={styles.bottomLineRightImage}></div>
//     </div>
//   );
// };

// export default SectionRightImage;
