const openButton = document.querySelector(".open-btn");


openButton.addEventListener("click", function () {

    window.scrollTo({

        top: window.innerHeight,

        behavior: "smooth"

    });

});

// ========================================
// CINEMATIC OPENING
// ========================================

const openingScreen =
    document.querySelector(".opening-screen");

const openingButton =
    document.querySelector(".opening-button");

const weddingMusic =
    document.getElementById(
        "weddingMusic"
    );

const musicControl =
    document.getElementById(
        "musicControl"
    );


openingButton.addEventListener(
    "click",
    function () {

        openingScreen.classList.add(
            "hide"
        );

        weddingMusic.volume = 0.20;

        weddingMusic.play()
            .then(function () {

                musicControl.classList.add(
                    "playing"
                );

            })
            .catch(function (error) {

                console.log(
                    "Music could not start:",
                    error
                );

            });

    }
);

/* =========================
   MUSIC PLAY / PAUSE
========================= */

musicControl.addEventListener(
    "click",
    function () {

        if (
            weddingMusic.paused
        ) {

            weddingMusic.play()
                .then(function () {

                    musicControl.classList.add(
                        "playing"
                    );

                });

        } else {

            weddingMusic.pause();

            musicControl.classList.remove(
                "playing"
            );

        }

    }
);

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

const revealElements =
    document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );


const revealObserver = new IntersectionObserver(

    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("revealed");

            }

        });

    },

    {
        threshold: 0.15
    }

);


revealElements.forEach(function (element) {

    revealObserver.observe(element);

});

// ========================================
// TIMELINE SCROLL PROGRESS
// ========================================

const timeline =
    document.querySelector(".timeline");

const timelineProgress =
    document.querySelector(".timeline-progress");


function updateTimeline() {

    if (!timeline || !timelineProgress) {
        return;
    }


    const timelineRect =
        timeline.getBoundingClientRect();


    const windowHeight =
        window.innerHeight;


    const startPoint =
        windowHeight * 0.75;


    const progress =
        (startPoint - timelineRect.top)
        / timelineRect.height;


    const percentage =
        Math.min(
            Math.max(progress * 100, 0),
            100
        );


    timelineProgress.style.height =
        percentage + "%";

}


window.addEventListener(
    "scroll",
    updateTimeline
);


updateTimeline();

/* =========================
   WEDDING COUNTDOWN
========================= */

const countdownTarget =
    new Date("2026-10-30T00:00:00+01:00").getTime();

const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");


function updateCountdown() {

    const now = new Date().getTime();

    const distance =
        countdownTarget - now;


    if (distance <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        document.querySelector(
            ".countdown-message"
        ).textContent =
            "The day is finally here.";

        return;
    }


    const days =
        Math.floor(
            distance / (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (distance %
                (1000 * 60 * 60 * 24))
            / (1000 * 60 * 60)
        );

    const minutes =
        Math.floor(
            (distance %
                (1000 * 60 * 60))
            / (1000 * 60)
        );

    const seconds =
        Math.floor(
            (distance %
                (1000 * 60))
            / 1000
        );


    updateCountdownValue(
        daysElement,
        days
    );

    updateCountdownValue(
        hoursElement,
        hours
    );

    updateCountdownValue(
        minutesElement,
        minutes
    );

    updateCountdownValue(
        secondsElement,
        seconds
    );
}


function updateCountdownValue(
    element,
    value
) {

    const formattedValue =
        String(value).padStart(2, "0");


    if (
        element.textContent !==
        formattedValue
    ) {

        element.textContent =
            formattedValue;

        element.classList.remove("tick");

        void element.offsetWidth;

        element.classList.add("tick");
    }
}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);

/* =========================
   FULLSCREEN PHOTO VIEWER
========================= */

const galleryImages =
    document.querySelectorAll(
        ".gallery-image img"
    );

const photoViewer =
    document.getElementById(
        "photoViewer"
    );

const viewerImage =
    document.getElementById(
        "viewerImage"
    );

const viewerClose =
    document.getElementById(
        "viewerClose"
    );

const viewerPrev =
    document.getElementById(
        "viewerPrev"
    );

const viewerNext =
    document.getElementById(
        "viewerNext"
    );

const viewerCounter =
    document.getElementById(
        "viewerCounter"
    );


let currentPhoto = 0;


/* =========================
   OPEN PHOTO
========================= */

function openPhoto(index) {

    currentPhoto = index;

    viewerImage.src =
        galleryImages[currentPhoto].src;

    viewerImage.alt =
        galleryImages[currentPhoto].alt;

    updateViewerCounter();

    photoViewer.classList.add(
        "active"
    );

    document.body.style.overflow =
        "hidden";
}


/* =========================
   CLOSE PHOTO
========================= */

function closePhoto() {

    photoViewer.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";
}


/* =========================
   NEXT PHOTO
========================= */

function nextPhoto() {

    currentPhoto++;

    if (
        currentPhoto >=
        galleryImages.length
    ) {
        currentPhoto = 0;
    }

    changeViewerImage();
}


/* =========================
   PREVIOUS PHOTO
========================= */

function previousPhoto() {

    currentPhoto--;

    if (currentPhoto < 0) {

        currentPhoto =
            galleryImages.length - 1;

    }

    changeViewerImage();
}


/* =========================
   CHANGE IMAGE
========================= */

function changeViewerImage() {

    viewerImage.style.opacity =
        "0";

    viewerImage.style.transform =
        "scale(0.96)";


    setTimeout(function () {

        viewerImage.src =
            galleryImages[currentPhoto].src;

        viewerImage.alt =
            galleryImages[currentPhoto].alt;

        updateViewerCounter();


        viewerImage.style.opacity =
            "1";

        viewerImage.style.transform =
            "scale(1)";

    }, 200);
}


/* =========================
   COUNTER
========================= */

function updateViewerCounter() {

    const current =
        String(currentPhoto + 1)
            .padStart(2, "0");

    const total =
        String(galleryImages.length)
            .padStart(2, "0");

    viewerCounter.textContent =
        current + " / " + total;
}


/* =========================
   CLICK EVENTS
========================= */

galleryImages.forEach(
    function (image, index) {

        image.addEventListener(
            "click",
            function () {

                openPhoto(index);

            }
        );

    }
);


viewerClose.addEventListener(
    "click",
    closePhoto
);


viewerNext.addEventListener(
    "click",
    nextPhoto
);


viewerPrev.addEventListener(
    "click",
    previousPhoto
);


/* =========================
   KEYBOARD CONTROLS
========================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            !photoViewer.classList
                .contains("active")
        ) {
            return;
        }


        if (event.key === "Escape") {
            closePhoto();
        }


        if (event.key === "ArrowRight") {
            nextPhoto();
        }


        if (event.key === "ArrowLeft") {
            previousPhoto();
        }

    }
);

/* ========================================
   RSVP FORM
======================================== */

const rsvpForm =
    document.getElementById("rsvpForm");

const rsvpSuccess =
    document.getElementById("rsvpSuccess");

const RSVP_ENDPOINT =
    "https://script.google.com/macros/s/AKfycbw35WugU42wARNxXKBG6Y3kUmpxLDCc2-ABaU9iOL4zaU_gSBZg4dC_mCrNYD7YwFuB/exec";


if (rsvpForm && rsvpSuccess) {

    rsvpForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const selectedEvents =
                document.querySelectorAll(
                    'input[name="event"]:checked'
                );

            if (selectedEvents.length === 0) {

                alert(
                    "Please select at least one celebration."
                );

                return;

            }

            const submitButton =
                rsvpForm.querySelector(
                    ".rsvp-button"
                );

            submitButton.disabled = true;

            submitButton.innerHTML =
                "SENDING...";

            const guestName =
                document.getElementById(
                    "guestName"
                ).value.trim();

            const attendance =
                document.querySelector(
                    'input[name="attendance"]:checked'
                ).value;

            const guestCount =
                document.getElementById(
                    "guestCount"
                ).value;

            const guestMessage =
                document.getElementById(
                    "guestMessage"
                ).value.trim();

            const events =
                Array.from(selectedEvents)
                    .map(function (event) {
                        return event.value;
                    })
                    .join(", ");


            const rsvpData = {

                guestName: guestName,

                attendance: attendance,

                events: events,

                guestCount: guestCount,

                message: guestMessage

            };


            try {

                fetch(
                    RSVP_ENDPOINT,
                    {
                        method: "POST",

                        mode: "no-cors",

                        headers: {
                            "Content-Type":
                                "text/plain;charset=utf-8"
                        },

                        body:
                            JSON.stringify(
                                rsvpData
                            )
                    }
                );

                /*
                   The request has been sent to Google
                   Apps Script.
            
                   Because no-cors gives the browser
                   an opaque response, we don't wait
                   for a readable response here.
                */

                rsvpForm.style.display =
                    "none";

                rsvpSuccess.classList.add(
                    "show");


            } catch (error) {

                console.error(
                    "RSVP submission failed:",
                    error
                );

                submitButton.disabled =
                    false;

                submitButton.innerHTML =
                    "SEND RSVP <span>↗</span>";

                alert(
                    "Something went wrong. Please try again."
                );

            }

        }
    );

}

/* ========================================
   BACK TO TOP
======================================== */

const backToTop =
    document.getElementById("backToTop");

window.addEventListener(
    "scroll",
    function () {

        if (window.scrollY > 700) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }
);

backToTop.addEventListener(
    "click",
    function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);