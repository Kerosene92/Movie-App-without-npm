/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/index.html",
    "./src/js/*.js"
  ],
  theme: {
    extend: {
      transitionDuration: {
        '1500': '1500ms',
        '2000': '2000ms',
      },
        animation:{
          fadein: 'fade-in 0.5s ease-in-out 0.25s 1',
          shake: 'shake 0.6s ease-in-out 0.25s 1',
          shakeupdown: 'shake-up-down 0.6s ease-in-out 0.25s 1',
          fadeout: 'fade-out 0.6s ease-out 0.25s 1',
          fadeindown: 'fade-in-down 0.2s forwards ease-in 0.25s 1',
          flyin: 'fly-in 0.3s ease-in-out 0.25s 1',
          fadeinup: 'fade-in-up 1s ease-in-out 0.25s 1',
          flyoutright: 'fly-out-right 0.3s ease-in-out 0.25s 1',
        },
  
        keyframes:{
          "fade-in": {
            "0%": {
                opacity: 0
            },
            "100%": {
                opacity: 1
            },
          },
          "shake-up-down": {
            "0%, 100%": {
            transform: "translateY(0)",
            },
            "25%": {
                transform: "translateY(-10px)"
            },
            "50%": {
                transform: "translateY(10px)"
            },
            "75%": {
                transform: "translateY(-10px)"
            }
          },
          "shake": {
            "0%, 100%": {
                transform: "translateX(0)",
            },
            "10%, 30%, 50%, 70%, 90%": {
                transform: "translateX(-10px)",
            },
            "20%, 40%, 60%, 80%": {
                transform: "translateX(10px)",
            },
          },
          "fade-out": {
              "0%": {
                  opacity: 1
              },
              "100%": {
                  opacity: 0
              },
          },
          "fade-in-down" : {
            "0%": {
                opacity: 1,
                transform: "translate3d(0, -100%, 0)",
            },
            "100%": {
                opacity: 1,
                transform: "translate3d(0, 0, 0)",
            },
          },
  
          "fly-in": {
            "0%": {
                opacity: "0",
                transform: "scale3d(0.3, 0.3, 0.3)",
                transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)",
            },
            "20%": {
                transform: "scale3d(1.1, 1.1, 1.1)"
            },
            "40%": {
                transform: "scale3d(0.9, 0.9, 0.9)"
            },
            "60%": {
                opacity: "1",
                transform: "scale3d(1.03, 1.03, 1.03)"
            },
            "80%": {
                transform: "scale3d(0.97, 0.97, 0.97)"
            },
            "100%": {
                opacity: "1",
                transform: "scale3d(1, 1, 1)"
            },
        },
  
      "fade-in-up": {
          "0%": {
              opacity: 0,
              transform: "translate3d(0, 100%, 0)",
          },
          "100%": {
              opacity: 1,
              transform: "translate3d(0, 0, 0)",
          },
      },
      "fly-out-right": {
                      "0%": {
                          transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)",
                      },
                      "20%": {
                          opacity: "1",
                          transform: "translate3d(20px, 0, 0)",
                      },
                      "100%": {
                          opacity: "0",
                          transform: "translate3d(-2000px, 0, 0)",
                      },
                  },
      },
    },
  },
  plugins: [],
}

