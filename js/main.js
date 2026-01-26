function MainModule() {
  const me = {};

  const education = document.getElementById("Education");
  const skills = document.getElementById("Skills");
  const aboutMe = document.getElementById("About Me");
  const contactMe = document.getElementById("Contact Me");

  // education.addEventListener("click", () => {
  //   if (document.getElementById("minipageEducation")) {
  //     return;
  //   }
  //   const type = "Education";
  //   const content = `
  //     <h3>Education</h3>
  //     <p>B.Sc. in Computer Science — Example University</p>
  //     <p>Graduated: 2024</p>
  //   `;

  //   // Create and insert the minipage HTML
  //   document.body.insertAdjacentHTML("beforeend", openMiniPage(type, content));

  //   // Position the minipage roughly centered
  //   const minipage = document.getElementById(`minipage${type}`);
  //   if (minipage) {
  //     minipage.style.position = "absolute";
  //     const left = window.pageXOffset + Math.max(20, (window.innerWidth / 2) - 200);
  //     const top = window.pageYOffset + 100;
  //     minipage.style.left = left + "px";
  //     minipage.style.top = top + "px";

  //     // Wire the close button
  //     const closeBtn = minipage.querySelector(`.close${type}`);
  //     if (closeBtn) {
  //       closeBtn.addEventListener("click", () => {
  //         minipage.remove();
  //       });
  //     }

  //     // Allow dragging via MiniPageListener
  //     MiniPageListener(type);
  //   }
  // });
  education.addEventListener("click", () => {
    const type = "Education";
    const content = `
      <h4>Northeastern University</h4>
      <p><b>Computer Science + Media Arts Major</b></p>
      <p>Game Design + Math Minor</p>
      <p><b>Graduating:</b> Spring 2028</p>
      <p><b>Awards:</b> Dean's List (Fall 2024, Fall 2025)</p>
      <p><b>Classes:</b></p>
      <ul>
        <li><b>Programming Classes:</b> Graduate Level Web Development, Principles of Human Computer Interaction, Algorithms and Data, Object Oriented Design, Intro to Databases</li>
        <li><b>Art Classes:</b> Animation 1, Virtual Environment Design, Narrative Basics, Making with Video, Sound, and Animation</li>
      </ul>

    `;
    setupMiniPage(type, content);
  });

  skills.addEventListener("click", () => {
    const type = "Skills";
    const content = `
      <ul>
        <li><b>Languages:</b> Java, Kotlin, XML, C#, Python, TypeScript, CSS, HTML, and SQL</li>
        <li><b>Frameworks:</b> Streamlit, Flask, React, Node.js, and Bootstrap</li>
        <li><b>Programs:</b> VSCode, Unity, IntelliJ IDEA, Android Studio, Git, Adobe Animate, Premiere Pro, and Maya </li>
      </ul>
    `;
    setupMiniPage(type, content);
  });
  aboutMe.addEventListener("click", () => {
    const type = "About Me";
    const content = `
      <p>Student at <b>Northeastern University</b> working towards a <b>CS and Media Arts Combined Degree</b> as 
      well as a <em>Game Design + Math Minor</em>. I am interested in <b>Web Dev, Mobile App Dev, and Game Dev.</b> 
      I find rendering engines, projections, game design, and application design very interesting, 
      although I am generally interested in any field that I am able to learn more ideas, and use 
      math + creative problem solving.</p>
    `;
    setupMiniPage(type, content);
  });
  contactMe.addEventListener("click", () => {
    const type = "Contact Me";
        const content = `
      <h4>Avijit Singh</h4>
      <p>Email: <a href="mailto:avijitsingh704@gmail.com">avijitsingh704@gmail.com</a></p>
      <p>(570)-362-8147</p>
      <p>Boston, MA 02120</p>
      <p>Available: July - Dec 2026</p>`;

    setupMiniPage(type, content);
  });

  function setupMiniPage(type, content) {
    if (document.getElementById(`minipage${type}`)) {
      return;
    }
    document.body.insertAdjacentHTML("beforeend", openMiniPage(type, content));
    MiniPageListener(type);
    let closeBtn = document.getElementById(`close${type}`);
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        document.getElementById(`minipage${type}`).remove();
      });
    }
  }

  function openMiniPage(type, content) {
    return `<div id="minipage${type}" class="minipage">
      <div id="miniheader${type}" class="miniheader">
        <span class="minititle">${type}</span>
        <button id="close${type}" class="close">
          <img class="close-image" src="./source_images/close.svg" />
        </button>
      </div>
      <div class="minipage-content">${content}</div>
    </div>`;
  }

  function MiniPageListener(type) {
    let minipage = document.getElementById(`minipage${type}`);
    let miniheader = document.getElementById(`miniheader${type}`);
    if (!minipage || !miniheader) return;

    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    function dragMouseDown(e) {
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.addEventListener("mousemove", elementDrag);
      document.addEventListener("mouseup", closeDragElement);
    }

    function elementDrag(e) {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      minipage.style.top = minipage.offsetTop - pos2 + "px";
      minipage.style.left = minipage.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      document.removeEventListener("mousemove", elementDrag);
      document.removeEventListener("mouseup", closeDragElement);
    }

    miniheader.addEventListener("mousedown", dragMouseDown);
  }
  return me;
}

MainModule();
