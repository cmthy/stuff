gsap.registerPlugin(ScrollTrigger);

let duration = 10,
    sections = gsap.utils.toArray(".headline"),
    sectionIncrement = duration / (sections.length - 1),
    tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".stuff-images",
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            start: "top top",
            end: "+=5000"
        }
    });

tl.to(sections, {
    xPercent: -100 * (sections.length - 1),
    duration: duration,
    ease: "none"
});



// everything below this is just for the fading/scaling up which is NOT scrubbed - it's all dynamic, triggered when each section enters/leaves so that the fading/scaling occurs at a consistent rate no matter how fast you scroll!
sections.forEach((section, index) => {
    let tween = gsap.from(section, {
        opacity: 0,
        scale: 0.6,
        duration: 1,
        force3D: true,
        paused: true
    });
    addSectionCallbacks(tl, {
        start: sectionIncrement * (index - 0.99),
        end: sectionIncrement * (index + 0.99),
        onEnter: () => tween.play(),
        onLeave: () => tween.reverse(),
        onEnterBack: () => tween.play(),
        onLeaveBack: () => tween.reverse()
    });
    index || tween.progress(1); // the first tween should be at its end (already faded/scaled in)
});
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  // Rotate element-1 clockwise, element-2 counterclockwise
  const rotation1 = scrollY * 0.3; // adjust multiplier for speed
  const rotation2 = -scrollY * 0.3;
  document.getElementById('element-1').style.transform = `rotate(${rotation1}deg)`;
  document.getElementById('element-2').style.transform = `rotate(${rotation2}deg)`;
  document.getElementById('element-3').style.transform = `rotate(${rotation2}deg)`;
  document.getElementById('element-4').style.transform = `rotate(${rotation2}deg)`;
  document.getElementById('element-5').style.transform = `rotate(${rotation2}deg)`;
  document.getElementById('element-6').style.transform = `rotate(${rotation2}deg)`;
});





